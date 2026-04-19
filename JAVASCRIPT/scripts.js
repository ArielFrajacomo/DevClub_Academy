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
if (document.getElementById('FS-btn-populate')) {
    document.getElementById('FS-btn-populate').addEventListener('click', populateArray);
}
if (document.getElementById('FS-btn-sort')) {
    document.getElementById('FS-btn-sort').addEventListener('click', funkySort);
}

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

// MAP(), FILTER(), REDUCE() exercises
//#region MAP(), FILTER(), REDUCE() exercises

const guestList = [
    { name: 'Alice', lastName: 'Smith', age: 12, ticketTier: 2 },
    { name: 'Bob', lastName: 'Johnson', age: 8, ticketTier: 1 },
    { name: 'Charlie', lastName: 'Williams', age: 15, ticketTier: 3 },
    { name: 'Diana', lastName: 'Brown', age: 19, ticketTier: 1 },
    { name: 'Eve', lastName: 'Davis', age: 10, ticketTier: 2 },
    { name: 'Frank', lastName: 'Moore', age: 7, ticketTier: 1 },
    { name: 'Grace', lastName: 'Johnson', age: 16, ticketTier: 2 },
    { name: 'Henry', lastName: 'Moore', age: 20, ticketTier: 3 },
    { name: 'Ivy', lastName: 'Smith', age: 6, ticketTier: 1 },
    { name: 'Jack', lastName: 'Anderson', age: 14, ticketTier: 2 },
    { name: 'Kate', lastName: 'Thomas', age: 9, ticketTier: 1 },
    { name: 'Liam', lastName: 'Jackson', age: 11, ticketTier: 1 },
    { name: 'Mia', lastName: 'White', age: 18, ticketTier: 2 },
    { name: 'Noah', lastName: 'Harris', age: 13, ticketTier: 2 },
    { name: 'Olivia', lastName: 'Martin', age: 21, ticketTier: 1 },
    { name: 'Peter', lastName: 'White', age: 50, ticketTier: 3 },
    { name: 'Quinn', lastName: 'Anderson', age: 34, ticketTier: 2 },
    { name: 'Ryan', lastName: 'Martinez', age: 27, ticketTier: 1 },
    { name: 'Sophia', lastName: 'Robinson', age: 39, ticketTier: 2 },
    { name: 'Tyler', lastName: 'White', age: 44, ticketTier: 3 },
    { name: 'Uma', lastName: 'Rodriguez', age: 30, ticketTier: 1 },
    { name: 'Victor', lastName: 'Lewis', age: 48, ticketTier: 2 },
    { name: 'Wendy', lastName: 'Anderson', age: 35, ticketTier: 2 },
    { name: 'Xander', lastName: 'Turner', age: 23, ticketTier: 1 },
    { name: 'Yara', lastName: 'Perez', age: 42, ticketTier: 3 },
    { name: 'Zoe', lastName: 'Sanchez', age: 37, ticketTier: 2 },
    { name: 'Aaron', lastName: 'Robinson', age: 46, ticketTier: 3 },
    { name: 'Bella', lastName: 'Robinson', age: 24, ticketTier: 1 },
    { name: 'Caleb', lastName: 'Martinez', age: 49, ticketTier: 2 },
    { name: 'Daisy', lastName: 'Robinson', age: 32, ticketTier: 1 }
];

const AccessAreas = [
    { ticketTier: 1, area: 'Main Pool', minimumAge: 10 },
    { ticketTier: 1, area: 'Beach Access', minimumAge: 12 },
    { ticketTier: 1, area: 'Buffet Restaurant', minimumAge: 10 },
    { ticketTier: 1, area: 'Arcade', minimumAge: 6 },
    { ticketTier: 1, area: 'Mini Golf', minimumAge: 15 },
    { ticketTier: 1, area: 'Tennis Court', minimumAge: 13 },
    { ticketTier: 1, area: 'Spa Entrance', minimumAge: 18 },
    { ticketTier: 1, area: 'Gym', minimumAge: 16 },
    { ticketTier: 1, area: 'Karaoke Lounge', minimumAge: 15 },
    { ticketTier: 1, area: 'Nightclub', minimumAge: 21 },
    
    { ticketTier: 2, area: 'Private Cabanas', minimumAge: 18 },
    { ticketTier: 2, area: 'VIP Spa', minimumAge: 20 },
    { ticketTier: 2, area: 'Exclusive Restaurant', minimumAge: 21 },
    { ticketTier: 2, area: 'Yacht Club', minimumAge: 22 },
    { ticketTier: 2, area: 'Rooftop Bar', minimumAge: 25 },
    
    { ticketTier: 3, area: 'Presidential Suite', minimumAge: 21 },
    { ticketTier: 3, area: 'Private Yacht', minimumAge: 25 },
    { ticketTier: 3, area: 'Helipad Access', minimumAge: 30 }
];

