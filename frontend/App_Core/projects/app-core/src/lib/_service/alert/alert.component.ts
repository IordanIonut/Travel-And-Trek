import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../_materials/material.module';
import { Mode } from './Mode';

@Component({
    selector: 'lib-alert',
    imports: [NgClass, NgStyle, CommonModule, MaterialModule, RouterModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() message!: string;
  @Input() subject!: string;
  @Input() mode!: Mode;

  @Output() handleChangeValue = new EventEmitter<void>();
  constructor() {}

  closeAlert() {
    this.handleChangeValue.emit();
  }
}
