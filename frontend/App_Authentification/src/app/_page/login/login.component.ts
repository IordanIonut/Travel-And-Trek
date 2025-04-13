import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  AlertComponent,
  Environment,
  JwtService,
  MaterialModule,
  Mode,
} from 'travel-and-trek-app-core/dist/app-core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordValidator } from 'src/app/_validator/password.validator';
import { HttpClientModule } from '@angular/common/http';
import { GoogleComponent } from 'src/app/_components/google/google.component';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    AlertComponent,
    GoogleComponent,
    HttpClientModule,
  ],
  providers: [AuthService, JwtService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  form!: FormGroup;
  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _jwt: JwtService
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  ngOnInit() {}

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
    if (
      this.form.get('password')?.touched &&
      this.form.get('password')?.invalid
    ) {
      if (this.form.get('password')?.hasError('required')) {
        this.showAlertMessage(
          'Password',
          'Password is required. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.form.get('password')?.hasError('weakPassword')) {
        this.showAlertMessage(
          'Password',
          'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (this.form.valid) {
      this._authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe({
          next: (data: any) => {
            this._jwt.saveToken(data.token);
            this.showAlertMessage(
              'Login Success',
              'Login successfully.',
              Environment.duration,
              Mode.SUCCESS
            );
          },
          error: (error: Error) => {
            console.log(error);
            this.showAlertMessage(
              'Login Error',
              'Password or Email are wrong. Pleas try again.',
              Environment.duration,
              Mode.ERROR
            );
          },
        });
    }
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
