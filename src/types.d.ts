interface RequestOtp {
  cellphone: string;
  attestation: {
    method: string;
    platform: string;
  };
  extra_methods: any[];
}

interface ResponseOtp {
  data: {
    method: string;
    caption: string;
    icon_url: string;
    ttl: number;
    AvailableMethods: string[];
    available_methods: string[];
    captcha_type: string;
  };
  status: number;
}

interface RequestAuth {
  grant_type: string;
  client_id: string;
  client_secret: string;
  cellphone: string;
  token: string;
  referrer: string;
  device_id: string;
}

interface ResponseAuth {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  email: string;
  fullname: string;
  is_pending: boolean;
  is_new_user: boolean;
  is_email_required: boolean;
  login_status: number;
}

interface RequestRide {
  origin_lat: number;
  origin_lng: number;
  destination_lat: number;
  destination_lng: number;
  waiting: number | null;
  service_type: number;
  is_paid_by_recipient: boolean;
  round_trip: boolean;
  voucher_code: string;
}

interface ResponseRide {
  data: {
    is_first_ride: boolean;
    ride_id: string;
  };
  status: number;
}

interface RequestNewPrice {
  points: {
    lat: number;
    lng: number;
  }[];
  waiting: number | null;
  round_trip: boolean;
  voucher_code: string | null;
  service_types: number[];
  hurry_price: number;
  priceriderecom: boolean;
  tag: number;
}

interface ResponseNewPrice {
  prices: {
    final: number;
    is_hurry_enable: boolean;
    raw_fare: null;
    type: string;
    is_free_ride: boolean;
    is_discounted_price: boolean;
    is_surged: boolean;
    is_enabled: boolean;
    is_post_price: boolean;
    tag: string;
    texts: {
      free_ride: string;
      free_ride_footer: string;
      discounted_price: string;
      discounted_price_footer: string;
      surge: string;
      surge_footer: string;
      surge_link: string;
      promotion_message: string;
      promotion_message_footer: string;
      discount_and_surge_price: string;
      discount_and_surge_price_footer: string;
      post_price: string;
      post_price_footer: string;
    };
    distance: number;
    eta: string;
    items: any[];
    promotion_error: string;
    voucher_type: number;
  }[];
  tag: number;
  confirm_before_ride: boolean;
  confirm_before_ride_message: string;
  waiting: {
    key: string;
    price: number;
    text: string;
  }[];
  details: null;
}

interface Location {
  lat: number;
  lng: number;
  formatted_address: string;
}

interface Place {
  id: number;
  name: string;
  location: Location;
  detailed_address: string;
  order: number | null;
  map_url: string;
}

interface Frequent {
  shortname: string;
  score: number;
  lat: number;
  lng: number;
  address: string;
}

interface RequestPlace {
  frequents: number;
}

interface ResponsePlace {
  places: Place[];
  frequents: Frequent[];
}
