import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKey: string;
  private dataSubject: BehaviorSubject<Column[]>;

  constructor() {
    this.storageKey = 'kanbanData';
    this.dataSubject = new BehaviorSubject<Column[]>([]);
    this.getStoredData();
  }

  public listen(): Observable<Column[]> {
    return this.dataSubject.asObservable();
  }

  public getData(): Column[] {
    return this.dataSubject.value;
  }

  public setData(data: Column[]): void {
    this.dataSubject.next(data);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private getStoredData(): void {
    const storedData = localStorage.getItem(this.storageKey);

    this.setData(storedData ? JSON.parse(storedData) : []);
  }
}
