// ✅ For index.html (start button navigation)
document.getElementById("start-btn")?.addEventListener("click", () => {
  window.location.href = "quiz.html";
});

// ✅ Quiz questions
const questions = [
  {
    question: "Do you enjoy finding patterns in large datasets? 📊",
    options: ["Yes", "Sometimes", "Not really"]
  },
  {
    question: "Are you more interested in building AI models or applying them? 🤖",
    options: ["Building models", "Applying them", "Both"]
  },
  {
    question: "Do you enjoy explaining AI decisions to non-technical people? 🗣️",
    options: ["Yes", "Sometimes", "No"]
  },
  {
    question: "Would you prefer working with data, algorithms, or people? 🔍",
    options: ["Data", "Algorithms", "People"]
  },
  {
    question: "Do you care more about AI ethics and fairness or performance? ⚖️",
    options: ["Ethics", "Performance", "Both"]
  },
  {
    question: "Are you excited about robots, chatbots, or research papers? 🤔",
    options: ["Robots", "Chatbots", "Research"]
  },
  {
    question: "Do you like coding complex systems or visualizing results? 💻",
    options: ["Coding", "Visualizing", "Both"]
  },
  {
    question: "Would you rather prevent AI misuse or create breakthrough models? 🚨",
    options: ["Prevent misuse", "Breakthrough models", "Both"]
  },
  {
    question: "What motivates you more: innovation, safety, or impact? 🌍",
    options: ["Innovation", "Safety", "Impact"]
  }
];

let currentQ = 0;
let answers = [];

// ✅ For quiz.html (show questions)
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  if (!questionEl || !optionsEl) return; // if not on quiz.html, skip

  let q = questions[currentQ];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  
  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      answers[currentQ] = opt;
      nextBtn.style.display = "block";
    });
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

nextBtn?.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    window.location.href = "results.html";
  }
});

// Load first quiz question
if (questionEl) {
  loadQuestion();
}

// ✅ For results.html (show final result)
if (window.location.pathname.includes("results.html")) {
  const answers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
  let resultText = "Based on your answers, you are a great fit for... ";

  if (answers.includes("Ethics") || answers.includes("Prevent misuse")) {
    resultText += "an **AI Ethics Specialist** ⚖️";
  } else if (answers.includes("Data")) {
    resultText += "a **Data Scientist** 📊";
  } else if (answers.includes("Algorithms")) {
    resultText += "a **Machine Learning Engineer** 🤖";
  } else if (answers.includes("People")) {
    resultText += "an **AI Product Manager** 👩‍💼";
  } else {
    resultText += "an **AI Researcher** 🔬";
  }

  document.getElementById("result-text").textContent = resultText;
}
