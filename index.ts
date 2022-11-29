import boxen from "boxen";
import client from "./lib/supabase.js";
import { getEntries } from "./lib/google-sheets.js";

console.log(
  boxen("Migrating from Google Calendar to Supabase Database", {
    title: "gcal-supabase",
    titleAlignment: "center",
  })
);

const data = await getEntries();

const parsedData: object[] = data.map((entry) => {
  return {
    name: entry[0],
    source: entry[1],
    anilist: entry[2] ? parseInt(entry[2]) : null,
    image: entry[3],
    publisher: entry[4],
    type: entry[5],
  };
});

console.log(parsedData);

const { error } = await client.from("licensed").insert(parsedData);

console.log(error);
