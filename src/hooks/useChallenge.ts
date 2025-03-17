
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Challenge {
  id: number;
  date: string;
  title: string;
  difficulty: string;
  description: string;
  examples: Example[];
  starterCode: string;
  solution: string;
}

const useChallenge = (selectedDate?: Date) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from a backend API
        // For demo purposes, we're using a local JSON file
        const response = await fetch('/challenges.json');
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }

        const challenges: Challenge[] = await response.json();
        
        if (selectedDate) {
          // Format the selected date to match the date format in challenges
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          
          // Find the challenge for the selected date
          const matchedChallenge = challenges.find(c => c.date === formattedDate);
          
          if (matchedChallenge) {
            setChallenge(matchedChallenge);
          } else {
            // If no challenge for selected date, use the first challenge
            // In a real app, this would be more sophisticated
            setChallenge(challenges[0]);
          }
        } else {
          // If no date selected, use today's challenge or the first one
          // In a real app, this would use the current date
          setChallenge(challenges[0]);
        }
      } catch (err) {
        console.error('Error fetching challenge:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [selectedDate]);

  return { challenge, loading, error };
};

export default useChallenge;
