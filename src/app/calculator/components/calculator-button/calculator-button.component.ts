import { ChangeDetectionStrategy, Component, ElementRef, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full h-full border-r border-b border-violet-400',
    '[class.col-span-2]': 'isDoubleSize()',
    '[class.row-span-2]': 'isVerticalDoubleSize()',
  },
  styles: `
    .is-pressed {
      background-color: var(--color-violet-800);
      background-opacity: 0.2;
    }

    .row-span-2 {
      grid-row: span 2 / span 2;
    }
  `,
})
export default class CalculatorButtonComponent implements OnInit {

  public isPressed = signal(false);

  public isCommand = input(false, {
    transform: (value: boolean|string) => value === 'true' || value === true
  });
  public isDoubleSize = input(false, {
    transform: (value: boolean|string) => (typeof value === 'string' && value === '') || value === 'true' || value === true
  });
  public isVerticalDoubleSize = input(false, {
    transform: (value: boolean|string) => (typeof value === 'string' && value === '') || value === 'true' || value === true
  });

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    if(!this.contentValue()?.nativeElement || this.contentValue()?.nativeElement.innerText === '') return;
    this.onClick.emit(this.contentValue()?.nativeElement.innerText.trim()!);
  }

  keyboardPressStyle(key: string) {
    if(!this.contentValue()?.nativeElement) return;
    const buttonValue = this.contentValue()?.nativeElement.innerText.trim();
    if(buttonValue !== key) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 150);
  }

}
