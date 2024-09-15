function eraseDisplayText() {
    let displayTextField = document.querySelector("#numberDisplay");
    displayTextField.textContent = 0;
}

function emptyQueue() {
    calculatorQueue = ["0"];
}

function updateDisplayText(newDisplayText) {
    let displayTextField = document.querySelector("#numberDisplay");

    eraseDisplayText();
    displayTextField.textContent = newDisplayText;
}

function performFunction() {
    let desiredOperation = this.textContent;

    if (desiredOperation == "AC"){
        eraseDisplayText();
        emptyQueue();
    } else if (desiredOperation == "+/-") {
        console.log("Changing Sign");
    } else if (desiredOperation == "%") {
        console.log("Making Percentage");
    } else if (desiredOperation == ".") {
        console.log("Making Float");
    } else {
        console.log("Executing Operation");
        operate(desiredOperation);
    }
}

function operate(operator) {
    console.log(calculatorQueue.length)
    if (calculatorQueue.length >= 3) {
        // Update [0] with the result of the operation, then clear, then add operand.
        clearOld();
    }

    calculatorQueue = [operator].concat(calculatorQueue);
    console.log(calculatorQueue);
}

function modifyQueueNumber(num) {
    if (calculatorQueue.length == 1) {
        calculatorQueue[calculatorQueue.length-1] = calculatorQueue[calculatorQueue.length-1] + num;
        calculatorQueue[calculatorQueue.length-1] = stripLeading0s(calculatorQueue[calculatorQueue.length-1]);
        updateDisplayText(calculatorQueue[calculatorQueue.length-1]);
    } else {
        if (calculatorQueue.length != 3) {
            calculatorQueue = ["0"].concat(calculatorQueue);
        }
        calculatorQueue[0] = calculatorQueue[0] + num;
        calculatorQueue[0] = stripLeading0s(calculatorQueue[0]);
        updateDisplayText(calculatorQueue[0]);
    }


    console.log(calculatorQueue);
}

function stripLeading0s(num) {
    num = num.split("");
    if (num.findIndex(i => i == "0") == 0 && num.length > 1){
        num = num.slice(1, num.length);
        num = num.join("")
    } else {
        num = num.join("");
    }
    return num;
}

function clearOld() {
    calculatorQueue = calculatorQueue[0];
}

let allNumberButtons = document.querySelectorAll(".numberButton")
allNumberButtons.forEach(element => {
    element.addEventListener("click", () => {
        let chosenNumber = element.textContent;

        updateDisplayText(chosenNumber);
        modifyQueueNumber(chosenNumber);
    });
});

let allFunctionButtons = document.querySelectorAll(".functionButton");
allFunctionButtons.forEach(element => {
    element.addEventListener("click", performFunction);
});


let calculatorQueue = ["0"];