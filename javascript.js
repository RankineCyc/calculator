function eraseDisplayText() {
    let displayTextField = document.querySelector("#numberDisplay");
    displayTextField.textContent = 0;
}

function updateDisplayText() {
    let displayTextField = document.querySelector("#numberDisplay");
    let newDisplayText = this.textContent;

    eraseDisplayText();
    displayTextField.textContent = newDisplayText;
}

function performOperation() {
    let desiredOperation = this.textContent;

    if (desiredOperation == "AC"){
        eraseDisplayText();
    }
}

let allNumberButtons = document.querySelectorAll(".numberButton")
allNumberButtons.forEach(element => {
    element.addEventListener("click", updateDisplayText);
});

let allFunctionButtons = document.querySelectorAll(".functionButton");
allFunctionButtons.forEach(element => {
    element.addEventListener("click", performOperation);
});