const passcode = "Colin"; // Change this to your desired passcode
const questions = [
    { 
        question: "Question 1 (This one is easy): What is my favorite color...",
        correctAnswer: "D: Purple", 
        image: "happycat1.gif",
        choices: ["A: Red", "B: Blue", "C: Yellow", "D: Purple"] // Choices for question 1
    },
    { 
        question: "Question 2: What is my favorite thing about you:)", 
        correctAnswer: "B: Everything About You...", 
        image: "happycat2.gif",
        choices: ["A: Your Smile", "B: Everything About You...", "C: Your Height heh", "D: Your Heart"] // Choices for question 2
    },
    { 
        question: "Final Question... Will you go to prom with me<3", 
        correctAnswer: "yes", 
        image: "happycat3.gif"
    }
];

let currentQuestionIndex = 0;

function checkPasscode() {
    const passcodeInput = document.getElementById("passcode").value;
    if (passcodeInput === passcode) {
        document.getElementById("siteContent").style.display = "block";
        document.querySelector(".container").style.display = "none";
        displayQuestion();
        // Hide passcode input and submit button after successful passcode entry
        document.getElementById("passcode").style.display = "none";
        document.querySelector("button").style.display = "none";
    } else {
        alert("Incorrect passcode. Please try again.");
    }
}

function displayQuestion() {
    const questionDiv = document.getElementById("questions");
    const currentQuestion = questions[currentQuestionIndex];
    questionDiv.innerHTML = `
        <img src="${currentQuestion.image}" alt="Image" class="question-image">
        <h2>${currentQuestion.question}</h2>
    `;

    if (currentQuestionIndex === 2) {
        // Display yes/no buttons for the last question
        questionDiv.innerHTML += `
            <div id="yesNoButtons">
                <button onclick="answerYesNo('yes')">Yes</button>
                <button onclick="answerYesNo('no')">No</button>
            </div>
        `;
    } else {
        // Display radio buttons for multiple-choice questions
        questionDiv.innerHTML += `
            <div id="choices">
                ${currentQuestion.choices.map((choice, index) => `
                    <input type="radio" id="choice${index}" name="choices" value="${choice}">
                    <label for="choice${index}">${choice}</label><br>
                `).join('')}
            </div>
        `;
        questionDiv.innerHTML += `<button onclick="submitAnswer()">Submit</button>`;
    }
}


function answerYesNo(answer) {
    if (answer === "no" && currentQuestionIndex === 2) {
        askSecondQuestion();
    } else if (answer === "yes" && currentQuestionIndex === 3) {
        askThirdQuestion();
    } else {
        questions[currentQuestionIndex].userAnswer = answer;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            alert("YAAAAAAAAAAY");
            window.location.href = "final-page.html";
        }
    }
}

function askSecondQuestion() {
    const questionDiv = document.getElementById("questions");
    questionDiv.innerHTML = `
    <img src="cat2.gif" alt="Image" class="question-image">
        <h2>Are you sure?</h2>
        <div id="yesNoButtons">
            <button onclick="answerSecondQuestion('yes')">Yes</button>
            <button onclick="answerSecondQuestion('no')">No</button>
        </div>
    `;
}

function answerSecondQuestion(answer) {
    if (answer === "yes") {
        askThirdQuestion();
    } else {
        askFirstQuestion(); // Go back to the first question
    }
}

function askThirdQuestion() {
    const questionDiv = document.getElementById("questions");
    questionDiv.innerHTML = `
        <img src="cat3.gif" alt="Image" class="question-image">
        <h2>Are you really sure?</h2>
        <div id="yesNoButtons">
            <button onclick="answerThirdQuestion('yes')">Yes</button>
            <button onclick="answerThirdQuestion('no')">No</button>
        </div>
        
    `;
}

function answerThirdQuestion(answer) {
    if (answer === "yes") {
        askFourthQuestion();
    } else {
        askFirstQuestion(); // Go back to the first question
    }
}

function askFourthQuestion() {
    const questionDiv = document.getElementById("questions");
    questionDiv.innerHTML = `
        <img src="cat.gif" alt="Image" class="question-image">
        <h2>Are you really REALLY sure..?</h2>
        <div id="yesNoButtons">
            <button onclick="answerFourthQuestion('yes')">Yes</button>
            <button onclick="answerFourthQuestion('no')">No</button>
        </div>
    `;
}


function answerFourthQuestion(answer) {
    if (answer === "yes") {
        alert("SAY NO. U ARE NOT SURE.");
    } else {
        askFirstQuestion(); // Go back to the first question
    }
}

function askFirstQuestion() {
    currentQuestionIndex = 2;
    displayQuestion();
}

function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="choices"]:checked');
    const userAnswer = selectedChoice ? selectedChoice.value : null; // Get the selected choice
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
        currentQuestionIndex++; // Move to the next question
        if (currentQuestionIndex < questions.length) {
            displayQuestion(); // Display the next question
        } else {
            alert("You've answered all questions correctly! You're the best! Let's go to prom together!");
            window.location.href = "final-page.html";
        }
    } else {
        alert("Oops! That's not the correct answer. Try again!");
    }
}
