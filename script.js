const { jsPDF } = window.jspdf;

const questions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "Which planet is known as the Red Planet?", answers: ["Mars", "Earth", "Jupiter", "Venus"], correct: 0 },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const counter = document.getElementById("counter");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");
const downloadBtn = document.getElementById("download-btn");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    counter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    optionsContainer.innerHTML = "";

    q.answers.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.classList.add("option-button");
        btn.dataset.index = i;

        if (userAnswers[currentQuestionIndex] === i) {
            btn.classList.add("selected");
        }

        btn.addEventListener("click", (event) => {
            userAnswers[currentQuestionIndex] = parseInt(event.target.dataset.index);
            loadQuestion();
        });

        optionsContainer.appendChild(btn);
    });

    prevBtn.style.display = currentQuestionIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? "block" : "none";
    submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "block" : "none";
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

submitBtn.addEventListener("click", () => {
    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            score++;
        }
    });

    scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
    submitBtn.style.display = "none";
    downloadBtn.style.display = "block";
});

// Generate PDF on Download
downloadBtn.addEventListener("click", () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255);
    doc.setFontSize(22);
    doc.text("Quiz Results", 15, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    let y = 30;
    questions.forEach((q, index) => {
        doc.setFont("helvetica", "bold");
        doc.text(`Q${index + 1}: ${q.question}`, 15, y);
        y += 8;
        doc.setFont("helvetica", "normal");

        const userAnswer = userAnswers[index] !== null ? q.answers[userAnswers[index]] : "Not Answered";
        const correctAnswer = q.answers[q.correct];
        const isCorrect = userAnswers[index] === q.correct;
        const icon = isCorrect ? "✓" : "X";

        
        doc.text(`${icon} Your Answer: ${userAnswer}`, 20, y);
        y += 10;

        doc.text(`✔ Correct Answer: ${correctAnswer}`, 20, y);
        y += 12;

        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    // Save PDF
    doc.save("quiz_results.pdf");
});



loadQuestion();