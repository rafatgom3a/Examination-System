const startButton = document.querySelector(".startButton");
const questionContainer = document.querySelector(".questionContainer");
const nextButton = questionContainer.querySelector(".next");

//pop up for the name
window.addEventListener("load", function (){
    Swal.fire({
        title: "Enter your name",
        input: "text",
        inputPlaceholder: "Enter your full name here",
        confirmButtonText: "Submit",
        allowOutsideClick: false,
        preConfirm: (name) => {
            if (!name) {
                Swal.showValidationMessage("Name is required!");
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                Swal.showValidationMessage("Please enter a valid name (letters only)!");
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            startButton.style.display = "block";
        }
    });
});
 
//The questions
const questions = [
    {
        title: "Which country's flag is this?",
        image: "images/eg.png",
        answers: ["Egypt", "Libya", "Sudan"],
        correctAnswer: "Egypt"
    },
    {
        title: "Which country's flag is this?",
        image: "images/sa.png",
        answers: ["Saudi Arabia", "Yemen", "Oman"],
        correctAnswer: "Saudi Arabia"
    },
    {
        title: "Which country's flag is this?",
        image: "images/ae.png",
        answers: ["United Arab Emirates", "Qatar", "Kuwait"],
        correctAnswer: "United Arab Emirates"
    },
    {
        title: "Which country's flag is this?",
        image: "images/us.png",
        answers: ["United States", "Canada", "Mexico"],
        correctAnswer: "United States"
    },
    {
        title: "Which country's flag is this?",
        image: "images/de.png",
        answers: ["Germany", "Austria", "Switzerland"],
        correctAnswer: "Germany"
    },
    {
        title: "Which country's flag is this?",
        image: "images/nl.png",
        answers: ["Netherlands", "Belgium", "Denmark"],
        correctAnswer: "Netherlands"
    },
    {
        title: "Which country's flag is this?",
        image: "images/se.png",
        answers: ["Sweden", "Norway", "Finland"],
        correctAnswer: "Sweden"
    },
    {
        title: "Which country's flag is this?",
        image: "images/ch.png",
        answers: ["Switzerland", "Austria", "Germany"],
        correctAnswer: "Switzerland"
    },
    {
        title: "Which country's flag is this?",
        image: "images/ie.png",
        answers: ["Ireland", "Scotland", "Wales"],
        correctAnswer: "Ireland"
    },
    {
        title: "Which country's flag is this?",
        image: "images/gb.png",
        answers: ["United Kingdom", "Australia", "New Zealand"],
        correctAnswer: "United Kingdom"
    }
];
 
const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

const questionTitle = questionContainer.querySelector("h1");
const questionImage = questionContainer.querySelector("img");
const answerButtons = questionContainer.querySelectorAll(".answer");

//time bar
let timerInterval;
startButton.addEventListener('click', function () {
    document.querySelector('.startExamContainer').style.display = 'none';
    questionContainer.style.display = 'block';

    let div = document.querySelector("p");
    div.innerHTML = 60;
    timerInterval = setInterval(() => {
        let currentValue = div.innerHTML;
        div.innerHTML = currentValue - 1;
        if (currentValue - 1 === 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);

    loadQuestion();
});


let currentQuestionIndex = 0;
let correctAnswersCount = 0;
nextButton.addEventListener('click', function () {
    const selectedButton = questionContainer.querySelector(".answer.selected");
    if (selectedButton) {
        const selectedAnswer = selectedButton.textContent;
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            correctAnswersCount++;
        }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } 
    else {
        clearInterval(timerInterval);
        showResults();
    }
});

//load the question
function loadQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.title;
    questionImage.src = currentQuestion.image;

    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    answerButtons.forEach((button, index) => {
        button.textContent = shuffledAnswers[index];
        button.classList.remove('selected');
        button.style.backgroundColor = "";
        button.style.color = "";

        button.onclick = function () {
            answerButtons.forEach(btn => {
                btn.classList.remove('selected');
                btn.style.backgroundColor = "";
                btn.style.color = "";
            });
            button.classList.add('selected');
            button.style.backgroundColor = "#333";
            button.style.color = "#fff";
            nextButton.disabled = false;
        };
    });
    nextButton.disabled = true;
}


const progressContainer = document.querySelector(".progressContainer");
const progressCircle = document.querySelector(".progressCircle");
const progressText = document.querySelector(".progressText");
const scoreText = document.querySelector(".scoreText");

//the result
function showResults() {
    questionContainer.style.display = "none";
    progressContainer.style.display = "block";

    const totalQuestions = shuffledQuestions.length;
    const percentage = Math.round((correctAnswersCount / totalQuestions) * 100);
    progressCircle.style.setProperty("--percentage", percentage);
    progressText.textContent = `${percentage}%`;
    scoreText.textContent = `You have ${correctAnswersCount} out off ${totalQuestions} correct answers.`;
}
