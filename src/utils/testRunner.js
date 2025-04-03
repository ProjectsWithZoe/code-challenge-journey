export const runTests = (functionName, code, testCases) => {
  // Create function from code string
  try {
    // Validate that the function name exists in the code
    if (!code.includes(`function ${functionName}`)) {
      throw new Error(`The function name must be "${functionName}".`);
    }
    // eslint-disable-next-line no-new-func
    const fn = new Function(`
      ${code}
      return ${functionName};
    `)();

    console.log("Function created successfully:", fn);

    const results = testCases.map((test) => {
      try {
        const result = fn(...test.input);

        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        return {
          passed,
          testName: test.name,
          input: test.input,
          expected: test.expected,
          actual: result,
          error: null,
        };
      } catch (error) {
        return {
          passed: false,
          testName: test.name,
          input: test.input,
          expected: test.expected,
          actual: null,
          error: error.message,
        };
      }
    });

    return {
      success: results.every((r) => r.passed),
      results,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      results: [],
    };
  }
};
