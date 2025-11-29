window.addEventListener("load", () => {
    let saveBalance = JSON.parse(localStorage.getItem("bal"));
    let saveIncome = JSON.parse(localStorage.getItem("income"));
    let saveExpenses = JSON.parse(localStorage.getItem("expense"));

    if(saveBalance !== null || saveIncome !== null || saveExpenses !== null){
         let bal = document.querySelector("#balance")
         bal.textContent = "$" + saveBalance.toFixed(2);

         let income = document.querySelector("#income")
         income.textContent = "$" + saveIncome.toFixed(2);

         let expense = document.querySelector("#expense")
         expense.textContent = "$" + saveExpenses.toFixed(2); 
    }

});

window.addEventListener("load", ()=> {
    loadSavedTransactions();
});

function addTransaction(){
    var desp = document.querySelector("#description").value;
    var amount = document.querySelector("#amount").value;
    
    amount = parseFloat(amount.replace("$",""));
    
    if(isNaN(amount)){
        alert("Enter the amount..!");
        return;
    }
    
    if(amount >= 0){
        updateBalance(amount);
        updateIncome(amount);
    }
    else{
        if(JSON.parse(localStorage.getItem("bal")) > 0 && amount < 0){
            updateBalance(amount);
        }
        updateExpenses(amount);
    }
    updateTransactions(desp,amount);
}

function updateBalance(amount){

    let balanceElement = document.querySelector("#balance");
    
    let yourBalance = balanceElement.textContent;

    let balance = parseFloat(yourBalance.replace("$",""));
    
    balance += amount;
    
    balanceElement.textContent = "$" + balance.toFixed(2);
    localStorage.setItem("bal",JSON.stringify(balance));

}

function updateIncome(amount){
    let incomeElement = document.querySelector("#income");

    let yourIncome = incomeElement.textContent;

    let income  = parseFloat(yourIncome.replace("$",""));

    income += amount;

    incomeElement.textContent = "$" + income.toFixed(2);

    localStorage.setItem("income",JSON.stringify(income));

}

function updateExpenses(amount){
    let expenseElement = document.querySelector("#expense");

    let yourExpense = expenseElement.textContent;

    let expense  = parseFloat(yourExpense.replace("$",""));

    expense += Math.abs(amount);

    expenseElement.textContent = "$" + expense.toFixed(2);

    localStorage.setItem("expense",JSON.stringify(expense));

}

function updateTransactions(desp,amount){

    const transactionList = document.querySelector(".transaction-list");

    let transaction = document.createElement("div");

    transaction.classList.add("list-item");


    
    
    if(amount >= 0){
        transaction.innerHTML = `
        ${desp} 
        <span>$${amount.toFixed(2)}</span>
        `;
        transaction.style.borderRight ="4px solid green";
    }
    else{
        transaction.innerHTML = `
        ${desp} 
        <span>-$${Math.abs(amount).toFixed(2)}</span>
        `;
        transaction.style.borderRight ="4px solid red";
    }

    transactionList.prepend(transaction);

    let saveTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    saveTransactions.push({
        description : desp,
        amount : amount
    });

    localStorage.setItem("transactions",JSON.stringify(saveTransactions));

}

function loadSavedTransactions(){
    const transactionList = document.querySelector(".transaction-list");
    
    let saveTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    
    saveTransactions.forEach(e => {
        const transaction = document.createElement("div");

        transaction.classList.add("list-item");

        
        if(e.amount >= 0){
            transaction.innerHTML = `
             ${e.description}
             <span>$${parseFloat(e.amount.toFixed(2))}</span>
            `;
            transaction.style.borderRight = "4px solid green";
        }
        else{
            transaction.innerHTML = `
             ${e.description}
             <span>-$${parseFloat(Math.abs(e.amount).toFixed(2))}</span>
            `;
            transaction.style.borderRight = "4px solid red";
        }

        transactionList.prepend(transaction);
    });

}