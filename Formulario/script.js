const textarea = document.getElementById('Disciplina');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length; 

    charCount.textContent = `${currentLength}/200`; 
    
    if (currentLength >= 200) {
        charCount.classList.add('limit-reached'); 
        textarea.value = textarea.value.substring(0, 200); 
    } else {
        charCount.classList.remove('limit-reached'); 
    }
});

charCount.textContent = `0/200`; 