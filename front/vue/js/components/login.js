export const Login = {
    data() {
        return {
            usuario: {
                email: '',
                senha: ''
            },
            mostrarSenha: false,

            mostrarPopup: false,
            novaSenha: '',
            confirmarSenha: ''

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
        },

        // alterarSenha() { // Adicionado aqui: Método para alterar a senha do usuário
        //     const dados = {
        //         id_usuario: localStorage.getItem('id_usuario'),
        //         novaSenha: this.novaSenha
        //     };

        //     fetch(`http://localhost:3000/users/${id_usuario}/senha`, { // Adicionado aqui: URL do endpoint de alteração de senha
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(dados)
        //     })
        //     .then(async (response) => { // Adicionado aqui
        //         const data = await response.json();
        //         console.log("Resposta da alteração de senha:", data);

        //         if (response.ok) { // Adicionado aqui
        //             alert('Senha alterada com sucesso!');
        //             this.mostrarPopup = false; // Adicionado aqui: Fecha o popup após a alteração de senha
        //             this.$emit('login-success'); // Adicionado de volta aqui
        //             this.$router.push('/home'); // Adicionado aqui: Redireciona para a home após sucesso
        //         } else {
        //             alert("Erro ao alterar a senha. Tente novamente.");
        //         }
        //     })
        //     .catch(error => console.error("Erro na alteração de senha:", error));
            
        // }
    },
    created() {
        const style = document.createElement('style');
        style.textContent = `
        html.login-background {
            background: url('../Images/backgroundfatec.png') no-repeat center center fixed;
            background-size: cover;
        }
        main.login-background {
            display: flex;
            justify-content: center;
            background: url('../Images/backgroundfatec.png') no-repeat center center fixed;
            background-size: cover;
        }
        `;
        document.head.appendChild(style);
    },
    template: `
            <div class="login-container">

                <!-- Popup de alteração de senha - Adicionado aqui -->
                <div v-if="mostrarPopup" class="popup">
                    <div class="subPopup">
                        <h2>Alterar Senha</h2>
                        <form @submit.prevent="alterarSenha">
                            <div id="input1">
                                <label class="textoSenhas" for="novaSenha">Nova Senha</label>
                                <input type="password" v-model="novaSenha" id="novaSenha" name="novaSenha" placeholder="Digite a nova senha" required>
                            </div>
                            <div id="input2">
                                <label class="textoSenhas" for="confirmarSenha">Confirmar Senha</label>
                                <input type="password" v-model="confirmarSenha" id="confirmarSenha" name="confirmarSenha" placeholder="Confirme a nova senha" required>
                            </div>
                            <button class="botaoAlteraPopup" type="submit">Alterar</button>
                            <button class="botaoCancelaPopup"type="button" @click="mostrarPopup = false">Cancelar</button>
                        </form>
                    </div>
                </div>

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
