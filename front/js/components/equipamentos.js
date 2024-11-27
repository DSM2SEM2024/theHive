export const Equipamentos = {
    inject: ['urlBase'],
    data() {
      return {
        showPopup: false,
        equipmentName: "",
        equipmentNumber: null,
        softwareList: [],
        selectedSoftwares: [],
        equipmentCollection: [], // Equipamentos carregados do banco
        allSoftwares: [], // Todos os softwares disponíveis
        errors: {
          equipmentName: false,
          equipmentNumber: false,
        },
      };
    },
    methods: {
      // Abre o popup
      openPopup() {
        this.showPopup = true;
      },
      // Fecha o popup e reseta os campos
      closePopup() {
        this.showPopup = false;
        this.equipmentName = "";
        this.equipmentNumber = null;
        this.selectedSoftwares = [];
        this.errors.equipmentName = false;
        this.errors.equipmentNumber = false;
      },
      // Valida o formulário antes de enviar
      validateForm() {
        this.errors.equipmentName = !this.equipmentName.trim();
        this.errors.equipmentNumber = !this.equipmentNumber || isNaN(this.equipmentNumber);
  
        return !this.errors.equipmentName && !this.errors.equipmentNumber;
      },
      // Salva um novo equipamento no banco via POST
      async saveEquipment() {
        if (!this.validateForm()) {
          return;
        }
  
        try {
          // Envia o equipamento para o servidor
          const response = await fetch(`${this.urlBase}equipamento`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: this.equipmentName,
              number: this.equipmentNumber,
              softwares: this.selectedSoftwares, // IDs dos softwares selecionados
            }),
          });
  
          if (!response.ok) {
            throw new Error('Falha ao salvar equipamento.');
          }
  
          // Atualiza a lista local após o salvamento bem-sucedido
          const newEquipment = await response.json();
          this.equipmentCollection.push(newEquipment);
  
          // Fecha o popup e reseta os campos
          this.closePopup();
        } catch (error) {
          console.error('Erro ao salvar equipamento:', error);
          alert('Não foi possível salvar o equipamento.');
        }
      },
      // Carrega os equipamentos existentes via GET
      async fetchEquipments() {
        try {
          const response = await fetch(`${this.urlBase}equipamento`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Falha ao carregar equipamentos.');
          }
  
          this.equipmentCollection = await response.json();
        } catch (error) {
          console.error('Erro ao carregar equipamentos:', error);
        }
      },
      // Carrega os softwares existentes via GET
      async fetchSoftwares() {
        try {
          const response = await fetch(`${this.urlBase}software`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Falha ao carregar softwares.');
          }
  
          this.allSoftwares = await response.json();
        } catch (error) {
          console.error('Erro ao carregar softwares:', error);
        }
      },
    },
    async mounted() {
      // Carrega os equipamentos e softwares ao montar o componente
      await Promise.all([this.fetchEquipments(), this.fetchSoftwares()]);
    },
    template: `
      <div>
        <h1 id="titulo">Equipamentos</h1>
        <button @click="openPopup" class="create-user-button">Criar Equipamento</button>
  
        <!-- Lista de Equipamentos -->
        <div class="equipment-container">
          <div v-for="(equipment, index) in equipmentCollection" :key="index" class="equipment-card">
            <h3>{{ equipment.name }} (Número: {{ equipment.number }})</h3>
            <ul>
              <li v-for="(software, sIndex) in equipment.softwares" :key="sIndex">{{ software.name }}</li>
            </ul>
          </div>
        </div>
  
        <!-- Popup -->
        <div v-if="showPopup" class="popup-overlay">
          <div class="popup">
            <h2 id="titulo">Criar Equipamento</h2>
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
              <div class="form-group">
                <label for="equipmentNumber">Número do Equipamento (Obrigatório):</label>
                <input 
                  placeholder="Número do Equipamento"
                  type="number"
                  id="equipmentNumber" 
                  v-model="equipmentNumber" 
                  :class="{ 'input-error': errors.equipmentNumber }"
                />
                <p v-if="errors.equipmentNumber" class="error-text">Este campo é obrigatório.</p>
              </div>
              <div class="form-group">
                <label for="softwares">Softwares Associados:</label>
                <select 
                  id="softwares" 
                  v-model="selectedSoftwares" 
                  multiple
                >
                  <option 
                    v-for="software in allSoftwares" 
                    :key="software.id_software" 
                    :value="software.id_software"
                  >
                    {{ software.nome }}
                  </option>
                </select>
              </div>
              <div class="modal-actions">
                <button @click="closePopup" class="cancel-btn">Cancelar</button>
                <button @click.prevent="saveEquipment" class="save-btn">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `,
  };
  