export const criarReserva = {
    template: `
      <form @submit.prevent="criarReserva">
        <!-- Laboratório -->
        <select v-model="reserva.laboratorioId" required>
          <option disabled value="">Selecione um laboratório</option>
          <option v-if="labs.length === 0" disabled value="">Nenhum laboratório disponível</option>
          <option v-for="laboratorio in labs" :key="laboratorio.id" :value="laboratorio.id">{{ laboratorio.nome }}</option>
        </select>
        
        <!-- Descrição -->
        <input v-model="reserva.descricao" placeholder="Descrição" />

        <!-- Datas e horários -->
        <div>
          <input v-model="reserva.datainicial" type="date" required />
          <input v-model="reserva.horarioinicial" type="time" required />
          <input v-model="reserva.datafinal" type="date" />
          <input v-model="reserva.horariofinal" type="time" required />
        </div>

        <!-- Recorrência -->
        <select v-model="reserva.recorrencia">
          <option value="nenhuma">Recorrência</option>
          <option value="diaria">Diária</option>
          <option value="semanal">Semanal</option>
          <option value="mensal">Mensal</option>
          <option value="semestral">Semestral</option>
        </select>

        <!-- Usuário -->
        <select v-model="reserva.usuarioId" required>
          <option disabled value="">Nome do usuário</option>
          <option v-if="usuarios.length === 0" disabled value="">Nenhum usuário disponível</option>
          <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.nome }}</option>
        </select>

        <!-- Botões -->
        <button type="submit">Criar reserva</button>        
        <p v-if="mensagem">{{ mensagem }}</p>   
        <button @click="$router.push('/Calendario')" class="calendar-btn">Ver Calendário</button>     
      </form>
    `,
    props: ['urlbase'],
    data() {
        return { 
            reserva: {
                usuarioId: null,
                laboratorioId: null,
                disciplinaId: null,
                datainicial: '',
                datafinal: '',
                horarioinicial: '',
                horariofinal: '',
                recorrencia: '',
                descricao: '',
                status: ''
            },
            mensagem: '',
            labs: [],
            usuarios: []
        };
    },
    methods: {
        async criarReserva() {
            // Validação dos campos obrigatórios
            if (!this.reserva.usuarioId || !this.reserva.laboratorioId) {
                this.mensagem = 'Usuário e laboratório são obrigatórios.';
                return;
            }
            if (!this.reserva.datainicial || !this.reserva.horarioinicial) {
                this.mensagem = 'Data e horário inicial são obrigatórios.';
                return;
            }
            if (this.reserva.datafinal && new Date(this.reserva.datainicial) > new Date(this.reserva.datafinal)) {
                this.mensagem = 'A data inicial deve ser anterior à data final.';
                return;
            }

            // Envio para API
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/reserve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(this.reserva)
            });
            const result = await response.json();

            // Exibir mensagem de sucesso ou erro
            if (result.status) {
                this.mensagem = 'Reserva criada com sucesso.';
                console.log(this.reserva);
                this.$emit('reservaCriada');
            } else {
                this.mensagem = result.message || 'Erro ao criar a reserva. Verifique os dados.';
            }
        },
        async buscaUsuarios() {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            this.usuarios = await response.json();
        },
        async buscaLabs() {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/labs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            this.labs = await response.json();
        },
    },
    mounted() {
        // Buscar usuários e laboratórios em paralelo
        Promise.all([this.buscaUsuarios(), this.buscaLabs()])
            .catch(error => console.error('Erro ao carregar dados:', error));
    },
};
