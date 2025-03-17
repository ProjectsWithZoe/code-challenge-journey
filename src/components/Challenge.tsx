
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ChallengeProps {
  title: string;
  date: string;
  difficulty: string;
  description: string;
  examples: Example[];
}

const Challenge = ({ title, date, difficulty, description, examples }: ChallengeProps) => {
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  
  const difficultyColor = {
    'Easy': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'Hard': 'bg-red-500'
  }[difficulty] || 'bg-blue-500';

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <Badge className={`${difficultyColor} hover:${difficultyColor}`}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line text-sm mb-4">
          {description}
        </div>
        
        <h3 className="font-semibold text-sm mb-2">Examples:</h3>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <div key={index} className="bg-muted p-3 rounded-md text-sm">
              <div className="mb-1">
                <span className="font-medium">Input:</span> {example.input}
              </div>
              <div className="mb-1">
                <span className="font-medium">Output:</span> {example.output}
              </div>
              {example.explanation && (
                <div>
                  <span className="font-medium">Explanation:</span> {example.explanation}
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
