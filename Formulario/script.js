const form = document.getElementById('formulario'); // Seleciona o formulário
const textareas = document.querySelectorAll('textarea'); // Seleciona todos os textareas
const requiredFields = document.querySelectorAll('[required]'); // Seleciona todos os campos obrigatórios

textareas.forEach(textarea => {
    const charCount = textarea.nextElementSibling; // Seleciona o próximo elemento (charCount)
    const boxInputText = textarea.parentElement; // Seleciona o contêiner

    textarea.addEventListener('input', () => {
        const currentLength = textarea.value.length; 
        charCount.textContent = `${currentLength}/200`; 

        if (currentLength >= 200) {
            charCount.classList.add('limit-reached'); 
            textarea.value = textarea.value.substring(0, 200); 
            boxInputText.style.borderColor = 'var(--red-color)'; // Borda vermelha
        } else {
            charCount.classList.remove('limit-reached'); 
            boxInputText.style.borderColor = ''; // Remove a borda vermelha
        }
    });

    charCount.textContent = `0/200`; 
});

// Validação do formulário
form.addEventListener('submit', (event) => {
    let isValid = true;

    requiredFields.forEach(field => {
        const boxInputText = field.parentElement; // Seleciona o contêiner do campo obrigatório
        const errorMessage = boxInputText.querySelector('.error-message'); // Seleciona a mensagem de erro

        if (field.tagName === 'TEXTAREA' && !field.value.trim()) {
            isValid = false;
            boxInputText.style.borderColor = 'var(--red-color)'; // Borda vermelha para campos vazios
            errorMessage.textContent = `Por favor, preencha o campo: ${field.placeholder}`; // Exibe mensagem de erro
        } else if (field.type === 'radio') {
            const isChecked = Array.from(document.getElementsByName(field.name)).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                boxInputText.style.borderColor = 'var(--red-color)'; // Borda vermelha para campos vazios
                errorMessage.textContent = `Por favor, selecione uma opção para: ${field.name}`; // Exibe mensagem de erro
            } else {
                errorMessage.textContent = ''; // Limpa a mensagem de erro se preenchido
            }
        } else {
            boxInputText.style.borderColor = ''; // Remove a borda vermelha se preenchido
            errorMessage.textContent = ''; // Limpa a mensagem de erro
        }
    });

    if (!isValid) {
        event.preventDefault(); // Impede o envio do formulário se não for válido
    }
});
