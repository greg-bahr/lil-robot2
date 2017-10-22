import {Component, HostListener, OnDestroy} from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnDestroy {

  public currPressed = "None";
  private emitPressedInterval = setInterval(this.emitPressed, 250);

  constructor(private socket: Socket) {}

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.currPressed === "None") {
      this.currPressed = event.key;
    }
  }

  @HostListener('window:keyup', ['$event'])
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
    this.socket.emit('buttonPressed', this.currPressed);
  }

  ngOnDestroy() {
    clearInterval(this.emitPressedInterval);
  }
}
