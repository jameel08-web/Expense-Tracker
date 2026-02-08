// import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./config.js";
import { getDoc, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
const userUid = localStorage.getItem("userUid");

if (!userUid) {
    location.href = "auth.html";
}

const userRef = doc(db, "user", userUid)
const data = await getDoc(userRef);
// const myArray = data.data()
let transcation = data.data()?.transcation || [];
// console.log("data ==>", data)
// console.log("trans ==>", trans)


const addTransBtn = document.getElementById("addTransBtn")
const transType = document.getElementById("transType")
const description = document.getElementById("transName")
const amount = document.getElementById("transAmount")
const date = document.getElementById("transDate")
let editId = null;



const updateUi = () => {
    if (editId !== null) {
        addTransBtn.innerHTML = "<i class='fa-solid fa-pen-to-square mr-2'></i> Update Transaction";
    } else {
        addTransBtn.innerHTML = "<i class='fa-solid fa-plus mr-2'></i> Add Transaction";
    }
}

addTransBtn.addEventListener('click', async () => {
    if (!description.value || !amount.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all fields!',
        });
        return;
    }

    const totalBalance = document.getElementById("totalBalance");
    if (transType.value.toLowerCase() === "expense" && totalBalance.innerText < amount.value) {
        Swal.fire({
            icon: 'error',
            title: 'Insufficient Balance',
            text: 'Expense amount greater',
        });
        return;
    }

    const transactionData = {
        type: transType.value,
        des: description.value,
        val: Number(amount.value),
        transdate: date.value
    };

    if (editId !== null) {
        transcation[editId] = transactionData;
        editId = null;
    } else {
        transcation.push(transactionData);
    }


    console.log("Current Array:", transcation);

    updateUi();
    updatesummary();
    renderExpense();

    transType.value = "";
    description.value = "";
    amount.value = "";
    date.value = "";

    try {
        await updateDoc(userRef, { transcation: arrayUnion(transactionData) });
    } catch (error) {
        console.error("Firebase Error:", error);
        Swal.fire({ icon: 'error', title: 'Sync Error', text: 'Database update fail ho gaya!' });
    }
});

const updatesummary = () => {
    const totalIncome = document.getElementById("totalIncome");
    const totalExpense = document.getElementById("totalExpense");
    const totalBalance = document.getElementById("totalBalance");

    let incometotal = 0;
    let expensetotal = 0;

    transcation.forEach((item) => {
        if (item.type.toLowerCase() === "income") {
            incometotal += Number(item.val)
        }
        if (item.type.toLowerCase() === "expense") {
            expensetotal += Number(item.val)
        }
    });

    totalIncome.innerText = incometotal;
    totalExpense.innerText = expensetotal;
    totalBalance.innerText = incometotal - expensetotal;
}

const renderExpense = () => {
    const transactionList = document.getElementById("transactionList")

    transactionList.innerHTML = "";
    transcation.forEach((item, index) => {
        const row = `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="p-4 text-center">${item.des}</td>
                <td class="p-4 text-center text-sm text-gray-500">${item.transdate}</td>
                <td class="p-4 text-right font-bold ${item.type.toLowerCase() === 'income' ? 'text-green-600' : 'text-red-600'}">
                    ${item.type.toLowerCase() === 'income' ? '+' : '-'}${item.val}
                </td>
                <td class="p-4 text-center">
                    <div class="flex justify-center gap-2">
                        <button onclick="editTrans(${index})" class="text-blue-500 hover:bg-blue-100 p-2 rounded-lg">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="deleteTrans(${index})" class="text-red-500 hover:bg-red-100 p-2 rounded-lg">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr> `;
        transactionList.innerHTML += row;
    })
}
const deleteTrans = (index) => {

    transcation.splice(index, 1);

    updatesummary()
    renderExpense()
}



const editTrans = (index) => {

    addTransBtn.innerText = "Update Transaction"

    const item = transcation[index]
    editId = index;

    description.value = item.des;
    amount.value = item.val;
    transType.value = item.type;
    date.value = item.transdate;

    updateUi()
    updatesummary()
    renderExpense()

}

