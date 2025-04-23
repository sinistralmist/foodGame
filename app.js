// Easter Egg
const foodItems = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'fries-rotated', img: 'images/fries.png', transform: 'rotate(90deg)' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'cheeseburger-rotated', img: 'images/cheeseburger.png', transform: 'rotate(90deg)' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'hotdog-rotated', img: 'images/hotdog.png', transform: 'rotate(90deg)' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'ice-cream-rotated', img: 'images/ice-cream.png', transform: 'rotate(90deg)' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'milkshake-rotated', img: 'images/milkshake.png', transform: 'rotate(90deg)' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'pizza-rotated', img: 'images/pizza.png', transform: 'rotate(90deg)' }
]

let cardArray = []
let currentDifficulty = 'easy'

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const easyBtn = document.querySelector('#easy')
const hardBtn = document.querySelector('#hard')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
let isProcessing = false

function initGame() {
    gridDisplay.innerHTML = ''
    
    if (currentDifficulty === 'easy') {
        cardArray = [...foodItems.slice(0, 6), ...foodItems.slice(0, 6)]
        gridDisplay.className = 'grid'
    } else {
        // For hard mode, use all food items (12) - 6 original + 6 rotated
        cardArray = [...foodItems.slice(0, 8), ...foodItems.slice(0, 8)] // 8 pairs (16 cards)
        gridDisplay.className = 'grid grid-hard'
    }
    
    cardArray.sort(() => 0.5 - Math.random())
    createBoard()
}

function createBoard() {
    gridDisplay.className = currentDifficulty === 'easy' ? 'grid' : 'grid grid-hard'
    
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('div')
        card.className = 'card'
        card.setAttribute('data-id', i)
        
        const cardBack = document.createElement('div')
        cardBack.className = 'card-face card-back'
        
        const cardFront = document.createElement('div')
        cardFront.className = 'card-face card-front'
        const img = document.createElement('img')
        img.src = cardArray[i].img
        img.alt = cardArray[i].name
        if (cardArray[i].transform) {
            img.style.transform = cardArray[i].transform
        }
        cardFront.appendChild(img)
        
        card.appendChild(cardBack)
        card.appendChild(cardFront)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}

easyBtn.addEventListener('click', () => {
    currentDifficulty = 'easy'
    easyBtn.classList.add('active')
    hardBtn.classList.remove('active')
    initGame()
})

hardBtn.addEventListener('click', () => {
    currentDifficulty = 'hard'
    hardBtn.classList.add('active')
    easyBtn.classList.remove('active')
    initGame()
})

initGame()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    
    if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cardsChosen = []
        cardsChosenIds = []
        isProcessing = false
        return
    }

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].classList.add('matched')
        cards[optionTwoId].classList.add('matched')
        cardsWon.push(cardsChosen)
    } else {
        setTimeout(() => {
            const cardElements = document.querySelectorAll('.card')
            cardElements[optionOneId].classList.remove('flipped')
            cardElements[optionTwoId].classList.remove('flipped')
        }, 500)
    }
    resultDisplay.innerHTML = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []
    isProcessing = false

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.innerHTML = 'Congratz you won!'
    }
}

function flipCard() {
    if (isProcessing || this.classList.contains('matched')) return
    
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.classList.add('flipped')
    if (cardsChosen.length === 2) {
        isProcessing = true
        setTimeout(checkMatch, 500)
    }
}












