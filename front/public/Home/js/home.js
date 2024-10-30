// Função para alternar a exibição do texto do item clicado
function alternarTextoDoItemClicado(texto) {
    if (texto.style.display === 'block') {
        texto.style.display = 'none'; // Oculta o texto se já estiver visível
    } else {
        document.querySelectorAll('.txt-footer').forEach((txt) => {
            txt.style.display = 'none'; // Oculta todos os outros textos
        });
        texto.style.display = 'block'; // Exibe apenas o texto do item clicado
    }
}

// Configura eventos de clique para cada item do menu do footer
document.querySelectorAll('.nav-mobile ul li').forEach((item) => {
    const texto = item.querySelector('.txt-footer');

    item.addEventListener('click', function (event) {
        event.stopPropagation(); // Previne o clique no documento
        alternarTextoDoItemClicado(texto);

        // Fecha as janelas de notificações e perfil ao clicar em qualquer item
        fecharTodosMenus();
    });
});

// Oculta todos os textos inicialmente
document.querySelectorAll('.txt-footer').forEach((txt) => {
    txt.style.display = 'none';
});

// Evento para fechar o texto ao clicar fora dos itens do menu
document.addEventListener('click', function () {
    document.querySelectorAll('.txt-footer').forEach((txt) => {
        txt.style.display = 'none';
    });
});

// Função para fechar todos os menus
function fecharTodosMenus() {
    document.querySelector('.notificacoes').classList.remove('mostrar');
    document.querySelector('.perfil').classList.remove('mostrar');
}

// Ação para o botão de notificações
document.querySelectorAll(".btn-notificacoes").forEach((btn) => {
    btn.addEventListener('click', function (event) {
        event.stopPropagation();
        let cardNotificacoes = document.querySelector('.notificacoes');
        
        // Alterna o menu de notificações e fecha o perfil
        const isNotificacoesAberto = cardNotificacoes.classList.contains('mostrar');
        fecharTodosMenus();
        if (!isNotificacoesAberto) {
            cardNotificacoes.classList.add('mostrar');
        }
    });
});

// Ação para o botão de perfil
document.querySelectorAll(".btn-perfil").forEach((btn) => {
    btn.addEventListener('click', function (event) {
        event.stopPropagation();
        let cardPerfil = document.querySelector('.perfil');

        // Alterna o menu de perfil e fecha as notificações
        const isPerfilAberto = cardPerfil.classList.contains('mostrar');
        fecharTodosMenus();
        if (!isPerfilAberto) {
            cardPerfil.classList.add('mostrar');
        }
    });
});

// Fecha todos os menus ao clicar fora
document.addEventListener('click', function (event) {
    fecharTodosMenus();
});



//Função para limpar a pesquisa

function setupClearInput(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const clearButton = document.getElementById(buttonId);

    // Adiciona evento ao input para monitorar a digitação
    input.addEventListener('input', function() {
        clearButton.style.display = this.value ? 'inline' : 'none'; // Exibe ou esconde o botão
    });

    // Adiciona evento ao botão de limpar
    clearButton.addEventListener('click', function() {
        input.value = ''; // Limpa o campo de input
        clearButton.style.display = 'none'; // Esconde o botão
        input.focus(); // Mantém o foco no campo de input
    });

    // Inicialmente oculta o botão
    clearButton.style.display = 'none';
}

// Configura os campos de entrada e botões
setupClearInput('pesquisa', 'limpa-input');
setupClearInput('pesquisa-2', 'limpa-input2');


