import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, viewChildren } from '@angular/core';
import CalculatorButtonComponent from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.sevice';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent,
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export default class CalculatorComponent implements OnInit {

  private calculatorButtons = viewChildren(CalculatorButtonComponent);
  public calulatorService = inject(CalculatorService);

  constructor(
    private calculatorService: CalculatorService
  ) { }

  ngOnInit() {
  }

  public resultText = computed(() => this.calulatorService.resultText());
  public subResultText = computed(() => this.calulatorService.subResultText());
  public lastOperator = computed(() => this.calulatorService.lastOperator());

  handleButtonClick(value: string) {
    this.calculatorService.constructNumber(value);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);

    const keyEquivalent: Record<string, string> = {
      Escape: 'C',
      Enter: '=',
      '*': 'x',
      Delete: 'C',
      Insert: '0',
      Backspace: 'Backspace',
    };

    const key = keyEquivalent[event.key] || event.key;

    this.handleButtonClick(key);
    this.calculatorButtons().forEach(button => {
      button.keyboardPressStyle(key);
    });
  }

}
