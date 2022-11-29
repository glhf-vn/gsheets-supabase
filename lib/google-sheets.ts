import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_ID = process.env.SHEET_ID;

// get entries by lists, sorted from oldest to newest
export async function getEntries() {
  const sheets = google.sheets({ version: "v4", auth: GOOGLE_API_KEY });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "licensed!A2:F",
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return [];
  }

  return rows;
}
