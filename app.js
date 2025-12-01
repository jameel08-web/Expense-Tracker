
//LOAD DASHBOARD
function loadDashboard() {
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let email = localStorage.getItem("currentUser");
    let user = users.find(u => u.email === email)

    // userTitle.innerText =  user.name;

    renderExpenses();
    updateSummary()
}

// -- Open form
var form = document.getElementById("Addexpense")
form.addEventListener('click',
function () {
    console.log("Me chala")
    document.getElementById("form").style.display = "block"
    document.getElementById("Addexpense").style.display = "none"
}
)
// -- ADD / UPDATE EXPENSE
function addition() {
    var title = document.getElementById("Description").value
    var amount = document.getElementById("Amount").value

    if (!title || !amount) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please enter a Expense!',
        });
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let email = localStorage.getItem("currentuser");
    let user = users.find(u => u.email === email)

    if (editId !== null) {
        let exp = user.expenses.find(e => e.id == editId);
        exp.title = title;
        exp.amount = amount;

        editId = null;

        localStorage.setItem("users", JSON.stringify(users));
        renderExpenses();
        updateSummary();

        title.value = "";
        amount.value = " ";

        Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Your Expense has been added.',
            showConfirmButton: false,
            timer: 1500
        });
        return
    }

    user.expenses.push({
        id: Date.now(),
        title,
        amount
    });

    localStorage.setItem("users", JSON.stringify(users));
    renderExpenses();
    updateSummary();

    title.value = "";
    amount.value = "";


}

// --------------- EDIT ---------------
function editExpense(id) {
    let users = JSON.parse(localStorage.getItem("users"));
    let email = localStorage.getItem("currentUser");
    let user = users.find(u => u.email === email);

    let exp = user.expenses.find(e => e.id === id);

    expTitle.value = exp.title;
    expAmount.value = exp.amount;

    editId = id;
}

// --------------- Delete ---------------
function deleteExpense(id) {
    let users = JSON.parse(localStorage.getItem("users"))
    let email = localStorage.getItem("currentUser")

    let user = users.find(u => u.email === email);

    user.expenses = user.expenses.filter(exp => exp.id !== id);

    localStorage.setItem("users", JSON.stringify(users));
    renderExpenses();

}

// ------ RENDER EXPENSES -----

function renderExpenses() {
    let users = JSON.parse(localStorage.getItem("users"))
    let email = localStorage.getItem("currentUser")

    let user = users.find(u => u.email === email);
    let list = document.getElementById("expList");
    list.innerHTML = "";

    user.expenses.forEach(exp => {
        list.innerHTML += `
        <tr>
        <td>${exp.title}</td>
        <td>${exp.amount}</td>
        <td><button onclick="deleteExpense(${exp.id})">Delete</button></td>
        </tr>
        `;
    });

    // ------ Logout -----
    document.querySelector(".logout").addEventListener("click", function(){
        localStorage.removeItem("currentUser");
        location.href = "../SignUp/Signup.html";
    })


}


// var head = document.getElementById("head").style.display = "flex"

// var div = document.createElement('div')
// div.className = "line";

// var datediv = document.createElement('p')
// var date = document.createTextNode(new Date().toLocaleDateString());
// datediv.appendChild(date)


// var desdiv = document.createElement('p')
// var descri = document.createTextNode(des.value);
// desdiv.appendChild(descri)

// var amodiv = document.createElement('p')
// var amo = document.createTextNode(amount.value);
// amodiv.appendChild(amo)

// div.appendChild(datediv);
// div.appendChild(desdiv);
// div.appendChild(amodiv);


// list.appendChild(div)

// expenses += parseFloat(amount.value)
// document.getElementById("expense").textContent = expenses;

// var result = balance - expenses;
// document.getElementById("balance").textContent = result;


// var transcation = {
//     date: new Date().toLocaleDateString(),
//     description: des.value,
//     amount: parseFloat(amount.value)
// }

// // if (usersTransactionsArr.length > 0) {
// //     if (userData.tranhistoryArr) {
// //         userData.tranhistoryArr.push(transcation)
// //     } else {
// //         var userhistory = {
// //             id: currentUser.id,
// //             tranhistoryArr: []
// //         }

// //         userhistory.tranhistoryArr.push(transcation)
// //         usersTransactionsArr.push(userhistory);

// //         localStorage.setItem("usersTransactionsArr", JSON.stringify(usersTransactionsArr))
// //     }
// //     console.log("userData ==>", userData);
// // } else {
// //     var userhistory = {
// //         id: currentUser.id,
// //         tranhistoryArr: []
// //     }

// //     userhistory.tranhistoryArr.push(transcation)
// //     usersTransactionsArr.push(userhistory);

// //     localStorage.setItem("usersTransactionsArr", JSON.stringify(usersTransactionsArr))
// // }

// if (tranhistoryArr.length > 0) {
//     tranhistoryArr.push(transcation);
// }

// userData.tranhistoryArr = tranhistoryArr;

// const userIndex = usersTransactionsArr.findIndex(userData => userData.id);

// usersTransactionsArr[userIndex] = userData;


// localStorage.setItem("usersTransactionsArr", JSON.stringify(usersTransactionsArr))

// Swal.fire({
//     icon: 'success',
//     title: 'Added!',
//     text: 'Your Expense has been added.',
//     showConfirmButton: false,
//     timer: 1500
// });

// getExpenses();


// des.value = "";
// amount.value = "";



// }
// // get currentUser from local storage
// var currentUser = JSON.parse(localStorage.getItem("currentuser"));
// var usersTransactionsArr = JSON.parse(localStorage.getItem("usersTransactionsArr")) || [];
// console.log("usersTransactionsArr ==>", usersTransactionsArr)
// const userData = usersTransactionsArr.find(userHistory => userHistory.id == currentUser.id);
// console.log("userData ==>", userData)
// const tranhistoryArr = userData.tranhistoryArr;
// console.log("tranhistoryArr ==>", tranhistoryArr)


// if (!currentUser) location = './Login/login.html'



// // balance
// var balance = 1000.00;
// document.getElementById("balance").textContent = balance;

// // income
// var incomes = 1000.00;
// document.getElementById("income").textContent = incomes;

// // expense
// var expenses = 0;
// document.getElementById("expense").textContent = expenses;

// // add expense button function for show expense form



// // add transction for add expense




// function getExpenses() {
//     // render list items

// }

