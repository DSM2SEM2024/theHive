/* Avisar caso o campo tenha sido preenchido */
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert('Login realizado com sucesso');
    } else {
        alert('Os campos não foram preenchidos.');
    }
});

/* Checkbox de mostrar senha */
document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    if (this.checked) {
        passwordField.setAttribute("type", "text");
    } else {
        passwordField.setAttribute("type", "password");
    }
});
