const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document
        .querySelector("#email-login")
        .value.trim();
    const password = document
        .querySelector("#password-login")
        .value.trim();

    if (email && password) {
        
        const result = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (result.ok) {
    
            document.location.replace("/dashboard/");
        } else {
            alert(result.statusText);
        }
    }
}

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document
        .querySelector("#username-signup")
        .value.trim();
    const email = document
        .querySelector("#email-signup")
        .value.trim();
    const password = document
        .querySelector("#password-signup")
        .value.trim();

    if (username && email && password) {
            
            const result = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ username, email, password }),
                headers: { "Content-Type": "application/json" },
            });
    
            if (result.ok) {
                document.location.replace("/dashboard/");
            } else {
                alert(result.statusText);
            }
        }
    }

document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);