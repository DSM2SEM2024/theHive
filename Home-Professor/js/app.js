const pendentes = Vue.createApp({
  components: {
  },
  data() {
    return {
      nomeLab: "TESTE",
      idade: "19",
      lista: [
        { fruta: "maçã", quant: 5 },
        { fruta: "tomate", quant: 15 },
        { fruta: "morango", quant: 28 }
      ]
    }
  },
  methods: {
  },
  template:
    `
    <a href="" class="card-pedido">
        <div id="txt-card">
          <p id="txt-card-lab">{{nomeLab}}</p>
          <p id="txt-card-dic">Designin Digital</p>
        </div>
        <div id="txt-card-2">
          <p id="txt-card-dia">26/04/24</p>
          <p id="txt-card-hrs">16:20 - 17:30</p>
        </div>
    </a>

  `
})
pendentes.mount('.pendentes')

const aprovadas = Vue.createApp({
  components: {
  },
  data() {
    return {
      nomeLab: "TESTE",
      idade: "19",
      lista: [
        { fruta: "maçã", quant: 5 },
        { fruta: "tomate", quant: 15 },
        { fruta: "morango", quant: 28 }
      ]
    }
  },
  methods: {
  },
  template:
    `
    <a href="" class="card-pedido">
        <div id="txt-card">
          <p id="txt-card-lab">{{nomeLab}}</p>
          <p id="txt-card-dic">Designin Digital</p>
        </div>
        <div id="txt-card-2">
          <p id="txt-card-dia">26/04/24</p>
          <p id="txt-card-hrs">16:20 - 17:30</p>
        </div>
    </a>

        <a href="" class="card-pedido">
        <div id="txt-card">
          <p id="txt-card-lab">{{nomeLab}}</p>
          <p id="txt-card-dic">Designin Digital</p>
        </div>
        <div id="txt-card-2">
          <p id="txt-card-dia">26/04/24</p>
          <p id="txt-card-hrs">16:20 - 17:30</p>
        </div>
    </a>

        <a href="" class="card-pedido">
        <div id="txt-card">
          <p id="txt-card-lab">{{nomeLab}}</p>
          <p id="txt-card-dic">Designin Digital</p>
        </div>
        <div id="txt-card-2">
          <p id="txt-card-dia">26/04/24</p>
          <p id="txt-card-hrs">16:20 - 17:30</p>
        </div>
    </a>
  `
})
aprovadas.mount('.aprovadas')