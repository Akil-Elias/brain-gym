const display = document.querySelector('#display');
const optionBts = document.querySelector('#optionBts');
const operations = ["+", "-", "*"];
const options = [];
let problem;
let solution;

const newProblem = () => {
    let numOne = Math.floor(Math.random() * 10) + 1;
    let numTwo = Math.floor(Math.random() * 10) + 1;
    let op = operations[Math.floor(Math.random() * 3)];
    problem = `${numOne} ${op} ${numTwo}`;
    return problem;
} 

const solutionGenerator = () => {
    solution = eval(problem);
    console.log(`Solution is ${solution}`)//print solution
    return solution;
}

const optionsGenerator = () => {
    options[0] = solution; 
    let randomNumOne = Math.floor(Math.random() * 100);
    let randomNumTwo = Math.floor(Math.random() * 100);
    options.push(randomNumOne, randomNumTwo);

    options.sort(() => Math.random() - 0.5);

    for(let opt of options){
        let btn = document.createElement('button');
        btn.innerText = opt;
        optionBts.appendChild(btn);
        
    }

}

display.value = newProblem();
solutionGenerator();
optionsGenerator();


