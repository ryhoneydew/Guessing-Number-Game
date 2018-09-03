const generateWinningNumber = () => {
    return Math.ceil(Math.random() * 100);
}
const shuffle = (arr) => {
    let len = arr.length;
    let curr;
    while (len) {
        let idx = Math.floor(Math.random() * len--);
        curr = arr[len];
        arr[len] = arr[idx];
        arr[idx] = curr;
    }
    return arr;
}

class Game {
    constructor() {
        this.playersGuess;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        return (Math.sign(this.playersGuess - this.winningNumber) === -1) ? true : false;
    }
    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!'
        } else if (this.pastGuesses.includes(this.pastGuesses)) {
            return 'You have already guessed that number.';
        } else if (this.pastGuesses.length === 4) {
            return 'You Lose';
        } else {
            this.pastGuesses.push(this.playersGuess);
            if (this.difference() < 10) {
                return `You're burning up!`
            } else if (this.difference() < 25) {
                return `You're lukewarm.`
            } else if (this.difference() < 50) {
                return `You're a bit chilly.`
            } else if (this.difference() < 100) {
                return `You're ice cold!`
            }
        }
    }
    playersGuessSubmission(num) {
        if (num >= 1 && num <= 100) {
            this.playersGuess = num;
            return this.checkGuess();
        } else {
            throw Error('That is an invalid guess.');
        }
    }
    newGame() {
        return new Game();
    }
    provideHint() {
        let hints = [];
        hints.push(this.winningNumber);
        let n = 2;
        while (n) {
            let hint = generateWinningNumber();
            if (hints.includes(hint)) {
                hints.push(generateWinningNumber());
                n--;
            }
        }
        return shuffle(hints);
    }
}
let oneGame = new Game();

const subTitle = document.querySelector('h2');
const submitBtn = document.getElementById('submit');
const input = document.querySelector('input');
const hintBtn = document.getElementById('Hint')

function getInputAndUpdate(input) {
    const num = Number(input.value);
    input.value = "";
    let returnStr = oneGame.playersGuessSubmission(num);
    subTitle.innerHTML = returnStr;
    if (returnStr !== "You Win!" && returnStr !== "That is an invalid guess." && returnStr !== 'You have already guessed that number.') {
        for (let i = 0; i < oneGame.pastGuesses.length; i++) {
            document.getElementById(`guessed${i+1}`).innerHTML = oneGame.pastGuesses[i]
        }
    }



}
submitBtn.addEventListener('click', function () {
    getInputAndUpdate(input);
});
hintBtn.addEventListener('click', function () {
    let hints = oneGame.provideHint();
    document.getElementById('hint1').innerHTML = hints[0];
    document.getElementById('hint2').innerHTML = hints[1];
    document.getElementById('hint3').innerHTML = hints[2];
})