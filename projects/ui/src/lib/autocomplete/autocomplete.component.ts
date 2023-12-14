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
import {BehaviorSubject, debounceTime, filter, Observable, of, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
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
  closed$ = new BehaviorSubject<boolean>(true);
  private destroyed$ = new Subject();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.setClosed(false);
      this.filteredOptions$ = of(this.options);
    }
  }

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        tap(value => {
          if (value.length < 3) {
            this.setClosed(true);
            this.options = [];
          }
        }),
        filter(value => value.length > 2),
        takeUntil(this.destroyed$)
      )
      .subscribe(value => {
        this.changed.emit(value);
        this.setClosed(false);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  onOptionSelected(option: string) {
    this.formControl.patchValue('');
    this.optionSelected.emit(option);
  }

  private setClosed(isClosed: boolean): void {
    this.closed$.next(isClosed);
  }
}
