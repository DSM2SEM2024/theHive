export const Laboratorio = {
  template: `
  <h1 id="titulo" v-if="!isProfessor"> *Adicione um novo andar</h1>

  <div id="container-center">
    <div id="card-cinza" v-if="!isProfessor" @click="openModal">    

        <!-- Botão que ao ser clicado abre o modal -->
        <div 
          class="button-circle" 
          @click="openModal"> +
        </div>

    </div>
  </div>

  <!-- Modal (popup) com estilo de card -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-card">
      <!-- Topo do Modal com fundo vermelho e título em branco -->
      <div class="modal-header">
        <h3>ADICIONAR ANDAR</h3>
      </div>

      <!-- título "+andar" do pop-up -->
      <div id="titulo-andar">
        <span>+</span><h1>Andar</h1>
      </div>

    <form id="formulario-1">
      <!-- Campo de entrada para o nome -->
      <div class="p">
      <h2>NOME:</h2>
      </div>

      <div class="box-input-nome">
      <input type="text" class="input-nome" v-model="andarName" placeholder="Ex: Primeiro andar">
      </div>

      <!-- Espaçamento entre os elementos -->
      <div class="p">
      <h2>COR:</h2>
      </div>

      <div class="box-input-cor">
        <select name="select-cores" id="select-cores" v-model="selectedColor">
          <option v-for="(cor, index) in cores" :key="index" :value="cor.hex">
            {{ cor.nome }}
          </option>
        </select>
      </div>
    </form>
    
      <!-- pequeno aviso em vermelho-->
      <div id="aviso">
        <h2>*Após criar o andar será possível personalizar os laboratórios</h2>
      </div>

      <!-- Mensagens de erro ou sucesso -->
      <div v-if="message" :class="{'error': message.type === 'error', 'success': message.type === 'success'}">
        <p>{{ message.text }}</p>
      </div>

      <!-- Botões de ação -->
      <div class="modal-actions">
        <button @click="this.closeModal" class="cancel-btn">Cancelar</button>
        <button @click="handleClick" class="create-btn">Criar</button>
      </div>
    </div>
  </div>

  <!-- Carrossel de andares -->

  <div v-for="(andar, index) in andares" :key="index" class="container-andares" :style="{ '--cor-andar': andar.cor }">
  <!-- Andar Card -->
  <div class="carousel-item" :style="{ backgroundColor: andar.cor }">
    <p class="andar-name">{{ andar.nome }}</p>
  </div>

  <!-- Card cinza para adicionar laboratório -->
  <div id="card-cinza-laboratorio" v-if="!isProfessor" @click="openLabModal(andar)">
    <div class="button-circle">+</div>
  </div>

  <!-- Renderizar os laboratórios do andar -->
  <div v-if="andar.laboratorios.length > 0" v-for="(laboratorio, labIndex) in andar.laboratorios" :key="labIndex" class="card-lab">
  <!-- Barra superior do card -->
  <span id="barra-card"></span>

  <!-- Nome do laboratório -->
  <h3 id="nome-lab">{{ laboratorio.nome }}</h3>

  <!-- Conteúdo do laboratório -->
  <div class="lab-content">
    <!-- Imagem do laboratório -->
    <img id="img-lab" src="../../Images/lab.png" alt="Imagem de laboratório">

    <!-- Descrição do laboratório -->
    <div class="descricao-lab">
      <ul>
        <li id="capacidade"><strong>Capacidade:</strong><br> {{ laboratorio.capacidade }} alunos</li>
        <li id="equipamento"><strong>Equipamentos:</strong><br> {{ laboratorio.equipamento }}</li>
      </ul>
    </div>
  </div>

  <!-- Botão de calendário -->
  <button class="btn-calendario" 
          :data-laboratorio-id="laboratorio.id" 
          @click="verCalendario(laboratorio.id)">
    Ver calendário
  </button>
</div>


  <div v-if="isLabModalOpen" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h3>ADICIONAR LABORATÓRIO</h3>
      </div>
      <form id="formulario-1">
        <div class="p">
          <h2>NOME:</h2>
        </div>
        <div class="box-input-nome">
          <input type="text" class="input-nome" v-model="labName" placeholder="Ex: Sala 32">
        </div>
        <div class="p">
          <h2>CAPACIDADE:</h2>
        </div>
        <div class="box-input-nome">
          <input type="text" class="input-nome" v-model="labCap" placeholder="Ex: 23">
        </div>
        <div class="p">
          <h2>EQUIPAMENTOS:</h2>
        </div>

        <div class="box-input-equipamento">
          <select name="select-equipamento" id="select-equipamento" v-model="selectedEquipamento">
            <option v-for="(equipamento, index) in equipamentos" :key="index" :value="equipamento.id">
              {{ equipamento.nome }}
            </option>
          </select>
        </div>
      </form>
      <div class="modal-actions">
        <button @click="closeLabModal" class="cancel-btn">Cancelar</button>
        <button @click="addLaboratorio" @click="handlelClick" class="create-btn">Adicionar</button>
      </div>
    </div>
  </div>
  `,
  setup() {
    const isProfessor = Vue.inject('isProfessor');
    return { isProfessor };
},
  data() {
    return {
      isModalOpen: false, // Controla se o modal está aberto
      isLabModalOpen: false,
      andarName: '', // Armazena o nome do andar
      selectedColor: '', // Armazena a cor selecionada
      labName: null,
      labCap: null,
      selectedAndar:'',
      selectedEquipamento:'',
      message: null, // Mensagem de erro ou sucesso
      cores: [
        { nome: 'Vermelho', hex: '#B03648' },
        { nome: 'Azul', hex: '#337BC3' },
        { nome: 'Verde', hex: '#2D854E' },
        { nome: 'Amarelo', hex: '#FF8324' },
        { nome: 'Rosa', hex: '#EB6E8E' },
        { nome: 'Laranja', hex: '#FFA500' },
        { nome: 'Roxo', hex: '#5A3168' },
      ],
      andares: [], // Armazena os andares criados
    };
  },
  methods: {
    handleClick() {
      this.submitInput();
      this.closeModal();
      location.reload();
    },
    // Função para abrir o modal
    openModal() {
      this.isModalOpen = true;
    },
    // Função para fechar o modal
    async closeModal() {
      this.isModalOpen = false;
    },
    // Função para enviar o novo andar
    submitInput() {
      const token = localStorage.getItem('token');
      if (this.andarName && this.selectedColor) {
        // Envia os dados do novo andar para a API
        fetch('http://localhost:3000/andar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nome: this.andarName,
            cor: this.selectedColor
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Andar criado com sucesso') {
            // Atualiza a lista de andares
            this.andares.push({
              nome: this.andarName,
              cor: this.selectedColor
            });
            // Limpa os campos após a criação
            this.andarName = '';
            this.selectedColor = '';
            this.showMessage('success', 'Andar criado com sucesso!');
          }
        })
        .catch(error => {
          console.error('Erro ao criar o andar:', error);
          this.showMessage('error', 'Erro ao criar o andar. Tente novamente!');
        });
      } else {
        this.showMessage('error', 'Por favor, adicione o nome do andar e selecione uma cor!');
      }
    },
    handlelClick(){
      location.reload(); 
      this.closeLabModal();
    },
    showMessage(type, text) {
      this.message = { type, text };
      setTimeout(() => this.message = null, 3000);
    },
    loadAndares() {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/andar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        this.andares = data.map(andar => ({
          ...andar, 
          laboratorios: []
        }));
        this.andares.forEach(andar => {
          this.loadLabsByAndar(andar.id_andar);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os andares:', error);
      });
    },
    openLabModal(andar) {
      this.selectedAndar = andar;
      this.isLabModalOpen = true;
      console.log(this.selectedAndar);
    },
    closeLabModal() {
      this.isLabModalOpen = false;
      this.labName = '';
    },
    addLaboratorio() {
      if (!this.labName || !this.selectedAndar) {
        this.showMessage('error', 'Preencha o nome do laboratório');
        return;
      }
    
      if (!this.labCap || isNaN(this.labCap)) {
        this.showMessage('error', 'Preencha a capacidade do laboratório com um número válido!');
        return;
      }
    
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/labs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: this.labName,
          capacidade: this.labCap,
          andar: this.selectedAndar.id_andar,
          id_equipamento: this.selectedEquipamento
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Laboratório criado com sucesso') {
            this.showMessage('success', 'Laboratório adicionado com sucesso!');
            this.labName = '';
            this.labCap = '';
            this.selectedEquipamento = null;
          } else {
            this.showMessage('error', 'Erro ao adicionar laboratório!');
          }
        })
        .catch(error => {
          console.error('Erro ao adicionar laboratório:', error);
          this.showMessage('error', 'Erro ao adicionar laboratório! Tente novamente.');
        });
    },
    loadLabsByAndar(andarId) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/labs/andar/${andarId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          // Encontre o andar correspondente
          const andar = this.andares.find(a => a.id_andar === andarId);
          if (andar) {
            andar.laboratorios = data;
            console.log(`Laboratórios carregados para o andar ${andarId}:`, andar.laboratorios);
          } else {
            console.log(`Andar com ID ${andarId} não encontrado!`);
          }
        })
        .catch(error => {
          console.error('Erro ao carregar laboratórios:', error);
        });
    },
  },

  created() {
    this.loadAndares();
  }
};
