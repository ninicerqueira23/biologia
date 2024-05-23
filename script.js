// Jogo da Interfase
const pairs = [
    { id: 1, term: "Fase G1", definition: "Período de intenso crescimento celular e atividade metabólica." },
    { id: 2, term: "Fase S", definition: "Durante esta fase, ocorre a replicação do DNA." },
    { id: 3, term: "Fase G2", definition: "Período final de preparação para a divisão celular." }
];

const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);

const gameContainer = document.getElementById('game-container');

let matchedPairs = 0;
let firstCard = null;
let secondCard = null;

shuffledPairs.forEach(pair => {
    const definitionCard = document.createElement('div');
    definitionCard.classList.add('card');
    definitionCard.classList.add('definition-card');
    definitionCard.dataset.id = pair.id;
    definitionCard.innerHTML = `<div class="definition hidden">${pair.definition}</div>`;
    definitionCard.addEventListener('click', handleCardClick);
    gameContainer.appendChild(definitionCard);

    const termCard = document.createElement('div');
    termCard.classList.add('card');
    termCard.dataset.id = pair.id;
    termCard.innerHTML = `<div class="term">${pair.term}</div>`;
    termCard.addEventListener('click', handleCardClick);
    gameContainer.appendChild(termCard);
});

function handleCardClick() {
    if (this.classList.contains('matched')) {
        return;
    }

    if (!firstCard) {
        firstCard = this;
        this.classList.add('selected');
    } else if (!secondCard && this !== firstCard) {
        secondCard = this;
        this.classList.add('selected');
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;
    if (isMatch) {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === 3) {
            alert('Parabéns! Você completou o jogo!');
            restartGame();
        }
    } else {
        gameContainer.classList.add('wrong');
        setTimeout(() => {
            firstCard.classList.remove('selected');
            secondCard.classList.remove('selected');
            firstCard = null;
            secondCard = null;
            gameContainer.classList.remove('wrong');
        }, 1000);
    }
}

function restartGame() {
    matchedPairs = 0;
    gameContainer.innerHTML = '';
    shuffledPairs.forEach(pair => {
        const definitionCard = document.createElement('div');
        definitionCard.classList.add('card');
        definitionCard.classList.add('definition-card');
        definitionCard.dataset.id = pair.id;
        definitionCard.innerHTML = `<div class="definition hidden">${pair.definition}</div>`;
        definitionCard.addEventListener('click', handleCardClick);
        gameContainer.appendChild(definitionCard);

        const termCard = document.createElement('div');
        termCard.classList.add('card');
        termCard.dataset.id = pair.id;
        termCard.innerHTML = `<div class="term">${pair.term}</div>`;
        termCard.addEventListener('click', handleCardClick);
        gameContainer.appendChild(termCard);
    });
}
