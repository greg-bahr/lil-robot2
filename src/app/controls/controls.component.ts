import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {ControlsService} from "./controls.service";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  providers: [ControlsService]
})
export class ControlsComponent implements OnDestroy, OnInit {

  public currPressed = "None";
  private emitPressedInterval: any;

  constructor(private controlsService: ControlsService) {}

  ngOnInit() {
    this.emitPressedInterval = setInterval(this.emitPressed(), 250);
  }

  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
      event.preventDefault();
    }
    if (this.currPressed === "None") {
      this.currPressed = event.key;
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === this.currPressed) {
      this.currPressed = "None";
    }
  }

  mouseDown(button) {
    if (this.currPressed === "None") {
      this.currPressed = button;
    }
  }

  @HostListener('window:mouseup')
  mouseUp() {
    this.currPressed = "None";
  }

  emitPressed() {
    this.controlsService.emitPressed(this.currPressed);
  }

  ngOnDestroy() {
    clearInterval(this.emitPressedInterval);
  }
}
