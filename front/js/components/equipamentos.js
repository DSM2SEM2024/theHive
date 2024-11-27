export const Equipamentos = {
    data() {
        return {
            showEquipmentPopup: false,
            showSoftwarePopup: false,
            equipmentName: "",
            newSoftware: "",
            numero: "",
            currentEquipmentIndex: null,
            equipmentCollection: [], // Lista de equipamentos criados
            errors: {
                equipmentName: false,
                newSoftware: false,
                numero: false
            },
        };
    },
    inject: ['urlBase'], // Injecta a urlBase

    methods: {
        // Recarregar todos os equipamentos e softwares (GET)
        loadEquipments() {
            const token = localStorage.getItem('token'); // Recupera o token
            fetch(`${this.urlBase}equipamento`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Utiliza o token na requisição
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar equipamentos');
                    }
                    return response.json();
                })
                .then(data => {
                    this.equipmentCollection = data.map(equipment => ({
                        ...equipment,
                        name: equipment.nome || '', 
                    }));
                })
                .catch(error => {
                    console.error('Erro ao carregar os equipamentos:', error);
                });
        },
        removerEquipamento(index){
            const token = localStorage.getItem('token');
            fetch(`${this.urlBase}equipamento/${index}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Utiliza o token na requisição
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar equipamentos');
                    }
                    return response.json();
                })
                .then(data => {
                    if(data.status){
                        alert('removido com sucesso')
                        this.equipmentCollection.splice(index, 1)
                        this.loadEquipments();
                    }
                })
                .catch(error => {
                    console.error('Erro ao remover os equipamentos:', error);
                });
            
        },
        // Salvar novo equipamento (POST)
        saveEquipment() {
            const token = localStorage.getItem('token'); // Recupera o token
            if (!this.equipmentName.trim()) {
                this.errors.equipmentName = true;
                return;
            }
            this.errors.equipmentName = false;

            const newEquipment = {
                nome: this.equipmentName,
                software: this.newSoftware,
                numero: this.numero
            };

            fetch(`${this.urlBase}equipamento`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Utiliza o token na requisição
                },
                body: JSON.stringify(newEquipment)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao criar equipamento');
                    }
                    return response.json();
                })
                .then(data => {
                    // Adiciona o novo equipamento à coleção
                    this.equipmentCollection.push(data);
                    this.closeEquipmentPopup(); // Fecha o popup
                    this.equipmentName = ""; // Limpa o campo
                    this.loadEquipments();
                })
                .catch(error => {
                    console.error('Erro ao criar equipamento:', error);
                });
        },

        // Métodos de manipulação do popup de equipamento
        openEquipmentPopup() {
            this.showEquipmentPopup = true;
        },
        closeEquipmentPopup() {
            this.showEquipmentPopup = false;
            this.equipmentName = "";
            this.errors.equipmentName = false;
        },
    },

    mounted() {
        this.loadEquipments();
    },

    template: `
      <div>
        <h1 id="titulo">Equipamentos</h1>
        <button @click="openEquipmentPopup" class="create-user-button">Criar Equipamento</button>
  
        <!-- Lista de Equipamentos -->
        <div class="equipment-container">
          <div v-for="(equipment, index) in equipmentCollection" :key="index" class="equipment-card">
            <h4>Nº: {{ equipment.numero }}</h4>
            <h4>{{ equipment.name }}</h4>
            <p>Softwares: {{ equipment.id_software }}</p>
            <div class="modal-actions">
              <button @click="removerEquipamento(equipment.id_equipamento)" class="cancel-btn">Deletar</button>
            </div>
          </div>
        </div>
  
        <!-- Popup de Criação de Equipamento -->
        <div v-if="showEquipmentPopup" class="popup-overlay">
          <div class="popup">
            <h2>Criar Equipamento</h2>
            <form>
            <div class="form-group">
                <label for="numero">numero do Equipamento (Obrigatório):</label>
                <input
                  placeholder="numero do Equipamento"
                  type="number"
                  id="numero"
                  v-model="numero"
                  :class="{ 'input-error': errors.numero }"
                />
                <p v-if="errors.equipmentName" class="error-text">Este campo é obrigatório.</p>
              </div>
              <div class="form-group">
                <label for="equipmentName">Nome do Equipamento (Obrigatório):</label>
                <input
                  placeholder="Nome do Equipamento"
                  type="text"
                  id="equipmentName"
                  v-model="equipmentName"
                  :class="{ 'input-error': errors.equipmentName }"
                />
                <p v-if="errors.equipmentName" class="error-text">Este campo é obrigatório.</p>
              </div>
              <div class="form-group">
                <label for="newSoftware">Nome dos softwares (separados por vírgula):</label>
                <input
                  placeholder="Nome dos softwares"
                  type="text"
                  id="newSoftware"
                  v-model="newSoftware"
                  :class="{ 'input-error': errors.newSoftware }"
                />
                <p v-if="errors.newSoftware" class="error-text">Este campo é obrigatório.</p>
              </div>
              <div class="modal-actions">
                <button @click="closeEquipmentPopup" class="cancel-btn">Cancelar</button>
                <button @click="saveEquipment" class="salvar-btn">Salvar</button>
              </div>
            </form>
          </div>
        </div>
    </div>
    `,
};
