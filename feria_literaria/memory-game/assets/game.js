const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }


const iemeges = [
  {
    img: 'img/1.jpg',
    id: 0
  },
  {
    img: 'img/2.jpg',
    id: 1
  },
  {
    img: 'img/3.webp',
    id: 2
  },
  {
    img: 'img/4.jpg',
    id: 3
  },
  {
    img: 'img/5.jpg',
    id: 4
  },
  {
    img: 'img/6.jpg',
    id: 5
  },
  {
    img: 'img/7.jpg',
    id: 6
  },
  {
    img: 'img/8.webp',
    id: 7
  },
  {
    img: 'img/9.jpg',
    id: 8
  },
  {
    img: 'img/10.jpg',
    id: 9
  }
];

    const picks = pickRandom(iemeges, (dimensions * dimensions) / 2) 
    console.log(picks);
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card" id= ${item.id}>
                    <div class="card-front"></div>
                    <div class="card-back" style=" background-image: url(${item.img}); background-size: cover;"></div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} movimientos`
        selectors.timer.innerText = `tiempo: ${state.totalTime} segundos`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
        console.log(flippedCards);

        if (flippedCards[0].id == flippedCards[1].id) {
            console.log("MATCH");
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
           
        }else{
            console.log(`couldnt match ${flippedCards[0].id } and  ${flippedCards[1].id }`)
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    Ganaste!<br />
                    con <span class="highlight">${state.totalFlips}</span> movimientos<br />
                    en <span class="highlight">${state.totalTime}</span> segundos
                    <br>
                    <br>
                    <center>
                    <a href="../index.html" style="text-decoration: none; font-size: 20px;">Volver al inicio.</a>
                    </center>
    
                </span>
                
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()