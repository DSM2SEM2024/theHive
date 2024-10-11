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
