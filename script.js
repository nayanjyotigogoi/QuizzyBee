const { jsPDF } = window.jspdf;

const questions = [
    // MCQs
    { 
        question: "Who wrote 'The Man Who Would Be Queen' (2011)?", 
        answers: ["Amitav Ghosh", "Nissim Ezekiel", "Hoshang Merchant", "Mulk Raj Anand"], 
        correct: 2 
    },
    { 
        question: "'In a Free State' won the Booker Prize in which year?", 
        answers: ["1971", "1985", "1990", "1965"], 
        correct: 0 
    },
    { 
        question: "Which of the following authors was a Nobel Laureate?", 
        answers: ["Raja Rao", "R.K. Narayan", "Michael Madhusudan Dutt", "Rabindranath Tagore"], 
        correct: 3 
    },
    { 
        question: "Who wrote 'Pagla Ghoda, Basi Khabar, Pralap'?", 
        answers: ["Badal Sirkar", "Mahesh Dattani", "Girish Karnad", "Vijay Tendulkar"], 
        correct: 0 
    },
    { 
        question: "'Tara' (1990) deals with which two major themes?", 
        answers: ["Caste & Religion", "War & Politics", "Gender & Disability", "Colonialism & Migration"], 
        correct: 2 
    },
    { 
        question: "'Kanthapura' by Raja Rao is based on which movement?", 
        answers: ["Quit India Movement", "Civil Disobedience Movement", "Non-Cooperation Movement", "Swadeshi Movement"], 
        correct: 1 
    },
    { 
        question: "Who is considered the 'Father of Bengali Fiction'?", 
        answers: ["Rabindranath Tagore", "Mulk Raj Anand", "Bankim Chandra Chattopadhyay", "Nirad C. Chaudhuri"], 
        correct: 2 
    },
    { 
        question: "Which of the following is NOT a novel by Mulk Raj Anand?", 
        answers: ["Untouchable", "Two Leaves and a Bud", "The God of Small Things", "Coolie"], 
        correct: 2 
    },
    { 
        question: "'Rajmohan’s Wife' (1864) was written in which language?", 
        answers: ["Sanskrit", "English", "Hindi", "Bengali"], 
        correct: 1 
    },
    { 
        question: "Who translated the Mahabharata into English?", 
        answers: ["Raja Rao", "Nirad C. Chaudhuri", "Kisari Mohan Ganguli", "R.K. Narayan"], 
        correct: 2 
    },


    // Fill in the Blanks (with options)
    { 
        question: "'The God of Small Things' was written by ______.", 
        answers: ["Arundhati Roy", "Jhumpa Lahiri", "Vikram Seth", "Salman Rushdie"], 
        correct: 0 
    },
    { 
        question: "'The Guide' by R.K. Narayan won the ______ Prize in 1960.", 
        answers: ["Booker", "Sahitya Akademi", "Pulitzer", "Jnanpith"], 
        correct: 1 
    },
    { 
        question: "'The Hungry Tide' was written by ______.", 
        answers: ["Amitav Ghosh", "Arundhati Roy", "R.K. Narayan", "Khushwant Singh"], 
        correct: 0 
    },
    { 
        question: "______ won the Booker Prize in 2006 for 'The Inheritance of Loss'.", 
        answers: ["Arundhati Roy", "Kiran Desai", "Jhumpa Lahiri", "Anita Desai"], 
        correct: 1 
    },
    { 
        question: "'The Namesake' explores the struggles of an ______ immigrant family.", 
        answers: ["Indian", "Chinese", "Indian-Bengali", "Pakistani"], 
        correct: 2 
    },
    { 
        question: "______ wrote 'Train to Pakistan' about the Partition of India.", 
        answers: ["R.K. Narayan", "Khushwant Singh", "Ruskin Bond", "Vikram Seth"], 
        correct: 1 
    },
    { 
        question: "The protagonist of 'Untouchable' is ______.", 
        answers: ["Raju", "Bakha", "Hari", "Mohan"], 
        correct: 1 
    },
    { 
        question: "______ wrote 'The Room on the Roof' at the age of 17.", 
        answers: ["R.K. Narayan", "Arundhati Roy", "Ruskin Bond", "Khushwant Singh"], 
        correct: 2 
    },
    { 
        question: "'Hind Swaraj' was written in the year ______.", 
        answers: ["1920", "1909", "1947", "1915"], 
        correct: 1 
    },
    { 
        question: "'Kanthapura' portrays the influence of ______’s ideas.", 
        answers: ["Jawaharlal Nehru", "Mahatma Gandhi", "Bhagat Singh", "Sardar Patel"], 
        correct: 1 
    },
    // True/False
    { 
        question: "'Hind Swaraj' was written by Rabindranath Tagore.", 
        answers: ["True", "False"], 
        correct: 1 
    },
    { 
        question: "Jhumpa Lahiri’s first novel was 'The Namesake'.", 
        answers: ["True", "False"], 
        correct: 0 
    },
    { 
        question: "'Anandamath' was written by R.K. Narayan.", 
        answers: ["True", "False"], 
        correct: 1 
    },
    { 
        question: "Mulk Raj Anand’s 'Untouchable' depicts a single day in Bakha’s life.", 
        answers: ["True", "False"], 
        correct: 0 
    },
    { 
        question: "'A Suitable Boy' was written by Amitav Ghosh.", 
        answers: ["True", "False"], 
        correct: 1 
    },
    { 
        question: "'Train to Pakistan' is set during the Quit India Movement.", 
        answers: ["True", "False"], 
        correct: 1 
    },
    { 
        question: "'Clear Light of Day' was written by Anita Desai.", 
        answers: ["True", "False"], 
        correct: 0 
    },
    { 
        question: "'The Glass Palace' is set in colonial Burma.", 
        answers: ["True", "False"], 
        correct: 0 
    },
    { 
        question: "'The Lowland' is set against the backdrop of the Naxalite movement.", 
        answers: ["True", "False"], 
        correct: 0 
    },
    { 
        question: "'Hind Swaraj' criticizes modern civilization.", 
        answers: ["True", "False"], 
        correct: 0 
    }
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