import { AfterContentChecked, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})
export class TextAreaAutoSizeDirective implements AfterContentChecked {

  @HostListener('input', ['$event.target'])
  onInput(): void {
    this.adjust();
  }

  @Input() maxheight: number = 0;

  constructor(public element: ElementRef) {
  }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  adjust(): void {
    if (
      this.maxheight > 0
      && this.element.nativeElement.height > this.maxheight
    ) {
      this.element.nativeElement.style.overflow = 'auto';
      this.element.nativeElement.style.height = this.maxheight;
    } else {
      this.element.nativeElement.style.overflow = 'hidden';
      this.element.nativeElement.style.height = 'auto';
      this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    }
  }

}
