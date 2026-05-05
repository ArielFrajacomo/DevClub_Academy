// copy to clipboard
function copyToClipboard(textToCopy) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`"${textToCopy}" copied to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        console.warn('Clipboard API not supported');
    }
}

(() => { // IIFE to avoid polluting the global scope, adds copy to clipboard functionality to elements with the class "copyThisToClipboard"
    const copyButtons = document.querySelectorAll('.copyThisToClipboard');
    if (!copyButtons) return; // Exit if no buttons found

    copyButtons.forEach(element => {
        const textToCopy = element.value || element.innerText || element.textContent;
        element.addEventListener('click', () => copyToClipboard(textToCopy));
    });
})();