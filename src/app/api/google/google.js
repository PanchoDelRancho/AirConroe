import { google } from "googleapis";

const private_key = process.env.SECRET_KEY.toString();

const client_email = process.env.CLIENT_EMAIL;

const auth = new google.auth.JWT(client_email, null, private_key, [
  "https://www.googleapis.com/auth/calendar",
]);

const calendar = google.calendar({ version: "v3", auth });

export default calendar;
