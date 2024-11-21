export default {
    data() {
      return {
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
    },
    template: `
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
  };
  