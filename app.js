// QUESTIONS
const questions = [
  {
    q: "Capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: 0
  },
  {
    q: "5 + 3 = ?",
    options: ["5", "7", "8", "9"],
    answer: 2
  },
  {
    q: "Sun rises in?",
    options: ["North", "South", "East", "West"],
    answer: 2
  }
];

let index = 0;
let score = 0;
let time = 600; // 10 minutes
let timer;

// SCREEN CONTROL
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// START
document.getElementById("startTest").addEventListener("pointerdown", startTest);
document.getElementById("restart").addEventListener("pointerdown", () => location.reload());

// START TEST
function startTest() {
  show("quiz");
  loadQuestion();
  timer = setInterval(updateTimer, 1000);
}

// LOAD QUESTION
function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = opt;
    btn.addEventListener("pointerdown", () => checkAnswer(i));
    optionsDiv.appendChild(btn);
  });
}

// CHECK ANSWER
function checkAnswer(selected) {
  if (selected === questions[index].answer) {
    score++;
  }
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    endTest();
  }
}

// TIMER
function updateTimer() {
  time--;
  let min = Math.floor(time / 60);
  let sec = time % 60;
  document.getElementById("timer").innerText =
    `Time: ${min}:${sec < 10 ? "0" + sec : sec}`;

  if (time <= 0) {
    endTest();
  }
}

// END TEST
function endTest() {
  clearInterval(timer);
  show("result");
  document.getElementById("score").innerText =
    `Your Score: ${score} / ${questions.length}`;
  localStorage.setItem("lastScore", score);
}
