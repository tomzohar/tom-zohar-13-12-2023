import {inject, Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarDismiss} from "@angular/material/snack-bar";
import {Observable, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class AlertService {
  private snackBar = inject(MatSnackBar);

  showAlert(message: string): Observable<MatSnackBarDismiss> {
    return this.snackBar.open(message, 'close', {
      duration: 4000,
      verticalPosition: 'bottom'
    }).afterDismissed()
      .pipe(
        take(1)
      );
  }
}
