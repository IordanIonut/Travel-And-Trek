import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
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
