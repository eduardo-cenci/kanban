import { Injectable } from '@angular/core';

import { Card } from '../models/card';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private storageService: StorageService) {}

  public get(colIndex: number, cardIndex: number): Card {
    const colList = this.storageService.getData();

    return colList[colIndex].cardList[cardIndex];
  }

  public insert(colIndex: number, card: Card): void {
    const colList = this.storageService.getData();

    colList[colIndex].cardList.push(card);
    this.storageService.setData(colList);
  }

  public update(colIndex: number, cardIndex: number, card: Card): void {
    const colList = this.storageService.getData();

    colList[colIndex].cardList[cardIndex] = card;
    this.storageService.setData(colList);
  }

  public remove(colIndex: number, cardIndex: number): void {
    const colList = this.storageService.getData();

    colList[colIndex].cardList.splice(cardIndex, 1);
    this.storageService.setData(colList);
  }
}
