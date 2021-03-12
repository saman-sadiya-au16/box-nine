console.log('admin login page');
const button = document.querySelector("#login");

const getFormValue = () => {
    const emailElem = document.querySelector("#email");
    const passwordElem = document.querySelector("#password");
    console.log(emailElem.value, passwordElem.value);
    // POST request using fetch() 
fetch("/auth/signin", { 
    // Adding method type 
    method: "POST", 
    // Adding body or contents to send 
    body: JSON.stringify({ 
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
    localStorage.setItem('session', JSON.stringify(data));
    console.log(data);
    if(data && data.user && data.user.role != 0) {
        window.location.replace('/admin')
    }
    if(data && data.user && data.user.role === 0) {
        window.location.replace('/user')
    }
    if(data && data.error) {
        const errorBox = document.querySelector('#error-box');
        errorBox.innerHTML = `<div class="alert alert-warning mt-5" role="alert">
        ${data.error}
    </div>`
    }
}).catch(err => console.log(err));

}
console.log(button);

button.addEventListener('click', getFormValue);