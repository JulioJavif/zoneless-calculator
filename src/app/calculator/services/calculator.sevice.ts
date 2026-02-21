import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+','-','*', 'x','/'];
const specialOperators = ['%','+/-','.','=','C','Backspace'];

@Injectable({ providedIn: 'root' })
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('');

  public constructNumber(value: string): void {
    if(![...numbers,...operators,...specialOperators].includes(value)) {
      console.log('Invalid input for number construction:', value);
      return;
    }

    if(value === '=') {
      console.log('Calcular');
      this.calculateResult();
      return;
    }

    if(value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('');
      return;
    }

    // Backspace
    // todo revisar para valores negativos y decimales
    if(value === 'Backspace') {
      if(this.resultText() === '0') return;

      // if (this.resultText() === '-0') {
      //   this.resultText.set('0');
      //   return;
      // }

      if(this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if(this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update(current => current.slice(0, -1));
      return;
    }

    // apply operator x and /
    if(value === 'x') {
      if (this.subResultText() !== '0') {
        this.calculateResult();
      }

      this.lastOperator.set('x');
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }
    if (value === '/') {
      if (this.subResultText() !== '0') {
        this.calculateResult();
      }

      this.lastOperator.set('/');
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // apply operators + and -
    if(operators.includes(value)) {
      this.calculateResult();

      console.log('Operator applied: ', value, ' with result: ', this.resultText(), ' and subResult: ', this.subResultText());
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // LIMITER CHARACTERES NUMBER
    if (this.resultText().length >= 10) {
      console.log('Max lenght for number reached');
      return;
    }

    // decimal point validation
    if(value === '.' && !this.resultText().includes('.')) {
      if(this.resultText() === '0' || this.resultText() === '') {
        this.resultText.update(current => current + '.');
        return;
      }
      this.resultText.update(current => current + '.');
      return;
    }

    // Manejo de cero inicial
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // Cambio de signo +/-
    if(value === '+/-') {
      if (this.resultText().startsWith('-')) {
        this.resultText.update(current => current.slice(1));
        return;
      }

      this.resultText.update(current => '-' + current);
      return;
    }

    // Números
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if(this.resultText().includes('-0')) {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update(current => current + value);
      return;
    }
  }

  public calculateResult(): void {

    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator() ) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }

}
