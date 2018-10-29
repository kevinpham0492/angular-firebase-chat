import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaAutoSizeDirective } from './textarea-auto-size.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextAreaAutoSizeDirective
  ],
  exports: [
    TextAreaAutoSizeDirective
  ]
})
export class TextareaAutosizeModule { }
