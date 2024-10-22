import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEllipsisVertical } from '@ng-icons/heroicons/outline';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroEllipsisVertical })],
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent {
  @Input({ required: true }) card!: Card;

  @Output() editEvent = new EventEmitter<void>();
  @Output() removeEvent = new EventEmitter<void>();

  protected edit(): void {
    this.editEvent.emit();
  }

  protected remove(): void {
    this.removeEvent.emit();
  }
}
