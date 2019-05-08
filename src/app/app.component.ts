import { Component, OnInit } from '@angular/core';
import { MydataserviceService } from './mydataservice.service';
import { Photos, PhotosObj } from './_modal';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ModalComponent} from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MydataserviceService]
})
export class AppComponent implements OnInit {
  title = 'app';
  myPhotosList: Photos[] = [];
  page = 1;
  myGroupPostDataService = [];
  public form: FormGroup;
  public groupName: AbstractControl;
  modalOpen = false;

  constructor(private service: MydataserviceService, fb: FormBuilder, public dialog: MatDialog) {
    this.form = fb.group({
      groupName: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    }, );
    this.groupName = this.form.controls['groupName'];
   }
  ngOnInit() {
    this.getPhotos();
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getPhotos() {
    this.service.getMyPhotos(this.page)
      .subscribe((result: any) => {
        if (result) {
          this.myGroupPostDataService = result['hits'];
        } else {
          console.log('errorHttp');
        }
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  onScroll() {
    console.log('Scrolled');
    this.page = this.page + 1;
    this.getPhotos();
  }
}
