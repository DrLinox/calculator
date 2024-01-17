class Calculator {
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clearAll();
    }
    clearAll(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined 
    }
    chooseOperator(operation){
        if(this.currentOperand ==="") return
        if(this.previousOperand !==""){
            this.compute();
        }
        this.operation = operation
        this.previousOperand = `${this.currentOperand} ${this.operation}`
        this.currentOperand =''
    }
    appendNumber(number){
        if( number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    delete(){
        if(this.previousOperand='')return
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+': computation = prev + current;
            break
            case 'x': computation = prev * current;
            break
            case '-': computation = prev - current;
            break
            case '/': computation = prev / current;
            break
            case '*': computation = prev * current;
            break
            default: return
        }
        this.currentOperand = computation;
        this.previousOperand =''
        this.operation = undefined;
    }
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        this.previousOperandText.innerText = 
        this.previousOperand
    }
}


const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButtons = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText,currentOperandText);

window.addEventListener('keydown',(e)=>{
    numberButtons.forEach(button=>{
        if(e.key === `${button.innerText}`){
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        }
    operationButtons.forEach( () =>{
        if(e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*' ){
            calculator.chooseOperator(e.key)
            calculator.updateDisplay()
        }
    })
    })
    
    if(e.key === 'Delete'){
    calculator.delete()
    calculator.updateDisplay()
    }
    if(e.key === 'Backspace'){
    calculator.clearAll()
    calculator.updateDisplay()
    }
    if(e.key === 'Enter'){
    calculator.compute()
    calculator.updateDisplay()
    }
})
numberButtons.forEach( button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach( operation => {
    operation.addEventListener('click',()=>{
        calculator.chooseOperator(operation.innerText)
        calculator.updateDisplay()
    })
})
equalsButtons.addEventListener('click',()=>{
        calculator.compute()
        calculator.updateDisplay()
})
allClearButton.addEventListener('click', ()=>{
    calculator.clearAll()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})
