import config from "../utils/config/config.json";

async function performGetApiCall() {
  const response = await fetch(`${config.url}`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
  return response;
}

export { performGetApiCall };
