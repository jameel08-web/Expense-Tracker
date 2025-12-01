// Signup
var signin = document.getElementById("SignUp");

signin.addEventListener("click", function () {
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    //condition agar user feild me value add kare baghir save kare to ye alert chale
    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }


    // Pehle se saved users ko get karo
    var users = JSON.parse(localStorage.getItem("Users")) || [];
    console.log("test1", users);

    //check kar rahe hai email phele se to exist nhi kar rahe 
    let exist = users.find(u => u.email === email);
    if (exist) {
        alert("Email already exists!");
        return;
    }


    // user ko array me add kar raha ho object ke help se
    users.push({
        email,
        password,
        expenses: []
    })


    console.log("test3", users);

    // LocalStorage me save karo
    localStorage.setItem("Users", JSON.stringify(users));

    // Signup ke baad fields clear karo
    document.getElementById("Email").value = "";
    document.getElementById("Password").value = "";


    // Login page par redirect karo
    location.href = "../login/login.html";
});
