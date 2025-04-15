import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AlertComponent,
  Environment,
  MailService,
  Mode,
  SetThemeService,
} from 'travel-and-trek-app-core/dist/app-core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { GoogleComponent } from '../../_components/google/google.component';
import { UserService } from '../../_service/user.service';
import { GOOGLE_LOGO_URL } from '../../_constant/constant';

@Component({
  selector: 'app-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleComponent,
    HttpClientModule,
    MaterialModule,
    AlertComponent,
  ],
  providers: [UserService, MailService],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  form!: FormGroup;
  google = GOOGLE_LOGO_URL;
  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _mailService: MailService
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  onClickGoogle() {}

  onClickSignIn() {
    this.form.markAllAsTouched();
    if (this.form.get('email')?.touched && this.form.get('email')?.invalid) {
      if (this.form.get('email')?.hasError('required')) {
        this.showAlertMessage(
          'Email',
          'Email is required. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.form.get('email')?.hasError('email')) {
        this.showAlertMessage(
          'Email',
          'Please enter a valid email address. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (this.form.get('email')?.touched && this.form.get('email')?.invalid) {
      if (this.form.get('email')?.hasError('required')) {
        this.showAlertMessage(
          'Email',
          'Email is required. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.form.get('email')?.hasError('email')) {
        this.showAlertMessage(
          'Email',
          'Please enter a valid email address. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    forkJoin({
      isEmailTaken: this._userService.findUserByEmailVal(this.form.value.email),
    }).subscribe({
      next: ({ isEmailTaken }) => {
        let hasError = false;

        if (!isEmailTaken) {
          this.showAlertMessage(
            'Email',
            "This email don't exists, please try to create an account.",
            Environment.duration,
            Mode.ERROR
          );
          hasError = true;
        }

        if (!hasError && this.form.valid) {
          // console.log(this.form.value);
          this._mailService.sendMail(this.form.value.email).subscribe({
            next: (result: any) => {
              console.log(result);
              this.showAlertMessage(
                'Mail Send',
                'An email with all steps was send to ' +
                  this.form.value.email +
                  '.',
                Environment.duration,
                Mode.SUCCESS
              );
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        }
      },
      error: (error: Error) => {
        console.log(error);
        this.showAlertMessage(
          'Error',
          'An error occurred while checking name and email.',
          Environment.duration,
          Mode.ERROR
        );
      },
    });
  }

  showAlertMessage(
    subject: string,
    message: string,
    duration: number,
    mode: Mode
  ) {
    this.alertMessage = message;
    this.errorMessage = subject;
    this.showAlert = true;
    this.mode = mode;
    setTimeout(() => {
      this.showAlert = false;
    }, duration);
  }
}
