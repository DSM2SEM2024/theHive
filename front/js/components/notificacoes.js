export const Notificacoes = {
    data() {
        //variáveis
        return {
            //usuários
            usuarios: [],
            usuario: {
                id_usuario: null,
                nome: '',
                email: '',
                curso: '',
            },
            //reservas
            pendentes: [],
            aprovadas: [],
            negadas: [],
            //sistema
            logado: false,
            professor: false,
            divNotificacoes: false,
            divPerfil: false,
            pesquisa: "",
        };
    },
    inject: ['urlBase'],
    provide() {
        return {
            isProfessor: Vue.computed(() => this.professor)
        };
    },
    //métodos
    methods: {
        //sistema
        alteraNotificacoes() {
            this.divNotificacoes = !this.divNotificacoes;
        },

        alteraPerfil() {
            this.divPerfil = !this.divPerfil;
        },

        fechaNotificacoes() {
            this.divNotificacoes = false;
        },

        fechaPerfil() {
            this.divPerfil = false;
        },

        clickForaNotificacoes(event) {
            if (
                this.$refs.iconNotificacoes &&
                this.$refs.notificacoesMenu &&
                !this.$refs.iconNotificacoes.contains(event.target) &&
                !this.$refs.notificacoesMenu.contains(event.target)
            ) {
                this.fechaNotificacoes();
            }
        },

        clickForaPerfil(event) {
            if (
                this.$refs.perfilMenu &&
                this.$refs.iconPerfil &&
                !this.$refs.perfilMenu.contains(event.target) &&
                !this.$refs.iconPerfil.contains(event.target)
            ) {
                this.fechaPerfil();
            }
        },

        limparPesquisa() {
            this.pesquisa = ""; // Limpa o campo de pesquisa
        },

        //deslogar
        logout() {
            localStorage.removeItem("id_usuario");
            localStorage.removeItem("token");
            localStorage.removeItem("usuario_nome");
            if (this.$refs.notificacoesMenu && this.divNotificacoes) {
                this.fechaNotificacoes();
            }

            if (this.$refs.perfilMenu && this.divPerfil) {
                this.fechaPerfil();
            }
            this.usuario = {};
            this.logado = false;
            this.$router.push('/');
        },

        //se apertar no formulario de login, checa o usuário
        handleLoginSuccess() {
            this.logado = true;
            this.getUserInfo();
        },

        //checa se possui token
        checkAuthStatus() {
            const token = localStorage.getItem('token');
            this.logado = !!token;
        },

        //obter usuário logado
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
                this.usuario.nome = data.nome || "Não especificado";
                this.usuario.email = data.email || "Não especificado";
                this.usuario.perfil = data.perfil || "Não especificado";
                localStorage.setItem('usuario_nome', this.usuario.nome);

                if(this.usuario.perfil == 'Professor'){
                    this.professor = true;
                } else {
                    this.professor = false;
                }
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        },

        //obter reservas feitas pelo usuário logado e organizar nas notificações
        async getReservas() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario) return;

            try {
                const responsePendentes = await fetch(`${this.urlBase}reserve/profestado/${id_usuario}/pendente`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const responseAprovadas = await fetch(`${this.urlBase}reserve/profestado/${id_usuario}/aprovada`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const responseNegadas = await fetch(`${this.urlBase}reserve/profestado/${id_usuario}/negada`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const pendentes = await responsePendentes.json();
                const aprovadas = await responseAprovadas.json();
                const negadas = await responseNegadas.json();

                this.pendentes = Array.isArray(pendentes) && pendentes.length > 0 ? pendentes : [];
                this.aprovadas = Array.isArray(aprovadas) && aprovadas.length > 0 ? aprovadas : [];
                this.negadas = Array.isArray(negadas) && negadas.length > 0 ? negadas : [];

                for (const reserva of [...this.pendentes, ...this.aprovadas, ...this.negadas]) {
                    reserva.nome_laboratorio = await this.getLaboratorioName(reserva.id_laboratorio);
                    reserva.nome_disciplina = await this.getDisciplinaName(reserva.id_disciplina);
                }

                console.log("Pendentes:", this.pendentes);
                console.log("Aprovadas:", this.aprovadas);
                console.log("Negadas:", this.negadas);

            } catch (error) {
                console.error('Erro ao obter reservas:', error);
            }
        },

        //obter nome do laboratório reservado
        async getLaboratorioName(id_laboratorio) {
            const token = localStorage.getItem('token');
            if (!id_laboratorio || !token) return null;

            try {
                const response = await fetch(`${this.urlBase}labs/${id_laboratorio}`, {
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
                const response = await fetch(`${this.urlBase}disciplina/${id_disciplina}`, {
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
    },

    //roda no início da vida do componente
    mounted() {
        this.getUserInfo();
        this.checkAuthStatus();
        this.getReservas();

        //adiciona o listener para cliques fora da div
        document.addEventListener("click", this.clickForaNotificacoes);
        document.addEventListener("click", this.clickForaPerfil);

        const tabs = document.querySelectorAll(".tab");
        const tabContents = document.querySelectorAll(".tab-content");
    
        tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));
    
            tab.classList.add("active");
            document
            .getElementById(`tab-${tab.dataset.tab}`)
            .classList.add("active");
        });
        });
    },
    beforeUnmount() {
        //remove o listener quando o componente for desmontado
        document.removeEventListener("click", this.clickForaNotificacoes);
        document.removeEventListener("click", this.clickForaPerfil);
    },

    //templates necessários de header, notificações e perfil
    template: `
      <main>
      <h1>Status das Reservas</h1>
      <div class="tabs">
            <div class="tab active" data-tab="Pendentes">Pendentes</div>
            <div class="tab" data-tab="Aprovadas">Aprovadas</div>
            <div class="tab" data-tab="Negadas">Negadas</div>
        </div>
            <div class="tab-content active" id="tab-Pendentes">
                <div v-if="pendentes.length > 0" class="pendentes">
                        <a v-for="reserva in pendentes" :key="reserva.id_reserva" href="#" class="card-pedido">
                            <div id="txt-card">
                                <p id="txt-card-lab">{{ reserva.nome_laboratorio }}</p>
                                <p id="txt-card-dic">{{ reserva.nome_disciplina }}</p>
                            </div>
                            <div id="txt-card-2">
                                <p id="txt-card-dia">{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).dataFormatada }}</p>
                                <p id="txt-card-hrs">{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).horaFormatada }}</p>
                            </div>
                        </a>
                </div>
                <div v-if="pendentes.length === 0">
                        <p id="txt-sem-reverva">Não há reservas pendentes.</p>
                </div>
            </div>
            <!-- Aprovadas -->
                <div class="tab-content" id="tab-Aprovadas">
                <div v-if="aprovadas.length > 0" class="aprovadas">
                        <a v-for="reserva in aprovadas" :key="reserva.id_reserva" href="#" class="card-pedido">
                            <div id="txt-card">
                                <p id="txt-card-lab">{{ reserva.nome_laboratorio }}</p>
                                <p id="txt-card-dic">{{ reserva.nome_disciplina }}</p>
                            </div>
                            <div id="txt-card-2">
                                <p id="txt-card-dia">{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).dataFormatada }}</p>
                                <p id="txt-card-hrs">{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).horaFormatada }}</p>
                            </div>
                        </a>
                </div>
                <div v-if="aprovadas.length === 0">
                        <p id="txt-sem-reverva">Não há reservas aprovadas.</p>
                </div>
            </div>

            <!-- Negadas -->
                <div class="tab-content" id="tab-Negadas">
                    <div v-if="negadas.length > 0" class="negadas">
                        <a v-for="reserva in negadas" :key="reserva.id_reserva" href="#" class="card-pedido">
                            <div id="txt-card">
                                <p id="txt-card-lab">{{ reserva.nome_laboratorio }}</p>
                                <p id="txt-card-dic">{{ reserva.nome_disciplina }}</p>
                            </div>
                            <div id="txt-card-2">
                                <p id="txt-card-dia">{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).dataFormatada }}</p>
                                <p id="txt-card-hrs">{{ formatarDataHora(reserva.data_inicial, reserva.horario_inicial).horaFormatada }}</p>
                            </div>
                        </a>
                    </div>
                    <div v-if="negadas.length === 0">
                            <p id="txt-sem-reverva">Não há reservas negadas.</p>
                    </div>
            </div>

      </main>
    `
};
