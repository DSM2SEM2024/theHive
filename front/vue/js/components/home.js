export const Home = {
    data() {
        return {
            nomeUsuario: null, // Inicializa como null para diferenciar o estado "não carregado"
            pesquisa: '', // Campo para a pesquisa
        };
    },
    methods: {
        limparPesquisa() {
            this.pesquisa = ''; // Limpa o campo de pesquisa
        },
        fazerReserva() {
            this.$router.push('/laboratorio'); // Navega para a página de laboratórios
        },
    },
    mounted() {
        setTimeout(() => {
            const nome = localStorage.getItem('usuario_nome');
            this.nomeUsuario = nome;
        }, 100);
    },
    template: `
        <div>
            <p id="titulo-ola" v-if="nomeUsuario">
                Olá, <span id="nome-usuario">{{ nomeUsuario }}</span>, seja bem vindo(a) ao <strong>SALA</strong>!
            </p>

            <!-- Enquanto nomeUsuario não foi carregado, exibe uma mensagem ou espaço vazio -->
            <p id="titulo-ola" v-else>
                Carregando...
            </p>

            <div class="card-pesquisa">
                <div class="busca-2">
                    <img src="Images/search.png" alt="Ícone de pesquisa">
                    <input 
                        id="pesquisa-2" 
                        type="text" 
                        placeholder="O que está procurando?" 
                        v-model="pesquisa"
                    >
                    <button 
                        id="limpa-input2" 
                        class="btn-limpar2" 
                        type="button" 
                        v-if="pesquisa" 
                        @click="limparPesquisa"
                    >
                        &times;
                    </button>
                </div>
            </div>

            <h2>Minhas reservas:</h2>

            <div class="card-reservas">
                <p>Você não possui reservas no momento.</p>
                <button id="btn-reserva" type="button" @click="fazerReserva">Fazer reserva</button>
            </div>
        </div>
    `,
};
