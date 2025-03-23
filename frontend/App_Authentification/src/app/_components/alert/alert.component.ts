import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message!: string;
  @Input() subject!: string;
  @Input() mode!: 'ERROR' | 'SUCCESS';

  @Output() handleChangeValue = new EventEmitter<void>();
  constructor() {}

  closeAlert() {
    this.handleChangeValue.emit();
  }
}
