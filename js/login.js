const elForm = document.querySelector(".form-login-js");
const elInputEmail = document.querySelector(".input-login-email");
const elInputPassword = document.querySelector(".input-input-password");
const elBtnHidden = document.querySelector(".btn-hidden");

const saveToken = localStorage.getItem("token");
if (saveToken) {
    window.location.href = "/index.html";
}

async function loginFunc() {
    const emailValue = elInputEmail.value;
    const passwordValue = elInputPassword.value;
    
    try {
        const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })
    const data = await res.json();
    console.log(data);
    
    if (data.token) {
        window.location.href = "/index.html"
        localStorage.setItem("token", data.token)
    }
    
} catch (err) {
    console.log(err)
}
}
elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    loginFunc();
})

elBtnHidden.addEventListener("mousedown", () => {
    elBtnHidden.classList.add("btn-hidden-show");
    elInputPassword.type = "text"
})
elBtnHidden.addEventListener("mouseout", () => {
    elInputPassword.type = "password"
    elBtnHidden.classList.remove("btn-hidden-show");
})
elBtnHidden.addEventListener("mouseup", () => {
    elInputPassword.type = "password"
    elBtnHidden.classList.remove("btn-hidden-show");
})