const converterForm = document.querySelector(".converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.querySelector(".convert-btn");
const amount = document.getElementById("amount");
const resultContainer = document.querySelector(".result");

window.addEventListener("load",fetchCurrencies);
window.addEventListener("load",loadLastConversion);
converterForm.addEventListener("submit",convertCurrency);

async function fetchCurrencies(){
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();

    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach(currency =>{
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}

async function convertCurrency(e){
    e.preventDefault();

    const from  = fromCurrency.value;
    const to = toCurrency.value;
    const amt = Number(amount.value);
    
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data  = await response.json();
    
    const rate = data.rates[to];
    
    const convertedAmount = amt * rate;
    
    const saveData = {
        amount:amt,
        fromCurrency:from,
        toCurrency:to,
        result:convertedAmount.toFixed(2)
    };

    localStorage.setItem("saveDatas",JSON.stringify(saveData));

    resultContainer.innerHTML = `${amt} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    resultContainer.classList.remove("hidden");
}

function loadLastConversion(){
    const saved = localStorage.getItem("saveDatas");

    if(!saved) return;

    const data = JSON.parse(saved);

    resultContainer.innerHTML = `${data.amount} ${data.fromCurrency} = ${data.toCurrency}`;
    resultContainer.classList.remove("hidden");
    
    amount.value = data.amount;
}