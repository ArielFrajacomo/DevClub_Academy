addEventListener('DOMContentLoaded', () => {
    // disable quick find (key '/') to prevent conflicts with calculator key bindings
    document.addEventListener('keydown', (event) => {
        if (event.key === '/') {
            event.preventDefault();
        }
    });

    // On key press, trigger the corresponding button click
    document.addEventListener('keydown', (event) => {
        const ANIMATION_DURATION = 400; // duration of the click animation in milliseconds
        const key = event.key;
        const button = document.querySelector(`button[onclick="appendToDisplay('${key}')"]`);
        if (button) {
            button.click();
            
            // click animation
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), ANIMATION_DURATION);


        } else if (key === 'Enter') {
            const button = document.querySelector(`button[onclick="calculateResult()"]`);
            button.click();

            // click animation
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), ANIMATION_DURATION);


        } else if (key === 'Backspace') { 
            const display = document.getElementById('display'); 
            display.value = display.value.slice(0, -1); // Remove last character

            // click animation
            const clearButton = document.querySelector(`button[onclick="clearLastEntry()"]`);
            clearButton.classList.add('clicked');
            setTimeout(() => clearButton.classList.remove('clicked'), ANIMATION_DURATION);


        } else if (key === 'Escape' || key === 'Delete') {
            clearDisplay();

            // click animation
            const clearButton = document.querySelector(`button[onclick="clearDisplay()"]`);
            clearButton.classList.add('clicked');
            setTimeout(() => clearButton.classList.remove('clicked'), ANIMATION_DURATION);
        }

        // copy and paste functionality
        else if ((event.ctrlKey || event.metaKey) && key === 'c') {
            const display = document.getElementById('display');
            navigator.clipboard.writeText(display.value);
        } else if ((event.ctrlKey || event.metaKey) && key === 'v') {
            navigator.clipboard.readText().then(text => {
                const display = document.getElementById('display');
                display.value += text;
            });
        }
    });
});

appendToDisplay = (value) => {
    const display = document.getElementById('display');
    display.value += value;
}

clearDisplay = () => {
    const display = document.getElementById('display');
    display.value = '';

    const formerFormula = document.getElementById('former-formula');
    formerFormula.value = '';
}
clearLastEntry = () => {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1); // Remove last character
}

