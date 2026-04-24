
// --- Stats Display Elements ---
let totalBalance = document.getElementById("totalBalance");
let totalIncome = document.getElementById("totalIncome");
let totalExpense = document.getElementById("totalExpense");

// --- Form & Input Elements ---
let financeForm = document.getElementById("financeForm");
let textInput = document.getElementById("text");
let amountInput = document.getElementById("amount");

// --- List Display Element ---
let transactionList = document.getElementById("list");

// 1. Data load karte waqt error se bachne ka sabse safe tarika
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addexpence(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert("Please add a description and amount");
        return; // Function yahan ruk jayega
    }

    const transaction = {
        id: generateID(),
        text: textInput.value,
        amount: +amountInput.value
    };

    transactions.push(transaction);
    addtransctionDOM(transaction)
    updatelocalstorage();
    updatevalues();

    textInput.value = "";
    amountInput.value = "";
}
// Update value
function updatelocalstorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
// id genrate
function generateID() {
    return Math.floor(Math.random() * 100000000);
}
// Add value transtions
function addtransctionDOM(transaction){
    const sgin=transaction.amount < 0 ? "-" : "+";
    const item=document.createElement('li');
    item.classList.add("item");
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML=`
        ${transaction.text} <span>${sgin}$${Math.abs(transaction.amount).toFixed(2)}</span> <button class="delete-btn" onclick='removeTranstion(${transaction.id})'>x</button>
    `;
    transactionList.appendChild(item);

}
// Update values 
function updatevalues(){
    const amounts=transactions.map(transaction => transaction.amount);
    const total=amounts.reduce((acc , item) => (acc+=item),0).toFixed(2);
    const income=amounts.filter((item) => item > 0).reduce((acc,item)=> (acc+=item),0).toFixed(2);
    const expense=amounts.filter((item) => item < 0).reduce((acc,item)=> (acc+=item),0)* -1 .toFixed(2);
    totalBalance.innerText=`${total}`;
    totalIncome.innerText=`${income}`;
    totalExpense.innerText=`${expense}`
}
// remove value
function removeTranstion(id){
    transactions=transactions.filter(transaction=> transaction.id !== id);
    updatevalues()
    init()
}
// init function
function init(){
    transactionList.innerHTML='';
    transactions.forEach(addtransctionDOM);
    updatevalues()
}
init()

financeForm.addEventListener("submit",addexpence)