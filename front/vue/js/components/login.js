export const Login = {
    data() {
        return {
            usuario: {
                email: '',
                senha: ''
            },
            mostrarSenha: false // Controle para mostrar/ocultar senha
        };
    },
    methods: {
        login() {
            console.log("Tentando login com:", this.usuario.email, this.usuario.senha);

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.usuario)
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
                    this.redirecionarUsuario(data.usuario.tipo);
                } else {
                    alert("Falha no login. Verifique suas credenciais.");
                }
            })
            .catch(error => console.error("Erro no login:", error));
        },
        redirecionarUsuario(tipo) {
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
        },
        alternarMostrarSenha() {
            this.mostrarSenha = !this.mostrarSenha;
        }
    },
    template: `
        <div class="login-container">
            <!-- Card branco -->
            <div class="white-card">
                
                <!-- Container para a imagem de perfil e o texto "Login" -->
                <div class="pfp-container">
                    <i class="fi fi-ss-circle-user"></i>
                    <p class="card-text">Login</p>
                </div>

                <!-- Card vermelho -->
                <div class="login-card">
                    <form id="login" @submit.prevent="login">
                        
                        <!-- Campos de entrada -->
                        <div class="input-group">
                            <label for="email">Email</label>
                            <input type="email" v-model="usuario.email" id="email" name="email" placeholder="Digite seu E-mail" required>
                        </div>

                        <div class="input-group">
                            <label for="password">Senha</label>
                            <div class="password-wrapper">
                                <input :type="mostrarSenha ? 'text' : 'password'" v-model="usuario.senha" id="password" name="password" placeholder="Digite sua Senha" required>
                            </div>
                        </div>

                        <!-- Container para a checkbox de mostrar senha -->
                        <div class="show-password-container">
                            <input type="checkbox" id="showPassword" class="show-password-checkbox" @change="alternarMostrarSenha">
                            <label for="showPassword" class="show-password-label">Mostrar Senha</label>
                        </div>

                        <!-- Botão de envio do formulário -->
                        <button type="submit">Entrar</button>

                    </form>
                </div>
            </div>
        </div>
    `
};
