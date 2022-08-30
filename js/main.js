var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var successBtn = document.getElementById("successMsg");
var existMsg = document.getElementById("existMsg");
var requiredBtn = document.getElementById("requiredMsg");
var validMsg = document.getElementById("validMsg");
var wrongBtn = document.getElementById("wrongMsg");
var userContainer;
if (localStorage.getItem('allUsers') == null) {
    userContainer = [];
} else {
    userContainer = JSON.parse(localStorage.getItem('allUsers'));
}
function signup() {
    if (signupName.value != "" && signupEmail.value != "" && signupPassword.value != "") {
        if (namevalidation() == true && emailvalidation() == true && passwordvalidation() == true) {
            if (isExist() == true) {
                var user = {
                    name: signupName.value,
                    email: signupEmail.value,
                    password: signupPassword.value
                };
                userContainer.push(user);
                localStorage.setItem('allUsers', JSON.stringify(userContainer));
                successBtn.classList.replace("d-none", "d-block");
                existMsg.classList.replace("d-block", "d-none");
                validMsg.classList.replace("d-block", "d-none");
            }
            else {
                existMsg.classList.replace("d-none", "d-block");
                successBtn.classList.replace("d-block", "d-none");
                validMsg.classList.replace("d-block", "d-none");
            }

        } else {
            validMsg.classList.replace("d-none", "d-block");
            existMsg.classList.replace("d-block", "d-none");
            successBtn.classList.replace("d-block", "d-none");
        }
    }
    else {
        requiredBtn.classList.replace("d-none", "d-block");
        validMsg.classList.replace("d-block", "d-none");
        existMsg.classList.replace("d-block", "d-none");
        successBtn.classList.replace("d-block", "d-none");
    }
}
function namevalidation() {
    var nameRegex = /[a-zA-z]{3,12}/;
    if (nameRegex.test(signupName.value) == true) {
        signupName.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        signupName.classList.add("is-invalid");
        return false;
    }
}
function emailvalidation() {
    var emailRegex = /[a-zA-Z0-9]{3,15}@(gmail|yahoo)\.(com|eg)$/;
    if (emailRegex.test(signupEmail.value) == true) {
        signupEmail.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        signupEmail.classList.add("is-invalid");
        return false;
    }
}
function passwordvalidation() {
    var passwordRegex = /[a-zA-z0-9]{4,15}/;
    if (passwordRegex.test(signupPassword.value) == true) {
        signupPassword.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        signupPassword.classList.add("is-invalid");
        return false;
    }
}
function isExist() {
    var exist = true;
    for (var i = 0; i < userContainer.length; i++) {
        if (signupEmail.value == userContainer[i].email) {
            exist = false;
            break;
        } else {
            exist = true;
        }
    }
    return exist;
}
function login() {
    if (loginEmail.value != "" && loginPassword.value != "") {
        for (var i = 0; i < userContainer.length; i++) {
            if (userContainer[i].email.toLowerCase() == loginEmail.value.toLowerCase() && userContainer[i].password == loginPassword.value) {
                document.getElementById("loginBtn").setAttribute('href', 'home.html');
                sessionStorage.setItem('sessionUser', userContainer[i].name);
            } else {
                wrongBtn.classList.replace("d-none", "d-block");
            }
        }
    }
    else {
        requiredBtn.classList.replace("d-none", "d-block");
    }
}


