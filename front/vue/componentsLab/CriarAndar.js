export default {
  data() {
    return {
      nomeAndar: "",
      corAndar: "",
    };
  },
  
  methods: {
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
  },
  
  template: `
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
    `,

  computed: {
    cores() {
      return [
        { nome: "Rosa", hex: "#EB6E8E" },
        { nome: "Azul", hex: "#337BC3" },
        { nome: "Amarelo", hex: "#FFB303" },
        { nome: "Roxo", hex: "#5A3168" },
        { nome: "Verde", hex: "#2D854E" },
        { nome: "Vermelho", hex: "#eb1f2c" },
        { nome: "Laranja", hex: "#ff8324" },
        { nome: "Cinza", hex: "#575757" },
        { nome: "Marrom", hex: "rgb(147, 37, 37)" },
        { nome: "Preto", hex: "black" },
      ];
    },
  },
};
