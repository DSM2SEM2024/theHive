fetch('http://localhost:3000/labs', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome, andar, equipamento, capacidade })
})
)
.then(response => response.json())
  .then(data => {
    const container = document.getElementById('container-de-cards');
    container.innerHTML = ''; // Limpa o container

    data.forEach(laboratorio => {
      const card = document.createElement('article');
      card.className = 'card-lab';
      card.innerHTML =
          <span id="barra-card"></span>
          <h3 id="nome-lab"></h3>
          <div class="lab-content">
            <img id="img-lab" src="" alt="Imagem de laboratório">
              <div class="descricao-lab">
                <ul>
                  <li id="capacidade"><strong>Capacidade:</strong><br> </li>
                  <li id="equipamento"><strong>Equipamentos:</strong><br> </li>
                </ul>
              </div>
          </div>
          <button class="btn-calendario">Ver calendário</button>
        ;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Erro ao buscar produtos:', error));