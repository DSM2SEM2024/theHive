import CriarAndar from './components/criarAndar';

export default {
  data() {
    return {
      andares: [] // Lista de andares criados dinamicamente
    };
  },
  methods: {
    adicionarAndar() {
      // Emite evento para abrir o pop-up de criação de andar
      this.$emit("adicionarAndar");
    },
    atualizarAndares(novoAndar) {
      // Método chamado ao adicionar um novo andar
      this.andares.push({ ...novoAndar, laboratorios: [] }); // Adiciona o andar com lista de laboratórios vazia
    },
    adicionarLaboratorio(idAndar, laboratorio) {
      // Localiza o andar e adiciona o laboratório
      const andar = this.andares.find(andar => andar.id === idAndar);
      if (andar) {
        andar.laboratorios.push(laboratorio);
      }
    }
  },
  template: `
    <section id="titulo">
      <h1>*Adicione um novo andar</h1>
    </section>

    <section id="card-cinza">
      <!-- Botão para adicionar andar -->
      <img 
        id="btn-adicionar-andar" 
        src="imagens/mais.png" 
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
            <img src="imagens/mais.png" alt="adicionar laboratório">
          </div>
        </div>
      </div>
    </div>
  `
};
