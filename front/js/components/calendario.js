export const Calendario = {
    props: ['idLab'],
    data() {
        return {
            reservas: [],
            filtroNome: '',
            usuarios: [],
            reservaselecionado: null,
        };
    },
    methods: {
        async buscaReserva() {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/reserve/lab/${this.idLab}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  
                }
            })
            const data = await response.json();
            console.log('API Response:', data);
            this.reservas = Array.isArray(data) ? data : [];
        }, 

        buscarReservas() {
            const reservasFiltrados = this.filtroNome 
                ? this.reservas.filter(reserva => reserva.nome === this.filtroNome) 
                : this.reservas; 
            this.renderCalendar(reservasFiltrados);
        },
        renderCalendar(reservas) {
            const calendarEl = document.getElementById('calendar');
            calendarEl.innerHTML = '';

            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                nowIndicator: true,
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  },
                  locale: 'pt-br',
				buttonText: {
                    prev: "<<",
                    today: "Hoje",
                    next: ">>",
                    month: "Mês",
                    week: "Semana",
                    day: "Dia"
                },
				// dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
				//  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
				initialDate: Date.now(),
				navLinks: true,
				selectable: true,
				nowIndicator: true,
				dayMaxEvents: true,
				editable: false,
				businessHours: true,
				dayMaxEvents: true,
                events: reservas.map(reserva => ({
                    title: reserva.descricao,
                    start: `${reserva.data_inicial}T${reserva.horario_inicial}`,
                    end: `${reserva.data_final}T${reserva.horario_final}`,   
                    backgroundColor: "#FF5733",
                    extendedProps: {
                        id: reserva.id_reserva,
                        // descricao: reserva.descricao,
                    
                    }
                })),
                eventClick: (info) => this.mostrarDetalhesReserva(info)
            });
            calendar.render();
        },
        mostrarDetalhesReserva(info) {
            const reserva = this.reservas.find(reserva => reserva.descricao === info.event.title);
            this.reservaselecionado = reserva;
            console.log(this.reservaselecionado);
        },
        fecharModal() {
            this.reservaselecionado = null;
        },
        carregarUsuarios() { 
            const nomes = this.reservas.map(reserva => reserva.id_usuario); 
            console.log(this.reservas[0])
            this.usuarios = [...new Set(nomes)];
        }
    },

    async mounted() { 
            await this.buscaReserva(this.id_lab);
            this.carregarUsuarios();   
            this.renderCalendar(this.reservas);
     },
    


    template: `
        <div>
        <select v-model="filtroNome" @change="buscarReservas">
                <option value="">Todos Usuários</option>
                <option v-for="usuario in usuarios" :key="usuario" :value="usuario">{{ usuario }}</option>
        </select>
        <button @click="this.$router.push({ name: 'Criar Reserva', params: { idLab } })" class="criar-reserva-btn">Criar Reserva</button>
            <div id="calendar"> </div>

            <div v-if="reservaselecionado" class="modal">
                <div class="modal-content">
                    <h3>Detalhes do reserva</h3>
                    <p><strong>ID:</strong> {{ reservaselecionado.reserva_base_id }}</p>
                    <p><strong>Título:</strong> {{ reservaselecionado.titulo }}</p>
                    <p><strong>Descrição:</strong> {{ reservaselecionado.descricao }}</p>
                    <p><strong>Data Inicial:</strong> {{ reservaselecionado.datainicial }}</p>
                    <p><strong>Data Final:</strong> {{ reservaselecionado.datafinal }}</p>
                    <button @click="fecharModal">Fechar</button>
                </div>
            </div>
        </div>
    `,
};