import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { app, db } from "./config.js";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const loginTab = document.getElementById('loginTab');
const regTab = document.getElementById('regTab');
const loginForm = document.getElementById('loginForm');
const regForm = document.getElementById('regForm');
const loginButton = document.getElementById('loginuser');
const regButton = document.getElementById('createuser');
const googlesignup = document.getElementById('googlesignup');
const googlelogin = document.getElementById('googlelogin');
const userName = document.getElementById("userName")


// Form shifting logic
regTab.addEventListener('click', () => {
    // Toggle Forms
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    // Update Tab Styles
    regTab.classList.replace('border-transparent', 'border-blue-500');
    regTab.classList.replace('text-gray-500', 'text-blue-600');
    loginTab.classList.replace('border-blue-500', 'border-transparent');
    loginTab.classList.replace('text-blue-600', 'text-gray-500');
});

loginTab.addEventListener('click', () => {
    // Toggle Forms
    regForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    // Update Tab Styles
    loginTab.classList.replace('border-transparent', 'border-blue-500');
    loginTab.classList.replace('text-gray-500', 'text-blue-600');
    regTab.classList.replace('border-blue-500', 'border-transparent');
    regTab.classList.replace('text-blue-600', 'text-gray-500');
});



// Registration Logic
// with email verification
regButton.addEventListener('click', async () => {
    console.log("Registration button clicked");
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;
    const regName = document.getElementById('regName').value;
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then(async (userCredential) => {
            const user = userCredential.user;
            alert("Registration Successful");

            await setDoc(doc(db, "user", user.uid), {
                name: regName,
                email: regEmail,
                password: regPassword,
                expenses: []
            });


            sendEmailVerification(user)
                .then(() => {
                    alert("Verification email sent. Please check your inbox.");
                });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

});

// with google verification

const handleGoogleSignup = () => {
    console.log("Google Registration button clicked");
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const userUid = user.uid;

            await setDoc(doc(db, "user", userUid), {
                name: user.displayName,
                email: user.email,
                expenses: []
            });
            alert("Registration Successful");
            localStorage.setItem("userUid", userUid);
            location.href = "index.html";
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(error.message);
        });
        userprofile()
}

const handleGoogleLogin = () => {
    handleGoogleSignup(); // Upar wala function yahan call ho gaya
};


googlesignup.addEventListener('click', handleGoogleSignup);
googlelogin.addEventListener('click', handleGoogleLogin);

loginButton.addEventListener('click', () => {
    console.log("Login button clicked");
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    console.log("Email:", loginEmail);

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;

            if (!user.emailVerified) {
                alert("Please verify your email first.");
                return;
            }

            alert("Login Successful");
            location.href = "index.html";
            localStorage.setItem("userUid", user.uid);
            console.log("User UID stored in localStorage:", user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Invalid Credentials");
        });
});

