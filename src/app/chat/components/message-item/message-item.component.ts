import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent implements OnInit {

  @HostBinding('class') class = 'message-item';

  @Input() firstItemOfGroup: boolean;
  @Input() lastItemOfGroup: boolean;
  @Input() message: any;

  get me(): boolean {
    return this._me;
  }

  @Input()
  set me(value: boolean) {
    this._me = value;
    this.updateClassList();
  }

  private classList = new Set<string>('message-item');
  private _me: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  private updateClassList() {
    if (this.me) {
      this.class = `message-item me`;
    } else {
      this.class = `message-item contact`;
    }
    if (this.firstItemOfGroup) {
      this.class = `${this.class} first-of-group`;
    }
  }

}
