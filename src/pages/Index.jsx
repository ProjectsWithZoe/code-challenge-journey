import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Code, CalendarDays, Trophy, Info } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ProgressCalendar from "@/components/ProgressCalendar";
import Challenge from "@/components/Challenge";
import AuthButton from "@/components/AuthButton";
import {
  saveCompletedChallenge,
  saveCompletedChallenges,
} from "@/lib/localStorage";
import { getCompletedChallenges } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completedDates, setCompletedDates] = useState([]);
  const [evaluateChallenge, setEvaluateChallenge] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log("Index component rendered");

  useEffect(() => {
    console.log(selectedDate);
  }, []);

  useEffect(() => {
    const savedCompletedDates = getCompletedChallenges();
    console.log(savedCompletedDates);
    setCompletedDates(savedCompletedDates); // Set the state with the saved dates
  }, []);

  useEffect(() => {
    saveCompletedChallenges(completedDates); // Save the updated completedDates to local storage
  }, [completedDates]);

  /*const handleEvaluate = (evaluator) => {
    setEvaluateChallenge(() => evaluator);
  }
  
  const handleCodeSubmit = (code) => {
    if (!evaluateChallenge) return false;
    
    const success = evaluateChallenge(code);
    
    if (success) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      saveCompletedChallenge(formattedDate);
      
      toast({
        title: "Challenge Completed! 🎉",
        description: "Your solution has passed all test cases.",
      });
    } else {
      toast({
        title: "Test Failed",
        description: "Your solution did not pass all test cases. Try again!",
        variant: "destructive"
      });
    }
    
    return success;
  };*/
  const handleChallengeLoad = (challenge) => {
    setCurrentChallenge(challenge);
  };

  const handleChallengeComplete = (date) => {
    // If the date is not already in the completed challenges, add it
    if (!completedDates.includes(date)) {
      const newCompletedDates = [...completedDates, date];
      setCompletedDates(newCompletedDates); // Update state
      saveCompletedChallenge(date); // Save to local storage
      toast({
        title: "Challenge Completed! 🎉",
        description: "Your solution has passed all test cases.",
      });
    } else {
      toast({
        title: "Already Completed",
        description: "You have already completed this challenge today.",
        variant: "destructive",
      });
    }
  };

  const handleDateSelect = (date) => {
    //console.log(date);
    setSelectedDate(date);
  };

  if (isMobile) return null;

  return (
    <div className="min-h-screen bg-grey-500 text-foreground">
      <header className="border-b px-4 py-3 flex justify-between items-center bg-card">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Daily Code Challenge</h1>
        </div>
        {/*<AuthButton />*/}
      </header>

      <main className=" container p-2 md:px-6">
        <div className="grid justify-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Challenge
              selectedDate={selectedDate}
              onChallengeLoad={handleChallengeLoad}
              //onEvaluate={handleEvaluate}
            />
          </div>
          <div className="hidden md:block  space-y-6">
            <ProgressCalendar
              onDateSelect={handleDateSelect}
              completedDates={completedDates}
            />
          </div>

          {/*<Separator />*/}
          <div className="col-span-3 lg:col-span-2 space-y-6">
            {currentChallenge && (
              <CodeEditor
                className="col-span-3"
                date={format(selectedDate, "yyyy-MM-dd")}
                currentChallenge={currentChallenge}
                starterCode={`function ${currentChallenge.functionName}${currentChallenge.variables}{
                // Your code here
                };
                  `}
                onCodeSubmit={handleChallengeComplete}
              />
            )}
          </div>

          <div className=" col-span-1 hidden lg:block space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Daily Code Challenge is a Progressive Web App (PWA) that
                  provides a new coding challenge every day.
                </p>
                <p className="mt-2">
                  Practice your skills, track your progress, and compete with
                  friends!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t px-4 py-3 text-center text-sm text-muted-foreground">
        <p>Daily Code Challenge &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
