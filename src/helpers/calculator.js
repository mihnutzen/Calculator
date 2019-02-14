import math from 'mathjs';

import { operations, MINUS } from '../data/data';

export function isOperation(input) {
  return !!operations.find(f => f.key === input);
}

export function getData(input, lastInput, calculation) {
  const isLastOp = isOperation(input);
  return {
    lastInput: isLastOp ? '' : lastInput + input,
    calculation:
      isLastOp && !lastInput
        ? calculation.substr(0, calculation.length - 1) + input
        : calculation + input
  };
}

export function getReserveLast(lastInput, calculation) {
  // todo: abstract this
  const updatedLastInput =
    lastInput.substring(0, 1) === MINUS
      ? lastInput.replace(MINUS, '')
      : MINUS + lastInput;

  return {
    lastInput: updatedLastInput,
    calculation:
      calculation.substring(0, calculation.length - lastInput.length) +
      updatedLastInput
  };
}

export function getResult(calculation) {
  return math.eval(calculation + '+0') + '';
}
