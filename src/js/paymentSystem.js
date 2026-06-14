export default function getPaymentSystem(cardNumber) {
  const num = cardNumber.replace(/\D/g, '');
  if (!num) return null;
  if (/^4/.test(num)) return 'visa';
  if (/^5[1-5]/.test(num) || /^2[2-7][0-9]{2}/.test(num) && parseInt(num.slice(0,4)) >= 2221 && parseInt(num.slice(0,4)) <= 2720) return 'mastercard';
  if (/^220[0-4]/.test(num)) return 'mir';
  return null;
}