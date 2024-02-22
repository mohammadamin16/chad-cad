import { auth, getPlaces, getPrice, otp, ride } from "./src/core/api";
import Logger from "@ptkdev/logger";
import { Separator, input, password, select } from "@inquirer/prompts";
import { getCleanPhone } from "./src/utils";
import db from "./src/db";

const logger = new Logger();

interface State {
  places?: Place[];
  origin?: Place;
  destination?: Place;
}
const state: State = {};

async function loadPlaces() {
  logger.info("🏠Loading Places...");
  const { data } = await getPlaces({ frequents: 1 });
  if (data?.places.length) {
    state["places"] = data.places;
  }
  logger.info("Done");
}

async function loadPrice(origin: Place, dest: Place) {
  logger.info(`Price for ${origin.name} to ${dest.name}`);
  const { data } = await getPrice({
    points: [origin.location, dest.location],
    waiting: null,
    round_trip: false,
    voucher_code: null,
    service_types: [1, 2],
    hurry_price: 0,
    priceriderecom: false,
    tag: 0,
  });
  console.info(data?.prices[0].final);
}

async function getRide() {
  if (!state.destination || !state.origin) return;
  const { data, err } = await ride({
    destination_lat: state.destination.location.lat,
    destination_lng: state.destination.location.lng,
    origin_lat: state.origin.location.lat,
    origin_lng: state.origin.location.lng,
    round_trip: false,
    service_type: 1,
    is_paid_by_recipient: false,
    voucher_code: "",
    waiting: null,
  });

  if (err) {
    logger.error(err);
  }

  logger.info("🚗 Finding a good ride for you ...");
}

function choosePlaces() {
  logger.info("Where are you now:");
  state.places?.forEach((place, index) => {
    console.log(index + 1, place.name);
  });
  logger.info("Where do you want to go: ");
  const originInput = parseInt(prompt("Choose a place: ")!) - 1;
  const destinationInput = parseInt(prompt("Choose a place: ")!) - 1;
  if (originInput < state.places!.length) {
    state.origin = state.places?.at(originInput);
  }
  console.log("Your input", destinationInput);
  console.log(typeof destinationInput);
  if (destinationInput < state.places!.length) {
    state.destination = state.places?.at(destinationInput);
  }
}

async function login() {
  const phone = await input({ message: "Phone Number: " });
  const { data: otpData } = await otp({
    cellphone: phone,
    attestation: { method: "skip", platform: "skip" },
    extra_methods: [],
  });
  const code = await password({ message: "Otp: " });
  const { data: authData } = await auth({
    grant_type: "sms_v2",
    client_id: "ios_sadjfhasd9871231hfso234",
    client_secret: "23497shjlf982734-=1031nln",
    cellphone: getCleanPhone(phone),
    token: code,
    referrer: "pwa",
    device_id: "bb40c36b-bd0b-425a-8af3-0e7021f3f959",
  });
  console.log(authData?.access_token);
  db.setValue("token", authData?.access_token!);
  db.setValue("name", authData?.fullname!);
}

function init() {
  try {
    db.getValue("token");
  } catch {
    login();
  }
}

async function main() {
  init();
  logger.info("Hello Chad 💪");
  await loadPlaces();
  if (state.places && state?.places?.length < 2) {
    console.error("You should have more favorite places!");
    return;
  }
  choosePlaces();
  await loadPrice(state.origin!, state.destination!);
  const anwer = prompt("Do you want a ride now? (y/n)");
  if (anwer === "y") {
    await getRide();
  } else {
    logger.warning("Exiting....");
  }
}
main();
