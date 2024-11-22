export const Laboratorio = {
  data() {
    return {
      andares: [], // Lista de andares criados dinamicamente
      nomeAndar: "",
      corAndar: "",
      laboratorios: [],
      nomeLaboratorio: "",
      corLaboratorio: "",
      imagemLaboratorio: "",
      materiais: [], // Lista para armazenar os materiais adicionados
      coresDisponiveis: [
        { nome: "rosa", cor: "#EB6E8E" },
        { nome: "azul", cor: "#337BC3" },
        { nome: "amarelo", cor: "#FFB303" },
        { nome: "roxo", cor: "#5A3168" },
        { nome: "verde", cor: "#2D854E" },
        { nome: "vermelho", cor: "#eb1f2c" },
        { nome: "laranja", cor: "#ff8324" },
        { nome: "cinza", cor: "#575757" },
        { nome: "marrom", cor: "#932525" },
        { nome: "preto", cor: "black" }
      ],
      mostrarCores: false, // Controle da visibilidade do menu de cores
    };
  },
  
  computed: {

    corSelecionada() {
      return this.corLaboratorio ? this.corLaboratorio : "Selecione uma cor";
    },
  },
  
  methods: {
    obterAndares() {
      fetch('http://localhost:3000/andar', {
        method: 'GET',
        headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
      })
      .then(response => response.json())
      .then(data => {
        container.innerHTML = ''; // Limpa o container
  
        data.forEach(andar => {
          const containerAndar = document.createElement('div');
          containerAndar.className = 'andar';
      
          containerAndar.innerHTML = `
            <h2>${andar.nome}</h2>
            <div class="cards-lab"></div>
          `;
          container.appendChild(containerAndar);
        })
      })
      
    },

    obterLaaboratorios() {
      fetch('http://localhost:3000/labs', {
        method: 'GET',
        headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
      })
      .then(response => response.json())
      .then(data => {
        data.forEach(laboratorio => {
          const card = document.createElement('article');
          card.className = 'card-lab';
          
          card.innerHTML = `
            <span id="barra-card"></span>
            <h3 id="nome-lab">${laboratorio.nome}</h3>
            <div class="lab-content">
              <img id="img-lab" src="assets/Images/lab.png" alt="Imagem de laboratório">
              <div class="descricao-lab">
                <ul>
                  <li id="capacidade"><strong>Capacidade:</strong><br> ${laboratorio.capacidade} alunos</li>
                  <li id="equipamento"><strong>Equipamentos:</strong><br> ${laboratorio.equipamento}</li>
                </ul>
              </div>
              <button class="btn-calendario" data-laboratorio-id="${laboratorio.idLaboratorio}" onclick="verCalendario(this)">Ver calendário</button>
          `;
      
          // Adiciona o card ao container
          container.appendChild(card);
        });
      })
      .catch(error => console.error('Erro ao buscar laboratórios:', error));
    },
    adicionarAndar() {
      //FETCH POST ANDAR + AUTORIZAÇÃO 
      // Emite evento para abrir o pop-up de criação de andar
      fetch('http://localhost:3000/andar', {
        method: 'POST',
        headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {

      })
      this.$emit("adicionarAndar");
    },
    atualizarAndares(novoAndar) {
      //FETCH PUT ANDAR + AUTORIZAÇÃO
      // Método chamado ao adicionar um novo andar
      fetch('http://localhost:3000/andar', {
        method: 'PUT',
        headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoAndar)
      })
        then(response => response.json())
        then(data => {

      })
      this.andares.push({ ...novoAndar, laboratorios: [] }); // Adiciona o andar com lista de laboratórios vazia
    },
    adicionarLaboratorio(idAndar, laboratorio) {
      //FETCH POST + AUTORIZAÇÃO
      // Localiza o andar e adiciona o laboratório
      fetch('http://localhost:3000/labs', {
        method: 'POST',
        headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(laboratorio)
      })
        then(response => response.json())
        then(data => {
          
        })
      },
      
    
    atualizarLaboratorios(novoLaboratorio) {
      //FETCH PUT + AUTORIZAÇÃO
      // Método chamado ao adicionar um novo laboratório
      fetch('http://localhost:3000/labs', {
        method: 'PUT',
        headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoLaboratorio)
      })
        then(response => response.json())
        then(data => {
          
        })

      this.laboratorios.push(novoLaboratorio);
    },
    deletarAndar(idAndar) {
      //FETCH DELETE + AUTORIZAÇÃO
      // Remove o andar
      this.andares = this.andares.filter(andar => andar.id !== idAndar);
    },
    
    
    deletarLaboratorio(idLaboratorio) {
      //FETCH DELETE + AUTORIZAÇÃO
      // Remove o laboratório
      this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.id !== idLaboratorio);
    },







    selecionarCor(cor) {
      this.corLaboratorio = cor;
      this.mostrarCores = false; // Fechar o menu de cores após a seleção
    },
    criarLaboratorio() {
      if (this.nomeLaboratorio && this.corLaboratorio && this.imagemLaboratorio) {
        const novoLaboratorio = {
          nome: this.nomeLaboratorio,
          cor: this.corLaboratorio,
          imagem: this.imagemLaboratorio,
          materiais: this.materiais,
        };
        this.$emit("laboratorioCriado", novoLaboratorio);
        this.fecharPopup();
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    },
    fecharPopup() {
      this.$emit("fecharPopup");
    },
    criarAndar() {
      if (this.nomeAndar && this.corAndar) {
        this.$emit("andarCriado", { nome: this.nomeAndar, cor: this.corAndar });
        this.fecharPopup();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    },
    fecharPopup() {
      this.$emit("fecharPopup");
    },
    selecionarCor(cor) {
      this.corAndar = cor;
      document.querySelector(".selected-option").textContent = cor;
    },
  

  template: `
    <section id="titulo">
      <h1>*Adicione um novo andar</h1>
    </section>

    <section id="card-cinza">
      <!-- Botão para adicionar andar -->
      <img 
        id="btn-adicionar-andar" 
        src="images/mais.png" 
        alt="adicionar andar" 
        @click="adicionarAndar"
      >
    </section>

    <!-- Sessão para exibir os andares criados -->
    <div id="andares-container">
      <div 
        v-for="andar in andares" 
        :key="andar.id" 
        class="card-andar"
        :style="{ backgroundColor: andar.cor }"
      >
        <!-- Nome do andar -->
        <h2>{{ andar.nome }}</h2>

        <!-- Carrossel de laboratórios -->
        <div class="carrossel-laboratorios">
          <div 
            v-for="lab in andar.laboratorios" 
            :key="lab.id" 
            class="card-laboratorio"
          >
            {{ lab.nome }}
          </div>

          <!-- Card para adicionar novo laboratório -->
          <div 
            class="card-laboratorio card-adicionar-lab" 
            @click="$emit('adicionarLab', andar.id)"
          >
            <img src="images/mais.png" alt="adicionar laboratório">
          </div>
        </div>
      </div>
    </div>

    <!-- Popup de criação de andares -->

    <div id="popup" class="popup">
      <div class="popup-content">
        <button id="btn-fechar" class="btn-fechar" @click="fecharPopup">
          <img src="imagens/x.png" alt="Fechar">
        </button>

        <div id="card-vermelho">
          <h1>ADICIONAR ANDAR</h1>
        </div>

        <div id="titulo-andar">
          <span>+</span><h1>Andar</h1>
        </div>

        <form id="formulario-1" @submit.prevent="criarAndar">
          <div id="titulo-nome">
            <h2>NOME:</h2>
          </div>
          <div id="box-input-nome">
            <input 
              type="text" 
              id="input-nome" 
              placeholder="Ex: Primeiro andar" 
              v-model="nomeAndar" 
            />
          </div>

          <div id="titulo-cor">
            <h2>COR:</h2>
          </div>
          <div id="box-input-cor">
            <div class="custom-select">
              <div class="selected-option" id="input-cor">Selecione uma cor</div>
              <ul class="options-list">
                <li v-for="cor in cores" 
                    :key="cor.nome" 
                    :data-value="cor.nome" 
                    :style="{ color: cor.hex }" 
                    @click="selecionarCor(cor.nome)">
                  {{ cor.nome }}
                </li>
              </ul>
            </div>
          </div>

          <div id="aviso">
            <h2>*Após criar o andar será possível personalizar os laboratórios</h2>
          </div>

          <div id="section-button">
            <button type="button" class="cancelar" @click="fecharPopup">Cancelar</button>
            <button type="submit" class="criar" id="btn-criar">Criar</button>
          </div>
        </form>
      </div>
    </div>

        <!-- Popup para criar laboratorios -->
    
      <div id="popup-laboratorio" class="popup">
        <div class="popup-content">
          <button id="btn-fechar-laboratorio" class="btn-fechar" @click="fecharPopup">
            <img src="imagens/x.png" alt="Fechar">
          </button>
      
          <div id="card-vermelho-laboratorio">
            <h1>ADICIONAR LABORATÓRIO</h1>
          </div>
  
          <div id="titulo-laboratorio">
            <span>+</span><h1>Laboratório</h1>
          </div>
      
          <form id="formulario-laboratorio" @submit.prevent="criarLaboratorio">
            <div id="agrupamento1">
              <div id="titulo-nome-laboratorio">
                <h2>NOME:</h2>
              </div>
  
              <div id="titulo-cor-laboratorio">
                <h2>COR:</h2>
              </div>
                          
              <div id="titulo-anexar-imagem">
                <h2>ANEXAR IMAGEM:</h2>
              </div>
  
              <div id="box-input-nome-laboratorio">
                <input 
                  type="text" 
                  id="input-nome-laboratorio" 
                  v-model="nomeLaboratorio" 
                  placeholder="Ex: Cad II">
              </div>
  
              <div id="box-input-cor">
                <div class="custom-select">
                  <div class="selected-option" @click="mostrarCores = !mostrarCores">
                    {{ corSelecionada }}
                  </div>
                  <ul class="options-list" v-show="mostrarCores">
                    <li 
                      v-for="cor in coresDisponiveis" 
                      :key="cor.nome" 
                      :style="{ color: cor.cor }" 
                      @click="selecionarCor(cor.cor)">
                      {{ cor.nome.charAt(0).toUpperCase() + cor.nome.slice(1) }}
                    </li>
                  </ul>
                </div>
              </div>
                      
              <div id="box-input-anexarimagem">
                <input 
                  type="text" 
                  id="input-anexar-imagem" 
                  v-model="imagemLaboratorio" 
                  placeholder="Exemplo.png">
              </div>
            </div>
                      
            <div id="agrupamento2">
              <div id="titulo-materiais">
                <h2>ADICIONAR MATERIAIS:</h2>
              </div>
              <!-- Adicionar funcionalidade para os materiais -->
            </div>
  
            <div id="section-button-laboratorio">
              <button type="button" class="cancelar" @click="fecharPopup">Cancelar</button>
              <button type="submit" class="criar" id="btn-criar-laboratorio">Criar</button>
            </div>
          </form>
        </div>
      </div>
    `,
}};
