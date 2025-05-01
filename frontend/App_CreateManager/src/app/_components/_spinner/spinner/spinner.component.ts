import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  isLoading: any;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.isLoading$;
  }
}
