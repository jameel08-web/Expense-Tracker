//login
// html se login button ke id ko get kya hai
var login = document.getElementById("login");

// login button ke id pe eventlisnter laga ke function chalana hai
login.addEventListener("click", function () {

  // login emailor password ko get kya hai html form feild se
  var loemail = document.getElementById("loEmail").value.trim();
  var lopassword = document.getElementById("loPassword").value.trim();

  // local storage se value ko get kya hai
  let users = JSON.parse(localStorage.getItem("Users")) || [];
  let user = users.find(u => u.email === loemail && u.password === lopassword);

  console.log("test11", users);

  // condition lagaye hai ke agar localstorage me agar koi user store na ho to wo phele 
  // signup kare
  if (!user) {
    alert("Please create your account first")
    location.href = "../SignUp/Signup.html";
    return;
  }

  localStorage.setItem("currentUser", loemail);
  location.href = "../index.html";

})