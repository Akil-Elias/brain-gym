const display = document.querySelector('#display');
const optionBts = document.querySelector('#optionBts');
const message = document.querySelector('#messageBoard');
const scoreBoard = document.querySelector('#score');
const start = document.querySelector('#start');
const operations = ["+", "-", "*"];
const options = [];
let problem;
let solution;
let score = 0;
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
            }
        }, 1000);
    }
}

const startGame = () => {
    start.addEventListener("click", () => {
        display.value = newProblem();
        solutionGenerator();
        optionsGenerator();
        startTimer();
        start.disabled = true;
    }, {once: true});
}

startGame();
