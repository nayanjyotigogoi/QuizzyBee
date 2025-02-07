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
        const boxHeight = 20; // Adjust height of the rectangle dynamically

        // Draw a box around the question
        doc.setDrawColor(0, 0, 255); // Blue border
        doc.rect(10, y - 5, 190, boxHeight + 12); // Increase height

        doc.setFont("helvetica", "bold");
        doc.text(`Q${index + 1}: ${q.question}`, 15, y);
        y += 8;
        doc.setFont("helvetica", "normal");

        const userAnswerIndex = userAnswers[index];
        const userAnswer = userAnswerIndex !== null ? q.answers[userAnswerIndex] : "Not Answered";
        const correctAnswer = q.answers[q.correct];
        const isCorrect = userAnswerIndex === q.correct;
        const icon = isCorrect ? "✔" : "✘";

        // User's answer with color
        doc.setTextColor(isCorrect ? 0, 128, 0 : 255, 0, 0);
        doc.text(`${icon} Your Answer: ${userAnswer}`, 20, y);
        y += 8;

        // Correct answer always in red
        doc.setTextColor(255, 0, 0);
        doc.text(`✔ Correct Answer: ${correctAnswer}`, 20, y);
        y += 12;

        // Reset text color
        doc.setTextColor(0, 0, 0);

        // Ensure enough space between questions
        y += 5;

        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    // Save PDF
    doc.save("quiz_results.pdf");
});
