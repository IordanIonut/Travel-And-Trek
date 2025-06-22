import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FilterSeach,
  MaterialModule,
} from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MaterialModule, NgFor, NgClass],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  filters!: FilterSeach[];
  select!: FilterSeach;
  @Output() selectionChanged = new EventEmitter<FilterSeach>();

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: FilterSeach[] }
  ) {
    this.filters = data.data;
    this.select = data.data[0];
    this.selectionChanged.emit(data.data[0]);
  }

  onSelectValue(value: FilterSeach) {
    this.select = value;
    this.selectionChanged.emit(value);
  }
}
