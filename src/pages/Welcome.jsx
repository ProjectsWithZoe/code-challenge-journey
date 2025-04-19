import React, { useState, useEffect } from "react";
import { getUserCode } from "@/lib/localStorage";
import { useNavigate } from "react-router-dom";
import ProgressCalendar from "@/components/ProgressCalendar";
import { format } from "date-fns";

const WelcomePage = ({ isMobile }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);
  const [userCode, setUserCode] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      navigate("/challenge");
    }
  }, [isMobile, navigate]);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    // Retrieve selectedDate and completedDates from local storage
    //const savedDate = localStorage.getItem("selectedDate");
    const savedCompletedChallenges = localStorage.getItem(
      "completedChallenges"
    );

    /*if (savedDate) {
      setSelectedDate(new Date(savedDate)); // Convert savedDate to a Date object
    }*/

    if (savedCompletedChallenges) {
      setCompletedDates(JSON.parse(savedCompletedChallenges)); // Parse the JSON string
      console.log(
        "Retrieved completed challenges from local storage:",
        JSON.parse(savedCompletedChallenges)
      );
    }
  }, []);

  useEffect(() => {
    // Load the user's code for the selected date
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const code = getUserCode(formattedDate);
    console.log("User code for selected date:", code);
    setUserCode(code);
  }, [selectedDate]);

  const todayDateString = format(new Date(), "yyyy-MM-dd");
  console.log(todayDateString);
  console.log(format(selectedDate, "yyyy-MM-dd"));

  const isChallengeComplete = completedDates.includes(todayDateString);

  console.log("Completed Datess:", completedDates);

  const handleWelcomeClick = () => {
    // Handle the click event for the welcome button
    console.log("Welcome button clicked");
    //localStorage.setItem("hasSeenWelcome", "true");

    navigate("/challenge");
  };

  const handleShowChallenge = () => {
    setShowChallenge(!showChallenge);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    navigate("/challenge");
  };

  return (
    <div className="min-h-screen bg-grey-500 text-foreground flex flex-col justify-center p-4">
      <div className="flex flex-col border-b py-3 bg-card">
        <h1 className="flex text-xl font-bold justify-center overflow-auto">
          ✨ Daily Code Challenge ✨
        </h1>
      </div>

      <main className="flex flex-col justify-center container py-6">
        <div className="flex text-2xl font-bold justify-center mb-4">
          {selectedDate.toDateString().slice(4)}
        </div>
        {isChallengeComplete ? (
          <div className="flex flex-col items-center">
            <div>
              <p className="flex mb-2 justify-center text-green-500 text-xl">
                Today's challenge is complete! 🎉
              </p>
            </div>
            <button
              className=" w-[80%] align-center justify-center bg-blue-500 text-white m-4 p-4 rounded-full "
              onClick={handleShowChallenge}
            >
              {showChallenge ? "Hide submitted code" : "Show submitted code"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div>
              <p className="flex mb-2 justify-center text-red-500 text-xl">
                You haven't completed today's challenge yet.
              </p>
            </div>
            <button
              className="w-[80%] align-center justify-center bg-blue-500 text-white m-4 p-4 rounded-full "
              onClick={handleWelcomeClick}
            >
              Go to Challenge
            </button>
          </div>
        )}
        <div className="flex flex-col items-center">
          <button
            className="w-[80%] align-center justify-center bg-blue-500 text-white m-4 p-4 rounded-full "
            onClick={() => {
              setShowCalendar(!showCalendar);
            }}
          >
            {showCalendar ? "Hide Progress Calendar" : "Show Progress Calendar"}
          </button>
        </div>
        {showCalendar && (
          <ProgressCalendar
            completedDates={completedDates}
            onDateSelect={handleDateSelect}
          />
        )}

        {showChallenge && (
          <div className="w-full bg-blue-200 p-2 rounded-lg shadow-md">
            <pre className="whitespace-pre-wrap">{userCode}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default WelcomePage;
