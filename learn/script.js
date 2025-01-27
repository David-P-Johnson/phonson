 // Array of possible questions
 const questions = [
  { number: 1, language: "German", spelling: "eins" },
  { number: 2, language: "German", spelling: "zwei" },
  { number: 3, language: "German", spelling: "drei" },
  { number: 4, language: "German", spelling: "vier" },
  { number: 5, language: "German", spelling: "funf" },
  { number: 6, language: "German", spelling: "sechs" },
  { number: 7, language: "German", spelling: "sieben" },
  { number: 8, language: "German", spelling: "acht" },
  { number: 9, language: "German", spelling: "neun" },
  { number: 10, language: "German", spelling: "zehn" },
  { number: 11, language: "German", spelling: "elfe" },
  { number: 12, language: "German", spelling: "zwolf" },
  { number: 13, language: "German", spelling: "dreizehn" },
  { number: 14, language: "German", spelling: "vierzehn" },
  { number: 15, language: "German", spelling: "funfzehn" },
  { number: 16, language: "German", spelling: "sechzehn" },
  { number: 17, language: "German", spelling: "siebzehn" },
  { number: 18, language: "German", spelling: "achtzehn" },
  { number: 19, language: "German", spelling: "neunzehn" },
  { number: 20, language: "German", spelling: "zwanzig" },
  { number: 30, language: "German", spelling: "dreizig" },
  { number: 40, language: "German", spelling: "vierzig" },
  { number: 50, language: "German", spelling: "funfzig" },
  { number: 60, language: "German", spelling: "sechzig" },
  { number: 70, language: "German", spelling: "siebzig" },
  { number: 80, language: "German", spelling: "achtzig" },
  { number: 90, language: "German", spelling: "neunzig" },
  { number: 100, language: "German", spelling: "hundert" },
  { number: 1, language: "Spanish", spelling: "uno" },
  { number: 2, language: "Spanish", spelling: "dos" },
  { number: 3, language: "Spanish", spelling: "tres" },
  { number: 4, language: "Spanish", spelling: "cuatro" },
  { number: 5, language: "Spanish", spelling: "cinco" },
  { number: 6, language: "Spanish", spelling: "seis" },
  { number: 7, language: "Spanish", spelling: "siete" },
  { number: 8, language: "Spanish", spelling: "ocho" },
  { number: 9, language: "Spanish", spelling: "nueve" },
  { number: 10, language: "Spanish", spelling: "diez" },
  { number: 11, language: "Spanish", spelling: "once" },
  { number: 12, language: "Spanish", spelling: "doce" },
  { number: 13, language: "Spanish", spelling: "trece" },
  { number: 14, language: "Spanish", spelling: "catorce" },
  { number: 15, language: "Spanish", spelling: "quince" },
  { number: 16, language: "Spanish", spelling: "dieciseis" },
  { number: 17, language: "Spanish", spelling: "diecisiete" },
  { number: 18, language: "Spanish", spelling: "dieciocho" },
  { number: 19, language: "Spanish", spelling: "diecinueve" },
  { number: 20, language: "Spanish", spelling: "veinte" },
  { number: 30, language: "Spanish", spelling: "treinta" },
  { number: 40, language: "Spanish", spelling: "cuarenta" },
  { number: 50, language: "Spanish", spelling: "cincuenta" },
  { number: 60, language: "Spanish", spelling: "sesenta" },
  { number: 70, language: "Spanish", spelling: "setenta" },
  { number: 80, language: "Spanish", spelling: "ochenta" },
  { number: 90, language: "Spanish", spelling: "noventa" },
  { number: 100, language: "Spanish", spelling: "cien" },
];

let currentQuestion;
let score = 0;
document.getElementById("scoreDisplay").innerHTML = ("Score ")+score;

// Function to generate a random question
function generateQuestion() {
  // Randomly select a question from the array
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  // Update the question text in the HTML
  document.getElementById("question").innerHTML =
    "Spell the number " +
    currentQuestion.number +
    " in " +
    currentQuestion.language +
    ":";

  // Clear the answer input field
  document.getElementById("answer").value = "";
  // Set the cursor to the answer input field
  document.getElementById("answer").focus();
}

// Function to check the answer
function checkAnswer() {
  // Get the user's answer from the input element
  const answer = document.getElementById("answer").value;

  if (answer.toLowerCase() === currentQuestion.spelling) {
    // Update the header text
    document.getElementById("header").innerHTML = "Correct!";
    score++;
    document.getElementById("scoreDisplay").innerHTML = ("Score ")+score;
  } else {
    // Update the header text
    document.getElementById("header").innerHTML =
      "Oops! It's '" + currentQuestion.spelling + "'";
  }
    // Hide the question, answer input, and submit button
    document.getElementById("question").classList.add("hidden");
    document.getElementById("answer").classList.add("hidden");
    document.getElementById("submit-button").classList.add("hidden");

    // Show the header
    document.getElementById("header").classList.remove("hidden");

    // Wait 3 seconds and then show the elements again
    setTimeout(function () {
      document.getElementById("question").classList.remove("hidden");
      document.getElementById("answer").classList.remove("hidden");
      document.getElementById("submit-button").classList.remove("hidden");

// Hide the header
document.getElementById("header").classList.add("hidden");
// Set the cursor to the answer input field
document.getElementById("answer").focus();
}, 2000);

  //Generate a new question
  generateQuestion();
}
  
// Function to handle keydown events
function handleKeydown(event) {
  // Check for the Return key
  if (event.key === "Enter") {
    // Simulate a click on the submit button
    document.getElementById("submit-button").click();
  }
}

// Add an event listener to the submit button
document.getElementById("submit-button").addEventListener("click", checkAnswer);

// Add an event listener to the document object
document.addEventListener("keydown", handleKeydown);

// Generate and ask the first question
generateQuestion();