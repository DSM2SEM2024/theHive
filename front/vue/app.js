const app = Vue.createApp({
  data() {
    return {
      usuarios: [],
      logado: true,
      busca: '',
      usuario: {
        usuario_id: null,
        nome: '',
        email: '',
        senha: '',
      },
      editando: false,
      url: 'http://localhost:3000/users',
    };
  },
  computed: {
    usuariosFiltrados() {
      if (!this.usuarios || this.usuarios.length === 0) {
        return [];
      }

      return this.usuarios.filter(usuario => {
        return usuario.nome && usuario.nome.toLowerCase().includes(this.busca.toLowerCase());
      });
    }
  },
  methods: {
    listarUsuarios() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.usuarios = data;
        })
        .catch(error => console.error('Erro ao listar usuários:', error));
    },
    salvarUsuario() {
      if (this.editando) {
        this.atualizarUsuario();
      } else {
        this.criarUsuario();
      }
    },
    criarUsuario() {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.usuario),
      })
        .then(response => response.json())
        .then(data => {
          this.usuarios.push(data);
          this.resetarFormulario();
        })
        .catch(error => console.error('Erro ao criar usuário:', error));
    },
    editarUsuario(user) {
      this.usuario = { ...user };
      this.editando = true;
    },
    atualizarUsuario() {
      fetch(`${this.url}/${this.usuario.usuario_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.usuario),
      })
        .then(response => response.json())
        .then(data => {
          const index = this.usuarios.findIndex(u => u.usuario_id === data.usuario_id);
          this.usuarios.splice(index, 1, data); 
          this.resetarFormulario();
        })
        .catch(error => console.error('Erro ao atualizar usuário:', error));
    },
    deletarUsuario(user) {
      fetch(`${this.url}/${user.usuario_id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.usuarios = this.usuarios.filter(u => u.usuario_id !== user.usuario_id);
        })
        .catch(error => console.error('Erro ao deletar usuário:', error));
    },
    resetarFormulario() {
      this.usuario = {
        usuario_id: null,
        nome: '',
        email: '',
        senha: '',
      };
      this.editando = false;
    },
  },
  mounted() {
    this.listarUsuarios();
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
  `
});

app.mount('#app');