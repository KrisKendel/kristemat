import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) { }

    createSnackBar(type: string, dataMessage: string) {
        if (type === 'success') {
            this.snackBar.open(dataMessage, undefined, {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar-success'],
            });
        } else if (type === 'error') {
            this.snackBar.open(dataMessage, undefined, {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar-error'],
            });
        }
    }
}
