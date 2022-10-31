const holes = document.querySelectorAll('.hole');
console.log(holes);
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = true;
let score = 0;
let game;

// fonction pour retourner une valeur aleatoir
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// fonction pour selectionner un trou aleatoir
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) { // pour ne pas avoir de repetitions successives 
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
//stop function
function stop(){
    location.reload()
}
// fonction permettant de faire apparaitre la cible
function peep() {
    const time = 700;
    const hole = randomHole(holes);
    hole.classList.add('up'); // permet d'ajouter une class CSS "up" a l'element hole
    game = setTimeout(() => {
        hole.classList.remove('up'); // faire retourner la cible
        if (!timeUp) peep(); // faire apparaitre plusieurs fois la cible si le time ne pas fini
    }, time);
}

// fonction de lancement du jeux
function startGame() {
    if(game){
        stop()
    }
        timeUp = false;
        scoreBoard.textContent = 0;
        score = 0;
        peep();
        setTimeout(() => timeUp = true, 10000)
}

// fonction pour incrementer le sccore
function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
