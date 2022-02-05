import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppUser } from 'src/app/models/app-user';
import { GlobalService } from 'src/app/services/global.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  public editForm: FormGroup;
  public user: AppUser;
  public user$: Observable<AppUser>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.getUser();

  }

  getUser() {
    this.user$ = this.userService.getActiveUser()
      .pipe(
        tap((user) => {
          this.user = user;
          this.initForm();
        }
        ));
  }

  initForm() {
    this.editForm = this.formBuilder.group({
      userName: [this.user.userName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      avatar: [this.user.avatar],
      description: [this.user.description],
    });
  }

  onEditUser(): void {
    this.userService
      .editUser(this.editForm.value)
      .subscribe((res: any) => {
        this.user = res;
        this.snackBarService.createSnackBar('success', 'User info successfully updated');
        this.globalService.theAvatar = res.avatar;
        this.dialog.closeAll();
      },
        () => {
          this.snackBarService.createSnackBar('error', 'Error during user info update');
        });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
