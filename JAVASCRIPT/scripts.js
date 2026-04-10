

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


