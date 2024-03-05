signup_tab = document.getElementById("signup_tab");
login_tab = document.getElementById("login_tab");

login_tab.onclick = function () {
    document.getElementById("passVerify").style.display = "none";
    document.getElementById("passVerifyL").style.display = "none";
    document.getElementById("action_button").innerHTML = "Login";
    signup_tab.classList.remove("selected");
    login_tab.classList.add("selected");
}


signup_tab.onclick = function () {
    document.getElementById("passVerify").style.display = "block";
    document.getElementById("passVerifyL").style.display = "block";
    document.getElementById("action_button").innerHTML = "Sign Up";
    signup_tab.classList.add("selected");
    login_tab.classList.remove("selected");
}