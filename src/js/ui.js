import luhnCheck from './luhn';
import getPaymentSystem from './paymentSystem';
import visaIcon from '../img/visa.png';
import mastercardIcon from '../img/mastercard.png';
import mirIcon from '../img/mir.png';

const iconsMap = {
  visa: visaIcon,
  mastercard: mastercardIcon,
  mir: mirIcon,
};

let iconElements = {};

function createIcons(container) {
  Object.keys(iconsMap).forEach(system => {
    const img = document.createElement('img');
    img.src = iconsMap[system];
    img.alt = system;
    img.classList.add('card-icon');
    img.id = `icon-${system}`;
    container.appendChild(img);
    iconElements[system] = img;
  });
}

function setActiveSystem(system) {
  Object.values(iconElements).forEach(icon => icon.classList.remove('active'));
  if (system && iconElements[system]) {
    iconElements[system].classList.add('active');
  }
}

export function initWidget() {
  const container = document.querySelector('.card-icons');
  if (!container) return;
  createIcons(container);

  const cardInput = document.getElementById('cardNumber');
  const validateBtn = document.getElementById('validateBtn');
  const resultDiv = document.getElementById('result');

  if (!cardInput || !validateBtn || !resultDiv) return;

  const validate = () => {
    const rawNumber = cardInput.value;
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const system = getPaymentSystem(cleanNumber);
    setActiveSystem(system);
    if (cleanNumber.length < 12) {
      resultDiv.textContent = 'Слишком короткий номер';
      return;
    }
    if (luhnCheck(cleanNumber)) {
      resultDiv.textContent = `✅ Номер карты валидный (${system ? system.toUpperCase() : 'неизвестная система'})`;
    } else {
      resultDiv.textContent = '❌ Неверный номер карты';
    }
  };

  const onInput = () => {
    const cleanNumber = cardInput.value.replace(/\D/g, '');
    const system = getPaymentSystem(cleanNumber);
    setActiveSystem(system);
    if (cleanNumber.length >= 12 && luhnCheck(cleanNumber)) {
      resultDiv.textContent = `✓ Предварительно валидный (${system ? system.toUpperCase() : '?'})`;
    } else if (cleanNumber.length > 0) {
      resultDiv.textContent = '✗ Некорректный номер';
    } else {
      resultDiv.textContent = '';
    }
  };

  validateBtn.addEventListener('click', validate);
  cardInput.addEventListener('input', onInput);
}