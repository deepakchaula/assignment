import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal',
  styles: ['./modal.css'],
  templateUrl: './modal.html'
})
export class ModalComponent implements OnInit {
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onClose = new EventEmitter();

  constructor() {
  }
  ngOnInit() {
    }
    onNoClick(): void {
        this.onClose.emit();
      }
}
