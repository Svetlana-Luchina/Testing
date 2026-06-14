import luhnCheck from './luhn';
import getPaymentSystem from './paymentSystem';

describe('Алгоритм Луна', () => {
  test('валидные номера', () => {
    expect(luhnCheck('4012888888881881')).toBe(true);
    expect(luhnCheck('5555555555554444')).toBe(true); 
  });

  test('невалидные номера', () => {
    expect(luhnCheck('4111111111111112')).toBe(false);
    expect(luhnCheck('1234567890123456')).toBe(false);
  });
});

describe('Определение платёжной системы', () => {
  test('Visa', () => {
    expect(getPaymentSystem('4111111111111111')).toBe('visa');
    expect(getPaymentSystem('4')).toBe('visa');
  });
  test('Mastercard', () => {
    expect(getPaymentSystem('5111111111111111')).toBe('mastercard');
  });
  test('Мир', () => {
    expect(getPaymentSystem('2200123456789010')).toBe('mir');
  });
  test('неизвестная система', () => {
    expect(getPaymentSystem('341111111111111')).toBe(null);
    expect(getPaymentSystem('6011111111111117')).toBe(null);
    expect(getPaymentSystem('3530111333300000')).toBe(null);
    expect(getPaymentSystem('30569309025904')).toBe(null);
    expect(getPaymentSystem('')).toBe(null);
  });
});