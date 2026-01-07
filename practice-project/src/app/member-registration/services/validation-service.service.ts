import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

// A mock service that simulates checking for uniqueness on a server.
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private existingPanNumbers = ['ABCDE1234F', 'ZXCVB5678G']; // Mock database

  constructor() {}

  /**
   * Checks if a PAN number already exists.
   * Returns an Observable that emits true if the PAN exists, false otherwise.
   */
  checkPanExists(pan: string): Observable<boolean> {
    const exists = this.existingPanNumbers.includes(pan.toUpperCase());
    // Simulate a network delay of 500ms
    return of(exists).pipe(delay(500));
  }
}

/**
 * Factory function for creating an async validator.
 * We use a factory so we can inject the ValidationService.
 * @param validationService - The service used to check for uniqueness.
 * @returns An AsyncValidatorFn
 */
export function uniquePanValidator(validationService: ValidationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      // If there's no value, don't validate.
      return of(null);
    }

    return validationService.checkPanExists(control.value).pipe(
      map(isTaken => (isTaken ? { panExists: true } : null)),
      catchError(() => of(null)) // On error, treat as valid to not block the user
    );
  };
}
