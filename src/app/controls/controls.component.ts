import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {

  public currPressed = 'None';

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
}
