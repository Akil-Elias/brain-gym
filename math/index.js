const display = document.querySelector('#display');
const optionBts = document.querySelector('#optionBts');
const message = document.querySelector('#messageBoard');
const scoreBoard = document.querySelector('#score');
const highscoreDisplay = document.querySelector('#highscore');
const start = document.querySelector('#start');
const operations = ["+", "-", "*"];
const options = [];
let problem;
let solution;
let score = 0;
let highscore = 0;
let totalSeconds = 60;
let remainingSeconds = totalSeconds;
let intervalId = null;

const newProblem = () => {
    let numOne = Math.floor(Math.random() * 10) + 1;
    let numTwo = Math.floor(Math.random() * 10) + 1;
    let op = operations[Math.floor(Math.random() * 3)];
    problem = `${numOne} ${op} ${numTwo}`;
    console.log(`Operator chosen: ${op}`);
    return problem;
} 

const solutionGenerator = () => {
    solution = eval(problem);
    return solution;
}

const removeOptions = () => {
   let previousOptions = optionBts.querySelectorAll('button');
   previousOptions.forEach(btn => btn.remove());
}

const optionsGenerator = () => {
    options.length = 0; // Clear old options

    options[0] = solution; 
    let randomNumOne = Math.floor(Math.random() * 100);
    let randomNumTwo = Math.floor(Math.random() * 100);
    options.push(randomNumOne, randomNumTwo);

    options.sort(() => Math.random() - 0.5);

    for(let opt of options){
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add("btn-glass");
        btn.addEventListener("click", ()=>{
            if(opt === solution){
                score++;
                scoreBoard.innerText = score;
                message.innerText = "Correct!";
                display.value = newProblem();
                removeOptions();
                solutionGenerator();
                optionsGenerator();
            }else{
                message.innerText = "False";
                display.value = newProblem();
                removeOptions();
                solutionGenerator();
                optionsGenerator();
            }
        })
        
        optionBts.appendChild(btn);
    }
}

const formatTime = (seconds) => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const updateDisplay = () => {
    document.getElementById('timer').innerText = formatTime(remainingSeconds);
}

const startTimer = () => {
    if (intervalId === null && remainingSeconds > 0) {
        intervalId = setInterval(() => {
            remainingSeconds--;
            updateDisplay();
            if (remainingSeconds === 0) {
            clearInterval(intervalId);
            intervalId = null;
            endGame();
            }
        }, 1000);
    }
}

const resetGame = () => {
    score = 0;
    remainingSeconds = 60;
    scoreBoard.innerText = score;
    message.innerText = "Score as much points as possible before the time runs out";
    updateDisplay();
};

const startGame = () => {
    start.addEventListener("click", () => {
        resetGame();
        removeOptions();
        display.value = newProblem();
        solutionGenerator();
        optionsGenerator();
        startTimer();
        start.disabled = true;
    }, {once: true});
}

const disableOptions = () => {
    const buttons = optionBts.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
};

const endGame = () => {
    disableOptions();
    start.disabled = false;
    startGame();

    if(score > highscore){
        highscore = score;
        highscoreDisplay.innerText = highscore;
        message.innerText = `Your New High Score is ${highscore}!`;
        
    }else{
        message.innerText = `Your score is ${score}`;
    }
    
}

startGame();

