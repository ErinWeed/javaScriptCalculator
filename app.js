const sequence = [];
acceptingDecimal = true;
clearOnNextInput = false;
acceptingInput = true;
let lastAnswer = 0;
let add = (a,b) => a + b;
let subtract = (a,b) => a - b;
let multiply = (a,b) => a * b;
let divide = (a,b) => {
    if (b == 0) {
        alert("You can't do that!")
        return 0
    } else { 
        return a / b
    }    
};
let operate = (a,b, operationStr) => {
    let answer;
    switch(operationStr) {
        case "add":
            answer = add(a,b);
            break;
        case "subtract":
            answer = subtract(a,b);
            break;
        case "multiply":
            answer = multiply(a,b);
            break;
        case "divide":
            answer = divide(a,b);
            break;
    }
    console.log(`${a} ${operationStr} ${b} = ${answer}`)
    return answer
}
let addToDisplay = (toAdd)=> {
    let display = document.querySelector('#answer');
    if (display.textContent.length < 14) display.append(toAdd.id);
}

let clearDisplay = () => {
    console.log("clearing")
    document.querySelector('#answer').textContent = ""
    clearOnNextInput= false;
    acceptingInput = true;
    acceptingDecimal = true;
}

let equals = (current) =>{
    clearDisplay()
    let previous = sequence.shift()
    let operator = sequence.shift()
    let answer = operate(previous, current, operator)
    console.log(answer)
    document.querySelector('#answer').textContent = answer
    acceptingInput = false
    clearOnNextInput = true;
    lastAnswer = answer
    return answer
}

let setUpOperation = (operation) => {
    let current = parseInt(document.querySelector('#answer').textContent);
    if (operation === "clear") {
        sequence.length = 0
        clearDisplay()
    } else if (operation === "equals" && sequence.length === 2){
        equals(current)
    } else if (sequence.length === 0 && operation !== "equals") {
        current? sequence.push(current): sequence.push(lastAnswer)
    sequence.push(operation)
    clearOnNextInput = true;
    } else if (sequence.length === 2) {
        console.log('equals anyway')
        let answer = equals(current);
        sequence.push(answer)
        sequence.push(operation)
    }
}

let directInput = (pressed)=> {
    console.log(`start: ${sequence}`)
    let classes = [...pressed.classList]
    if (clearOnNextInput) {
        clearDisplay()
    };
    if (classes.includes('digit') && acceptingInput) {
        addToDisplay(pressed)
    } else if (classes.includes('operators')) {
        setUpOperation(pressed.id)
        acceptingInput = true;
        acceptingDecimal = true;
    } else if (classes.includes('decimal') && acceptingDecimal) {
        addToDisplay(pressed)
        acceptingDecimal = false
    }
    console.log(`end: ${sequence}`)
    };

const allButtons = document.querySelectorAll('.numbers')

let printId = (thing)=>
    addToDisplay(thing.id)

for (let button of allButtons) {
    button.addEventListener('click', ()=>directInput(button))
}

