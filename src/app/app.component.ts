import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'robot v2';
  dialogRef: MatDialogRef<NameDialogComponent>;

  constructor(private dialog: MatDialog, private socket: Socket) {
    this.dialogRef = dialog.open(NameDialogComponent, { disableClose: true });

    this.dialogRef.afterClosed().subscribe(result => {
      socket.emit('newName', result);
    });
  }
}

@Component({
  selector: 'app-name-dialog',
  template: `
  <h2 mat-dialog-title>Please enter your name.</h2>
  <mat-form-field (keyup.enter)="submitName()">
    <input matInput placeholder="Name" [(ngModel)]="name"/>
  </mat-form-field>
  <mat-dialog-actions>
    <button mat-button (click)="submitName()" style="margin-left: auto">Enter</button>
  </mat-dialog-actions>  
  `
})
export class NameDialogComponent {

  name: string;

  constructor(public dialogRef: MatDialogRef<NameDialogComponent>) { }

  submitName() {
    if (this.name.length > 0) {
      this.dialogRef.close(this.name);
    }
  }
}
