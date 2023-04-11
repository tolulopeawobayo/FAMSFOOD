import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss']
})
export class StatusMessageComponent implements OnInit {

  @Input()
  statusState!: boolean;
  @Input() statusMessage: string = 'Success';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  closeStatus(action) {
    this.close.emit(action);
  }

}
