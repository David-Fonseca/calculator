let displayVal=[];
let firstVal='N';
let secondVal='N';
let operator='';
function add(a,b){
    return a+b;
}
function exponent(a,b){
    return a**b;
}
function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(op, a, b){
    
    if (op === '+'){
        return add(a,b);
    }
    else if(op==='-'){
        return subtract(a,b);
    }
    else if(op==='X'){
        return multiply(a,b);
    }
    else if(op==='/'){
        return divide(a,b);
    }
}

function populate(dv){
    dv=dv.join('')
    const screen = document.querySelector('#screen');
    screen.textContent=dv;
}
function updateDisplayVal(e){
    let val = e.target.textContent;
    if (val === '.'){
        if(displayVal.includes(val)){
            return;
        }
    }

    displayVal.push(val);
    populate(displayVal);
}
function saveValues(e){
    
    if (firstVal==='N'){
        firstVal=parseFloat(displayVal.join(''));
        clearDisplay();
    }
    else if(secondVal==='N'){
        secondVal=parseFloat(displayVal.join(''));
        clearDisplay();
    }
    if(firstVal !== 'N' && secondVal !=='N' && operator !== ''){
        evaluate();
    }
    operator = e.target.textContent;

}
function clearDisplay(){
    displayVal = [];
    populate(displayVal);
}
function evaluate(){
    if (operator===''){
        return;
    }
    if (firstVal !== 'N' && secondVal ==='N'){
        secondVal = parseFloat(displayVal.join(''));
    }
    if (firstVal !== 'N' && secondVal !=='N'){
        result=0;
        switch(operator){
            case 'X':
                result = multiply(firstVal,secondVal);
                break;
            case '/':
                result =divide(firstVal,secondVal);
                break;
            case '+':
                result = add(firstVal,secondVal);
                break;
            case '-':
                result = subtract(firstVal,secondVal);
                break;
            case 'a^(b)':
                result = exponent(firstVal,secondVal);
                console.log('here')
                break;
            
        }
        if (isNaN(result)){
            result = 'Undefined';
            populate(result.toString().split(''));
            firstVal = 'N';
            secondVal = 'N';
            operator='';
            return;
        }
        if (isFinite(result)!==true){
            result = 'Infinity';
            populate(result.toString().split(''));
            firstVal = 'N';
            secondVal = 'N';
            operator='';
            return;
        }
        firstVal=Math.round(result*100)/100;
        secondVal='N';
        operator='';
        populate(firstVal.toString().split(''));

    }
}
function clear(){
    clearDisplay();
    firstVal = 'N';
    secondVal = 'N';
    operator='';
}
function deleteLastInt(){
    displayVal.pop();
    populate(displayVal);
}
const buttons = document.querySelectorAll('button');

buttons.forEach((button)=>{
    
    if (button.classList.contains('n')){
        button.addEventListener('click', updateDisplayVal);
    }
    if (button.classList.contains('op')){
        button.addEventListener('click',saveValues);

    }
    if (button.classList.contains('equals')){
        button.addEventListener('click', evaluate);
    }
    if (button.classList.contains('clear')){
        button.addEventListener('click', clear);
    }
    if (button.classList.contains('del')){
        button.addEventListener('click', deleteLastInt);
    }
})