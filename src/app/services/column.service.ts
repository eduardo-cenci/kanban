import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  constructor(private storageService: StorageService) {}

  public get(index: number): Column {
    const colList = this.storageService.getData();

    return colList[index];
  }

  public insert(col: Column): void {
    const colList = this.storageService.getData();

    col.cardList = [];
    colList.push(col);
    this.storageService.setData(colList);
  }

  public update(index: number, col: Column): void {
    const colList = this.storageService.getData();

    colList[index] = col;
    this.storageService.setData(colList);
  }

  public remove(index: number): void {
    const colList = this.storageService.getData();

    colList.splice(index, 1);
    this.storageService.setData(colList);
  }
}
