var indexer = [0, 3, 6, 9, 12, 15, 18, 1, 4, 7, 10, 13, 16, 19, 2, 5, 8, 11, 14, 17, 20]; /*ordem para embaralhar as cartas*/
var chosen_cards = []; /*cartas escolhidas*/
var after_shuffle = []; /*cartas embaralhadas*/
var click_count = 0; /*contador*/
var guess; /*resultado*/
var table; /*tabela das pilhas*/
var guessTable; /*carta escolhida*/
var image_array = []; /*array de imagens */

/*Processar as imagens das cartas*/
function render() {
    for (var i = 0; i < 21; i++) {
        var card = document.createElement("img"); /*cria o elemento img*/
        card.setAttribute("id", "i" + i); /*altera o nome do id das imagens*/
        card.setAttribute("src", image_array[i]); /*imagem dentro do array*/
        chosen_cards[chosen_cards.length] = card; /*escolher as imagens*/
    }
    deal(chosen_cards);
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
    chosen_cards = after_shuffle; /*atribui o novo array*/
    after_shuffle = [];/*array vazio*/

    deal(chosen_cards);
    click_count++;

 /*seleciona a decima primeira (carta central) carta apos a terceira rodada*/
    if (click_count == 3) {
        var card = chosen_cards[10]
        showGuess(card);
    }
}

/*responsavel por organizar as escolhas das pilhas */
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

/*retorna as cartas para a tela durante as rodadas*/
function indexToIndex(sourceIndex, targetIndex, count) {
    while (count > 0) {
        after_shuffle[targetIndex++] = chosen_cards[indexer[sourceIndex++]];
        count--;
    }
}

/*apresenta as pilhas*/
function init() {
    image_array = card_array;
    guess = document.getElementById("guess");
    guessTable = document.getElementById("guessTable");
    table = document.getElementById("table");
    table.style.display = "block";
    guessTable.style.display = "none";
    click_count = 0;
        render();
}

/*mostra a catrta*/
function showGuess(card) {
    table.style.display = "none";
    guessTable.style.display = "block";
    guess.innerHTML = "";
    guess.appendChild(card);
}


/*consumir API*/
function beforeInit() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=21', true);
  request.onload = function () {
    var data = JSON.parse(this.response);
    card_array = Object.keys(data.cards).map(res => data.cards[res].image);
    capture(card_array);
  }
  request.send();
}

/*copia os elementos da API para um novo array*/
function capture(card_array) {
  image_array = card_array;
  init();
}
