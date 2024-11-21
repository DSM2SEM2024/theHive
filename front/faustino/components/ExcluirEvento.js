export default {
    template: `
        <div class="form-exclusao">
            <h3>Excluir Evento por Usuário (excluir todos de um usuario)</h3>
            <input v-model="nome" placeholder="Nome do Usuario para excluir" />
            <button @click="excluirEventoUser">Excluir Evento</button>
            <h3>Excluir Evento por ID</h3>
            <input v-model="id" placeholder="ID do evento para excluir" />
            <button @click="excluirEventoID">Excluir Evento ID</button>
            <p v-if="mensagem">{{ mensagem }}</p>
        </div>
    `,

    props: ['urlbase'],

    data() {
        return {
            nome: '',
            mensagem: '',
            id: ''
        };
    },
    
    methods: {
        async excluirEventoID() {
            const response = await fetch(`${this.urlbase}/reserve/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.status) {
                this.mensagem = 'Reserva(s) excluído(s) com sucesso.';
                this.nome = '';
                this.$emit('eventoExcluido');
            } else {
                this.mensagem = 'Evento não encontrado.';
            }
        },
    }
};
