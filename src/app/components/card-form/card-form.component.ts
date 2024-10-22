import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Card } from '../../models/card';
import { CardService } from './../../services/card.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styles: ``,
})
export class CardFormComponent implements OnInit {
  protected form!: FormGroup;
  protected cardIndex?: number;
  protected columnIndex!: number;

  @ViewChild('modal', { static: true }) modal!: ElementRef<HTMLDialogElement>;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  public open(columnIndex: number, cardIndex?: number): void {
    this.columnIndex = columnIndex;
    this.cardIndex = cardIndex;
    this.resetForm();
    this.modal.nativeElement.showModal();
  }

  protected close(): void {
    this.modal.nativeElement.close();
  }

  protected submit(event: Event): void {
    event.preventDefault();

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const card = this.form.getRawValue() as Card;

    this.isUpdate() ? this.cardService.update(this.columnIndex, this.cardIndex as number, card) : this.cardService.insert(this.columnIndex, card);

    this.close();
  }

  private resetForm(): void {
    this.form.reset();

    if (this.isUpdate()) {
      const card = this.cardService.get(this.columnIndex, this.cardIndex as number);

      for (const key in card) {
        // @ts-expect-error ts(7053)
        this.form.get(key)?.setValue(card[key]);
      }
    }
  }

  private isUpdate(): boolean {
    return !isNaN(Number(this.cardIndex));
  }
}
