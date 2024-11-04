document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();  // Impede o comportamento padrão do formulário

        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;

        console.log("Tentando login com:", email, senha);
        
        // Requisição para login
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })
        .then(async (response) => {
            const data = await response.json();
            console.log("Resposta do servidor:", data);

            if (response.ok && data.usuario) {
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                localStorage.setItem('userId', JSON.stringify(data.usuario.idUsuario));
                const paginas = JSON.parse(data.usuario.paginas);
                localStorage.setItem('paginasPermitidas', JSON.stringify(paginas));

                // Redireciona com base no tipo de usuário
                redirecionarUsuario(data.usuario.tipo);
            } else {
                alert("Falha no login. Verifique suas credenciais.");
            }
        })
        .catch(error => console.error("Erro no login:", error));
    });

    function redirecionarUsuario(tipo) {
        switch (tipo) {
            case 'professor':
                window.location.href = 'home/HomeProfessor.html';
                break;
            case 'administrador':
                window.location.href = 'home/HomeProfessor.html';
                break;
            default:
                console.error("Tipo de usuário inválido.");
        }
    }

    // Função para mostrar/ocultar senha
    document.getElementById("showPassword").addEventListener("change", function () {
        const passwordField = document.getElementById("password");
        passwordField.setAttribute("type", this.checked ? "text" : "password");
    });
     
});