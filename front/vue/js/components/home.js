export const Home = {
    data() {
        return {
            nomeUsuario: "NOME", 
            pesquisa: '', 
        };
    },
    methods: {
        limparPesquisa() {
            this.pesquisa = ''; 
        },
        fazerReserva() {
            this.$router.push('/laboratorios'); 
        },
    },
    template: `
        <div>
            <p id="titulo-ola">
                Olá, <span id="nome-usuario">{{ nomeUsuario }}</span>, seja bem vindo(a) ao <strong>SALA</strong>!
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
                <button id="btn-reserva" @click="fazerReserva">Fazer reserva</button>
            </div>
        </div>
    `,
};
