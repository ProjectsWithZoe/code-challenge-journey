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
  reverseString: [
    {
      name: "Simple word",
      input: ["hello"],
      expected: "olleh",
    },
    {
      name: "Empty string",
      input: [""],
      expected: "",
    },
    {
      name: "Single character",
      input: ["a"],
      expected: "a",
    },
    {
      name: "String with spaces",
      input: ["hi there"],
      expected: "ereht ih",
    },
  ],

  sumArray: [
    {
      name: "Positive numbers",
      input: [[1, 2, 3]],
      expected: 6,
    },
    {
      name: "Empty array",
      input: [[]],
      expected: 0,
    },
    {
      name: "Array with negative numbers",
      input: [[-1, -2, 3]],
      expected: 0,
    },
    {
      name: "Single element array",
      input: [[5]],
      expected: 5,
    },
  ],

  isPalindrome: [
    {
      name: "Palindrome word",
      input: ["madam"],
      expected: true,
    },
    {
      name: "Non-palindrome word",
      input: ["hello"],
      expected: false,
    },
    {
      name: "Mixed case palindrome",
      input: ["RaceCar"],
      expected: true,
    },
    {
      name: "Palindrome with spaces",
      input: ["nurses run"],
      expected: false,
    },
  ],

  findMaxNumber: [
    {
      name: "Basic array",
      input: [[1, 5, 3]],
      expected: 5,
    },
    {
      name: "All negative numbers",
      input: [[-10, -20, -3]],
      expected: -3,
    },
    {
      name: "Single element array",
      input: [[42]],
      expected: 42,
    },
    {
      name: "Duplicates of max",
      input: [[7, 7, 7]],
      expected: 7,
    },
  ],

  factorial: [
    {
      name: "Positive number",
      input: [5],
      expected: 120,
    },
    {
      name: "Zero",
      input: [0],
      expected: 1,
    },
    {
      name: "One",
      input: [1],
      expected: 1,
    },
  ],

  getOddNumbers: [
    {
      name: "Mixed numbers",
      input: [3],
      expected: true,
    },
    {
      name: "All even",
      input: [2],
      expected: false,
    },
    {
      name: "Empty array",
      input: [[]],
      expected: false,
    },
  ],

  isPrime: [
    {
      name: "Prime number",
      input: [7],
      expected: true,
    },
    {
      name: "Non-prime number",
      input: [4],
      expected: false,
    },
    {
      name: "One",
      input: [1],
      expected: false,
    },
    {
      name: "Two",
      input: [2],
      expected: true,
    },
  ],

  removeDuplicates: [
    {
      name: "Array with duplicates",
      input: [[1, 2, 2, 3]],
      expected: [1, 2, 3],
    },
    {
      name: "No duplicates",
      input: [[4, 5, 6]],
      expected: [4, 5, 6],
    },
    {
      name: "Empty array",
      input: [[]],
      expected: [],
    },
  ],

  capitalizeFirst: [
    {
      name: "Single word lowercase",
      input: ["hello"],
      expected: "Hello",
    },
    {
      name: "Already capitalized",
      input: ["World"],
      expected: "World",
    },
    {
      name: "Empty string",
      input: [""],
      expected: "",
    },
  ],
  convertToFahrenheit: [
    {
      name: "Zero Celsius",
      input: [0],
      expected: 32,
    },
    {
      name: "Positive Celsius",
      input: [25],
      expected: 77,
    },
    {
      name: "Negative Celsius",
      input: [-40],
      expected: -40,
    },
  ],

  fibonacci: [
    {
      name: "5th Fibonacci number",
      input: [5],
      expected: 5,
    },
    {
      name: "0th Fibonacci number",
      input: [0],
      expected: 0,
    },
    {
      name: "1st Fibonacci number",
      input: [1],
      expected: 1,
    },
    {
      name: "10th Fibonacci number",
      input: [10],
      expected: 55,
    },
  ],

  countWords: [
    {
      name: "Sentence with multiple words",
      input: ["Hello world from GPT"],
      expected: 4,
    },
    {
      name: "Single word",
      input: ["Word"],
      expected: 1,
    },
    {
      name: "Empty string",
      input: [""],
      expected: 0,
    },
  ],

  squareArray: [
    {
      name: "positive numbers",
      input: [3],
      expected: 9,
    },
    {
      name: " negative numbers",
      input: [-2],
      expected: 4,
    },
    {
      name: "zero",
      input: [0],
      expected: 0,
    },
  ],

  repeatString: [
    {
      name: "Repeat twice",
      input: ["ab", 2],
      expected: "abab",
    },
    {
      name: "Repeat zero times",
      input: ["x", 0],
      expected: "",
    },
    {
      name: "Repeat once",
      input: ["hi", 1],
      expected: "hi",
    },
  ],

  isEven: [
    {
      name: "Even number",
      input: [4],
      expected: true,
    },
    {
      name: "Odd number",
      input: [5],
      expected: false,
    },
    {
      name: "Zero",
      input: [0],
      expected: true,
    },
  ],

  getInitials: [
    {
      name: "Two names",
      input: ["John Doe"],
      expected: "JD",
    },
    {
      name: "Single name",
      input: ["Alice"],
      expected: "A",
    },
    {
      name: "Three-part name",
      input: ["Bob Alan Smith"],
      expected: "BAS",
    },
  ],

  getMiddleCharacter: [
    {
      name: "Odd length string",
      input: ["hello"],
      expected: "l",
    },
    {
      name: "Even length string",
      input: ["test"],
      expected: "es",
    },
    {
      name: "Single character",
      input: ["A"],
      expected: "A",
    },
  ],

  toTitleCase: [
    {
      name: "All lowercase words",
      input: ["hello world"],
      expected: "Hello World",
    },
    {
      name: "Already title cased",
      input: ["Hello World"],
      expected: "Hello World",
    },
    {
      name: "Empty string",
      input: [""],
      expected: "",
    },
  ],

  arrayContains: [
    {
      name: "Element exists",
      input: [[1, 2, 3], 2],
      expected: true,
    },
    {
      name: "Element not found",
      input: [[4, 5, 6], 7],
      expected: false,
    },
    {
      name: "Empty array",
      input: [[], 1],
      expected: false,
    },
  ],

  convertMinutesToSeconds: [
    {
      name: "Standard value",
      input: [5],
      expected: 300,
    },
    {
      name: "Zero minutes",
      input: [0],
      expected: 0,
    },
    {
      name: "Decimal minutes",
      input: [1.5],
      expected: 90,
    },
  ],

  getLastElement: [
    {
      name: "Normal array",
      input: [[1, 2, 3]],
      expected: 3,
    },
    {
      name: "Single element array",
      input: [[99]],
      expected: 99,
    },
    {
      name: "Empty array",
      input: [[]],
      expected: undefined,
    },
  ],

  reverseWords: [
    {
      name: "Simple sentence",
      input: ["hello world"],
      expected: "world hello",
    },
    {
      name: "Single word",
      input: ["Hi"],
      expected: "Hi",
    },
    {
      name: "Empty string",
      input: [""],
      expected: "",
    },
  ],

  doubleArray: [
    {
      name: "Positive numbers",
      input: [[1, 2, 3]],
      expected: [2, 4, 6],
    },
    {
      name: "With negative numbers",
      input: [[-1, 0, 1]],
      expected: [-2, 0, 2],
    },
    {
      name: "Empty array",
      input: [[]],
      expected: [],
    },
  ],

  getUniqueValues: [
    {
      name: "With duplicates",
      input: [[1, 2, 2, 3]],
      expected: [1, 2, 3],
    },
    {
      name: "All unique",
      input: [[4, 5, 6]],
      expected: [4, 5, 6],
    },
    {
      name: "Empty array",
      input: [[]],
      expected: [],
    },
  ],

  isUpperCase: [
    {
      name: "All uppercase",
      input: ["HELLO"],
      expected: true,
    },
    {
      name: "All lowercase",
      input: ["hello"],
      expected: false,
    },
    {
      name: "Mixed case",
      input: ["Hello"],
      expected: false,
    },
  ],

  averageArray: [
    {
      name: "Positive integers",
      input: [[2, 4, 6, 8]],
      expected: 5,
    },
    {
      name: "Mixed numbers",
      input: [[-2, 0, 2]],
      expected: 0,
    },
    {
      name: "Single number",
      input: [[10]],
      expected: 10,
    },
  ],

  countEvenNumbers: [
    {
      name: "Mixed values",
      input: [[1, 2, 3, 4]],
      expected: 2,
    },
    {
      name: "No even numbers",
      input: [[1, 3, 5]],
      expected: 0,
    },
    {
      name: "All even",
      input: [[2, 4, 6]],
      expected: 3,
    },
  ],

  formatPhoneNumber: [
    {
      name: "Simple case",
      input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]],
      expected: "(123) 456-7890",
    },
    {
      name: "Already formatted",
      input: [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]],
      expected: "(987) 654-3210",
    },
  ],
  getLength: [
    {
      name: "String input",
      input: ["hello"],
      expected: 5,
    },
    {
      name: "Empty string",
      input: [""],
      expected: 0,
    },
    {
      name: "Array with elements",
      input: [[1, 2, 3, 4]],
      expected: 4,
    },
    {
      name: "Empty array",
      input: [[]],
      expected: 0,
    },
    {
      name: "String with spaces",
      input: ["hello world"],
      expected: 11,
    },
  ],
  filterEven: [
    {
      name: "Mixed numbers",
      input: [[1, 2, 3, 4]],
      expected: [2, 4],
    },
    {
      name: "All odd numbers",
      input: [[5, 7, 9]],
      expected: [],
    },
    {
      name: "Empty array",
      input: [[]],
      expected: [],
    },
  ],

  getFirstElement: [
    {
      name: "Numbers",
      input: [[1, 2, 3]],
      expected: 1,
    },
    {
      name: "Strings",
      input: [["a", "b"]],
      expected: "a",
    },
    {
      name: "Single item",
      input: [[42]],
      expected: 42,
    },
  ],

  containsValue: [
    {
      name: "Value exists",
      input: [[1, 2, 3], 2],
      expected: true,
    },
    {
      name: "Value does not exist",
      input: [["a", "b"], "c"],
      expected: false,
    },
    {
      name: "Empty array",
      input: [[], 1],
      expected: false,
    },
  ],

  toUpperCase: [
    {
      name: "Lowercase word",
      input: ["hello"],
      expected: "HELLO",
    },
    {
      name: "Mixed case",
      input: ["JavaScript"],
      expected: "JAVASCRIPT",
    },
    {
      name: "Already uppercase",
      input: ["WOW"],
      expected: "WOW",
    },
  ],

  removeFirstChar: [
    {
      name: "Basic word",
      input: ["hello"],
      expected: "ello",
    },
    {
      name: "Three letters",
      input: ["abc"],
      expected: "bc",
    },
    {
      name: "Single character",
      input: ["x"],
      expected: "",
    },
  ],

  joinArray: [
    {
      name: "Letters",
      input: [["a", "b", "c"]],
      expected: "a,b,c",
    },
    {
      name: "Numbers",
      input: [[1, 2, 3]],
      expected: "1,2,3",
    },
    {
      name: "Empty array",
      input: [[]],
      expected: "",
    },
  ],

  isPositive: [
    {
      name: "Positive number",
      input: [5],
      expected: true,
    },
    {
      name: "Negative number",
      input: [-3],
      expected: false,
    },
    {
      name: "Zero",
      input: [0],
      expected: false,
    },
  ],

  isEmptyString: [
    {
      name: "Empty string",
      input: [""],
      expected: true,
    },
    {
      name: "Non-empty string",
      input: ["abc"],
      expected: false,
    },
    {
      name: "Whitespace string",
      input: [" "],
      expected: false,
    },
  ],

  boolToString: [
    {
      name: "True value",
      input: [true],
      expected: "true",
    },
    {
      name: "False value",
      input: [false],
      expected: "false",
    },
  ],

  removeSpaces: [
    {
      name: "Spaces between characters",
      input: ["a b c"],
      expected: "abc",
    },
    {
      name: "Spaces around words",
      input: [" hello world "],
      expected: "helloworld",
    },
    {
      name: "No spaces",
      input: ["clean"],
      expected: "clean",
    },
  ],

  includesSubstring: [
    {
      name: "Substring found",
      input: ["hello world", "world"],
      expected: true,
    },
    {
      name: "Substring not found",
      input: ["test", "no"],
      expected: false,
    },
    {
      name: "Empty substring",
      input: ["abc", ""],
      expected: true,
    },
  ],

  roundNumber: [
    {
      name: "Round up",
      input: [4.6],
      expected: 5,
    },
    {
      name: "Round down",
      input: [4.3],
      expected: 4,
    },
    {
      name: "Already whole",
      input: [7],
      expected: 7,
    },
  ],

  getCurrentYear: [
    {
      name: "Get year from system",
      input: [],
      expected: new Date().getFullYear(),
    },
  ],

  // ... more functions
};
