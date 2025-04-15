import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  const apiKey = request.headers.get("X-api-key");
  if (apiKey !== process.env.CHALLENGE_API_KEY) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const filePath = path.join(process.cwd(), "data", "testchallenges.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const challenges = JSON.parse(fileContents);

  const url = new URL(request.url);
  const selectedDate = url.searchParams.get("selectedDate");
  if (!selectedDate) {
    return new Response("No date selected", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
  // Find the challenge that matches the selected date
  const matchedChallenge = challenges.find((c) => c.date === selectedDate);
  // If no challenge is found, return the first challenge
  if (!matchedChallenge) {
    return new Response("No challenge found for the selected date", {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(JSON.stringify(matchedChallenge), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
