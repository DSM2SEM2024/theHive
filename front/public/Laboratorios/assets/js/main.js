// Faz a requisição para obter os laboratórios
fetch('http://localhost:3000/labs', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => {
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
        <button class="btn-calendario" data-laboratorio-id="${laboratorio.idLaboratorio}" onclick="verCalendario(this)">Ver calendário</button>
    `;

    // Adiciona o card ao container
    container.appendChild(card);
  });
})
.catch(error => console.error('Erro ao buscar laboratórios:', error));

function verCalendario(button) {
  const laboratorioId = button.getAttribute('data-laboratorio-id'); // Obtém o ID do laboratório
  localStorage.setItem('laboratorioId', laboratorioId); // Armazena no localStorage
  window.location.href = '../Formulario/index.html'; // Redireciona para a página de formulário
}
