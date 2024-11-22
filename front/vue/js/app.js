import { Login } from './components/login.js';
import { Home } from './components/home.js';
import { Laboratorio } from './components/laboratorio.js';

const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/laboratorio', component: Laboratorio }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = {
    data() {
        return {
            usuarios: [],
            logado: false,
            deslogado: true,
            divNotificacoes: false,
            divPerfil: false,
            usuario: {
                id_usuario: null,
                nome: '',
                email: '',
                curso: '',
            },
            url: 'http://localhost:3000/users',
        };
    },
    methods: {
        alteraNotificacoes() {
            this.divNotificacoes = !this.divNotificacoes; // Alterna o estado da div
        },
        alteraPerfil() {
            this.divPerfil = !this.divPerfil; // Alterna o estado da div
        },
        fechaNotificacoes() {
            this.divNotificacoes = false;
        },
        fechaPerfil() {
            this.divPerfil = false;
        },
        clickForaNotificacoes(event) { 
            if ( !this.$refs.iconNotificacoes.contains(event.target) && !this.$refs.notificacoesMenu.contains(event.target)) {
                this.fechaNotificacoes();
            }
        },
        clickForaPerfil(event) { 
            if (!this.$refs.perfilMenu.contains(event.target) && !this.$refs.iconPerfil.contains(event.target)) {
                this.fechaPerfil();
            }
        },
        async getUserInfo() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario) return;

            try {
                const response = await fetch(`${this.url}/${id_usuario}`, {
                    method: 'GET', // Ou o método apropriado (POST, PUT, etc.)
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`  // Envia o token de autorização
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do usuário');
                }

                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                    return;
                }
                this.usuario.nome = data.nome || "Não especificado";
                this.usuario.email = data.email || "Não especificado";
                document.getElementById('letra').innerText = this.usuario.nome.charAt(0) || "N";
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        },
        logout() {
            localStorage.removeItem("id_usuario");
            localStorage.removeItem("token");
            this.usuario = {};
            this.logado = false;
            this.deslogado = true;
            this.$router.push('/');
        },
        handleLoginSuccess() {
            this.logado = true;
            this.deslogado = false;
            this.getUserInfo();
        },
        checkAuthStatus() {
            const token = localStorage.getItem('token');
            this.logado = !!token;
        },
    },

    mounted() {
        this.getUserInfo();
        this.checkAuthStatus();

        // Adiciona o listener para cliques fora da div
      document.addEventListener("click", this.clickForaNotificacoes);
      document.addEventListener("click", this.clickForaPerfil);

    },
    beforeUnmount() {
        // Remove o listener quando o componente for desmontado
        document.removeEventListener("click", this.clickForaNotificacoes);
        document.removeEventListener("click", this.clickForaPerfil);
    },
    template: `
      <header>
        <h1 v-if="deslogado">Fatec - SALA</h1>
        <a v-if="logado" @click="this.$router.push('/home');"><h1 id="tituloFatec">Fatec - SALA</h1></a>
          <div class="busca" v-if="logado">
              <img src="Images/search.png" alt="Ícone de pesquisa">
              <input id="pesquisa" type="text" placeholder="O que está procurando?">
              <button id="limpa-input" class="btn-limpar" type="button">&times;</button>
          </div>
          <div id="icons" v-if="logado">
              <i id="btn-notificacoes" class="fi fi-ss-bell" ref="iconNotificacoes" @click="alteraNotificacoes"></i>
              <i id="btn-perfil" class="fi fi-ss-circle-user" ref="iconPerfil" @click="alteraPerfil"></i>
          </div>
      </header>
      <main>
            <nav>
            <div class="notificacoes" v-if="divNotificacoes" ref="notificacoesMenu">
            <p id="titulo-not">Pendentes</p>
            <div class="pendentes">

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

            </div>
            <div id="titulo-not-1">
                <p>Aprovadas</p>
            </div>
            <div class="aprovadas">

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

            </div>
            <p id="titulo-not-1">Reprovadas</p>
            <div class="reprovadas">

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

                <a href="" class="card-pedido">
                    <div id="txt-card">
                        <p id="txt-card-lab">Laboratório 22</p>
                        <p id="txt-card-dic">Designin Digital</p>
                    </div>
                    <div id="txt-card-2">
                        <p id="txt-card-dia">26/04/24</p>
                        <p id="txt-card-hrs">16:20 - 17:30</p>
                    </div>
                </a>

            </div>

        </div>



        <div class="perfil" v-if="divPerfil" ref="perfilMenu">
            <div class="usuario">
                <p id="avatar"><span id="letra">-</span></p>
                <h3 id="name">Indefinido</h3>
            </div>
            <div class="info-perfil">
                <p id="label">Curso(s):</p>
                <p id="courses">Indefinido</p>
                <p id="label">E-mail:</p>
                <p id="email">Indefinido</p>
                <a href="#" onclick="logout()">Sair</a>
            </div>
        </div>
          </nav>
          <router-view @login-success="handleLoginSuccess"></router-view>
      </main>
    `
};

const App = Vue.createApp(app);
App.use(router);
App.mount('#app');
