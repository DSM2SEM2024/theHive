export const Home = {
    inject: ['urlBase'],
    data() {
        return {
            nomeUsuario: null,
            pesquisa: '',
            reservas: [],
            filtro: 'Mais recentes',
            professor: false, 
        };
    },
    methods: {
        handleClick() {
            this.getReservas();
        },

        limparPesquisa() {
            this.pesquisa = '';
        },

        fazerReserva() {
            this.$router.push('/laboratorio');
        },

        async getUserInfo() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario) return;

            try {
                const response = await fetch(`${this.urlBase}users/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do usuário');
                }

                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                    return;
                }
                this.usuario = {
                    nome: data.nome || "Não especificado",
                    email: data.email || "Não especificado",
                    perfil: data.perfil || "Não especificado"
                };
                localStorage.setItem('usuario_nome', this.usuario.nome);
                this.professor = this.usuario.perfil === 'Professor';
                this.getReservas();
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
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
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Erro ao obter o nome do professor');
                }
                return data.nome || "Professor desconhecido";
            } catch (error) {
                console.error('Erro ao buscar professor:', error);
                return "Professor desconhecido";
            }
        },

        async getReservas() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario || !token) return;

            let url;
            if (this.professor) {
                url = `${this.urlBase}reserve/prof/${id_usuario}`;
            } else {
                url = `${this.urlBase}reserve/estado/pendente`;
            }

            try {
                const responseReservas = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const reservas = await responseReservas.json();
                this.reservas = Array.isArray(reservas) ? reservas : [];

                for (const reserva of this.reservas) {
                    reserva.nome_laboratorio = await this.getLaboratorioName(reserva.id_laboratorio);
                    reserva.nome_usuario = await this.getUsuarioName(reserva.id_usuario);
                }
            } catch (error) {
                console.error('Erro ao obter reservas:', error);
            }
        },

        async getLaboratorioName(id_laboratorio) {
            const token = localStorage.getItem('token');
            if (!id_laboratorio || !token) return null;

            try {
                const response = await fetch(`${this.urlBase}labs/${id_laboratorio}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Erro ao obter o nome do laboratório');
                const data = await response.json();
                return data.nome || 'Laboratório desconhecido';
            } catch (error) {
                console.error('Erro ao buscar laboratório:', error);
                return 'Laboratório desconhecido';
            }
        },

        formatarDataHora(data, hora) {
            if (!data || !hora) return { dataFormatada: 'Data inválida', horaFormatada: 'Hora inválida' };

            const dateObj = new Date(data);
            if (isNaN(dateObj.getTime())) return { dataFormatada: 'Data inválida', horaFormatada: 'Hora inválida' };

            const dia = String(dateObj.getDate()).padStart(2, '0');
            const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
            const ano = dateObj.getFullYear();

            const [horas, minutos] = hora.split(':');
            return {
                dataFormatada: `${dia}/${mes}/${ano}`,
                horaFormatada: `${horas}:${minutos}`,
            };
        },

        async excluirReserva(id_reserva) {
            const token = localStorage.getItem('token');
            if (!id_reserva || !token) return;

            try {
                const response = await fetch(`${this.urlBase}reserve/${id_reserva}/cancel`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Erro ao cancelar');
                this.getReservas();
            } catch (error) {
                console.error('Erro ao cancelar:', error);
            }
        },

        async aprovarReserva(id_reserva) {
            const token = localStorage.getItem('token');
            if (!id_reserva || !token) return;

            try {
                const response = await fetch(`${this.urlBase}reserve/${id_reserva}/approve`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Erro ao aprovar a reserva');
                this.getReservas();
            } catch (error) {
                console.error('Erro ao aprovar a reserva:', error);
            }
        },

        async negarReserva(id_reserva) {
            const token = localStorage.getItem('token');
            if (!id_reserva || !token) return;

            try {
                const response = await fetch(`${this.urlBase}reserve/${id_reserva}/deny`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Erro ao negar a reserva');
                this.getReservas();
            } catch (error) {
                console.error('Erro ao negar a reserva:', error);
            }
        },
    },
    mounted() {
        this.nomeUsuario = localStorage.getItem('usuario_nome');
        this.getUserInfo();
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

    <div id="container-reservas">
        <div id="sup-reservas">
            <h2>{{ isProfessor ? 'Reservas Pendentes' : 'Gerenciar Reservas' }}</h2>
            <div v-if="reservas.length > 0" id="div-btn-reserva">
                <button id="btn-reserva" type="button" @click="fazerReserva">{{ isProfessor ? 'Fazer Reservas' : 'Laboratórios' }}</button>
            </div>
        </div>
        <div class="card-com-reservas" v-if="reservas && reservas.length > 0">
            <div v-for="reserva in reservas" :key="reserva.id_reserva">
                <div class="reserva">
                    <div id="sup-card-reserva">
                        <p>{{ isProfessor ? reserva.nome_laboratorio : reserva.nome_usuario }}</p>
                        <i v-if="isProfessor" @click="excluirReserva(reserva.id_reserva)" class="fi fi-ss-trash"></i>
                    </div>
                    <div id="txt-card-0">
                        <div id="txt-card-3">
                            
                            <p>Status da reserva: <strong id="status">{{ reserva.status_reserva }}</strong></p>
                            <p>Descrição: {{ reserva.descricao || 'Sem descrição disponível' }}</p>
                        </div>
                        <div id="txt-card-4">
                            <p>Data: {{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).dataFormatada }}</p>
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
    `
};
