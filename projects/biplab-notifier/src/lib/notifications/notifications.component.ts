import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild    } from '@angular/core';
import { NotificationHint } from '../layout/notifier';
import { Message } from '../message/notifer';
import { isArray } from 'util';
import { MultiNotifier, NotificationButton } from '../layout/notifier';


@Component({
  selector: 'biplab-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @ViewChild('parentDailog') myDiv: ElementRef;
  @Input() layoutHint: NotificationHint;
  @Output() close: EventEmitter<any>;
  data: Message[];
  constructor() {
    this.close = new EventEmitter<any>();
  }

  ngOnInit() {
    if ( this.layoutHint ) {
      if (isArray(this.layoutHint.data)) {
        this.data = <Message[]>this.layoutHint.data;
      }
    }
  }

  closeDailog(event: any) {
    const layout = this.layoutHint.layout as MultiNotifier;
    if ( layout.displayAs === 'dialog' && !layout.disableOutsideClick ) {
      if (event  && event.target === this.myDiv.nativeElement) {
        this.close.emit(false);
      }
    }
  }

  click(button: NotificationButton) {
    if (!!button.callBackFunctions) {
      for (const custom of button.callBackFunctions) {
        if ( custom.param) {
          custom.func(custom.param);
        } else {
          custom.func();
        }
      }
    } else {
      this.notificationClose(button.emitValue);
    }
  }
  notificationClose(status: any) {
    this.close.emit(status);
  }

  get shadow(): string {
    return !!this.layoutHint.css.shadow ? `${ this.layoutHint.layout.displayAs }-shadow` : '';
  }

  buttonStatus(button: NotificationButton): boolean {
    return typeof(button.emitValue) === 'boolean' && button.emitValue;
  }


}
