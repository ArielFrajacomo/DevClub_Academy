/* 
    Created with Grok to streamline the process
    at the same time, it is a proof of concept how to use AI to create reusable components
    makeing it a great tool for rapid prototyping and development. 
    Still, there was lot of details that I had to adjust manually, so it's not a 100% auto generated code, but it was a great starting point and saved me a lot of time.

    how to use:
        1. include the script in your HTML file:
          *Make sure to include it before your main script if you want to use the slider in it.

          <script src="price-range-slider.js" defer></script>


        2. call the function with your desired configuration:

          createPriceSlider({
              containerId: "myPriceSlider", // the id of the container where the slider will be rendered
              minVal: 0,
              maxVal: 5000,
              startMin: 250,
              startMax: 1250,
              onChange: (min, max) => {
              console.log(`User selected: R$${min} - R$${max}`);
              // Here you filter your products
              }
          });
      
        3. customize the styles by overriding the CSS variables in your own stylesheet if needed.
          
          :root {
            --text-color: #111;
            --accent-color: #007185;
            --background-color: #fff;

            --slider-track-color: #ddd;
            --slider-progress-color: var(--accent-color);
            --slider-thumb-bg: var(--background-color);
            --slider-thumb-border: 2.5px solid var(--accent-color);

            --shadow-color: rgba(0,0,0,0.1);
            --imput-shadow-color: rgba(0,0,0,0.25);

            --price-text: Price;
            --currency-symbol: $;
            --currency-locale: en-US;
          }
*/ 

// price-range-slider.js
function createPriceSlider(config) {
  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(`Container #${config.containerId} not found`);
    return;
  }

  const minVal = config.minVal || 0;
  const maxVal = config.maxVal || 100;
  const startMin = config.startMin || 0;
  const startMax = config.startMax || 50;
  const gap = 5;

  // === INJECT CSS ===
  const style = document.createElement('style');
  style.textContent = `

    :root {
      --text-color: #111;
      --accent-color: #007185;
      --background-color: #fff;

      --slider-track-color: #ddd;
      --slider-progress-color: var(--accent-color);
      --slider-thumb-bg: var(--background-color);
      --slider-thumb-border: 2.5px solid var(--accent-color);

      --shadow-color: rgba(0,0,0,0.1);
      --imput-shadow-color: rgba(0,0,0,0.25);

      --price-text: Price;
      --currency-symbol: $;
      --currency-locale: en-US;
    }

    .price-filter {
      background: var(--background-color);
      border: 1px solid var(--slider-track-color);
      padding: 16px 18px;
      max-width: 280px;
      box-shadow: 0 1px 3px var(--shadow-color);
      font-family: "Amazon Ember", Arial, sans-serif;
    }

    .price-header {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 8px;
    }

    .header-subtext {
      font-size: 13px;
      color: var(--text-color);
      margin-bottom: 16px;
    }

    .slider-wrapper {
      position: relative;
      height: 44px;
      margin-bottom: 12px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }

    .track {
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      height: 5px;
      background: var(--slider-track-color);
      border-radius: 999px;
    }

    .progress {
      position: absolute;
      top: 18px;
      height: 5px;
      background: var(--slider-progress-color);
      border-radius: 999px;
      z-index: 1;
    }

    .range-inputs {
      position: relative;
      height: 100%;
    }

    .range-inputs input[type="range"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      pointer-events: none;
      -webkit-appearance: none;
      z-index: 2;
    }

    #minRange { z-index: 3; }
    #maxRange { z-index: 4; }

    .range-inputs input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: var(--slider-thumb-bg);
      border: var(--slider-thumb-border);
      border-radius: 50%;
      cursor: grab;
      pointer-events: auto;
      box-shadow: 0 3px 8px var(--imput-shadow-color);
    }

    .range-inputs input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--slider-thumb-bg);
      border: var(--slider-thumb-border);
      border-radius: 50%;
      cursor: grab;
      pointer-events: auto;
      box-shadow: 0 3px 8px var(--imput-shadow-color);
    }
  `;
  document.head.prepend(style); // important to prepend so it can be overridden by user styles if needed

  // === INJECT HTML ===
  const priceText = getComputedStyle(document.documentElement).getPropertyValue('--price-text') || "Price";
  const currencySymbol = getComputedStyle(document.documentElement).getPropertyValue('--currency-symbol') || "$";
  const currencyLocale = getComputedStyle(document.documentElement).getPropertyValue('--currency-locale') || "en-US";

  container.innerHTML = `
    <div class="price-filter">
      <div class="price-header">${priceText}</div>
      <div class="header-subtext" id="rangeText">${currencySymbol}${startMin.toLocaleString(currencyLocale)} – ${currencySymbol}${startMax.toLocaleString(currencyLocale)}</div>

      <div class="slider-wrapper">
        <div class="track"></div>
        <div class="progress" id="progress"></div>
        
        <div class="range-inputs">
          <input type="range" id="minRange" min="${minVal}" max="${maxVal-gap}" value="${startMin}" step="1">
          <input type="range" id="maxRange" min="${minVal+gap}" max="${maxVal}" value="${startMax}" step="1">
        </div>
      </div>
    </div>
  `;

  // === JS LOGIC ===
  const minRange = container.querySelector('#minRange');
  const maxRange = container.querySelector('#maxRange');
  const progress = container.querySelector('#progress');
  const rangeText = container.querySelector('#rangeText');

  function formatPrice(price) {
    return price.toLocaleString(currencyLocale);
  }

  function updateUI() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);

    if (max - min < gap) {
      if (document.activeElement === minRange) {
        max = min + gap;
      } else {
        min = max - gap;
      }
      minRange.value = min;
      maxRange.value = max;
    }

    const percentMin = ((min - minVal) / (maxVal - minVal)) * 100;
    const percentMax = ((max - minVal) / (maxVal - minVal)) * 100;

    progress.style.left = percentMin + '%';
    progress.style.width = (percentMax - percentMin) + '%';

    rangeText.textContent = `${currencySymbol}${formatPrice(min)} – ${currencySymbol}${formatPrice(max)}`;

    // Call the callback if provided
    if (typeof config.onChange === 'function') {
      config.onChange(min, max);
    }
  }

  // Events
  minRange.addEventListener('input', updateUI);
  maxRange.addEventListener('input', updateUI);

  // Prevent text selection / drag issues
  function preventDefault(e) { e.preventDefault(); }
  minRange.addEventListener('dragstart', preventDefault);
  maxRange.addEventListener('dragstart', preventDefault);
  minRange.addEventListener('selectstart', preventDefault);
  maxRange.addEventListener('selectstart', preventDefault);

  // Initial render
  updateUI();
}