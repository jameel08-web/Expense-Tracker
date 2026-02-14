// import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./config.js";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
const userUid = localStorage.getItem("userUid");

if (!userUid) {
    location.href = "auth.html";
}

const docRef = doc(db, "user", userUid)
const docSnap = await getDoc(docRef)
let transcation = docSnap.data().transcation;
console.log("data ==>", transcation)

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

const init = async () => {
    try { // Try block shuru
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) { // exists() sahi spelling hai
            // Yahan 'const' nahi likhna, warna ye bahar nahi jayega
            transcation = docSnap.data().transcation || [];

            updatesummary();
            renderExpense();

            console.log("Database connected and UI updated!");
        }
    } catch (error) { // Catch block
        console.error("Initialization error:", error); // console small letters mein
    }
}

const updateFirebase = async (userUid, newObj) => {

    try {
        await updateDoc(userUid, {
            transcation: arrayUnion(newObj)
        });
    } catch (error) {
        console.error("Error:", error);
    }


}

addTransBtn.addEventListener('click', () => {
    if (!description.value || !amount.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all fields!',
        });
        return;
    }

    const totalBalance = document.getElementById("totalBalance");
    const inputAmount = Number(amount.value)
    const currentBalance = Number(totalBalance.innerText);


    if (transType.value.toLowerCase() === "expense" && currentBalance.innerText < inputAmount) {
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
    }


    if (editId !== null) {
        transcation[editId] = transactionData;


        try {
            updateDoc(docRef, {
                transcation: transcation
            });
            console.log("Database mein edit save ho gaya!");
            editId = null; // Kaam khatam, reset kar dein
        } catch (error) {
            console.error("Update Error:", error);
        }
    } else {
        updateFirebase(docRef, transactionData);
        transcation.push(transactionData);
    }

    console.log("Current Array:", transcation);

    updateUi()
    updatesummary()
    renderExpense()

    transType.value = "",
        description.value = "",
        amount.value = "",
        date.value = ""

})

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

window.deleteTrans = async (index) => {

    transcation.splice(index, 1);

    try {
        await updateDoc(docRef, {
            transcation: transcation
        });

        updatesummary()
        renderExpense()
        console.log("Deleted from Firebase and UI!");

    } catch (error) {
        console.error("Delete Error:", error);
    }
}

window.editTrans = (index) => {

    addTransBtn.innerText = "Update Transaction"

    const item = transcation[index]
    editId = index;

    description.value = item.des;
    amount.value = item.val;
    transType.value = item.type;
    date.value = item.transdate;

    try {
        updateDoc(docRef, {
            transcation: transcation
        });

        updatesummary()
        renderExpense()
        console.log("Deleted from Firebase and UI!");

    } catch (error) {
        console.error("Delete Error:", error);
    }

    updateUi()
    updatesummary()
    renderExpense()

}

init();
