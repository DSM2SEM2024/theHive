// Faz a requisição para obter os laboratórios
fetch('http://localhost:3000/labs', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => {
  // Seleciona o container onde os cards serão adicionados
  const container = document.querySelector('.andar'); // Verifique se a classe está correta
  container.innerHTML = ''; // Limpa o container

  // Itera sobre os laboratórios e cria um card para cada um
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
      </div>
      <button class="btn-calendario">Ver calendário</button>
    `;

    // Adiciona o card ao container
    container.appendChild(card);
  });
})
.catch(error => console.error('Erro ao buscar laboratórios:', error));
