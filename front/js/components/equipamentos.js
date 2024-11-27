export const Equipamentos = {
    data() {
        return {
            showEquipmentPopup: false,
            showSoftwarePopup: false,
            equipmentName: "",
            newSoftware: "",
            currentEquipmentIndex: null,
            equipmentCollection: [], // Lista de equipamentos criados
            errors: {
                equipmentName: false,
                newSoftware: false,
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

        // Salvar novo equipamento (POST)
        saveEquipment() {
            const token = localStorage.getItem('token'); // Recupera o token
            if (!this.equipmentName.trim()) {
                this.errors.equipmentName = true;
                return;
            }
            this.errors.equipmentName = false;

            const newEquipment = {
                name: this.equipmentName,
                softwares: []
            };

            fetch(`${this.urlBase}equipamento`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Utiliza o token na requisição
                },
                body: JSON.stringify({
                    nome: this.equipmentName, // Nome do equipamento que o usuário está criando
                    softwares: [] // Inicialmente, o equipamento pode não ter nenhum software
                })
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
            <h3>{{ equipment.name }}</h3>
            <div class="modal-actions">
              <button @click="equipmentCollection.splice(index, 1)" class="cancel-btn">Deletar</button>
            </div>
          </div>
        </div>
  
        <!-- Popup de Criação de Equipamento -->
        <div v-if="showEquipmentPopup" class="popup-overlay">
          <div class="popup">
            <h2>Criar Equipamento</h2>
            <form>
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
              <div class="modal-actions">
                <button @click="closeEquipmentPopup" class="cancel-btn">Cancelar</button>
                <button @click="saveEquipment" class="salvar-btn">Salvar</button>
              </div>
            </form>
          </div>
        </div>
    `,
};
