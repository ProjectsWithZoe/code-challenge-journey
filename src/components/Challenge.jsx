import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const Challenge = ({ selectedDate, onChallengeLoad }) => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");

        const response = await fetch(
          `./api/challenges?selectedDate=${formattedDate}`,
          {
            headers: {
              "X-api-key": process.env.VITE_CHALLENGE_API_KEY,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch challenges");
        }

        const matchedChallenge = await response.json();
        console.log(matchedChallenge);

        /*if (selectedDate) {
          //console.log(selectedDate);
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          console.log(formattedDate);
          const matchedChallenge = challenges.find(
            (c) => c.date === formattedDate
          );
          console.log(matchedChallenge);*/

        if (matchedChallenge) {
          console.log("Matched challenge:", matchedChallenge);
          setChallenge(matchedChallenge);
          onChallengeLoad?.(matchedChallenge);
        } else {
          setChallenge(null);
          onChallengeLoad?.(null);
        }
      } /*else {
          console.log("No date selected");
          // If no date is selected, load the first challenge
          console.log(challenges[0]);
          setChallenge(challenges[0]);
          onChallengeLoad?.(challenges[0]);
        
      }*/ catch (err) {
        console.error("Error fetching challenge:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch challenge"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [selectedDate]);

  // Expose the evaluation function through the prop
  /*useEffect(() => {
    if (onEvaluate) {
      onEvaluate(evaluateCode);
    }
  }, []);*/

  if (loading) {
    return (
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
            <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!challenge) {
    return (
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>No Challenge Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There is no challenge available for the selected date.</p>
        </CardContent>
      </Card>
    );
  }

  const formattedDate = format(new Date(challenge.date), "MMMM d, yyyy");

  const difficultyColor =
    {
      Easy: "bg-green-500",
      Medium: "bg-yellow-500",
      Hard: "bg-red-500",
    }[challenge.difficulty] || "bg-blue-500";

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {challenge.title}
            </CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <Badge className={`${difficultyColor} hover:${difficultyColor}`}>
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line text-sm mb-4">
          {challenge.description}
        </div>

        <h3 className="font-semibold text-sm mb-2">Examples:</h3>
        <div className="space-y-3">
          {challenge.examples.map((example, index) => (
            <div key={index} className="bg-muted p-3 rounded-md text-sm">
              <div className="mb-1">
                <span className="font-medium">Input:</span> {example.input}
              </div>
              <div className="mb-1">
                <span className="font-medium">Output:</span> {example.output}
              </div>
              {example.explanation && (
                <div>
                  <span className="font-medium">Explanation:</span>{" "}
                  {example.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenge;
