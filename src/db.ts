import { read } from "bun:ffi";
import fs from "fs";

const CACHE_FILE = "./cache.json";

interface Cache {
  token?: string;
  name?: string;
}

type Key = keyof Cache;

function saveCache(newData: Cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(newData, null, 2));
}

function readCache(): Cache {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  } catch (err) {
    throw new Error("Cache file not found");
  }
}

async function getValue(key: Key): Promise<string> {
  const cache = readCache();
  if (!cache.hasOwnProperty(key)) {
    throw new Error(`Key ${key} not found in cache`);
  }
  return Object(cache)[key];
}

async function setValue(key: Key, value: string) {
  let oldData: Cache = {};
  try {
    oldData = readCache();
  } catch (err) {
    fs.writeFileSync(CACHE_FILE, "{}");
  }
  const newData: Cache = { ...oldData };
  newData[key] = value;
  saveCache(newData);
  return readCache();
}
export default {
  setValue,
  getValue,
};
