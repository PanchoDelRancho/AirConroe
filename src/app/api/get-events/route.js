import { NextResponse } from "next/server";
import calendar from "../google/google";

export async function GET() {
  try {
    const { data } = await calendar.events.list({
      calendarId: process.env.CAL_ID,
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
      fields: "items(start,end)",
    });
    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, data: err.message });
  }
}