const TicketData = [
    { ticketTier: 1, ticketName: 'Regular Guest', price: 100 , style: 'background: #00f00077;'},
    { ticketTier: 2, ticketName: 'VIP Guest', price: 250 , style: 'background: #0000f077;'},
    { ticketTier: 3, ticketName: 'Golden Guest', price: 500 , style: 'background: #ffd70077; !important;'}
];

//#region Prototype extensions
// Adding a sum method to the Array prototype for convenience in the reduce exercise
Array.prototype.protoSUM = function() {
    return this.reduce((acc, item) => acc + item, 0);
};
Array.prototype.protoAVG = function() {
    return this.protoSUM() / this.length;
}


function populateGuests() {
    const tempList = '';
    const HTML_List = document.getElementById('MRF-guest-list');
    if (!HTML_List) return; // Exit if element not found

    HTML_List.innerHTML = ''; // Clear previous content

    guestList
        .map(guest => {
            let temp = {
                label: `${guest.name} ${guest.lastName} (${guest.age})`,
                name: guest.name,
                lastName: guest.lastName,
                Style: TicketData.find(ticket => ticket.ticketTier === guest.ticketTier)?.style || 'color: #00000077;'
            }

            return temp;
        })
        .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.label.localeCompare(b.label)) // Sort by ticket lastName, name
        .forEach(guest => {
            const listItem = document.createElement('a');
            listItem.textContent = guest.label;
            listItem.style = guest.Style;
            listItem.onclick = () => searchGuests(guest.name);
            listItem.classList.add('MRF');

            HTML_List.appendChild(listItem);
        }); // Populate the list with sorted guests
}

function populateAreas() {
    const areasList = document.getElementById('MRF-atractions');
    if (!areasList) return; // Exit if element not found

    areasList.innerHTML = ''; // Clear previous content

    AccessAreas
        .sort((a, b) => b.ticketTier - a.ticketTier || a.area.localeCompare(b.area)) 
        .map(area => {
            return {
                area: area.area,
                style: TicketData.find(ticket => ticket.ticketTier === area.ticketTier)?.style || 'color: #00000077;',
                minimumAge: area.minimumAge
            }
        }).forEach(area => {
            const listItem = document.createElement('a');
            listItem.textContent = `${area.area} (Minimum Age: ${area.minimumAge})`;
            listItem.style = area.style;
            listItem.classList.add('MRF');
            listItem.onclick = () => searchGuestsByArea(area.area);
            areasList.appendChild(listItem);
        }); // Populate the list with sorted access areas
}

function onLoadPopulate() {
    populateGuests();
    populateAreas();
}

onLoadPopulate(); //defer make it so that this runs after the DOM is fully loaded

function searchGuests(name) {
    const guestData = document.getElementById('MRF-guest');
    if (!guestData) return; // Exit if element not found

    let guest = guestList.find(guest => guest.name === name);
    guestData.innerHTML = `${guest.name} ${guest.lastName} (${guest.age}) \n\nAccessible Areas:\n`;
    guestData.innerHTML += AccessAreas
                        .filter(area => area.ticketTier <= guest.ticketTier && guest.age >= area.minimumAge)
                        .sort((a, b) => b.ticketTier - a.ticketTier || a.area.localeCompare(b.area))
                        .map(area => `- ${area.area}`)
                        .join('\n');

    guestData.hidden = !(guestData.innerHTML.length); // Hide the element if no guest is found, show it otherwise
}   

function searchGuestsByArea(areaName) {
    const guestData = document.getElementById('MRF-guest');
    if (!guestData) return; // Exit if element not found

    let area = AccessAreas.find(area => area.area === areaName);
    let averageAge = guestList
                        .filter(guest => guest.ticketTier >= area.ticketTier && guest.age >= area.minimumAge)
                        .map(guest => guest.age).protoAVG().toFixed(1); // Calculate the average age
    
    guestData.innerHTML = `Guests with access to ${area.area} (Average age:${averageAge}+):\n\n`;
    guestData.innerHTML += guestList
                        .filter(guest => guest.ticketTier >= area.ticketTier && guest.age >= area.minimumAge)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(guest => `- ${guest.name} ${guest.lastName} (${guest.age})`)
                        .join('\n');
    
    guestData.hidden = !(guestData.innerHTML.length); // Hide the element if no guest is found, show it otherwise
}

//#endregion MAP(), FILTER(), REDUCE() exercises