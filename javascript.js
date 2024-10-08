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

    const lastShownChar = 7
    if (newDisplayText.length > lastShownChar) {
        newDisplayText = String(Math.round(newDisplayText*100000) / 100000);
        newDisplayText = newDisplayText.slice(0, lastShownChar);
    }
    displayTextField.textContent = newDisplayText;
    updateEqPreview();
}

function performFunction() {
    let desiredOperation = this.textContent;

    if (desiredOperation == "AC"){
        eraseDisplayText();
        emptyQueue();
        clearOperatorButton();
    } else if (desiredOperation == "+/-") {
        modifySign();
    } else if (desiredOperation == "%") {
        makePercent();
    } else if (desiredOperation == ".") {
        makeFloat();
    } else {
        if (calculatorQueue.length >= 3) {
            operate(calculatorQueue[1]);
        } 

        if (this.textContent != "=") {
            modifyQueueOperator(this.textContent);
        }
    }
}

function operate(operator) {

    calculatorQueue[calculatorQueue.length - 1] = Number(calculatorQueue[calculatorQueue.length - 1]);
    calculatorQueue[0] = Number(calculatorQueue[0]);

    if (operator == "+") {
        calculatorQueue[0] = calculatorQueue[calculatorQueue.length-1] + calculatorQueue[0];
    } else if (operator == "-") {
        calculatorQueue[0] = calculatorQueue[calculatorQueue.length-1] - calculatorQueue[0];
    } else if (operator == "*") {
        calculatorQueue[0] = calculatorQueue[calculatorQueue.length-1] * calculatorQueue[0];
    } else if (operator == "/") {
        calculatorQueue[0] = calculatorQueue[calculatorQueue.length-1] / calculatorQueue[0];
    }
    clearOld();

    calculatorQueue[0] = String(calculatorQueue[0]);
    updateDisplayText(calculatorQueue[0]);
    clearOperatorButton();
}

function modifyQueueOperator(operator) {

    if (calculatorQueue.length == 2) {
        calculatorQueue[0] = operator;
        clearOperatorButton();
    } else {
        calculatorQueue = [operator].concat(calculatorQueue);
    }
    updateEqPreview();
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

}

function modifySign() {
    if (calculatorQueue.length == 1) {
        calculatorQueue[0] = String(-1 * Number(calculatorQueue[0]));
        updateDisplayText(calculatorQueue[0]);
    } else if (calculatorQueue.length == 2) {
        calculatorQueue[1] = String(-1 * Number(calculatorQueue[1]));
        updateDisplayText(calculatorQueue[1]);
    } else {
        calculatorQueue[0] = String(-1 * Number(calculatorQueue[0]));
        updateDisplayText(calculatorQueue[0]);
    }
}

function makeFloat() {
    if (calculatorQueue.length == 1 && !calculatorQueue[0].includes(".")) {
        calculatorQueue[0] = calculatorQueue[0].concat(".");
        updateDisplayText(calculatorQueue[0]);
    } else if (calculatorQueue.length == 2) {
        calculatorQueue = ["0"].concat(calculatorQueue);
        calculatorQueue[0] = calculatorQueue[0].concat(".");
        updateDisplayText(calculatorQueue[0]);
    } else {
        if (!calculatorQueue[0].includes(".")) {
            calculatorQueue[0] = calculatorQueue[0].concat(".");
            updateDisplayText(calculatorQueue[0]);
        }
    }
}

function makePercent() {
    if (calculatorQueue.length == 1) {
        calculatorQueue[0] = calculatorQueue[0]/100;
        updateDisplayText(calculatorQueue[0]);
    } else if (calculatorQueue.length == 2) {
        calculatorQueue[2] = calculatorQueue[2]/100
        updateDisplayText(calculatorQueue[2]);
    } else {
        calculatorQueue[0] = calculatorQueue[0]/100;
        updateDisplayText(calculatorQueue[0]);
    }
}

function stripLeading0s(num) {
    num = num.split("");
    if (num.findIndex(i => i == "0") == 0 && num.length > 1 && !num.includes(".")){
        num = num.slice(1, num.length);
        num = num.join("")
    } else {
        num = num.join("");
    }
    return num;
}

function clearOld() {
    calculatorQueue = [calculatorQueue[0]];
}

function clearOperatorButton() {
    allOperatorButtons.forEach(element => {
        element.classList.remove("depressedOperator");
    })
}

function depressOperatorButton() {
    this.classList.add("depressedOperator");
}

function updateEqPreview() {
    let equationPreview = document.querySelector("#equationPreview");
    equationPreview.textContent = calculatorQueue.slice().reverse().join(" ");
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

let allOperatorButtons = document.querySelectorAll(".operatorButton");
allOperatorButtons.forEach(element => {
    element.addEventListener("click", depressOperatorButton);
});

let calculatorQueue = ["0"];