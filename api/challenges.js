import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  const filePath = path.join(process.cwd(), "data", "testchallenges.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const challenges = JSON.parse(fileContents);

  return new Response(JSON.stringify(challenges), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
