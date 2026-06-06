document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('container');

    document.getElementById('signUp').addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    document.getElementById('signIn').addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // SIGN UP
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("su-name").value;
        const email = document.getElementById("su-email").value;
        const password = document.getElementById("su-pass").value;

        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        alert(data.message);
    });

    // LOGIN
    document.getElementById("signinForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("li-email").value;
        const password = document.getElementById("li-pass").value;

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {

            alert("Login Successful");
            if (data.user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "index.html";
            }

        } else {
            alert(data.message);
        }
    });

});