import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { saveUserCode, getUserCode } from "@/lib/localStorage";
import { Check, Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { runTests } from "@/utils/testRunner";
import { testCases } from "@/utils/testCases";

const CodeEditor = ({
  date,
  language = "javascript",
  starterCode,
  currentChallenge,
  onCodeRun,
  onCodeSubmit,
}) => {
  const [code, setCode] = useState(starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCode(starterCode);
  }, [starterCode]);

  const runTestCases = () => {
    if (!currentChallenge?.functionName) {
      toast({
        title: "Error",
        description: "No function name specified",
        variant: "destructive",
      });
      return null;
    }

    const challengeTests = testCases[currentChallenge.functionName];
    if (!challengeTests) {
      toast({
        title: "Error",
        description: "No test cases found for this function",
        variant: "destructive",
      });
      return null;
    } else {
      console.log(
        `Running tests for ${currentChallenge.functionName} using the code provided ${code}`
      );
    }

    return runTests(currentChallenge.functionName, code, challengeTests);
  };

  // Load saved code from localStorage if available
  /*useEffect(() => {
    const savedCode = getUserCode(date);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(currentChallenge?.functionName + '//Write your solution here' || '//Write your solution here');
    }
  }, [date, currentChallenge]);*/

  /*useEffect(() => {
    console.log(currentChallenge);
    setCode(
      `function ${currentChallenge.functionName}${currentChallenge.variables} {\n //Write your solution here\n}` ||
        "//Write your solution here"
    );
  }, []);*/

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
      if (!code) {
        toast({
          title: "Error",
          description: "No code to run",
          variant: "destructive",
        });
        return;
      }

      if (!code.includes(`function ${currentChallenge.functionName}`)) {
        toast({
          title: "Error",
          description: `Function title should be ${currentChallenge.functionName}`,
          variant: "destructive",
        });
        return;
      }
      const testResults = runTestCases();
      console.log(testResults);
      if (!testResults) return;

      // Display results in toast
      if (testResults.success) {
        toast({
          title: "All Tests Passed! 🎉",
          description: "Your code passed all test cases",
        });
      } else {
        const failedTests = testResults.results.filter((r) => !r.passed);
        toast({
          title: "Some Tests Failed",
          description: (
            <div className="mt-2 space-y-2">
              {failedTests.map((test, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{test.testName}</div>
                  <div>Input: {JSON.stringify(test.input)}</div>
                  <div>Expected: {JSON.stringify(test.expected)}</div>
                  <div>Got: {JSON.stringify(test.actual)}</div>
                  {test.error && (
                    <div className="text-red-500">Error: {test.error}</div>
                  )}
                </div>
              ))}
            </div>
          ),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      const testResults = runTestCases();
      if (!testResults) return;

      if (testResults.success) {
        // Save completion and show success message
        saveUserCode(date, code);
        toast({
          title: "Challenge Completed! 🎉",
          description:
            "Your solution passed all test cases and has been saved.",
        });
      } else {
        toast({
          title: "Challenge Not Complete",
          description: "Your solution didn't pass all test cases. Try again!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
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
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
