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
                    // Associa os equipamentos e seus softwares
                    this.equipmentCollection = data.map(equipment => ({
                        ...equipment,
                        softwares: equipment.softwares || [] // Garantir que softwares seja um array
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

        // Adicionar software a um equipamento existente (POST)
        addSoftware() {
            const token = localStorage.getItem('token'); // Recupera o token
            if (!this.newSoftware.trim()) {
                this.errors.newSoftware = true;
                return;
            }
            this.errors.newSoftware = false;

            const softwareData = {
                name: this.newSoftware.trim()
            };

            fetch(`${this.urlBase}software`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Utiliza o token na requisição
                },
                body: JSON.stringify({
                    nome: this.newSoftware.trim() // Nome do software que o usuário está criando
                })
                
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao adicionar software');
                    }
                    return response.json();
                })
                .then(data => {
                    // Adiciona o software ao equipamento atual
                    this.equipmentCollection[this.currentEquipmentIndex].softwares.push(data.name);
                    this.closeSoftwarePopup(); // Fecha o popup
                    this.newSoftware = ""; // Limpa o campo
                })
                .catch(error => {
                    console.error('Erro ao adicionar software:', error);
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

        // Métodos de manipulação do popup de software
        openSoftwarePopup(index) {
            this.currentEquipmentIndex = index;
            this.newSoftware = "";
            this.errors.newSoftware = false;
            this.showSoftwarePopup = true;
        },
        closeSoftwarePopup() {
            this.showSoftwarePopup = false;
            this.currentEquipmentIndex = null;
            this.newSoftware = "";
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
            <h3>{{ equipment.equipmentName }}</h3>
            <ul>
              <li v-for="(software, sIndex) in equipment.softwares" :key="sIndex">{{ software }}</li>
            </ul>
            <div class="modal-actions">
              <button @click="equipmentCollection.splice(index, 1)" class="cancel-btn">Deletar</button>
              <button @click="openSoftwarePopup(index)" class="create-btn"> + Software</button>
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
  
        <!-- Popup de Adição de Software -->
        <div v-if="showSoftwarePopup" class="popup-overlay">
          <div class="popup">
            <h2>Adicionar Software</h2>
            <form>
              <div class="form-group">
                <label for="newSoftware">Nome do Software (Obrigatório):</label>
                <input
                  placeholder="Nome do Software"
                  type="text"
                  id="newSoftware"
                  v-model="newSoftware"
                  :class="{ 'input-error': errors.newSoftware }"
                />
                <p v-if="errors.newSoftware" class="error-text">Este campo é obrigatório.</p>
              </div>
              <div class="modal-actions">
                <button @click="closeSoftwarePopup" class="cancel-btn">Cancelar</button>
                <button @click="addSoftware" class="salvar-btn">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `,
};
