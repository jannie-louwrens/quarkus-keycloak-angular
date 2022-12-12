import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '../../data-access/message';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="message" [ngClass]="message.cssClass">
      {{ message.text }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() message!: Message;
}
