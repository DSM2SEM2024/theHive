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

    <div v-for="(andar, index) in andares" :key="index" class="container-andares">
      <div class="carousel-item" :style="{ backgroundColor: andar.cor }">
        <p class="andar-name">
          {{ andar.nome }}
        </p>
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
      andarName: '', // Armazena o nome do andar
      selectedColor: '', // Armazena a cor selecionada
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
      andares: [] // Armazena os andares criados
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
    // Função para mostrar mensagens de erro ou sucesso
    showMessage(type, text) {
      this.message = { type, text };
      setTimeout(() => this.message = null, 3000); // Mensagem desaparece após 3 segundos
    },
    // Função para carregar os andares do banco de dados
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
        this.andares = data;
      })
      .catch(error => {
        console.error('Erro ao carregar os andares:', error);
      });
    
    }
  },
  created() {
    this.loadAndares();
  }
};
