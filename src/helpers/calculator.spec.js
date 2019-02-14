import { isOperation, getData, getReserveLast, getResult } from './calculator';

describe('the isOperation() function', () => {
  it('should check if given input is a supported operation', () => {
    expect(isOperation('+')).toBe(true);
  });
  it('should check if given key is a supported operation', () => {
    expect(isOperation('rad')).toBe(false);
  });
});

describe('the getData() function', () => {
  it('should add input to calculation', () => {
    const input = '3';
    const lastInput = '12';
    const calculation = '1+2+12';

    expect(getData(input, lastInput, calculation)).toEqual({
      lastInput: '123',
      calculation: '1+2+123'
    });
  });

  it('should swap last input if is an operation', () => {
    const input = '-';
    const lastInput = '';
    const calculation = '1+2+12+';

    expect(getData(input, lastInput, calculation)).toEqual({
      lastInput: '',
      calculation: '1+2+12-'
    });
  });
});

describe('the getReserveLast() function', () => {
  it('should return calculation with negative last input', () => {
    const lastInput = '3';
    const calculation = '1+2+3';
    expect(getReserveLast(lastInput, calculation)).toEqual({
      lastInput: '-3',
      calculation: '1+2+-3'
    });
  });
});

describe('the getResult() function', () => {
  it('should call the math library and execute the calculation', () => {
    expect(getResult('2+2')).toBe('4');
    expect(getResult('1*2+2+3+10/2')).toBe('12');
  });
});
