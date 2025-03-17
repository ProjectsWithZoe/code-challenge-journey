
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { saveUserCode, getUserCode } from '@/lib/localStorage';
import { Check, Play, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeEditorProps {
  date: string;
  language?: string;
  starterCode: string;
  onCodeRun?: (code: string) => void;
  onCodeSubmit?: (code: string) => boolean;
}

const CodeEditor = ({ 
  date, 
  language = 'javascript', 
  starterCode, 
  onCodeRun,
  onCodeSubmit
}: CodeEditorProps) => {
  const [code, setCode] = useState(starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Load saved code from localStorage if available
  useEffect(() => {
    const savedCode = getUserCode(date);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(starterCode);
    }
  }, [date, starterCode]);

  // Auto-save code changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveUserCode(date, code);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [code, date]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    try {
      if (onCodeRun) {
        onCodeRun(code);
      } else {
        // Simple evaluation if no run handler provided
        // eslint-disable-next-line no-new-func
        const result = new Function(`
          try {
            ${code}
            return "Code executed successfully!";
          } catch (error) {
            return "Error: " + error.message;
          }
        `)();
        
        toast({
          title: "Code Execution",
          description: result,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (onCodeSubmit) {
        const isSuccess = onCodeSubmit(code);
        if (isSuccess) {
          toast({
            title: "Success!",
            description: "Your solution has been submitted successfully.",
          });
        } else {
          toast({
            title: "Try Again",
            description: "Your solution didn't pass all test cases.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Submitted",
          description: "Your code has been saved.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during submission",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    saveUserCode(date, starterCode);
    toast({
      title: "Reset",
      description: "Code has been reset to starter code.",
    });
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="border-b p-2 bg-secondary flex justify-between items-center">
        <div className="text-sm font-medium">Editor ({language})</div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRun}
            disabled={isRunning}
            title="Run Code"
          >
            <Play className="h-4 w-4 mr-1" />
            Run
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
            title="Submit Solution"
          >
            <Check className="h-4 w-4 mr-1" />
            Submit
          </Button>
        </div>
      </div>
      <div className="flex-grow h-[400px]">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
