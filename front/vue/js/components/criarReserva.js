export const criarReserva = {
    template: `
      <form @submit.prevent="criarReserva">
        <select v-model="reserva.titulo" required>
          <option disabled value="">Selecione um laboratório</option>
          <option v-for="laboratorio in labs" :key="laboratorio.nome" :value="laboratorio.nome">{{ laboratorio.nome }}</option>
        </select>
        <input v-model="reserva.descricao" placeholder="Descrição" />
        <div>
        <input v-model="reserva.datainicial" type="date" required />
        <input v-model="reserva.horarioinicial" type="time" required />
        <input v-model="reserva.datafinal" type="date" />
        <input v-model="reserva.horariofinal" type="time" required />
        </div>
        <select v-model="reserva.recorrencia">
          <option value="nenhuma">Recorrência</option>
          <option value="diaria">Diária</option>
          <option value="semanal">Semanal</option>
          <option value="mensal">Mensal</option>
          <option value="semestral">Semestral</option>
        </select>
        <select v-model="reserva.nome" required>
          <option disabled value="">Nome do usuário</option>
          <option v-for="user in usuarios" :key="user.nome" :value="user.nome">{{ user.nome }}</option>
        </select>
        <button type="submit">Criar reserva</button>        
        <p v-if="mensagem">{{ mensagem }}</p>   
        <button @click="this.$router.push('/Calendario')" class="calendar-btn">Ver Calendário</button>     
      </form>
      
    `,
    props: ['urlbase'],
    data() {
        return { 
            reserva: {
                "usuarioId": null,
                "laboratorioId": null,
                "disciplinaId": null,
                "datainicial": '',
                "datafinal": '',
                "horarioinicial": '',
                "horariofinal": '',
                "recorrencia": '',
                "descricao": '',
                "status":''
            },
            mensagem: '',
            labs: [],
            usuarios:[]
        };
    },
    methods: {
        async criarReserva() {
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
            if (result.status) {
                this.mensagem = 'reserva(s) criado(s) com sucesso.';
                console.log(this.reserva);
                this.$emit('reservaCriado');
            } else {
                this.mensagem = 'reserva não criado.';
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
    async mounted() {
       await this.buscaUsuarios(),
       await this.buscaLabs()
    },
    
};