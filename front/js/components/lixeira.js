export const Lixeira = {
    data() {
        return {
          usuariosDesativados: [], // Armazenará a lista de usuários desativados
          equipamentosDesativados: [], // Armazenará a lista de equipamentos desativados
          laboratoriosDesativados: [], // Armazenará a lista de laboratórios desativados
          pesquisa: '', // Para pesquisa
          urlBase: 'http://localhost:3000/', // Substitua pela URL real da sua API
          isProfessor: true, // Se é professor ou não
        };
      },
      
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
                this.equipamentosDesativados = data;  // Atualiza o estado com a resposta completa
            } catch (error) {
                console.error('Erro ao buscar equipamentos desativado:', error);
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
    mounted() {
        // Ao carregar o componente, obtemos os dados dos usuários, equipamentos e laboratórios desativados
        this.getUsuariosDesativados();
        this.getEquipamentosDesativados();
        this.getLaboratoriosDesativados();
      },
    },    
      template: `
        <div>
          <p id="titulo-ola">
            Olá, seja bem-vindo(a) à <strong>Lixeira</strong>.
          </p>
          <h2>Lixeira</h2>
    
          <div class="card-com-itens" v-if="usuariosDesativados && usuariosDesativados.length > 0">
            <div v-for="usuario in usuariosDesativados" :key="usuario.id_usuario">
              <div class="itensDesativados">
                <div id="sup-card-itens">
                  <p>{{ usuario.nome }}</p>
                </div>
                <div id="acoes-card-itens">
                  <button class="reativar" @click="reativarUsuario(usuario.id_usuario)">Reativar</button>
                  <button class="deletar" @click="deletarUsuario(usuario.id_usuario)">Deletar</button>
                </div>
              </div>
            </div>
          </div>
    
          <div class="card-com-itens" v-if="equipamentosDesativados && equipamentosDesativados.length > 0">
            <div v-for="equipamento in equipamentosDesativados" :key="equipamento.id_equipamento">
              <div class="itensDesativados">
                <div id="sup-card-itens">
                  <p>{{ equipamento.nome }}</p>
                </div>
                <div id="acoes-card-itens">
                  <button class="reativar" @click="reativarEquipamento(equipamento.id_equipamento)">Reativar</button>
                  <button class="deletar" @click="deletarEquipamento(equipamento.id_equipamento)">Deletar</button>
                </div>
              </div>
            </div>
          </div>
    
          <div class="card-com-itens" v-if="laboratoriosDesativados && laboratoriosDesativados.length > 0">
            <div v-for="laboratorio in laboratoriosDesativados" :key="laboratorio.id_laboratorio">
              <div class="itensDesativados">
                <div id="sup-card-itens">
                  <p>{{ laboratorio.nome }}</p>
                </div>
                <div id="acoes-card-itens">
                  <button class="reativar" @click="reativarLaboratorio(laboratorio.id_laboratorio)">Reativar</button>
                  <button class="deletar" @click="deletarLaboratorio(laboratorio.id_laboratorio)">Deletar</button>
                </div>
              </div>
            </div>
          </div>
    
          <div class="card-reservas" v-if="!usuariosDesativados.length && !equipamentosDesativados.length && !laboratoriosDesativados.length">
            <p>{{ isProfessor ? 'Você não possui reservas até o momento' : 'Nenhum usuário, laboratório ou equipamento desativado.' }}</p>
          </div>
        </div>
      `
};