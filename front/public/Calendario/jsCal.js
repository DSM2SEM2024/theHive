// Função para fechar os menus se clicar fora deles
function fecharMenusSeClicarFora(event, icone, menu) {
    if (!icone.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('mostrar');
    }
}

// Ação do botão de notificações
document.querySelector("#btn-notificacoes").addEventListener('click', function (event) {
    let cardNotificacoes = document.querySelector('.notificacoes');
    cardNotificacoes.classList.toggle('mostrar');

    // Fecha o perfil caso esteja aberto
    document.querySelector('.perfil').classList.remove('mostrar');
});

// Ação do botão de perfil
document.querySelector("#btn-perfil").addEventListener('click', function (event) {
    let cardPerfil = document.querySelector('.perfil');
    cardPerfil.classList.toggle('mostrar');

    // Fecha as notificações caso estejam abertas
    document.querySelector('.notificacoes').classList.remove('mostrar');
});

// Evento global para fechar o menu ao clicar fora
document.addEventListener('click', function (event) {
    let iconeNotificacoes = document.querySelector('#btn-notificacoes');
    let cardNotificacoes = document.querySelector('.notificacoes');
    fecharMenusSeClicarFora(event, iconeNotificacoes, cardNotificacoes);

    let iconePerfil = document.querySelector('#btn-perfil');
    let cardPerfil = document.querySelector('.perfil');
    fecharMenusSeClicarFora(event, iconePerfil, cardPerfil);
});

// Botão Limpa Input 1: 
const pesquisaInput = document.getElementById('pesquisa');
const clearButton = document.getElementById('limpa-input');

// Adiciona evento ao input para monitorar a digitação
pesquisaInput.addEventListener('input', function() {
    if (this.value) {
        clearButton.style.display = 'inline'; // Exibe o botão
    } else {
        clearButton.style.display = 'none'; // Esconde o botão
    }
});

// Adiciona evento ao botão de limpar
clearButton.addEventListener('click', function() {
    pesquisaInput.value = ''; // Limpa o campo de input
    clearButton.style.display = 'none'; // Esconde o botão
    pesquisaInput.focus(); // Mantém o foco no campo de input
});

// Botão Limpa Input 2 
const pesquisaInput2 = document.getElementById('pesquisa-2');
const clearButton2 = document.getElementById('limpa-input2');

// Adiciona evento ao input para monitorar a digitação
pesquisaInput2.addEventListener('input', function() {
    if (this.value) {
        clearButton2.style.display = 'inline'; // Exibe o botão
    } else {
        clearButton2.style.display = 'none'; // Esconde o botão
    }
});

// Adiciona evento ao botão de limpar
clearButton2.addEventListener('click', function() {
    pesquisaInput2.value = ''; // Limpa o campo de input
    clearButton2.style.display = 'none'; // Esconde o botão
    pesquisaInput2.focus(); // Mantém o foco no campo de input
});


