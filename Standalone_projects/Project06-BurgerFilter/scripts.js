// Global variables
const sliderConfig = {
    containerId: "myPriceSlider",
    minVal: 0,
    maxVal: 100,
    startMin: 0,
    startMax: 90,
    onChange: applyAllFilters
};
let burgerJSON = [];


// functions 
async function getOriginalBurgerJSON () {
    try {
        let response = await fetch("./data/burgerlist.json");
        return await response.json();
    } catch (error) {
        console.error("Error loading burger data:", error);
    }
}

function pushMenuItems(menuData) {
    const burgerList = document.getElementById("burger-list");
    
    menuData.forEach(burger => {
        burgerList.appendChild(createMenuCard(burger.name, burger.price, burger.src, burger.vegan));
    });
}

function createMenuCard(itemName, itemPrice, srcImg, isVegan = false) {
    // validação de input
    srcImg = srcImg || "./assets/placeholder.png";


    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
        <img src="${srcImg}" alt="${itemName}" class="menu-card-img">
        <div class="menu-card-content">
            <h3>${itemName}</h3>
            <p>R$${itemPrice.toFixed(2)}</p>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px;">
            <button class="remove-from-cart" onclick="buttonQTDListener(this, -1)">←</button> <span id="quantity" data-itemName="${itemName}"> 0 </span> <button class="add-to-cart" onclick="buttonQTDListener(this, 1)">→</button>
        </div>
    `;
    card.setAttribute("data-name", itemName);
    card.setAttribute("data-price", itemPrice);
    card.setAttribute("data-vegan", isVegan);

    return card;
}

function buttonQTDListener(button, increment = 0) {
    const quantitySpan = button.parentElement.querySelector("#quantity");
    let quantity = parseInt(quantitySpan.textContent);
    quantity += increment;
    if (quantity < 0) quantity = 0;

    // Update the quantity in the burgerJSON data and in the UI
    burgerJSON.find(burger => burger.name === quantitySpan.getAttribute("data-itemName")).qtd = quantity;
    quantitySpan.textContent = quantity;

    generateReceipt();
}

Array.prototype.TotalMultiply = function(args = []) {
    return burgerJSON.reduce((total, item) => {
        let temp = 1;
        args.forEach(a => {
            temp *= (item[a] || 0);
        });

        return total + temp;
    }, 0);
}

function calculateTotal() {

    const total = burgerJSON.TotalMultiply(["price", "qtd"]);

    return total;
}

function generateReceipt() {
    stringDescount = document.querySelector("input[name='discount']:checked").parentElement.textContent;

    const receipt = document.getElementById("receipt");
    const total = calculateTotal();

    receipt.innerText = 
          "Recibo:\n"
        + stringDescount + "\n\n"
        + burgerJSON.filter(burger => burger.qtd > 0)
                    .map(burger => `${burger.name} x${burger.qtd} - R$${(burger.price * burger.qtd).toFixed(2)}`)
                    .join("\n")
        + `\n\nTotal: R$${total.toFixed(2)}`;

    receipt.hidden = (total === 0);
}

function updateDisplayedPrices() {
    document.querySelectorAll(".menu-card").forEach(card => {
        const itemName = card.getAttribute("data-name");
        const burgerData = burgerJSON.find(burger => burger.name === itemName);
        card.querySelector(".menu-card-content p").textContent = `R$${burgerData.price.toFixed(2)}`;

        card.setAttribute("data-price", burgerData.price);
    });
}

function applyDiscount (value){

    getOriginalBurgerJSON().then(originalBurgerJSON => {
        burgerJSON.forEach(burger => {
            burger.price = originalBurgerJSON.find(b => b.name === burger.name).price;
            burger.price *= parseFloat(value);
        });

        updateDisplayedPrices();
        applyAllFilters(); 
        refreshFilterMinMaxValues();
        generateReceipt();
    });
}

function applyAllFilters() {
    const listItems = document.querySelectorAll(".menu-card");

    listItems.forEach(card => {
        // reset filters
        card.hidden = false;

        // apply vegan filter
        const veganSetting = document.querySelector("input[name='vegan-options']:checked").value;
        switch(veganSetting) {
            case "vegan":
                card.hidden = card.getAttribute("data-vegan") !== "true";
                break;
            case "non-vegan":
                card.hidden = card.getAttribute("data-vegan") !== "false";
                break;
        }

        // apply price filter
        const min = parseFloat(document.querySelector("#minRange").value);
        const max = parseFloat(document.querySelector("#maxRange").value);
        const price = parseFloat(card.getAttribute("data-price"));
        if (price < min || price > max) {
            card.hidden = true;
        }
    });
}

function refreshFilterMinMaxValues() {
    let maxPrice = Math.max(...burgerJSON.map(burger => burger.price));
    maxPrice = ((maxPrice/10) | 0) *10 + 10; // set maxVal to the highest price in the menu rounded up to the nearest 10
    
    sliderConfig.maxVal = maxPrice;
    sliderConfig.startMax = maxPrice;

    let minPrice = Math.min(...burgerJSON.map(burger => burger.price));
    minPrice = ((minPrice/10) | 0) *10 -10; // set minVal to the lowest price in the menu rounded down to the nearest 10
    minPrice = minPrice < 0 ? 0 : minPrice; // ensure minVal is not negative

    sliderConfig.minVal = minPrice;
    sliderConfig.startMin = minPrice;

    // Recreate the slider with the new min and max values
    createPriceSlider(sliderConfig);
}

// On page load
async function init() {
    try {
        burgerJSON = await getOriginalBurgerJSON();

        refreshFilterMinMaxValues();

        pushMenuItems(burgerJSON);
    } catch (error) {
        console.error("Error loading burger data:", error);
    }
}

init();
