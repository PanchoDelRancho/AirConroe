//export default function handler(req, response) {
//  const { method, body } = req;
//  if (body) console.log(body);
//  console.log(method);
//
//  switch (method) {
//    case "GET":
//      response.status(200).json({ pageName: "createApp GET" });
//      break;
//    case "POST":
//      response.status(200).json({ pageName: "createApp POST" });
//      break;
//    default:
//      response.setHeader("Allow", ["GET", "POST"]);
//      response.status(405).end(`Method ${method} Not Allowed`);
//  }
//}
//
//
import { NextResponse } from "next/server";
import calendar from "../google/google";

export async function POST(request) {
  const body = await request.json();
  const { start, end, name, email, phone, address, summary } = body;
  try {
    const event = await calendar.events.insert({
      calendarId: process.env.CAL_ID,
      requestBody: {
        start: { dateTime: start, timeZone: "UTC" },
        end: { dateTime: end, timeZone: "UTC" },
        location: address,
        summary,
        description: `name: ${name} \nemail: ${email} \nphone: ${phone} \n${summary}`,
        //      attendees: [{ email: email }],
      },
    });
    if (event) {
      return NextResponse.json({ success: true, data: event.data });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
