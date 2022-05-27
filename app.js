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
}

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
    return answer
}

let addToDisplay = (toAdd)=> {
    let display = document.querySelector('#answer').textContent;
    let num = display + toAdd;
    if (num.length > 13) {
        num = parseFloat(num).toPrecision(13)
    }
    document.querySelector('#answer').textContent = num;
}

let clearDisplay = () => {
    document.querySelector('#answer').textContent = ""
    clearOnNextInput= false;
    acceptingInput = true;
    acceptingDecimal = true;
}

let equals = (current) =>{
    document.activeElement.blur();
    clearDisplay()
    let previous = sequence.shift()
    let operator = sequence.shift()
    let answer = operate(previous, current, operator)
    clearDisplay()
    addToDisplay(answer)
    acceptingInput = false;
    clearOnNextInput = true;
    lastAnswer = answer;
    return answer
}

let setUpOperation = (operation) => {
    console.log(operation)
    let current = parseFloat(document.querySelector('#answer').textContent);
    console.log(current)
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
        let answer = equals(current);
        sequence.push(answer)
        sequence.push(operation)
    }
}

const determineKeyPressed = (e)=> {
    console.log(e)
    let pressed;
    let digits = {1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,'.':'decimal', '+':'add', '-':'subtract', '*':'multiply','/':'divide'}
    
    if (e.key == 0) {
        console.log('yes')
        pressed = 0
    } else if (e.code == "NumpadEnter") {
        pressed = "enter"
    } else if (options[e.key]) {
        pressed = options[e.key]
    } else {
        console.log(`key: ${e.key} not found`)
        return null
    }
    console.log(`key: ${pressed}`)
    directInput(pressed);
}

const directInput = (key)=> {
    console.log(`key: ${key}`)
    if (clearOnNextInput) {
        clearDisplay()
    };
    if (key >= 0 && key <= 9 && acceptingInput) {
        console.log('still yes')
        addToDisplay(key)
    } else if (key == "decimal" && acceptingDecimal){
        addToDisplay(".")
        acceptingDecimal = false
    } else {
        console.log(`operation: ${key}`)
        setUpOperation(key)
        acceptingInput = true;
        acceptingDecimal = true;
    }
}
const allButtons = document.querySelectorAll('.numbers')

let printId = (thing)=>
    addToDisplay(thing.id)

for (let button of allButtons) {
    button.addEventListener('click', ()=>directInput(button.id))
}

window.addEventListener('keydown', determineKeyPressed)