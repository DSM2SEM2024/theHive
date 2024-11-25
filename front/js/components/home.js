export const Home = {
    data() {
        return {
            nomeUsuario: null,
            pesquisa: '',
            reservas: [],
        };
    },
    methods: {
        handleClick() {
            location.reload();
        },

        limparPesquisa() {
            this.pesquisa = ''; // Limpa o campo de pesquisa
        },
        fazerReserva() {
            this.$router.push('/laboratorio'); 
        },

        async getReservas() {
            const id_usuarioss = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuarioss || !token) return;
        
            const url = this.isProfessor
                ? `http://localhost:3000/reserve/prof/${id_usuarioss}` 
                : `http://localhost:3000/reserve/estado/pendente`; 
        
            try {
                const responseReservas = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                const reservas = await responseReservas.json();
                
                // Verifica se reservas é um array e se contém elementos
                this.reservas = Array.isArray(reservas) && reservas.length > 0 ? reservas : [];
        
                // Preenche as informações de cada reserva (nome do laboratório, disciplina e usuário)
                for (const reserva of this.reservas) {
                    reserva.nome_laboratorio = await this.getLaboratorioName(reserva.id_laboratorio);
                    reserva.nome_disciplina = await this.getDisciplinaName(reserva.id_disciplina);
                    reserva.nome_usuario = await this.getUsuarioName(reserva.id_usuario);
                }
        
                console.log("Reservas:", this.reservas); // Mostra todas as reservas e seus dados
        
            } catch (error) {
                console.error('Erro ao obter reservas:', error); // Trata erros
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

        async getUsuarioName(id_usuario) {
            const token = localStorage.getItem('token');
            if (!id_usuario || !token) return null;
    
            try {
                const response = await fetch(`http://localhost:3000/users/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao obter o nome do professor');
                }
    
                const data = await response.json();
                return data.nome || "Professor desconhecido";
            } catch (error) {
                console.error('Erro ao buscar professor:', error);
                return "Professor desconhecido";
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
        async aprovarReserva(id_reserva) {
            const token = localStorage.getItem('token');
            if (!id_reserva || !token) return null;
    
            try {
                const response = await fetch(`http://localhost:3000/reserve/${id_reserva}/approve`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao aprovar a reserva');
                }
    
                const data = await response.json();
                console.log('Reserva aprovada:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Aprovada';
            } catch (error) {
                console.error('Erro ao aprovar a reserva:', error);
            }
        },
    
        async negarReserva(id_reserva) {
            const token = localStorage.getItem('token');
            if (!id_reserva || !token) return null;
    
            try {
                const response = await fetch(`http://localhost:3000/reserve/${id_reserva}/deny`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao negar a reserva');
                }
    
                const data = await response.json();
                console.log('Reserva negada:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Negada';
            } catch (error) {
                console.error('Erro ao negar a reserva:', error);
            }
        }
    },
    mounted() {
        setTimeout(() => {
            const nome = localStorage.getItem('usuario_nome');
            this.nomeUsuario = nome;
        }, 100);
        this.getReservas();
    },
    setup() {
        const isProfessor = Vue.inject('isProfessor');
        return { isProfessor };
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
                    <h2> {{ isProfessor ? 'Reservas Pendentes' : 'Gerenciar Reservas' }}</h2>
                    <div v-if="reservas.length > 0" id="div-btn-reserva">
                        <button id="btn-reserva" type="button" @click="fazerReserva">{{ isProfessor ? 'Fazer Reservas' : 'Laboratórios' }}</button>
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
        <div class="card-com-reservas" v-if="reservas && reservas.length > 0">
            <div v-for="reserva in reservas" :key="reserva.id_reserva">
                <div class="reserva">
                    <div id="sup-card-reserva">
                        <p>{{ isProfessor ? reserva.nome_laboratorio : reserva.nome_usuario }}</p>
                        <i v-if="isProfessor" @click="excluirReserva(reserva.id_reserva)" @click="handleClick" class="fi fi-ss-trash"></i>
                    </div>
                    <div id="txt-card-0">
                        <div id="txt-card-3">
                            <p>Status da reserva: <strong id="status">{{ reserva.status_reserva }}</strong></p>
                            <p>Disciplina: {{ reserva.nome_disciplina }}</p>
                        </div>
                        <div id="txt-card-4">
                            <p>Data inicial: {{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).dataFormatada }}</p>
                            <p>Data final: {{ formatarDataHora(reserva.data_final, reserva.horario_final).dataFormatada }}</p>
                            <p>{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).horaFormatada }} às {{ formatarDataHora(reserva.data_final, reserva.horario_final).horaFormatada }}</p>
                        </div>
                    </div>
                    <div v-if="!isProfessor" id="acoes-card-reserva">
                        <button class="aprovar" @click="aprovarReserva(reserva.id_reserva)">Aprovar</button>
                        <button class="negar" @click="negarReserva(reserva.id_reserva)">Negar</button>
                    </div>
                    </div>
            </div>
        </div>

        <div class="card-reservas" v-if="!reservas || reservas.length === 0">
            <p>{{ isProfessor ? 'Você não possui reservas até o momento' : 'Nenhuma reserva para gerenciar no momento' }}</p>
            <button id="btn-reserva" type="button" @click="fazerReserva">{{ isProfessor ? 'Fazer Reservas' : 'Laboratórios' }}</button>
        </div>
    </div>
</div>
    `,
};
