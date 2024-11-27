export const Lixeira = {
    methods: {
        handleClick() {
            location.reload();
        },

        limparPesquisa() {
            this.pesquisa = ''; // Limpa o campo de pesquisa
        },
        
        //obter Usuarios Desativados
        async getUsuariosDesativados() {
            const token = localStorage.getItem('token');
    
            try {
                const response = await fetch(`${this.urlBase}users/estado/0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao obter usuarios desativados');
                }
    
                const data = await response.json();
                return data.nome || "Erro ao obter usuarios desativados";
            } catch (error) {
                console.error('Erro ao buscar usuarios desativado:', error);
                return "Erro ao obter usuarios desativados";
            }
        },

        async desativarUsuario(id_usuario) {
            const token = localStorage.getItem('token');
            if (!id_usuario || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}users/${id_usuario}/off`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao desativar usuario');
                }
    
                const data = await response.json();
                return data.nome || "Erro ao desativar usuario";
            } catch (error) {
                console.error('Erro ao desativar usuario:', error);
                return "Erro ao desativar usuario";
            }
        },
        async reativarUsuario(id_usuario) {
            const token = localStorage.getItem('token');
            if (!id_usuario || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}users/${id_usuario}/on`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao reativar o usuario');
                }
    
                const data = await response.json();
                console.log('Usuario reativado:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Erro ao reativar o usuario';
            } catch (error) {
                console.error('Erro ao reativar o usuario:', error);
            }
        },
    
        async deletarUsuario(id_usuario) {
            const token = localStorage.getItem('token');
            if (!id_usuario || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}users/${id_usuario}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao deletar o usuário');
                }
    
                const data = await response.json();
                console.log('Usuario deletado:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Erro ao deletar o usuário';
            } catch (error) {
                console.error('Erro ao deletar o usuário:', error);
            }
        },
        async getEquipamentosDesativados() {
            const token = localStorage.getItem('token');
    
            try {
                const response = await fetch(`${this.urlBase}equipamento/estado/0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao obter equipamentos desativados');
                }
    
                const data = await response.json();
                return data.nome || "Erro ao obter equipamentos desativados";
            } catch (error) {
                console.error('Erro ao buscar equipamentos desativado:', error);
                return "Erro ao obter equipamentos desativados";
            }
        },

        async desativarEquipamento(id_equipamento) {
            const token = localStorage.getItem('token');
            if (!id_equipamento || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}equipamento/${id_equipamento}/off`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao desativar equipamento');
                }
    
                const data = await response.json();
                return data.nome || "Erro ao desativar equipamento";
            } catch (error) {
                console.error('Erro ao desativar equipamento:', error);
                return "Erro ao desativar equipamento";
            }
        },
        async reativarEquipamento(id_equipamento) {
            const token = localStorage.getItem('token');
            if (!id_equipamento || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}equipamento/${id_equipamento}/on`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao reativar o equipamento');
                }
    
                const data = await response.json();
                console.log('equipamento reativado:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Erro ao reativar o equipamento';
            } catch (error) {
                console.error('Erro ao reativar o equipamento:', error);
            }
        },
    
        async deletarEquipamento(id_equipamento) {
            const token = localStorage.getItem('token');
            if (!id_equipamento || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}equipamento/${id_equipamento}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao deletar o equipamento');
                }
    
                const data = await response.json();
                console.log('Usuario deletado:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Erro ao deletar o equipamento';
            } catch (error) {
                console.error('Erro ao deletar o equipamento:', error);
            }
        },
        async getLaboratoriosDesativados() {
            const token = localStorage.getItem('token');
    
            try {
                const response = await fetch(`${this.urlBase}labs/estado/0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao obter laboratorios desativados');
                }
    
                const data = await response.json();
                return data.nome || "Erro ao obter laboratorios desativados";
            } catch (error) {
                console.error('Erro ao buscar laboratorios desativado:', error);
                return "Erro ao obter laboratorios desativados";
            }
        },

        async desativarLaboratorio(id_laboratorio) {
            const token = localStorage.getItem('token');
            if (!id_laboratorio || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}labs/${id_laboratorio}/off`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao desativar laboratorio');
                }
    
                const data = await response.json();
                return data.nome || "Erro ao desativar laboratorio";
            } catch (error) {
                console.error('Erro ao desativar laboratorio:', error);
                return "Erro ao desativar laboratorio";
            }
        },
        async reativarLaboratorio(id_laboratorio) {
            const token = localStorage.getItem('token');
            if (!id_laboratorio || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}labs/${id_laboratorio}/on`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao reativar o laboratorio');
                }
    
                const data = await response.json();
                console.log('laboratorio reativado:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Erro ao reativar o laboratorio';
            } catch (error) {
                console.error('Erro ao reativar o laboratorio:', error);
            }
        },
    
        async deletarLaboratorio(id_laboratorio) {
            const token = localStorage.getItem('token');
            if (!id_laboratorio || !token) return null;
    
            try {
                const response = await fetch(`${this.urlBase}labs/${id_laboratorio}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao deletar o usuário');
                }
    
                const data = await response.json();
                console.log('laboratorio deletado:', data);

                location.reload();
                if (reserva) reserva.status_reserva = 'Erro ao deletar o usuário';
            } catch (error) {
                console.error('Erro ao deletar o usuário:', error);
            }
    },
    mounted(){
        this.getUsuariosDesativados();
        this.getEquipamentosDesativados();     
    },

    template: `
    <div>
    <p id="titulo-ola">
        Olá, seja bem vindo(a) a <strong>Lixeira</strong>.
    </p>
    <h2> Lixeira </h2>
    <div class="card-com-itens" v-if="reservas && reservas.length > 0">
            <div v-for="reserva in reservas" :key="reserva.id_reserva">
                <div class="itensDesativados">
                    <div id="sup-card-itens">
                        <p>{{ nome_usuario }}</p>
                    </div>
                    <div id="txt-card-0">
                    </div>
                    <div id="acoes-card-itens">
                        <button class="reativar" @click="reativarUsuario(users.id_usuario)">Reativar</button>
                        <button class="deletar" @click="deletarUsuario(users.id_usuario)">Deletar</button>
                    </div>
                    </div>
            </div>
        </div>

        <div class="card-reservas" v-if="!reservas || reservas.length === 0">
            <p>{{ isProfessor ? 'Você não possui reservas até o momento' : 'Nenhum usuário, laboratório ou equipamento desativado.' }}</p>
        </div>
    </div>
</div>
    `,
    }
}