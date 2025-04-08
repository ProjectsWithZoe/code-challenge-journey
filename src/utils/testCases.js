export const testCases = {
  findSmallestNumber: [
    {
      name: "Basic array with positive numbers",
      input: [[34, 15, 88, 2]],
      expected: 2,
    },
    {
      name: "Array with negative numbers",
      input: [[-5, 10, -15, 20]],
      expected: -15,
    },
    {
      name: "Array with duplicate numbers",
      input: [[5, 5, 5, 5]],
      expected: 5,
    },
  ],
  // Add more functions and their test cases
  twoSum: [
    {
      name: "Basic case",
      input: [[2, 7, 11, 15], 9],
      expected: [0, 1],
    },
    {
      name: "No solution",
      input: [[1, 2, 3], 7],
      expected: [],
    },
  ],
  sumTwoNumbers: [
    {
      name: "Basic sum of two positive integers",
      input: [1, 2],
      expected: 3,
    },
    {
      name: "Sum of a negative and a positive integer",
      input: [-5, 10],
      expected: 5,
    },
    {
      name: "Sum of two decimal numbers",
      input: [2.5, 3.5],
      expected: 6.0,
    },
    {
      name: "Sum of two zero values",
      input: [0, 0],
      expected: 0,
    },
    {
      name: "Sum of a positive number and zero",
      input: [7, 0],
      expected: 7,
    },
    {
      name: "Sum of a negative number and zero",
      input: [-8, 0],
      expected: -8,
    },
  ],
  countVowels: [
    {
      name: "Basic word with two vowels",
      input: ["hello"],
      expected: 2,
    },
    {
      name: "Word with no vowels",
      input: ["Why"],
      expected: 0,
    },
    {
      name: "All uppercase vowels",
      input: ["AEIOU"],
      expected: 5,
    },
    {
      name: "Sentence with mixed case vowels",
      input: ["Python is fun"],
      expected: 3,
    },
    {
      name: "Empty string",
      input: [""],
      expected: 0,
    },
    {
      name: "String with all consonants",
      input: ["bcdfghjklmnpqrstvwxyz"],
      expected: 0,
    },
    {
      name: "String with repeating vowels",
      input: ["aaeeiioouu"],
      expected: 10,
    },
    {
      name: "Mixed string with numbers and vowels",
      input: ["123abc456"],
      expected: 1,
    },
    {
      name: "String with special characters and vowels",
      input: ["@#e$%^&*o()"],
      expected: 2,
    },
    {
      name: "Long sentence with various characters",
      input: ["The quick brown fox jumps over the lazy dog."],
      expected: 11,
    },
  ],

  // ... more functions
};
