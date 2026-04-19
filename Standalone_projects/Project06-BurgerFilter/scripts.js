// Global variables
const sliderConfig = {
    containerId: "myPriceSlider",
    minVal: 0,
    maxVal: 100,
    startMin: 0,
    startMax: 90,
    onChange: () => {}
};
let burgerJSON = [];


// functions 
function pushMenuItems(menuData) {
    const burgerList = document.getElementById("burger-list");
    
    menuData.forEach(burger => {
        burgerList.appendChild(createMenuCard(burger.name, burger.price, burger.src, burger.vegan));
    });
}

function createMenuCard(itemName, itemPrice, srcImg, isVegan = false) {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
        <img src="${srcImg}" alt="${itemName}" class="menu-card-img">
        <div class="menu-card-content">
            <h3>${itemName}</h3>
            <p>R$${itemPrice.toFixed(2)}</p>
        </div>
    `;
    card.setAttribute("data-name", itemName);
    card.setAttribute("data-price", itemPrice);
    card.setAttribute("data-vegan", isVegan);

    return card;
}


// On page load
async function init() {
    try {
        
        console.log("Loaded burger data:", burgerJSON);
        const response = await fetch("./data/burgerlist.json");
        burgerJSON = await response.json();
        

        let maxPrice = Math.max(...burgerJSON.map(burger => burger.price));
        maxPrice = ((maxPrice/10) | 0) *10 + 10; // set maxVal to the highest price in the menu rounded up to the nearest 10
        
        sliderConfig.maxVal = maxPrice;
        sliderConfig.startMax = maxPrice;


        createPriceSlider(sliderConfig);
        pushMenuItems(burgerJSON);
    } catch (error) {
        console.error("Error loading burger data:", error);
    }
}

init();
