
// 1st exercise - Encoder/Decoder
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

/*  2nd exercise - DOM Elements

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