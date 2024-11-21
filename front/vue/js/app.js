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
        alternarTextoDoItemClicado(texto) {
            if (texto.style.display === 'block') {
                texto.style.display = 'none'; // Oculta o texto se já estiver visível
            } else {
                document.querySelectorAll('.txt-footer').forEach((txt) => {
                    txt.style.display = 'none'; // Oculta todos os outros textos
                });
                texto.style.display = 'block'; // Exibe apenas o texto do item clicado
            }
        },
    },
    mounted() {
        this.getUserInfo();
        this.checkAuthStatus();

        // Configura eventos de clique para cada item do menu do footer
        document.querySelectorAll('.nav-mobile ul li').forEach((item) => {
            const texto = item.querySelector('.txt-footer');
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                this.alternarTextoDoItemClicado(texto);
            });
        });

        // Oculta todos os textos inicialmente
        document.querySelectorAll('.txt-footer').forEach((txt) => {
            txt.style.display = 'none';
        });

        // Configura eventos para os botões de notificações e perfil
        document.querySelectorAll(".btn-notificacoes").forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                const cardNotificacoes = document.querySelector('.notificacoes');
                const isNotificacoesAberto = cardNotificacoes.classList.contains('mostrar');
                if (!isNotificacoesAberto) {
                    cardNotificacoes.classList.add('mostrar');
                }
            });
        });

        document.querySelectorAll(".btn-perfil").forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                const cardPerfil = document.querySelector('.perfil');
                const isPerfilAberto = cardPerfil.classList.contains('mostrar');
                if (!isPerfilAberto) {
                    cardPerfil.classList.add('mostrar');
                }
            });
        });

        // Configura campos de entrada e botões de limpar
    },
    template: `
      <header>
          <a @click="this.$router.push('/home');"><h1>Fatec - SALA</h1></a>
          <div class="busca" v-if="logado">
              <img src="Images/search.png" alt="Ícone de pesquisa">
              <input id="pesquisa" type="text" placeholder="O que está procurando?">
              <button id="limpa-input" class="btn-limpar" type="button">&times;</button>
          </div>
          <div id="icons" v-if="logado">
              <i title="notificações" id="btn-notificacoes" class="fi fi-ss-bell"></i>
              <i title="perfil" id="btn-perfil" class="fi fi-ss-circle-user"></i>
          </div>
      </header>
      <main>
            <nav>
            <div class="notificacoes">
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



        <div class="perfil">
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
