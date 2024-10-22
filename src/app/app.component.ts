import { ColumnService } from './services/column.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSmall, heroEllipsisVertical } from '@ng-icons/heroicons/outline';
import { Column } from './models/column';
import { HeaderComponent } from './components/header/header.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { CardComponent } from './components/card/card.component';
import { StorageService } from './services/storage.service';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NgIconComponent, CardComponent, ColumnFormComponent, CardFormComponent, DragDropModule],
  viewProviders: [provideIcons({ heroPlusSmall, heroEllipsisVertical })],
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  protected colList!: Column[];

  constructor(
    private storageService: StorageService,
    private columnService: ColumnService,
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    this.storageService.listen().subscribe(data => (this.colList = data));
  }

  protected removeColumn(columnIndex: number): void {
    if (confirm('Are you sure you want to remove the column?')) {
      this.columnService.remove(columnIndex);
    }
  }

  protected removeCard(columnIndex: number, cardIndex: number): void {
    if (confirm('Are you sure you want to remove the card?')) {
      this.cardService.remove(columnIndex, cardIndex);
    }
  }

  protected dropCol(event: CdkDragDrop<number[]>): void {
    moveItemInArray(this.colList, event.previousIndex, event.currentIndex);
    this.storageService.setData(this.colList);
    this.dragEnd();
  }

  protected dropCard(event: CdkDragDrop<number[]>): void {
    if (event.previousContainer === event.container) {
      const columnIndex = event.container.data[0];
      const column = this.columnService.get(columnIndex);

      moveItemInArray(column.cardList, event.previousIndex, event.currentIndex);
      this.columnService.update(columnIndex, column);
    } else {
      const prevColIndex = event.previousContainer.data[0];
      const currColIndex = event.container.data[0];
      const prevCol = this.columnService.get(prevColIndex);
      const currCol = this.columnService.get(currColIndex);

      transferArrayItem(prevCol.cardList, currCol.cardList, event.previousIndex, event.currentIndex);
      this.columnService.update(prevColIndex, prevCol);
      this.columnService.update(currColIndex, currCol);
    }
    this.dragEnd();
  }

  protected dragStart(): void {
    document.body.classList.add('inheritCursors');
    document.body.style.cursor = 'grabbing';
  }

  private dragEnd(): void {
    document.body.classList.remove('inheritCursors');
    document.body.style.cursor = 'initial';
  }
}
