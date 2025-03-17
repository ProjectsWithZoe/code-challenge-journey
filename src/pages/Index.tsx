
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Code, CalendarDays, Trophy, Info } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import ProgressCalendar from '@/components/ProgressCalendar';
import Challenge from '@/components/Challenge';
import AuthButton from '@/components/AuthButton';
import useChallenge from '@/hooks/useChallenge';
import { saveCompletedChallenge } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { challenge, loading, error } = useChallenge(selectedDate);
  const { toast } = useToast();
  
  const evaluateCode = (code: string): boolean => {
    try {
      // In a real app, this would be a more sophisticated testing system
      // For now, we'll just check if the code includes certain keywords
      
      if (!challenge) return false;
      
      if (challenge.id === 1) { // Two Sum
        return code.includes('map') && code.includes('return');
      } else if (challenge.id === 2) { // Palindrome Number
        return code.includes('reverse') || (code.includes('while') && code.includes('return'));
      } else if (challenge.id === 3) { // Valid Parentheses
        return code.includes('stack') || code.includes('push') || code.includes('pop');
      }
      
      return true;
    } catch (error) {
      console.error('Error evaluating code:', error);
      return false;
    }
  };
  
  const handleCodeSubmit = (code: string): boolean => {
    const success = evaluateCode(code);
    
    if (success && challenge) {
      // Save the completion date to localStorage
      saveCompletedChallenge(challenge.date);
      
      toast({
        title: "Challenge Completed! 🎉",
        description: "Your solution has passed all test cases.",
      });
    }
    
    return success;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b px-4 py-3 flex justify-between items-center bg-card">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Daily Code Challenge</h1>
        </div>
        <AuthButton />
      </header>
      
      <main className="flex-grow container py-6 px-4 md:px-6">
        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : error ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{error}</p>
                </CardContent>
              </Card>
            ) : challenge ? (
              <>
                <Challenge
                  title={challenge.title}
                  date={challenge.date}
                  difficulty={challenge.difficulty}
                  description={challenge.description}
                  examples={challenge.examples}
                />
                
                <Separator />
                
                <CodeEditor
                  date={challenge.date}
                  starterCode={challenge.starterCode}
                  onCodeSubmit={handleCodeSubmit}
                />
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Challenge Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>There is no challenge available for the selected date.</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <ProgressCalendar onDateSelect={handleDateSelect} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Daily Code Challenge is a Progressive Web App (PWA) that provides a new coding challenge every day.</p>
                <p className="mt-2">Practice your skills, track your progress, and compete with friends!</p>
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
