const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let timeleft = 90
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'placeholder for a question',
        choice1: 'A',
        choice2: 'B',
        choice3: 'C',
        choice4: 'D',
        answer: '2'
    },
    {
        question: 'placeholder for a question',
        choice1: 'A',
        choice2: 'B',
        choice3: 'C',
        choice4: 'D',
        answer: '2'
    },
    {
        question: 'placeholder for a question',
        choice1: 'A',
        choice2: 'B',
        choice3: 'C',
        choice4: 'D',
        answer: '2'
    },
    {
        question: 'placeholder for a question',
        choice1: 'A',
        choice2: 'B',
        choice3: 'C',
        choice4: 'D',
        answer: '2'
    },
    {
        question: 'placeholder for a question',
        choice1: 'A',
        choice2: 'B',
        choice3: 'C',
        choice4: 'D',
        answer: '2'
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    startimer ()
    getNewQuestion()
}
startimer = () => {
    var timer= setInterval(function(){
        timeleft--
        document.getElementById("timer").textContent = timeleft
    },1000)
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'
        console.log(classToApply)
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    console.log ('hello')
    score +=num
    scoreText.textContent = score
}

startGame()