import CalculatorComponent from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  standalone: true,
  imports: [
    CalculatorComponent
  ],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class CalculatorViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
