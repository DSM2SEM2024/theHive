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

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        if (localStorage.getItem('token')) {
            return next('/home');
        }
        document.documentElement.classList.add('login-background');
        document.querySelector('main').classList.add('login-background');
    } else {
        document.documentElement.classList.remove('login-background');
        document.querySelector('main').classList.remove('login-background');
    }
    if (to.path === '/home' && !localStorage.getItem('token')) {
        return next('/');
        document.documentElement.classList.add('login-background');
        document.querySelector('main').classList.add('login-background');
    }
    next();
});


const app = {
    data() {
        return {
            usuarios: [],
            logado: false,
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
            if (
                this.$refs.iconNotificacoes && 
                this.$refs.notificacoesMenu &&
                !this.$refs.iconNotificacoes.contains(event.target) &&
                !this.$refs.notificacoesMenu.contains(event.target)
            ) {
                this.fechaNotificacoes();
            }
        },
        clickForaPerfil(event) {
            if (
                this.$refs.perfilMenu && 
                this.$refs.iconPerfil &&
                !this.$refs.perfilMenu.contains(event.target) &&
                !this.$refs.iconPerfil.contains(event.target)
            ) {
                this.fechaPerfil();
            }
        },
        async getUserInfo() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario) return;

            try {
                const response = await fetch(`${this.url}/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
                this.usuario.perfil = data.perfil || "Não especificado";
                localStorage.setItem('usuario_nome', this.usuario.nome);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        },
        logout() {
            localStorage.removeItem("id_usuario");
            localStorage.removeItem("token");
            localStorage.removeItem("usuario_nome");
            if (this.$refs.notificacoesMenu && this.divNotificacoes) {
                this.fechaNotificacoes();
            }
        
            if (this.$refs.perfilMenu && this.divPerfil) {
                this.fechaPerfil();
            }
            this.usuario = {};
            this.logado = false;
            this.$router.push('/');
        },
        handleLoginSuccess() {
            this.logado = true;
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
        <h1 v-if="!logado">Fatec - SALA</h1>
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
                        <p id="txt-card-dic">Design Digital</p>
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
                <p id="avatar">{{ usuario.nome.charAt(0) || '-' }}</p>
                <h3 id="nome">{{ usuario.nome }}</h3>
            </div>
            <div class="info-perfil">
                <p id="label">Perfil:</p>
                <p id="perfil">{{ usuario.perfil }}</p>
                <p id="label">E-mail:</p>
                <p id="email">{{ usuario.email }}</p>
                <a href="#" @click="logout()">Sair</a>
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
