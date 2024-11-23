export const Laboratorio = {
  template: `
 <section id="titulo">
    <h1>*Adicione um novo andar</h1>
  </section>
  <section id="card-cinza">    
    <div id="app">
      <!-- Botão que ao ser clicado abre o modal -->
      <div 
        class="button-circle clickable-btn" 
        @click="openModal">
      </div>
    </div>
  </section>

  <!-- Modal (popup) com estilo de card -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-card">
      <!-- Topo do Modal com fundo vermelho e título em branco -->
      <div class="modal-header">
        <h3>ADICIONAR ANDAR</h3>
      </div>

      <!-- titulo "+andar" do pop up -->
      <div id="titulo-andar">
        <span>+</span><h1>Andar</h1>
      </div>

      <!-- Campo de entrada para o nome -->
      <p class="p">NOME:</p>
      <input type="text" v-model="andarName" placeholder="Nome do andar">

      <!-- Espaçamento entre os elementos -->
      <p class="p">COR:</p>

      <div>
        <select name="select-cores" id="select-cores" v-model="selectedColor">
          <option v-for="(cor, index) in cores" :key="index" :value="cor.hex">
            {{ cor.nome }}
          </option>
        </select>
      </div>

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
        <button @click="submitInput" class="create-btn">Criar</button>
        <button @click="closeModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  </div>

  <!-- Carrossel de andares -->
  <div class="carrossel-container">
    <div v-for="(andar, index) in andares" :key="index" class="carrossel-column">
      <div class="carousel-item" :style="{ backgroundColor: andar.cor }">
        <div class="andar-name" :style="{ backgroundColor: andar.cor }">
          {{ andar.nome }}
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      isModalOpen: false, // Controla se o modal está aberto
      andarName: '', // Armazena o nome do andar
      selectedColor: '', // Armazena a cor selecionada
      message: null, // Mensagem de erro ou sucesso
      cores: [
        { nome: 'Vermelho', hex: '#FF0000' },
        { nome: 'Azul', hex: '#0000FF' },
        { nome: 'Verde', hex: '#008000' },
        { nome: 'Amarelo', hex: '#FFFF00' },
        { nome: 'Preto', hex: '#000000' },
        { nome: 'Branco', hex: '#FFFFFF' },
        { nome: 'Rosa', hex: '#FFC0CB' },
        { nome: 'Laranja', hex: '#FFA500' },
        { nome: 'Roxo', hex: '#800080' },
        { nome: 'Cinza', hex: '#808080' }
      ],
      andares: [] // Armazena os andares criados
    };
  },
  methods: {
    // Função para abrir o modal
    openModal() {
      this.isModalOpen = true;
    },
    // Função para fechar o modal
    closeModal() {
      this.isModalOpen = false;
    },
    // Função para enviar o novo andar
    submitInput() {
      if (this.andarName && this.selectedColor) {
        // Envia os dados do novo andar para a API
        fetch('http://localhost:3000/andar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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
            this.closeModal();
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
        },
        body: JSON.stringify({
          nome: this.andarName,
          cor: this.selectedColor
        }),
      }
      .then(response => response.json())
      .then(data => {
        this.andares = data;
      })
      .catch(error => {
        console.error('Erro ao carregar os andares:', error);
      }),
    })
        if (nomeAndar && corSelecionada !== "Selecione uma cor") {
          // Cria o container do novo andar
          const novoAndarContainer = document.createElement("div");
          novoAndarContainer.classList.add("andar-container");

          // Cria o título do andar com a cor selecionada
          const tituloAndar = document.createElement("div");
          tituloAndar.classList.add("titulo-andar");

          // Aplica a cor de fundo selecionada no título do andar
          tituloAndar.style.backgroundColor = getCorSelecionada(corSelecionada);
          tituloAndar.textContent = nomeAndar;

          // Adiciona o título ao container do andar
          novoAndarContainer.appendChild(tituloAndar);
    },
  },
  created() {
    this.loadAndares();
  }
};