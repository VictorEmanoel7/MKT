document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('aluno-form');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const tokenStep = document.getElementById('token-step');
    const questionnaireStep = document.getElementById('questionnaire-step');
    const validateBtn = document.getElementById('validate-token-btn');
    const headerLogo = document.getElementById('header-logo');
    const tokenInputs = document.querySelectorAll('.token-box');

    tokenInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < tokenInputs.length - 1) {
                    tokenInputs[index + 1].focus();
                }
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                tokenInputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim();
            
            if (pasteData) {
                tokenInputs.forEach((inp, i) => {
                    if (pasteData[i]) {
                        inp.value = pasteData[i];
                    }
                });
                const focusIndex = Math.min(pasteData.length, tokenInputs.length - 1);
                tokenInputs[focusIndex].focus();
            }
        });
    });

    validateBtn.addEventListener('click', () => {
        let tokenValue = '';
        tokenInputs.forEach(input => {
            tokenValue += input.value;
        });

        if (tokenValue.length < 5) {
            alert('Por favor, preencha os 5 dígitos do token.');
            return;
        }

        console.log(`Token "${tokenValue}" validado.`);
        
        tokenStep.style.display = 'none';
        questionnaireStep.style.display = 'block';

        if(headerLogo) headerLogo.style.display = 'none';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        
        const nomeAluno = formData.get('nome') || "Aluno(a)";
        mensagemSucesso.textContent = `Obrigado, ${nomeAluno}! Recebemos seus dados.`;
        mensagemSucesso.style.display = 'block';
        mensagemSucesso.style.color = '#000000';

        form.reset();
        tokenInputs.forEach(input => input.value = '');
        questionnaireStep.style.display = 'none';
        tokenStep.style.display = 'block';
        
        if(headerLogo) headerLogo.style.display = 'block';
        
        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 5000);
    });
});