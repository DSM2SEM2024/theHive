export const criarReserva = {
    template: `
<div class="geral">
      <form @submit.prevent="criarEvento" id="formularioReserva">
        <select v-model="evento.titulo" id ="selecionar-sala" required>
        
        // selecionar sala
        <option disabled value="">Selecione uma sala</option>

          // exibir salas
          <option v-for="(cor, titulo) in salas" :key="titulo" :value="titulo">{{ titulo }}</option>
        </select>


         <!--descrição do evento-->
            <textarea v-model="evento.descricao" maxlength="500" rows="5" cols="40" placeholder="Descrição do evento" id="descricao"/>

        <div id="data-horario">
            <input v-model="evento.datainicial" type="date"  id="datainicial" class="inputData-Hora" required />
            <input v-model="evento.horarioinicial" type="time" id="horainicial" class="inputData-Hora" required />
<br>
            <input v-model="evento.datafinal" type="date" id="datafinal" class="inputData-Hora" required />
            <input v-model="evento.horariofinal" type="time" id ="horafinal" class="inputData-Hora" required />
        </div>

        <!-- recorrencia do evento -->
        <select v-model="evento.recorrencia" id="recorrencia">
          <option value="nenhuma">Recorrência</option>
          <option value="diaria">Diária</option>
          <option value="semanal">Semanal</option>
          <option value="mensal">Mensal</option>
          <option value="semestral">Semestral</option>
        </select>


        <select v-model="evento.nome" required>
          <option disabled value="">Nome do usuário</option>
          <option v-for="user in usuarios" :key="user.nome" :value="user.nome">{{ user.nome }}</option>
        </select>

        <br>

        <button type="submit" id='btnCria'>Criar Reserva</button>  
        
        
        <p v-if="mensagem">{{ mensagem }}</p>   
        
        
        <button @click="this.$router.push('/Calendario')" class="calendar-btn">Ver Calendário</button>     
        
        <br>

      </form>
      </div>
    `,
    props: ['urlbase'],
    data() {
        return { 
            evento: {
                titulo: '', 
                descricao: '', 
                datainicial: '',
                horarioinicial: '', 
                datafinal: '',
                horariofinal: '',  
                recorrencia: 'nenhuma', 
                nome: '',
                cor: ''
            },
            mensagem: '',
            salas: {
                "Sala A": "#FF5733",
                "Sala B": "#33FF57",
                "Sala C": "#3357FF",
                "Sala D": "#FF33A1",
                "Sala E": "#A133FF"
            },
            usuarios:[]
        };
    },
    methods: {
        async criarEvento() {
            this.evento.cor = this.salas[this.evento.titulo];
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/reserve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(this.evento)
            });
            const result = await response.json();
            if (result.status) {
                this.mensagem = 'Evento(s) criado(s) com sucesso.';
                this.$emit('eventoCriado');
            } else {
                this.mensagem = 'Evento não criado.';
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
    },
    async mounted() {
       await this.buscaUsuarios()
    },
};