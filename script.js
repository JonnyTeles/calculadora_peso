const button = document.getElementById('calculate')
const form = document.getElementById('form')
const resultDiv = document.getElementById('resultDiv')
const result = document.getElementById('result')
const loading = document.getElementById('loading')
const nameInput = document.getElementById('name');
const weightInput = document.getElementById('weight');

let calculated = false

button.addEventListener('click', async () => {
    if (calculated === true) {
        setDisplay([button, form], 'flex')
        setDisplay([result, resultDiv], 'none')
        button.innerHTML = 'Calcular'
        return calculated = false
    }

    const userName = nameInput.value.trim();
    const userWeight = weightInput.value.trim();

    if (!userName || !userWeight) {
        showSnackbar("Preencha todos os campos.");
        return;
    }

    setDisplay([button, form], 'none')
    setDisplay([loading], 'flex')
    await sleep(2000);

    setDisplay([loading], 'none');
    setDisplay([resultDiv, button, result], 'flex');
    button.innerHTML = 'Voltar';
    result.innerHTML = `Olá, ${userName}! <br> Seu peso é ${userWeight}KG`;
    calculated = true;

    clearInput()
})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setDisplay(elements, displayValue) {
    const shouldHide = displayValue === 'none';

    elements.forEach(el => {
        if (!el) return;

        if (el.id === 'loading') {
            el.style.display = displayValue;
        } else {
            el.hidden = shouldHide;
        }
    });
}

function clearInput () {
    nameInput.value = '';
    weightInput.value = '';
}

function showSnackbar(message, duration = 3000) {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.classList.add('show');

  setTimeout(() => {
    snackbar.classList.remove('show');
  }, duration);
}