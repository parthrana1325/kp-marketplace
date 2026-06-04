document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('container');

    document.getElementById('signUp').addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    document.getElementById('signIn').addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // SIGN IN FORM
    const signinForm = document.getElementById('signinForm');
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const email = document.getElementById('li-email').value;
        const pass = document.getElementById('li-pass').value;

        alert("Login Successful! Email: " + email);
    });

    // SIGN UP FORM
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const name = document.getElementById('su-name').value;
        const email = document.getElementById('su-email').value;
        const pass = document.getElementById('su-pass').value;

        alert("Account Created! Welcome " + name);
    });

});