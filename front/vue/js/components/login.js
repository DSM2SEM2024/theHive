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

                if (response.ok) {
                    localStorage.setItem('id_usuario', data.userId);
                    localStorage.setItem('token', data.token);
                    this.$emit('login-success');
                    this.$router.push('/home');
                } else {
                    alert("Falha no login. Verifique suas credenciais.");
                }
            })
            .catch(error => console.error("Erro no login:", error));
        },
        alternarMostrarSenha() {
            this.mostrarSenha = !this.mostrarSenha;
        }
    },
    created() {
        // Criando a tag de estilo dinamicamente
        const style = document.createElement('style');
        style.textContent = `
            html {
                background: url('../Images/backgroundfatec.png') no-repeat center center fixed;
                background-size: cover;
            }
            main {
                display: flex;
                justify-content: center;
                background: url('../Images/backgroundfatec.png') no-repeat center center fixed;
                background-size: cover;
            }
        `;
        document.head.appendChild(style); // Adiciona o estilo ao head do documento
    },
    template: `
            <div class="login-container">
                <!-- Card branco -->
                <div class="white-card">
                    <div class="pfp-container">
                        <i class="fi fi-ss-circle-user"></i>
                        <p class="card-text">Login</p>
                    </div>
                    <div class="login-card">
                        <form id="login" @submit.prevent="login">
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
                            <div class="show-password-container">
                                <input type="checkbox" id="showPassword" class="show-password-checkbox" @change="alternarMostrarSenha">
                                <label for="showPassword" class="show-password-label">Mostrar Senha</label>
                            </div>
                            <button  id="btn-entrar" type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
    `
};
