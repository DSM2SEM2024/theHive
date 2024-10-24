/*export default {
    data() {
        return {
            usuarios: [],
            busca: '',
            url: 'http://localhost:3000/users'
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
        }
    },
    mounted() {
        this.listarUsuarios();
    },
    template: `
    <!DOCTYPE html>
    <html lang="pt-BR">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fatec - SALA</title>
        <link rel="stylesheet" href="././css/homestyle.css">
        <link rel="stylesheet" href="css/homereset.css">
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css'>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css'>
        <link rel="shortcut icon" href="././Images/Fatec-SALA.png" type="image/x-icon">
    </head>
    
    <body>
        <header>
    
            <h1>Fatec - SALA</h1>
    
            <div class="busca">
                <img src="././css/Images/search.png" alt="Ícone de pesquisa">
                <input id="pesquisa" type="text" placeholder="O que está procurando?">
                <button id="limpa-input" class="btn-limpar" type="button">&times;</button>
            </div>
    
            <div id="icons">
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
                        <h3>Rodrigo Agarão Barreto</h3>
                    </div>
                    <div class="info-perfil">
                        <p id="label">Curso(s):</p>
                        <p id="courses">Desenvolvimento de Software Multiplataforma, Manutenção Industrial</p>
                        <p id="label">E-mail:</p>
                        <p id="email">rodrigoaragao22@fatec.sp.gov.br</p>
                        <a href="../Login/index.html">Sair</a>
                    </div>
                </div>
    
            </nav>
    
            <p id="titulo-ola">Olá, NOME, seja bem vindo(a) ao <strong>SALA</strong>!</p>
    
            <div class="card-pesquisa">
                <div class="busca-2">
                    <img src="././css/Images/search.png" alt="Ícone de pesquisa">
                    <input id="pesquisa-2" type="text" placeholder="O que está procurando?">
                    <button id="limpa-input2" class="btn-limpar2" type="button">&times;</button>
                </div>
                <div title="Botão de Ajuda" id="info">?</div>
            </div>
    
            <h2>Minhas reservas:</h2>
    
            <div class="card-reservas">
                <p>Você não possui reservas no momento.</p>
                <button>Fazer reserva</button>
            </div>
        </main>
    
    
    
        <script src="altscripts/homescript.js"></script>
    
    </body>
    
    </html>
    `
};
