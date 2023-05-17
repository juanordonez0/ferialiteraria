const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const incorrect = localStorage.getItem('in')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []



finalScore.innerHTML = `Tu punteo fue de ${mostRecentScore} correctas y ${incorrect} incorrectas`;

