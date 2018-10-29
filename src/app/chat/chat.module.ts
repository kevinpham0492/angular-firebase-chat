import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PerfectScrollbarModule } from '@app/ui/perfect-scrollbar';
import { TextareaAutosizeModule } from '@app/ui/textarea-autosize';
import { ChatRoutingModule } from './chat-routing.module';
import { CONTAINERS } from './containers';
import { SHARED_COMPONENTS, ENTRY_COMPONENTS } from './components';
import { SERVICES } from './services';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
];

const UI_MODULES = [
  PerfectScrollbarModule,
  TextareaAutosizeModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES,
    ...UI_MODULES,
    ChatRoutingModule
  ],
  declarations: [
    ...CONTAINERS,
    ...SHARED_COMPONENTS
  ],
  providers: [
    ...SERVICES
  ]
})
export class ChatModule { }
