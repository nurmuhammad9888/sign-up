const elForm = document.querySelector(".form-js");
const elInputName = document.querySelector(".input-name");
const elInputPhone = document.querySelector(".input-phone");
const elInputEmail = document.querySelector(".input-email");
const elInputPassword = document.querySelector(".input-password");
const elBtnHidden = document.querySelector(".btn-hidden");

const saveToken = localStorage.getItem("token");
if (saveToken) {
    window.location.href = "/index.html";
}

async function resgisterFunc() {
    const emailValue = elInputEmail.value;
    const passwordValue = elInputPassword.value;
    const nameValue = elInputName.value;
    const phoneValue = elInputPhone.value;
    try {
        const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_name: nameValue,
            phone: phoneValue,
            email: emailValue,
            password: passwordValue
        })
    })
    const data = await res.json();
    
    if (data.token) {
        window.location.href = "/index.html"
        localStorage.setItem("token", data.token)
    }

    // if (data.token) {
    //     window.location.href = "/index.html"
    // }

} catch (err) {
    console.log(err)
}
}
elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    resgisterFunc();
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