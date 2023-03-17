const dropList = document.querySelectorAll(".drop-list select"), 
amount = document.querySelector(".amount input"),
fromCurrency = document.querySelectorAll(".from select"),
toCurrency = document.querySelector(".to select"),
exchangeIcon = document.querySelector(".drop-list .icon"),
exchangeRateTxt = document.querySelector(".exchange-rate"),
getButton = document.querySelector("button");
   

//to target selected value USD and NGN
for (let i = 0; i < dropList.length; i++){
   
    for (currency_code in country_code){
        //USD and NPR are finally working
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected " : "";
        }else if(i == 1){
            selected = currency_code == "NGN" ? "selected " : "" ;  
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}
function loadFlag(element) {
for (code in country_code){
    if(code == element.value) {
        let imgTag = element.parentElement.querySelector("img");
        imgTag .src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
    }
}
}

window.addEventListener("load", () =>{
    getExchangeRate();
});


getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
   
});


//exchange rate icon now working properly
exchangeIcon.addEventListener("click", () =>{
let tempCode = fromCurrency.value;
tempExch = dropList[0].value;
fromCurrency.value = toCurrency.value;
dropList[0].value = dropList[1].value;
toCurrency.value = tempCode;
dropList[1].value = tempExch;

loadFlag(fromCurrency);
loadFlag(toCurrency);

getExchangeRate();
});


function getExchangeRate() {
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1"; 
        amountVal = 1;
    }
    exchangeRateTxt.innerText  = "Getting Exchange Rate...";
    let url =`https://v6.exchangerate-api.com/v6/b0cefabba9bc1e52c9c0f52b/latest/${fromCurrency.value}|${toCurrency.value}`; //added | ${toCurrency.value} based on what i saw in a video
    fetch (url).then(response => response.json()).then(result=>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal* exchangeRate).toFixed(2);

       
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value}= ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something Went Wrong";
    })
}