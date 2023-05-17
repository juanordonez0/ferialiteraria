const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let incorrect = 0
let questionCounter = 0
let availableQuestions = []

let questions = 
   
[
    {
    question: "¿En qué año nació Miguel Ángel Asturias?",
    choice1: "1899",
    choice2: "1904",
    answer: 1
    },
    {
    question: "¿Cuál fue la primera novela publicada por Miguel Ángel Asturias?",
    choice1: "El Señor Presidente",
    choice2: "Leyendas de Guatemala",
    answer: 2
    },
    {
    question: "¿Qué premio recibió Miguel Ángel Asturias en 1967?",
    choice1: "Premio Cervantes",
    choice2: "Premio Nobel de Literatura",
    answer: 2
    },
    {
    question: "¿En qué año murió Miguel Ángel Asturias?",
    choice1: "1973",
    choice2: "1981",
    answer: 1
    },
    {
    question: "¿Cómo se llama la obra de teatro más famosa de Miguel Ángel Asturias?",
    choice1: "El Señor Presidente",
    choice2: "Mulata de Tal",
    answer: 2
    },
    {
    question: "¿Cuál es el título de la obra literaria que escribió Miguel Ángel Asturias durante su estancia en París?",
    choice1: "Hombres de Maíz",
    choice2: "El Papa Verde",
    answer: 2
    },
    {
    question: "¿En qué país se desarrolla la trama de la novela 'El Señor Presidente'?",
    choice1: "Guatemala",
    choice2: "México",
    answer: 1
    },
    {
    question: "¿Cuál es el título de la novela de Miguel Ángel Asturias que se desarrolla durante la época precolombina?",
    choice1: "Hombres de Maíz",
    choice2: "El Señor Presidente",
    answer: 1
    },
    {
    question: "¿Qué movimiento literario influyó en la obra de Miguel Ángel Asturias?",
    choice1: "Modernismo",
    choice2: "Realismo Mágico",
    answer: 2
    },
    {
    question: "¿En qué ciudad falleció Miguel Ángel Asturias?",
    choice1: "Madrid",
    choice2: "París",
    answer: 1
    },
    {
    question: "¿Cuál es el nombre completo de Miguel Ángel Asturias?",
    choice1: "Miguel Ángel Asturias Rosales",
    choice2: "Miguel Ángel Asturias García",
    answer: 1
    },
    {
    question: "¿Qué puesto político ocupó Miguel Ángel Asturias en Guatemala?",
    choice1: "Presidente",
    choice2: "Embajador",
    answer: 2
    },
    {
    question: "¿En qué año se publicó la novela 'Viernes de Dolores' de Miguel Ángel Asturias?",
    choice1: "1952",
    choice2: "1962",
    answer: 1
    },
    {
    question: "¿Cuál es el título de la obra de teatro que escribió Miguel Ángel Asturias durante su exilio en Argentina?",
    choice1: "La audiencia",
    choice2: "El espejo de agua",
    answer: 1
    },

   

]

const SCORE_POINTS = 1
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        localStorage.setItem('in', incorrect)

        return window.location.href = 'end.html';
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

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }else{
            incorrects(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

incorrects = num => {
    incorrect +=num

}

startGame()