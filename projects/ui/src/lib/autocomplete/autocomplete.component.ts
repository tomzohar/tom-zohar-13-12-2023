import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, filter, Observable, of, Subject, takeUntil, tap} from "rxjs";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  formControl = new FormControl('');
  @Input() options: string[];
  @Output() changed = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<string>();

  filteredOptions$: Observable<string[]>;
  private destroyed$ = new Subject();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.filteredOptions$ = of(this.options);
    }
  }

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        tap(value => {
          if (value.length < 3) {
            this.options = [];
          }
        }),
        filter(value => value.length > 2),
        takeUntil(this.destroyed$)
      )
      .subscribe(value => {
        this.changed.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  onOptionSelected(option: MatAutocompleteSelectedEvent): void {
    this.formControl.patchValue('');
    this.optionSelected.emit(option.option.value as string);
  }

}
