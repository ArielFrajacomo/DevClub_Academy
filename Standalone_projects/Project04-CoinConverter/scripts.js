// Animate site icon: spin arrows, then move to top, reveal title and UI
window.addEventListener('DOMContentLoaded', () => {
	const icon = document.getElementById('site-icon');
	const title = document.getElementById('main-title');
	const ui = document.getElementById('exchange-ui');

	// Start arrow spin animation by adding spin-once to SVG root
	icon.addEventListener('load', () => {
		const svgDoc = icon.contentDocument || icon.getSVGDocument?.() || icon;
		const svgRoot = svgDoc && svgDoc.documentElement ? svgDoc.documentElement : null;
		if (svgRoot) {
			svgRoot.classList.add('spin-once');
			// Listen for animation end (2500ms)
			setTimeout(() => {
				svgRoot.classList.remove('spin-once');
				// Move icon to top
				icon.classList.add('to-top');
				// Reveal title after icon moves
				setTimeout(() => {
					title.classList.remove('hidden');
					title.classList.add('visible');
					// Reveal UI after title
					setTimeout(() => {
						ui.classList.remove('hidden');
						ui.classList.add('visible');
					}, 600);
				}, 700);
			}, 2600);
		}
	});
});

// Populate currency dropdowns from _data/currency.json
async function populateCurrencyDropdowns() {
  const fromSelect = document.getElementById('select-from');
  const toSelect = document.getElementById('select-to');
  try {
    const res = await fetch('./data/currency.json');
    const data = await res.json();
    // Helper to create option with icon and symbol
    function createOption(currency) {
        const opt = document.createElement('option');
            /*
            "name": "US Dollar",
            "type": "Currency",
            "conversion_rate_to_usd": 1,
            "symbol": "$",
            "icon": "assets/icons/US_Dollar_Icon.svg"
            */ 
        opt.value = currency.name;
        opt.textContent = currency.name;
        opt.setAttribute('data-icon', currency.icon ? `./assets/icons/${currency.icon.split('/').pop()}` : '');
        opt.setAttribute('data-type', currency.type || '');
        opt.setAttribute('data-symbol', currency.symbol || '');
        opt.setAttribute('data-rate', currency.conversion_rate_to_usd || '');
        opt.style.backgroundColor = 
            currency.type === 'Currency' ? 'rgba(7, 61, 20, 0.7)' 
            : currency.type === 'Cryptocurrency' ? 'rgba(82, 81, 27, 0.7)'
            : 'rgba(23, 26, 66, 0.7)' ;
        return opt;
    }
    data.forEach(currency => {
      fromSelect.appendChild(createOption(currency));
      toSelect.appendChild(createOption(currency));
    });
    // Set defaults
    fromSelect.value = 'US Dollar';
    toSelect.value = 'Brazilian Real';

    const imgfrom = document.getElementById('img-from');
    const imgto = document.getElementById('img-to');
    imgfrom.src = fromSelect.selectedOptions[0].getAttribute('data-icon');
    imgto.src = toSelect.selectedOptions[0].getAttribute('data-icon');

    fromSelect.addEventListener('change', () => {
      imgfrom.src = fromSelect.selectedOptions[0].getAttribute('data-icon');
    });
    toSelect.addEventListener('change', () => {
      imgto.src = toSelect.selectedOptions[0].getAttribute('data-icon');
    });
  } catch (e) {
    fromSelect.innerHTML = '<option>Error loading currencies</option>';
    toSelect.innerHTML = '<option>Error loading currencies</option>';
  }
}

window.addEventListener('DOMContentLoaded', populateCurrencyDropdowns);


function ClearInput(element) {
    // Remove all non-numeric characters except dot and comma
    let cleaned = element.value.replace(/[^0-9.,]/g, '');
    // Replace comma with dot for decimal consistency
    cleaned = cleaned.replace(/,/g, '.');
    // remove all dots except the last one
    const lastDotIndex = cleaned.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        cleaned = cleaned.substring(0, lastDotIndex).replace(/\./g, '') + cleaned.substring(lastDotIndex);
    }
    element.value = cleaned;
}

function calculateExchange(element) {
    const selectFrom = document.getElementById('select-from');
    const selectTo = document.getElementById('select-to');
    const currencyfrom = document.getElementById('currency-from');
    const currencyto = document.getElementById('currency-to');

    const ratioFrom = selectFrom.selectedOptions[0].getAttribute('data-rate');
    const ratioTo = selectTo.selectedOptions[0].getAttribute('data-rate');
    let multiplier = ratioFrom / ratioTo;

    if (element.name !== ""){
        if (element.name === "currency-from") {
            currencyto.value = (currencyfrom.value * multiplier).toFixed(2);;
        } else {
            currencyfrom.value = (currencyto.value / multiplier).toFixed(2);
        }
    } else {
        currencyto.value = (currencyfrom.value * multiplier).toFixed(2);
    }

}

