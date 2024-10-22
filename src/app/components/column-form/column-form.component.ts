import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Column } from '../../models/column';
import { ColumnService } from '../../services/column.service';

@Component({
  selector: 'app-column-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './column-form.component.html',
  styles: ``,
})
export class ColumnFormComponent implements OnInit {
  protected form!: FormGroup;
  protected columnIndex?: number;

  @ViewChild('modal', { static: true }) modal!: ElementRef<HTMLDialogElement>;

  constructor(
    private formBuilder: FormBuilder,
    private columnService: ColumnService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  public open(columnIndex?: number): void {
    this.columnIndex = columnIndex;
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

    const column = this.form.getRawValue() as Column;

    this.isUpdate() ? this.columnService.update(this.columnIndex as number, column) : this.columnService.insert(column);

    this.close();
  }

  private resetForm(): void {
    this.form.reset();

    if (this.isUpdate()) {
      const column = this.columnService.get(this.columnIndex as number);

      for (const key in column) {
        // @ts-expect-error ts(7053)
        this.form.get(key)?.setValue(column[key]);
      }
    }
  }

  private isUpdate(): boolean {
    return !isNaN(Number(this.columnIndex));
  }
}
