import React from "react";
import { useState, useEffect } from "react";
import { getUserCode } from "@/lib/localStorage";
import { useNavigate } from "react-router-dom";

const WelcomePage = ({ selectedDate, completedDates }) => {
  const [userCode, setUserCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load the user's code for the selected date
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const code = getUserCode(formattedDate);
    setUserCode(code);
  }, [selectedDate]);

  const isChallengeComplete = completedDates.includes(
    selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen bg-grey-500 text-foreground p-4">
      <header className="border-b px-4 py-3 flex justify-between items-center bg-card">
        <h1 className="text-xl font-bold">Welcome to Daily Code Challenge</h1>
      </header>

      <main className="container py-6">
        {isChallengeComplete ? (
          <div>
            <h2 className="text-lg font-bold mb-4">Your Submitted Code:</h2>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">
              {userCode || "// No code submitted yet"}
            </pre>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-4">Challenge Incomplete</h2>
            <p className="mb-4">
              You haven't completed today's challenge yet. Click the button
              below to start solving it.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/")}
            >
              Go to Challenge
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WelcomePage;
