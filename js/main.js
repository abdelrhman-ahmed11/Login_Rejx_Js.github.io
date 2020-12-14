var inputLogInEmail = document.getElementById("inputLogInEmail");
var inputLogInPass = document.getElementById("inputLogInPass");
var inputSignUpName = document.getElementById("inputSignUpName");
var inputSignUpEmail = document.getElementById("inputSignUpEmail");
var inputSignUpPass = document.getElementById("inputSignUpPass");
var BtnSignUp = document.getElementById("signUp");
var BtnSginIn = document.getElementById("signIn");
var welcomeMsg = document.getElementById("welcomeMsg")
var logOut = document.getElementById("LogOut");
var userContainer;
var UserName;

if (localStorage.getItem("Users") == null) {
    userContainer = [];
}
else {
    userContainer = JSON.parse(localStorage.getItem("Users"));
}
function clearSignUp() {
    inputSignUpName.value = ``;
    inputSignUpEmail.value = ``;
    inputSignUpPass.value = ``;
}
function signUp() {
    var cartona = {
        Name: inputSignUpName.value,
        Email: inputSignUpEmail.value,
        Pass: inputSignUpPass.value
    }
    userContainer.push(cartona);
    localStorage.setItem("Users", JSON.stringify(userContainer));
    document.getElementById("status").classList.replace("d-none", "d-block");
    document.getElementById("status").classList.replace("text-danger", "text-success");
    document.getElementById("status").innerHTML = "success";
    clearSignUp();
}
if (BtnSignUp != null) {
    BtnSignUp.addEventListener("click", signUp);
}
function IsMailExit() {
    for (let i = 0; i < userContainer.length; i++) {
        if (inputSignUpEmail.value == userContainer[i].Email) {
            BtnSignUp.setAttribute("disabled", true);
            document.getElementById("status").innerHTML = "Email is exits";
            document.getElementById("status").classList.replace("text-success", "text-danger");
            document.getElementById("status").classList.replace("d-none", "d-block");
            return false;
        }
    }
}
function IsMailNotExit() {
    inputSignUpEmail.classList.remove("is-invalid");
    inputSignUpEmail.classList.add("is-valid");
    document.getElementById("status").classList.replace("d-block", "d-none");
}
function ValidateinputSignUpEmail() {
    var rejex = /@/;
    if (IsMailExit() == false) {
        inputSignUpEmail.classList.add("is-invalid");
        inputSignUpEmail.classList.remove("is-valid");
        return false;
    } else {
        IsMailNotExit();
        if (rejex.test(inputSignUpEmail.value)) {
            if (inputSignUpEmail.classList.contains("is-invalid")) {
                inputSignUpEmail.classList.replace("is-invalid", "is-valid")
                document.getElementById("alertInputSignUpEmail").classList.replace("d-flex", "d-none");
                return true;
            } else {
                inputSignUpEmail.classList.add("is-valid");
                document.getElementById("alertInputSignUpEmail").classList.replace("d-flex", "d-none");
                return true;
            }
        }
        else {
            inputSignUpEmail.classList.add("is-invalid");
            document.getElementById("alertInputSignUpEmail").classList.replace("d-none", "d-flex");
            return false;
        }
    }
}
function ValidateinputSignUpName() {
    var rejex = /^[A-Z][a-z]{2,14}$/;
    if (rejex.test(inputSignUpName.value)) {
        if (inputSignUpName.classList.contains("is-invalid")) {
            inputSignUpName.classList.replace("is-invalid", "is-valid")
            document.getElementById("alertInputSignUpName").classList.replace("d-block", "d-none");
            return true;
        } else {
            inputSignUpName.classList.add("is-valid");
            document.getElementById("alertInputSignUpName").classList.replace("d-block", "d-none");
            return true;
        }
    }
    else {
        inputSignUpName.classList.add("is-invalid");
        document.getElementById("alertInputSignUpName").classList.replace("d-none", "d-block");
        return false;
    }
}
function ValidateinputSignUpPass() {
    if (inputSignUpPass.value == ``) {
        inputSignUpPass.classList.add("is-invalid");
        inputSignUpPass.classList.remove("is-valid");
        document.getElementById("alertInputSignUpPass").classList.replace("d-none", "d-block");
        return false;
    }
    else {
        inputSignUpPass.classList.add("is-valid");
        inputSignUpPass.classList.remove("is-invalid");
        document.getElementById("alertInputSignUpPass").classList.replace("d-block", "d-none");
        return true;
    }
}
function validateSignUp() {
    if (ValidateinputSignUpEmail() && ValidateinputSignUpName() && ValidateinputSignUpPass()) {
        BtnSignUp.removeAttribute("disabled");
        return false
    } else {
        BtnSignUp.setAttribute("disabled", true);
        return true
    }
}
if (inputSignUpPass != null && inputSignUpName != null && inputSignUpEmail != null) {
    inputSignUpPass.addEventListener("blur", ValidateinputSignUpPass);
    inputSignUpName.addEventListener("blur", ValidateinputSignUpName);
    inputSignUpEmail.addEventListener("blur", ValidateinputSignUpEmail);
    inputSignUpEmail.addEventListener("blur", validateSignUp);
    inputSignUpName.addEventListener("blur", validateSignUp);
    inputSignUpPass.addEventListener("blur", validateSignUp);
}
function signIn() {
    ValidateinputLogInEmail();
    ValidateinputLogInPass();
    BtnSginIn.setAttribute("href", "home.html");
}
function ValidateinputLogInEmail() {
    if (inputLogInEmail.value != ``) {
        inputLogInEmail.classList.add("is-valid");
        inputLogInEmail.classList.remove("is-invalid");
        document.getElementById("alertInputLogInEmail").classList.replace("d-block", "d-none");
    }
    else {
        inputLogInEmail.classList.add("is-invalid");
        inputLogInEmail.classList.remove("is-valid");
        document.getElementById("alertInputLogInEmail").classList.replace("d-none", "d-block");
    }
}
function ValidateinputLogInPass() {
    if (inputLogInPass.value != ``) {
        inputLogInPass.classList.add("is-valid");
        inputLogInPass.classList.remove("is-invalid");
        document.getElementById("alertInputLogInPass").classList.replace("d-block", "d-none");
    }
    else {
        inputLogInPass.classList.add("is-invalid");
        inputLogInPass.classList.remove("is-valid");
        document.getElementById("alertInputLogInPass").classList.replace("d-none", "d-block");
    }
}
function isExistBefore() {
    if (userContainer.length == 0) {
        return false
    } else {
        for (let i = 0; i < userContainer.length; i++) {
            if (inputLogInEmail.value == userContainer[i].Email && inputLogInPass.value == userContainer[i].Pass) {
                localStorage.setItem("nameUser", JSON.stringify(userContainer[i].Name));
                return true;
            }
            else {
                return false
            }
        }
    }
}
function validateSignIn() {
    if (isExistBefore() != false) {
        BtnSginIn.classList.remove("disabled")
    } else {
        BtnSginIn.classList.add("disabled")
    }
}
if (BtnSginIn != null) {
    BtnSginIn.addEventListener("click", signIn);
}
if (inputLogInEmail != null && inputLogInPass != null) {
    inputLogInEmail.addEventListener("blur", validateSignIn);
    inputLogInPass.addEventListener("blur", validateSignIn);
    inputLogInEmail.addEventListener("blur", ValidateinputLogInEmail)
    inputLogInPass.addEventListener("blur", ValidateinputLogInPass)
}
if (welcomeMsg != null) {
    (function getNameOfUser() {
        UserName = JSON.parse(localStorage.getItem("nameUser"));
        welcomeMsg.innerHTML = "welcome " + UserName;
    })();
}
function removeUserNameFromLocal() {
    localStorage.removeItem("nameUser");
    logOut.setAttribute("href", "index.html")
}
if (logOut != null) {
    logOut.addEventListener("click", removeUserNameFromLocal);
}