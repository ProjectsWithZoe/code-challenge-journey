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
import { saveCompletedChallenge } from "@/lib/localStorage";
import { getCompletedChallenges } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { use } from "react";
import { get } from "http";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completedDates, setCompletedDates] = useState([]);
  const [evaluateChallenge, setEvaluateChallenge] = useState(null);
  const { toast } = useToast();

  const handleChallengeLoad = (challenge) => {
    setCurrentChallenge(challenge);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, []);

  useEffect(() => {
    const savedCompletedDates = getCompletedChallenges();
    console.log(savedCompletedDates);
    setCompletedDates(savedCompletedDates); // Set the state with the saved dates
  }, []);

  useEffect(() => {
    saveCompletedChallenge(completedDates); // Save the updated completedDates to local storage
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

  const handleChallengeComplete = (date) => {
    setCompletedDates((prev) => [...new Set([...prev, date])]); // Add the date if not already present
    console.log(completedDates);
  };

  const handleDateSelect = (date) => {
    //console.log(date);
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b px-4 py-3 flex justify-between items-center bg-card">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Daily Code Challenge</h1>
        </div>
        <AuthButton />
      </header>

      <main className=" container py-6 px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-3 lg:col-span-2 space-y-6">
            <Challenge
              selectedDate={selectedDate}
              onChallengeLoad={handleChallengeLoad}
              //onEvaluate={handleEvaluate}
            />
          </div>
          <div className="hidden lg:block  space-y-6">
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
