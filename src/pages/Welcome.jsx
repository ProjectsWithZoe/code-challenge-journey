import React, { useState, useEffect } from "react";
import { getUserCode } from "@/lib/localStorage";
import { useNavigate } from "react-router-dom";
import ProgressCalendar from "@/components/ProgressCalendar";

const WelcomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);
  const [userCode, setUserCode] = useState("");
  const [isMobile, setIsMobile] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      navigate("/challenge");
    }
  }, [isMobile, navigate]);

  useEffect(() => {
    // Retrieve selectedDate and completedDates from local storage
    const savedDate = localStorage.getItem("selectedDate");
    const savedCompletedChallenges = localStorage.getItem(
      "completedChallenges"
    );

    if (savedDate) {
      setSelectedDate(new Date(savedDate)); // Convert savedDate to a Date object
    }

    if (savedCompletedChallenges) {
      setCompletedDates(JSON.parse(savedCompletedChallenges)); // Parse the JSON string
    }
  }, []);

  useEffect(() => {
    // Load the user's code for the selected date
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const code = getUserCode(formattedDate);
    setUserCode(code);
  }, [selectedDate]);

  const isChallengeComplete = completedDates.includes(
    selectedDate.toISOString().split("T")[0]
  );

  const handleWelcomeClick = () => {
    // Handle the click event for the welcome button
    console.log("Welcome button clicked");
    localStorage.setItem("hasSeenWelcome", "true");

    navigate("/challenge");
  };

  const handleProgressClick = () => {
    navigate("/progress");
  };

  return (
    <div className="min-h-screen bg-grey-500 text-foreground p-4">
      <header className="flex border-b px-4 py-3 flex justify-center md:justify-between  items-center bg-card">
        <h1 className="text-xl font-bold">Welcome to Daily Code Challenge</h1>
      </header>

      <main className="flex flex-col container py-6">
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
              onClick={handleWelcomeClick}
            >
              Go to Challenge
            </button>
          </div>
        )}
        <button
          className="align-center bg-blue-500 text-white m-4 p-4 rounded-full "
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
        >
          {showCalendar ? "Hide Progress Calendar" : "Show Progress Calendar"}
        </button>
        {showCalendar && (
          <ProgressCalendar
            completedDates={completedDates}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        )}
      </main>
    </div>
  );
};

export default WelcomePage;
