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
    <input type="text" v-model="inputValue" placeholder="Nome do andar">

    <!-- Espaçamento entre os elementos -->
    <p class="p">COR:</p>

    <div class="box-input-cores">
      <select name="select-cores" id="select-cores"></select>
    </div>

    <!-- pequeno aviso em vermelho-->
    <div id="aviso">
        <h2>*Após criar o andar será possível personalizar os laboratórios</h2>
    </div>

    <!-- Botões de ação -->
    <div class="modal-actions">
      <button @click="submitInput" class="create-btn">Criar</button>
      <button @click="closeModal" class="cancel-btn">Cancelar</button>
    </div>
  </div>
</div>
`,
  data() {
    return {
      isModalOpen: false, // Controla se o modal está aberto
      inputValue: '',// Armazena o valor do input
      selectedColor: '#ffffff',
    };
  },
  methods: {
    // Função para abrir o modal
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitInput() {
      console.log('Nome do Andar:', this.inputValue);
      console.log('Cor Selecionada:', this.selectedColor);
      this.closeModal();
    },
  }
  //   data() {
  //     return {
  //       andares: [], // Lista de andares criados
  //       nomeAndar: "", // Nome do novo andar
  //       corSelecionada: "Selecione uma cor", // Cor do novo andar
  //       nomeLaboratorio: "", // Nome do novo laboratório
  //       andarSelecionado: null, // ID do andar onde será criado o laboratório
  //       cores: [ // Cores disponíveis para seleção
  //         { nome: "Rosa", hex: "#EB6E8E" },
  //         { nome: "Azul", hex: "#337BC3" },
  //         { nome: "Amarelo", hex: "#FFB303" },
  //         { nome: "Roxo", hex: "#5A3168" },
  //         { nome: "Verde", hex: "#2D854E" },
  //         { nome: "Vermelho", hex: "#eb1f2c" },
  //         { nome: "Laranja", hex: "#ff8324" },
  //         { nome: "Cinza", hex: "#575757" },
  //         { nome: "Marrom", hex: "rgb(147, 37, 37)" },
  //         { nome: "Preto", hex: "black" },
  //       ],
  //       mostrarPopupAndar: false,
  //       mostrarPopupLaboratorio: false,
  //     };
  //   },
  //   methods: {
  //     // Exibir e fechar pop-ups
  //     abrirPopupAndar() {
  //       this.mostrarPopupAndar = true;
  //     },
  //     abrirPopupLaboratorio(andarId) {
  //       this.andarSelecionado = andarId;
  //       this.mostrarPopupLaboratorio = true;
  //     },
  //     fecharPopup() {
  //       this.mostrarPopupAndar = false;
  //       this.mostrarPopupLaboratorio = false;
  //     },

  //     // Cria um novo andar
  //     async criarAndar() {
  //       if (!this.nomeAndar || this.corSelecionada === "Selecione uma cor") {
  //         alert("Por favor, preencha o nome do andar e selecione uma cor.");
  //         return;
  //       }

  //       const novoAndar = {
  //         nome: this.nomeAndar,
  //         cor: this.cores.find(cor => cor.nome === this.corSelecionada)?.hex || "#d9d9d9",
  //       };

  //       // Envia o novo andar para o backend
  //       try {
  //         const response = await fetch("http://localhost:3000/andares", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(novoAndar),
  //         });
  //         const resultado = await response.json();
  //         this.andares.push({ ...resultado, laboratorios: [] });
  //         this.nomeAndar = "";
  //         this.corSelecionada = "Selecione uma cor";
  //         this.fecharPopup();
  //       } catch (error) {
  //         console.error("Erro ao criar andar:", error);
  //       }
  //     },

  //     // Cria um novo laboratório
  //     async criarLaboratorio() {
  //       if (!this.nomeLaboratorio || !this.andarSelecionado) {
  //         alert("Por favor, preencha o nome do laboratório.");
  //         return;
  //       }

  //       const novoLaboratorio = { nome: this.nomeLaboratorio, andarId: this.andarSelecionado };

  //       // Envia o laboratório para o backend
  //       try {
  //         const response = await fetch("http://localhost:3000/laboratorios", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(novoLaboratorio),
  //         });
  //         const resultado = await response.json();

  //         // Atualiza a lista de laboratórios no andar correspondente
  //         const andar = this.andares.find(a => a.id === this.andarSelecionado);
  //         if (andar) andar.laboratorios.push(resultado);

  //         this.nomeLaboratorio = "";
  //         this.fecharPopup();
  //       } catch (error) {
  //         console.error("Erro ao criar laboratório:", error);
  //       }
  //     },

  //     // Seleciona uma cor
  //     selecionarCor(corNome) {
  //       this.corSelecionada = corNome;
  //     },

  //     // Busca andares do backend
  //     async carregarAndares() {
  //       try {
  //         const response = await fetch("http://localhost:3000/andares");
  //         this.andares = await response.json();
  //       } catch (error) {
  //         console.error("Erro ao carregar andares:", error);
  //       }
  //     },
  //   },
  //   created() {
  //     this.carregarAndares(); // Carregar andares ao inicializar
  //   },
  //   template: `
  //     <section id="titulo">
  //       <h1>Gerenciamento de Andares e Laboratórios</h1>
  //     </section>

  //     <section id="card-cinza">
  //       <img id="btn-adicionar-andar" src="images/mais.png" alt="Adicionar Andar" @click="abrirPopupAndar">
  //     </section>

  //     <div id="andares-container">
  //       <div v-for="andar in andares" :key="andar.id" class="card-andar" :style="{ backgroundColor: andar.cor }">
  //         <h2>{{ andar.nome }}</h2>
  //         <div class="carrossel-laboratorios">
  //           <div v-for="lab in andar.laboratorios" :key="lab.id" class="card-laboratorio">{{ lab.nome }}</div>
  //           <div class="card-laboratorio card-adicionar-lab" @click="abrirPopupLaboratorio(andar.id)">
  //             <img src="images/mais.png" alt="Adicionar Laboratório">
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div id="popup-andar" class="popup" v-show="mostrarPopupAndar">
  //       <div class="popup-content">
  //         <button class="btn-fechar" @click="fecharPopup"><img src="images/x.png" alt="Fechar"></button>
  //         <h1>Adicionar Andar</h1>
  //         <form @submit.prevent="criarAndar">
  //           <input type="text" v-model="nomeAndar" placeholder="Nome do Andar">
  //           <div class="custom-select">
  //             <div class="selected-option">{{ corSelecionada }}</div>
  //             <ul class="options-list">
  //               <li v-for="cor in cores" :key="cor.nome" @click="selecionarCor(cor.nome)" :style="{ color: cor.hex }">
  //                 {{ cor.nome }}
  //               </li>
  //             </ul>
  //           </div>
  //           <button type="submit">Criar</button>
  //         </form>
  //       </div>
  //     </div>

  //     <div id="popup-laboratorio" class="popup" v-show="mostrarPopupLaboratorio">
  //       <div class="popup-content">
  //         <button class="btn-fechar" @click="fecharPopup"><img src="Images/x.png" alt="Fechar"></button>
  //         <h1>Adicionar Laboratório</h1>
  //         <form @submit.prevent="criarLaboratorio">
  //           <input type="text" v-model="nomeLaboratorio" placeholder="Nome do Laboratório">
  //           <button type="submit">Criar</button>
  //         </form>
  //       </div>
  //     </div>
  //   `,
};
