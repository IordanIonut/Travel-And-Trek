import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

//AD TO CORE
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatButtonToggleModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatButtonToggleModule,
  ]
})
export class MaterialModule {}
