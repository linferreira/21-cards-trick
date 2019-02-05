var indexer = [0, 3, 6, 9, 12, 15, 18, 1, 4, 7, 10, 13, 16, 19, 2, 5, 8, 11, 14, 17, 20]; /*ordem para embaralhar as cartas*/
var chosenCards = []; /*cartas escolhidas*/
var afterShuffle = []; /*cartas embaralhadas*/
var clickCount = 0; /*contador*/
var guess; /*resultado*/
var table; /*tabela das pilhas*/
var guessTable; /*carta escolhida*/
var imageArray = []; /*matriz de imagens */

/*Processar as imagens das cartas*/
function render() {
    for (var i = 0; i < 21; i++) {
        var card = document.createElement("img");
        card.setAttribute("id", "i" + i);
        card.setAttribute("src", imageArray[i]);
        chosenCards[chosenCards.length] = card;
    }
    deal(chosenCards);
}

/*Embaralhar as cartas*/
function shuffle(index) {
    switch (index) {
        case 1:
            indexToIndex(0, 7, 7);
            indexToIndex(7, 0, 7);
            indexToIndex(14, 14, 7);
            break;
        case 2:
            indexToIndex(7, 7, 7);
            indexToIndex(0, 14, 7);
            indexToIndex(14, 0, 7);
            break;
        case 3:
            indexToIndex(14, 7, 7);
            indexToIndex(0, 14, 7);
            indexToIndex(7, 0, 7);
            break;
    }
    chosenCards = afterShuffle;
    afterShuffle = [];

    deal(chosenCards);
    clickCount++;

    if (clickCount == 3) {
        var card = chosenCards[10]
        showGuess(card);
    }
}

/*"Macete" para empilhar as cartas deixando o pilha escolhida no centro */
function deal(cards) {
    count = 0;
    var container;
    for (var i = 0; i < cards.length; i += 7) {
        container = document.getElementById("row" + ((count++) + 1).toString());
        container.innerHTML = "";
        for (var j = i; j < (i + 7); j++)
            container.appendChild(cards[[indexer[j]]]);
    }
}

function indexToIndex(sourceIndex, targetIndex, count) {
    while (count > 0) {
        afterShuffle[targetIndex++] = chosenCards[indexer[sourceIndex++]];
        count--;
    }
}

/*apresenta as pilhas*/
function init() {
    imageArray = cardArray;
    guess = document.getElementById("guess");
    guessTable = document.getElementById("guessTable");
    table = document.getElementById("table");
    table.style.display = "block";
    guessTable.style.display = "none";
    clickCount = 0;
        render();
}

/*mostra a carta escolhida*/
function showGuess(card) {
    table.style.display = "none";
    guessTable.style.display = "block";
    guess.innerHTML = "";
    guess.appendChild(card);
}

/*Pega as cartas a partir da API*/
function beforeInit() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=21', true);
  request.onload = function () {
    var data = JSON.parse(this.response);
    cardArray = Object.keys(data.cards).map(res => data.cards[res].image);
    capture(cardArray);
  }
  request.send();
}

/*Coloca as cartas da API numa matriz global */
function capture(cardArray) {
  imageArray = cardArray;
  init();
}
