// Quiz Questions Data Array
const quizData = [
    {
        question: "Which is the smallest state in India by area?",
        options: ["Delhi", "Assam", "Goa", "Punjab"],
        correct: 2 // Index of 'Goa'
    },
    {
        question: "Which bird can mimic human speech?",
        options: ["Eagle", "Sparrow", "Owl", "Parrot"],
        correct: 3 // Index of 'Parrot'
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
        correct: 1 // Index of 'Ottawa'
    },
    {
        question: "Which movement was launched by Mahatma Gandhi in 1942?",
        options: ["Quit India Movement", "Swadeshi Movement", "Civil Disobedience Movement", "Non-Cooperation Movement"],
        correct: 0 // Index of 'Quit India Movement'
    },
    {
        question: "How many players are on the field in a football team?",
        options: ["15", "10", "21", "11"],
        correct: 3 // Index of '11'
    }
];

// Variables tracking state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;

// Dom Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionNumEl = document.getElementById('question-number');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const finalScoreEl = document.getElementById('final-score');
const scoreCommentEl = document.getElementById('score-comment');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});
restartBtn.addEventListener('click', startQuiz);

// Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    // Reset timer & display setup
    timeLeft = 20;
    timerEl.textContent = `Time: ${timeLeft}s`;
    timerEl.classList.remove('warning');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    // Update progress elements
    const currentQuiz = quizData[currentQuestionIndex];
    questionNumEl.textContent = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    questionTextEl.textContent = currentQuiz.question;

    // Render options
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });

    // Start countdown clock
    clearInterval(timerInterval);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 5) {
            timerEl.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function selectAnswer(selectedIndex, selectedBtn) {
    clearInterval(timerInterval); // Stop timer once answered
    const correctIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    if (selectedIndex === correctIndex) {
        selectedBtn.classList.add('correct');
        score += 100; // 100 points per correct answer
    } else {
        selectedBtn.classList.add('wrong');
        // Show user what the correct answer was
        allButtons[correctIndex].classList.add('correct');
    }

    // Disable all options after picking an answer
    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove('hidden');
}

function handleTimeOut() {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    // Highlight the missed answer
    allButtons[correctIndex].classList.add('correct');
    allButtons.forEach(btn => btn.disabled = true);
    
    nextBtn.classList.remove('hidden');
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreEl.textContent = score;

    // Add contextual final remark
    if (score === 500) {
        scoreCommentEl.textContent = "Flawless victory! You are a genius! 🌟";
    } else if (score >= 300) {
        scoreCommentEl.textContent = "Great job! Pretty solid general knowledge. 👍";
    } else {
        scoreCommentEl.textContent = "Better luck next time! Practice makes perfect. 🙂";
    }
}