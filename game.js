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
        question: 'How many States make up the United States of America',
        choice1: '52',
        choice2: '50',
        choice3: '48',
        choice4: '49',
        answer: '2'
    },
    {
        question: 'Which state has the most cities',
        choice1: 'California',
        choice2: 'Texas',
        choice3: 'New York',
        choice4: 'Florida',
        answer: '2'
    },
    {
        question: 'Which state is the least populated',
        choice1: 'Montana',
        choice2: 'Wyoming',
        choice3: 'South Dakota',
        choice4: 'Vermont',
        answer: '2'
    },
    {
        question: 'Which state is the most populated',
        choice1: 'Florida',
        choice2: 'California',
        choice3: 'Texas',
        choice4: 'North Carolina',
        answer: '2'
    },
    {
        question: 'Which state is the MOST isolated from other states',
        choice1: 'North Dakota',
        choice2: 'Hawaii',
        choice3: 'Alaska',
        choice4: 'Arkansas',
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