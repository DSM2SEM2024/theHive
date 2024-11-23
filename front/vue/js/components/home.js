export const Home = {
    data() {
        return {
            nomeUsuario: null,
            pesquisa: '',
            reservas: [],
            professor: true,
        };
    },
    methods: {
        limparPesquisa() {
            this.pesquisa = ''; // Limpa o campo de pesquisa
        },
        fazerReserva() {
            this.$router.push('/laboratorio'); // Navega para a página de laboratórios
        },

        async getReservas() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario) return;
    
            try {
                const responseReservas = await fetch(`http://localhost:3000/reserve/prof/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            });
    
                const reservas = await responseReservas.json();
    
                this.reservas = Array.isArray(reservas) && reservas.length > 0 ? reservas : [];
    
                for (const reservas of this.reservas) {
                    reservas.nome_laboratorio = await this.getLaboratorioName(reservas.id_laboratorio);
                    reservas.nome_disciplina = await this.getDisciplinaName(reservas.id_disciplina);
                }

    
                console.log("reservas:", this.reservas);
    
            } catch (error) {
                console.error('Erro ao obter reservas:', error);
            }
        },
    
        //obter nome do laboratório reservado
        async getLaboratorioName(id_laboratorio) {
            const token = localStorage.getItem('token');
            if (!id_laboratorio || !token) return null;
    
            try {
                const response = await fetch(`http://localhost:3000/labs/${id_laboratorio}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao obter o nome do laboratório');
                }
    
                const data = await response.json();
                return data.nome || "Laboratório desconhecido";
            } catch (error) {
                console.error('Erro ao buscar laboratório:', error);
                return "Laboratório desconhecido";
            }
        },
        //obter nome da disciplina que o professor ministrará nas reservas
        async getDisciplinaName(id_disciplina) {
            const token = localStorage.getItem('token');
            if (!id_disciplina || !token) return null;
    
            try {
                const response = await fetch(`http://localhost:3000/disciplina/${id_disciplina}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao obter o nome da disciplina');
                }
    
                const data = await response.json();
                return data.nome || "Disciplina desconhecida";
            } catch (error) {
                console.error('Erro ao buscar disciplina:', error);
                return "Disciplina desconhecida";
            }
        },
    
        formatarDataHora(data, hora) {
            // Formata data no formato DD/MM/AAAA
            const dateObj = new Date(data);
            const dia = String(dateObj.getDate()).padStart(2, '0');
            const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
            const ano = dateObj.getFullYear();
    
            // Hora já está no formato HH:MM:SS, pegamos os dois primeiros
            const [horas, minutos] = hora.split(':');
    
            return {
                dataFormatada: `${dia}/${mes}/${ano}`,
                horaFormatada: `${horas}:${minutos}`
            };
        },

        async excluirReserva(id_reserva) {
            const token = localStorage.getItem('token');
            if (!id_reserva || !token) return null;
    
            try {
                const response = await fetch(`http://localhost:3000/reserve/${id_reserva}/cancel`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao cancelar');
                }
    
                const data = await response.json();
                return data.nome || "Reserva cancelada";
            } catch (error) {
                console.error('Erro ao cancelar:', error);
                return "Reserva desconhecida";
            }
        },
    },
    mounted() {
        setTimeout(() => {
            const nome = localStorage.getItem('usuario_nome');
            this.nomeUsuario = nome;
        }, 100);
        this.getReservas();
    },
    
    template: `
    <div>
    <p id="titulo-ola" v-if="nomeUsuario">
        Olá, <span id="nome-usuario">{{ nomeUsuario }}</span>, seja bem vindo(a) ao <strong>SALA</strong>!
    </p>

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

    <div id="container-reservas">
        <div id="sup-reservas">
                    <h2 v-if="professor">Minhas reservas:</h2>
                    <h2 v-if="!professor">Reservas:</h2>
                    <div v-if="reservas.length > 0" id="div-btn-reserva">
                        <button id="btn-reserva" type="button" @click="fazerReserva">Fazer reserva</button>
                        <div id="div-filtro">
                            <p>Ordenar por:</p>
                            <select name="filtro" id="filtro">
                                <option value="">Mais recentes</option>
                                <option value="">Pendentes</option>
                                <option value="">Aprovadas</option>
                                <option value="">Recusadas</option>
                            </select>
                        </div>
                    </div>
        </div>
        <div class="card-com-reservas" v-if="reservas.length > 0" >
            <div v-for="reserva in reservas" :key="reserva.id_reserva">
                <!-- Card individual da reserva -->
                <div class="reserva">
                    <div id="sup-card-reserva">
                        <p>{{ reserva.nome_laboratorio }}</p>
                            <i v-if="professor" @click="excluirReserva(reserva.id_reserva)" class="fi fi-ss-trash"></i>
                            <i v-if="!professor" @click="excluirReserva(reserva.id_reserva)" class="fi fi-bs-edit"></i>
                    </div>
                    <div id="txt-card">
                        <div id="txt-card-1">
                            <p>Status da reserva: <strong id="status">{{ reserva.status_reserva }}</strong></p>
                            <p>Curso: NOME CURSO</p>
                            <p>Disciplina: {{ reserva.nome_disciplina }}</p>
                        </div>
                        <div id="txt-card-2">
                            <p>Data inicial: {{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).dataFormatada }}</p>
                            <p>Data final: {{ formatarDataHora(reserva.data_final, reserva.horario_final).dataFormatada }}
                            </p>
                            <p>{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).horaFormatada }} às {{ formatarDataHora(reserva.data_final, reserva.horario_final).horaFormatada }}</p>
                        </div>
                    </div>


                        

                        
                </div>
            </div>
        </div>

        <div class="card-reservas" v-if="!reservas || reservas.length === 0">
            <p>Você não possui reservas no momento.</p>
            <button id="btn-reserva" type="button" @click="fazerReserva">Fazer reserva</button>
        </div>
    </div>
</div>
    `,
};
