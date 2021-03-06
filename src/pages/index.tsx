import { useEffect } from "react";
import * as glide from "../glide";
import { ColumnValue } from "../glide";
import jq from "jq-web";

async function fetchAndQuery(url: ColumnValue, query: ColumnValue) {
  if (url.value === undefined) {
    return undefined;
  }
  let json = await fetch(url.value).then((x) => x.json());
  if (query.value !== undefined) {
    json = jq.json(json, query.value);
  }

  return typeof json === "object" ? JSON.stringify(json) : json;
}

export default () => {
  useEffect(() => {
    glide.column(fetchAndQuery);
  });

  return <div>fetch column</div>;
};
