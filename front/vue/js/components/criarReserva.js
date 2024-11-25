export const criarReserva = {
    template: `
      <section class="box-form">  
        <form @submit.prevent="criarEvento">
          <div id="card-vermelho">
            <h1>FAZER RESERVA</h1>
          </div>

          <div id="box-campos">
            <div id="group-descricao">
              <div class="titulo">
                <h2>DESCRIÇÃO:</h2>
              </div>
              <div id="box-descricao">
                <input v-model="reserva.descricao" placeholder="Descrição" />
              </div>
            </div>

            <div class="group-data-hora1">
              <div class="titulo">
                <h2>DATA INICIAL:</h2>
              </div>
              <div class="box-data-hora1">
                <input v-model="reserva.datainicial" type="date" required />
              </div>
              <div class="box-data-hora1">
                <input v-model="reserva.horarioinicial" type="time" required />
              </div>
            </div>

            <div class="group-data-hora2">
              <div class="titulo">
                <h2>DATA FINAL:</h2>
              </div>
              <div class="box-data-hora2">
                <input v-model="reserva.datafinal" type="date" />
              </div>
              <div class="box-data-hora2">
                <input v-model="reserva.horariofinal" type="time" required />
              </div>
            </div>
              
            <div id="group-mensagem"> 
              <div id="box-mensagem-reserva">
                <p class="mensagem-reserva" v-if="mensagem">{{ mensagem }}</p> 
              </div>

              <div id="box-recorrencia">
                <select v-model="reserva.recorrencia">
                  <option value="nenhuma">Nenhuma</option>
                  <option value="diaria">Diária</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                  <option value="semestral">Semestral</option>
                </select>
              </div>
            </div>
            
            <div id="group-button">
              <div id="box-button-calendario">
                <button 
                  @click="verCalendario" 
                  type="button" 
                  class="calendar-btn"
                >
                  Ver Calendário
                </button> 
              </div>   

              <div class="box-button-evento">
                <button type="submit">Criar reserva</button>        
              </div>
            </div>
          </div>
        </form>
      </section>
    `,
    props: ['idLab'],
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
                recorrencia: 'nenhuma',
                descricao: '',
                status: 'pendente'
            },
            mensagem: '',
        };
    },
    methods: {
        async criarEvento() {
            this.reserva.usuarioId = localStorage.getItem('id_usuario');
            this.reserva.laboratorioId = this.idLab;

            if (!this.validarDados()) return;

            const token = localStorage.getItem('token');
            try {
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
                    alert('Reserva criada com sucesso!');
                    this.$router.push('/home');
                    this.$emit('reservaCriada');
                } else {
                    this.mensagem = result.message || 'Erro ao criar a reserva.';
                }
            } catch (error) {
                this.mensagem = 'Erro ao conectar ao servidor.';
            }
        },
        validarDados() {
            if (!this.reserva.usuarioId || !this.reserva.laboratorioId) {
                this.mensagem = 'Usuário e laboratório são obrigatórios.';
                return false;
            }
            if (!this.reserva.datainicial || !this.reserva.horarioinicial) {
                this.mensagem = 'Data e horário inicial são obrigatórios.';
                return false;
            }
            if(!this.reserva.recorrencia){ 
              this.mensagem = 'Recorrencia deve ser obrigatória.';
              return false;
            }
            if (
                this.reserva.datafinal &&
                new Date(this.reserva.datainicial) > new Date(this.reserva.datafinal)
            ) {
                this.mensagem = 'A data inicial deve ser anterior à data final.';
                return false;
            }
            return true;
        },
        verCalendario() {
            this.$router.push({ name: 'Calendario', params: { idLab: this.idLab } });
        }
    },
};
