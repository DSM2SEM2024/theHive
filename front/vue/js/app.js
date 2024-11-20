import { Login } from './components/login.js';
import { Home } from './components/home.js';

const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home }
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
        usuario_id: null,
        nome: '',
        email: '',
      },
      url: 'http://localhost:3000/users',
    };
  },
  methods: {   
    logout() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        this.usuario = null;
        this.$router.push('/');
    },
    handleLoginSuccess() {
        this.logado = true; // Atualiza para true ao logar
    }
  },

  template: `
      <header>

      <h1>Fatec - SALA</h1>

      <div class="busca" v-if="logado">
          <img src="Images/search.png" alt="Ícone de pesquisa">
          <input id="pesquisa" type="text" placeholder="O que está procurando?">
          <button id="limpa-input" class="btn-limpar" type="button">&times;</button>
      </div>

      <div id="icons" v-if="logado">
          <i title="Notificações" id="btn-notificacoes" class="fi fi-ss-bell"></i>
          <i title="Perfil" id="btn-perfil" class="fi fi-ss-circle-user"></i>
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

              </div>
              <div id="titulo-not-1"><p>Aprovadas</p></div>
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

              </div>

          </div>



          <div class="perfil">
              <div class="usuario">
                  <p id="avatar">R</p>
                  <h3 id="name"></h3>
              </div>
              <div class="info-perfil">
                  <p id="label">Curso(s):</p>
                  <p id="courses"></p>
                  <p id="label">E-mail:</p>
                  <p id="email"></p>
                  <a href="#" onclick="logout()">Sair</a>
              </div>
          </div>
      </nav>
      <router-view @login-success="handleLoginSuccess"></router-view>
    </main>
      
  `
};

const App = Vue.createApp (app);
App.use(router);
App.mount('#app');