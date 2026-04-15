// Generic functions for the exercises, not related to any specific exercise
//#region Generic functions
function clearInput(element, allowDecimal = false) {
    // Remove all non-numeric characters except dot and comma

    const regex = allowDecimal ? /[^0-9.,]/g : /[^0-9]/g;
    let cleaned = element.value.replace(regex, '');
    
    // Replace comma with dot for decimal consistency if allowDecimal is enabled
    allowDecimal && (cleaned = cleaned.replace(/,/g, '.'));

    // remove all dots except the last one
    const lastDotIndex = cleaned.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        cleaned = cleaned.substring(0, lastDotIndex).replace(/\./g, '') + cleaned.substring(lastDotIndex);
    }
    element.value = cleaned;
}

// RNG min max
function getRandomInt(min, max) {
    min = Math.ceil(min) || 0; // Ensure min is an integer
    max = Math.floor(max) || 0; // Ensure max is an integer

    if (min > max) {
        [min, max] = [max, min]; // Swap if min is greater than max
    }

    return ((Math.random() * (max - min + 1)) | 0) + min;
}
//#endregion Generic functions

// 1st exercise - Encoder/Decoder
//#region Encoder/Decoder
function getKey(str) {
    let KEY = document.querySelector('#encoder-keyword');

    // Check if the element exists
    if (!KEY) { throw new Error('Keyword input not found!'); } 
    

    if (KEY.value.length === 0) {
        KEY.value = Math.random().toString(36).substring(4, 20);
    }
    return KEY.value;
}


function encode() {
    let decodedSTR = document.querySelector('#encoder-decoded-string');
    let encodedSTR = document.querySelector('#encoder-encoded-string');
    let KEY = getKey();

    let tempkey = 0;
    let tempchar = 0;

    if (!decodedSTR) { throw new Error('Decoded string input not found!'); }

    encodedSTR.value = '';
    for (let i = 0; i < decodedSTR.value.length; i++) {
        tempkey = KEY.charCodeAt(i % KEY.length);
        tempchar = decodedSTR.value.charCodeAt(i);        

        encodedSTR.value += String.fromCharCode((tempchar ^ tempkey) << ( tempkey & 3));
    }
}

function decode(str) {
    let decodedSTR = document.querySelector('#encoder-decoded-string');
    let encodedSTR = document.querySelector('#encoder-encoded-string');
    let KEY = getKey();

    let tempkey = 0;
    let tempchar = 0;

    if (!encodedSTR) { throw new Error('Encoded string input not found!'); }

    decodedSTR.value = '';
    for (let i = 0; i < encodedSTR.value.length; i++) {
        tempkey = KEY.charCodeAt(i % KEY.length);
        tempchar = encodedSTR.value.charCodeAt(i);

        decodedSTR.value += String.fromCharCode((tempchar >> ( tempkey & 3)) ^ tempkey);

    }
}
//#endregion Encoder/Decoder


//2nd exercise - DOM Elements
//#region DOM Elements
/*  
    (Math.random() * 2 ** 24) | 0 
        the operator "| 0", bitwise OR truncates the decimal part of a number.
        it is used as a faster alternative to Math.floor() when working with integers.
    Math.random() returns a number in the range: [0, 1) 
        — meaning: it never returns 1, but can return 0. So multiplying it by 2^24 (which is 16777216) gives us 
                    a range of [0, 16777216), which includes all possible RGB color combinations (from 0 to 16777215).
        2^24 in hexadecimal is 0x1000000 => 0x ff ff ff (+1 for pure white)

    0b = binary, base 2
    0o = octal, base 8
    0x = hexadecimal, base 16
    no prefix = decimal, base 10
*/
function changeColor() {
    // using bit operations to improve performance and reduce code size, instead of using Math.floor(random * 256) for each color component
    const randomColor = (Math.random() * 0x1000000) | 0; // Generate a color in the range of 0x000000 to 0xFFFFFF
    const redColor = randomColor & 0xFF; // Get the last 8 bits for red
    const greenColor = (randomColor >> 8) & 0xFF; // Get the next 8 bits for green
    const blueColor = (randomColor >> 16) & 0xFF; // Get the next 8 bits for blue

    document.getElementById('dom-exercices-target')
        .style.backgroundColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`; 
}
function addParagraph(){
    let div = document.getElementById('dom-exercices-target');
    let p = document.createElement('p');
    const pnumber = div.getElementsByTagName('p').length + 1;
    p.textContent = `added paragraph ${pnumber}`;
    div.appendChild(p);
}

function removeParagraph() {
    let p = document.querySelector('#dom-exercices-target p:last-child'); // select the last <p> inside the target div
    p.remove(); // remove the selected <p> element from the DOM
}

function toggleParagraphs() {
    let div = document.querySelectorAll('#dom-exercices-target p'); // select all <p> inside the target div
    div.forEach(p => {
        p.style.display = p.style.display === 'none' ? 'block' : 'none';
    });

}

function changeText() {
    let div = document.getElementById('dom-exercices-target');

    if (div.childNodes.length === 0) {
        addParagraph();
    }

    const newtext = prompt("What the text should be?");

    div.childNodes[0].textContent = newtext;
}
//#endregion DOM Elements


// RNG Feature
//#region RNG Feature
function generateRandomNumber() {
    let min = parseInt(document.getElementById('rng-min').value);
    let max = parseInt(document.getElementById('rng-max').value);
    let result = document.getElementById('rng-result');

    // min and max already validated inside getRandomInt
    result.value = getRandomInt(min, max);
}
//#endregion RNG Feature


// Funky Sorter
//#region Funky Sorter
document.getElementById('FS-btn-populate').addEventListener('click', populateArray);
document.getElementById('FS-btn-sort').addEventListener('click', funkySort);

function populateArray() {
    const array = document.getElementById('FS-array-visualizer');
    array.innerHTML = ''; // Clear previous content

    for (let i = 0; i < 33; i++) {
        const randomNum = getRandomInt(1, 9);
        array.innerHTML += `${randomNum}, `;
    }

    array.innerHTML = array.innerHTML.slice(0, -2); // Remove the last comma and space
}
function funkySort() {
    let output = document.getElementById('FS-array-output');
    const array = document.getElementById('FS-array-visualizer');
    const numbers = array.innerText.split(', ').map(Number); // Convert string to array of numbers
    
    const TIMEOUTMULTIPLIER = 200; // Multiplier for the sleep time

    console.log(array);

    if (array.innerHTML.length === 0) {
        output.innerText = 'Please populate the array first!';
        return;
    }

    async function sortSleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms * TIMEOUTMULTIPLIER)); // Sleep for ms * TIMEOUTMULTIPLIER milliseconds
    }
    
    // Start Sorting
    // to show that it is processing, it changes the color of the output to yellow and then back to black after sorting is done
    output.style.background = 'yellow';

    // Sorting
    output.innerText = '';
    numbers.forEach(element => {
        sortSleep(element).then(() => {
            output.innerHTML += `${element}, `; // Add a non-breaking space after the comma for better formatting
        });
    });

    // Clear the last comma and space after all elements have been processed
    setTimeout(() => {
        output.innerHTML = output.innerHTML.slice(0, -2); // Remove the last comma and space
        output.style.background = '#fff'; // Change the color back to white after sorting is done
    }, Math.max(...numbers) * TIMEOUTMULTIPLIER + TIMEOUTMULTIPLIER); // Wait for the longest sleep time plus a little extra to ensure all elements are processed
}
//#endregion Funky Sorter