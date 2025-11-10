document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('aluno-form');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const tokenStep = document.getElementById('token-step');
    const questionnaireStep = document.getElementById('questionnaire-step');
    const validateBtn = document.getElementById('validate-token-btn');
    
    validateBtn.addEventListener('click', () => {
        const tokenInput = document.getElementById('token');
        const tokenValue = tokenInput.value.trim();
        
        if (tokenValue === '') {
            alert('Por favor, insira seu token de acesso.');
            return;
        }

        console.log(`Token "${tokenValue}" validado.`);
        tokenStep.style.display = 'none';
        questionnaireStep.style.display = 'block';
    });

    form.addEventListener('submit', (event) => {

        event.preventDefault();
        const formData = new FormData(form);
        console.log('Dados prontos para enviar ao Back-end:');

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const nomeAluno = formData.get('nome') || "Aluno(a)";
        mensagemSucesso.textContent = `Obrigado, ${nomeAluno}! Recebemos seus dados.`;
        mensagemSucesso.style.display = 'block';
        mensagemSucesso.style.color = '#000000ff';

        form.reset();
        questionnaireStep.style.display = 'none';
        tokenStep.style.display = 'block';
        
        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 5000);
    });
});