import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {

  public currPressed = 'None';

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    event.stopPropagation();
    this.currPressed = event.key;
  }

  @HostListener('window:keyup')
  keyUp(): void {
    this.currPressed = 'None';
  }
}
