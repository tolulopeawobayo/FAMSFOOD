import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [ MatButtonModule, MatCheckboxModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule,
    MatCardModule, MatSelectModule, MatRadioModule , FormsModule, MatInputModule, MatTableModule,
    MatDialogModule, MatSidenavModule, MatSlideToggleModule, MatListModule , MatButtonToggleModule, MatPaginatorModule, MatProgressSpinnerModule, MatToolbarModule,
    MatToolbarModule, MatIconModule, ReactiveFormsModule, MatMenuModule, MatProgressBarModule, MatExpansionModule, MatSnackBarModule, MatStepperModule],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
     MatCardModule, MatSelectModule, MatRadioModule,MatSlideToggleModule, FormsModule, MatInputModule, MatTableModule,
     MatDialogModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
      MatToolbarModule, MatIconModule, MatMenuModule, ReactiveFormsModule, MatToolbarModule , MatChipsModule,
       MatProgressBarModule, MatExpansionModule, MatButtonToggleModule, MatSnackBarModule, MatStepperModule],
})
export class MaterialModule { }