calculateResult = () => {
    const formerFormula = document.getElementById('former-formula');
    formerFormula.value = '';

    const display = document.getElementById('display');
    try {
        formerFormula.value = display.value;
        // display.value = eval(display.value); // eval is unsafe and, to be fair, not very fun to use.
        display.value = manualCalculation(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

manualCalculation = (inputString) => {

    // treating the input, 2(2+3) => 2*(2+3)
    inputString = inputString.replace(/(\d)\s*\(/g, '$1*('); // Add * between number and (
    inputString = inputString.replace(/\)\s*(\d)/g, ')*$1'); // Add * between ) and number
    //treating consecutive parentheses, e.g. (2+3)(4+5) => (2+3)*(4+5)
    inputString = inputString.replace(/\)\s*\(/g, ')*('); // Add * between ) and (
    //treating //, e.g. 4//2 => 4/2, 42/ or 4**2 => 4^2
    inputString = inputString.replace(/\/{2,}/g, '/'); // Replace multiple / with single /
    inputString = inputString.replace(/\*{2,}/g, '^'); // Replace multiple * with ^
    // replace ending with / for /1, e.g. 42/ => 42/1, 4* => 4*1, 2^ => 2^1
    inputString = inputString.replace(/\/\s*$/g, '/1');
    inputString = inputString.replace(/\*\s*$/g, '*1');
    inputString = inputString.replace(/\^\s*$/g, '^1');
    // replace ending with + or - for +0 or -0, e.g. 42+ => 42+0, 4- => 4-0
    inputString = inputString.replace(/\+\s*$/g, '+0');
    inputString = inputString.replace(/-\s*$/g, '-0');
    // remove '*/', '/*', '+-', '-+' with ''
    inputString = inputString.replace(/(\*\/|\/\*|\+\-|-\+)/g, '');
    // remove any sequence of more than 3 operators (+-*/^%), keeping the 1st one
    inputString = inputString.replace(/([+\-*/^%]){2,}/g, '$1');
    //remove any other combinations of operators, keeping the 1st one, e.g. 4+*2 => 4*2, 4*/2 => 4/2, 4+^2 => 4^2, 4+%2 => 4%2
    inputString = inputString.replace(/(\d+)([+\-*/^%])([+\-*/^%])(\d+)/g, '$1$3$4');

    // closing any forgotten parentheses, e.g. (2+3 => (2+3))
    const openParenthesesCount = (inputString.match(/\(/g) || []).length;
    const closeParenthesesCount = (inputString.match(/\)/g) || []).length;
    if (openParenthesesCount > closeParenthesesCount) {
        inputString += ')'.repeat(openParenthesesCount - closeParenthesesCount);
    } else if (closeParenthesesCount > openParenthesesCount) {
        inputString = '('.repeat(closeParenthesesCount - openParenthesesCount) + inputString;
    } 

    // timeout to show the treated input string before calculation, 
    // to show the old formula being replaced by the treated one, e.g. 2(2+3 => 2*(2+3)
    const temp = inputString;
    setTimeout(() => {
            const display = document.getElementById('former-formula');
            display.value = temp; 
    }, 500); 


    /*  order of operations: 
            - parentheses
            - percentage
            - power
            - multiplication/division
            - addition/subtraction
    */
    inputString = calcBracket(inputString);
    inputString = calcPercentage(inputString);
    inputString = calcPower(inputString);
    inputString = calcMultiplicationAndDivision(inputString);
    inputString = calcAdditionAndSubtraction(inputString);

    // if more than 16 characters, send to exponential notation
    (inputString.length > 16) && (inputString = parseFloat(inputString).toExponential(4));
    
    return inputString;
}

calcBracket = (inputString) => {
    // regex group capture for anything between parentheses)
    const parenthesesRegex = /\(([^()]+)\)/g;

    // while there are parentheses in the input string
    while (parenthesesRegex.test(inputString)) {
        // replace the innermost parentheses with the evaluated result
        inputString = inputString.replace(parenthesesRegex, (match, group) => {
            group = calcPercentage(group);
            group = calcPower(group);
            group = calcMultiplicationAndDivision(group);
            group = calcAdditionAndSubtraction(group);

            return group;
        });
    }
    return inputString;
}

calcPercentage = (inputString) => {
    // regex group capture for anything followed by a percentage sign
    const percentageRegex = /(\d+(\.\d+)?)%/g;

    while (percentageRegex.test(inputString)) {
        inputString = inputString.replace(percentageRegex, (match, group) => {
            group = parseFloat(group) / 100;
            return group;
        });
    }
    return inputString;

}

calcPower = (inputString) => {
    // regex group capture for anything followed by a caret symbol and another number (e.g. 2^3)
    const powerRegex = /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g;

    while (powerRegex.test(inputString)) {
        inputString = inputString.replace(powerRegex, (match, base, _, exponent) => {
            base = parseFloat(base);
            exponent = parseFloat(exponent);
            return Math.pow(base, exponent);
        });
    }
    return inputString;

}

calcMultiplicationAndDivision = (inputString) => {
    // regex group capture for anything followed by a multiplication or division sign and another number (e.g. 2*3 or 4/2)
    const multiplicationAndDivisionRegex = /(\d+(\.\d+)?)\s*([*/])\s*(\d+(\.\d+)?)/g;

    while (multiplicationAndDivisionRegex.test(inputString)) {
        inputString = inputString.replace(multiplicationAndDivisionRegex, (match, num1, _, operator, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            if (operator === '*') {
                return num1 * num2;
            } else {
                return num1 / num2;
            }
        });
    }
    return inputString;
}

calcAdditionAndSubtraction = (inputString) => {
    // regex group capture for anything followed by an addition or subtraction sign and another number (e.g. 2+3 or 4-2)
    const additionAndSubtractionRegex = /(\d+(\.\d+)?)\s*([+-])\s*(\d+(\.\d+)?)/g;

    while (additionAndSubtractionRegex.test(inputString)) {
        inputString = inputString.replace(additionAndSubtractionRegex, (match, num1, _, operator, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            if (operator === '+') {
                return num1 + num2;
            } else {
                return num1 - num2;
            }
        });
    }
    return inputString;
}