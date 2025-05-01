import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertComponent,
  Environment,
  JwtService,
  MaterialModule,
  Mode,
} from 'travel-and-trek-app-core/dist/app-core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../_service/user.service';
import {
  passwordMatchValidator,
  passwordValidator,
} from '../../_validator/password.validator';

@Component({
  selector: 'app-change',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    AlertComponent,
    HttpClientModule,
  ],
  providers: [UserService, JwtService],
  templateUrl: './change.component.html',
  styleUrl: './change.component.scss',
})
export class ChangeComponent {
  form!: FormGroup;
  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;
  showConfirmPassword: boolean = false;
  showPassword: boolean = false;
  isOTP: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _jwt: JwtService,
    @Inject(UserService) private _userService: UserService
  ) {
    this._route.queryParams.subscribe((params) => {
      this._jwt.saveToken(Environment.jwtOtp, params['token']);
    });

    this.form = this._fb.group({
      opt1: ['', [Validators.required, Validators.minLength(1)]],
      opt2: ['', [Validators.required, Validators.minLength(1)]],
      opt3: ['', [Validators.required, Validators.minLength(1)]],
      opt4: ['', [Validators.required, Validators.minLength(1)]],
      opt5: ['', [Validators.required, Validators.minLength(1)]],
      opt6: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onClickSignIn() {
    this.form.markAllAsTouched();
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
    if (
      this.form.get('confirmPassword')?.touched &&
      this.form.get('confirmPassword')?.invalid
    ) {
      if (this.form.get('confirmPassword')?.hasError('required')) {
        this.showAlertMessage(
          'Confirm Password',
          'Password is required. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.form.get('confirmPassword')?.hasError('weakPassword')) {
        this.showAlertMessage(
          'Confirm Password',
          'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (this.form.hasError('passwordsDontMatch')) {
      this.showAlertMessage(
        'Match',
        'Passwords do not match. ',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }
    const token = this._jwt.decodeToken(Environment.jwtOtp);
    if (this.form.valid && token.exp * 1000 > new Date().getTime()) {
      this._userService
        .updateUserPassword(
          this._jwt.decodeToken(Environment.jwtOtp)?.email,
          this.form.value.password
        )
        .subscribe({
          next: (response) => {
            this._router.navigate(['/authentication/login']);
            this.showAlertMessage(
              'Change Password',
              'Password was change with success. ',
              Environment.duration,
              Mode.SUCCESS
            );
          },
          error: (error) => {
            this.showAlertMessage(
              'Match',
              'Passwords do not match. ',
              Environment.duration,
              Mode.ERROR
            );
          },
        });
    } else {
      this.showAlertMessage(
        'OTP Code',
        'OTP code is expired, pleas try again all steps. ',
        Environment.duration,
        Mode.ERROR
      );
      return;
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

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  verifyOTP() {
    this.form.markAllAsTouched();
    const token = this._jwt.decodeToken(Environment.jwtOtp);
    console.log(token);
    if (this.form.valid) {
      console.log(token);

      if (
        this._jwt.decodeToken(Environment.jwtOtp).sub ===
          this.form.value.opt1 +
            this.form.value.opt2 +
            this.form.value.opt3 +
            this.form.value.opt4 +
            this.form.value.opt5 +
            this.form.value.opt6 &&
        token.exp * 1000 > new Date().getTime()
      ) {
        this.isOTP = true;
        this.form = this._fb.group(
          {
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: ['', [Validators.required, passwordValidator()]],
          },
          { validators: passwordMatchValidator }
        );

        this.showAlertMessage(
          'OTP',
          'Code is correct. ',
          Environment.duration,
          Mode.SUCCESS
        );
      } else {
        this.showAlertMessage(
          'OTP',
          'Code is incorrect. ',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
  }
}
