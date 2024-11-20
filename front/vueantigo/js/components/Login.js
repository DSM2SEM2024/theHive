/*export default {
    data() {
        return {
            usuario: {
                email: null,
                senha: null
            },
            loginUrl: 'http://localhost:3000/login'
        };
    },
    methods: {
        login() {
            const { email, senha } = this.usuario;
            console.log('Tentando login com:', email, senha); // Verifica os dados enviados
        
            fetch(this.loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })
            .then(async (response) => {
                const data = await response.json();
                console.log('Resposta do servidor:', data);
        
                if (response.ok && data.usuario) {
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    const paginas = JSON.parse(data.usuario.paginas);
                    localStorage.setItem('paginasPermitidas', JSON.stringify(paginas));
                    this.redirecionarUsuario(data.usuario.tipo);
                } else {
                    alert("Falha no login. Verifique suas credenciais.");
                }
            })
            .catch(error => console.error('Erro no login:', error));
        },
        redirecionarUsuario(tipo) {
            switch(tipo) {
                case 'professor':
                    this.$router.push('/home-professor');
                    break;
                case 'administrador':
                    this.$router.push('/painel-admin');
                    break;
                default:
                    console.error("Tipo de usuário inválido");
            }
        }
    },
    template: `
        <!-- Código JavaScript -->
        <script src="loginscript.js"></script>
        <!-- Estilo CSS -->
        <link rel="stylesheet" href="././css/loginstyle.css">
        <!-- Icons -->
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css'>

        <!-- Cabeçalho -->
        <header>
            <h1>Fatec - SALA</h1>
        </header>
    
        <main>
        <!-- Container geral de login -->
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
                    <form @submit.prevent="login">
                        
                        <!-- Campos de entrada -->
                        <div class="input-group">
                            <label for="email">Email</label>
                            <input type="email" v-model="usuario.email" id="email" name="email" placeholder="Digite seu E-mail" required>
                        </div>
    
                        <div class="input-group">
                            <label for="password">Senha</label>
                            <div class="password-wrapper">
                                <input type="password" v-model="usuario.senha" id="password" name="password" placeholder="Digite sua Senha" required>
                            </div>
                        </div>
    
                        <!-- Container para a checkbox de mostrar senha -->
                        <div class="show-password-container">
                            <input type="checkbox" id="showPassword" class="show-password-checkbox">
                            <label for="showPassword" class="show-password-label">Mostrar Senha</label>
                        </div>
    
                        <!-- Botão de envio do formulário -->
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </main> 
    `
};
