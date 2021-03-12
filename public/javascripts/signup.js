console.log('admin login page');
const button = document.querySelector("#signup");

const getFormValue = () => {
    const nameElem = document.querySelector("#name");
    const emailElem = document.querySelector("#email");
    const passwordElem = document.querySelector("#password");
    console.log(emailElem.value, passwordElem.value, nameElem.value);
    // POST request using fetch() 
fetch("/auth/signup", { 
    // Adding method type 
    method: "POST", 
    // Adding body or contents to send 
    body: JSON.stringify({ 
        name:  nameElem.value,
        email:  emailElem.value,
        password: passwordElem.value
    }), 
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
})
.then(response => response.json())
.then(data => {
    console.log(data);
    if (data && data.name) {
        window.location.replace('/auth/login')
    }
    if(data && data.error) {
        const errorBox = document.querySelector('#error-box');
        errorBox.innerHTML = `<div class="alert alert-warning mt-3" role="alert">
        ${data.error}
        </div>`
    }
}).catch(err => console.log(err));

}
console.log(button);

button.addEventListener('click', getFormValue);