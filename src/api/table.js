import http from "../utils/http";

export function TableApi(url, data, method) {
  let info = {
    url: "table/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
