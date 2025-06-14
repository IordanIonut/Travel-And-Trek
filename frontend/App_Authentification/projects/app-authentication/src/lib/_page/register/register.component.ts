import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AlertComponent,
  AppInitService,
  Environment,
  GenderEnum,
  JwtService,
  MaterialModule,
  Mode,
  User,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { forkJoin } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthService } from '../../_service/auth.service';
import { UserService } from '../../_service/user.service';
import { GoogleComponent } from '../../_components/google/google.component';
import {
  passwordMatchValidator,
  passwordValidator,
} from '../../_validator/password.validator';
import { adultValidator } from '../../_validator/age.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    AlertComponent,
    GoogleComponent,
    ReactiveFormsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatChipsModule,
    MatNativeDateModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [UserService, AuthService, JwtService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  name!: string;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;
  isLinear: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;
  @ViewChild('stepper') stepper!: MatStepper;
  showConfirmPassword: boolean = false;
  showPassword: boolean = false;
  savedName: string = 'None';
  selectedCharacter: string = '';
  characters = [
    {
      name: 'Female',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Venus_symbol.svg',
    },
    {
      name: 'Male',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mars_symbol.svg',
    },
  ];

  isFirst: boolean = false;
  isSecond: boolean = false;
  isThird: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _userService: UserService,
    private _authService: AuthService,
    private _appInitService: AppInitService,
    private _jwt: JwtService,
    private _router: Router
  ) {
    this.name = this._appInitService.APP_NAME;

    this.firstFormGroup = this._fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', [Validators.required, passwordValidator()]],
      },
      { validators: passwordMatchValidator }
    );
    this.secondFormGroup = this._fb.group({
      profile: ['', [Validators.required]],
    });
    this.thirdFormGroup = this._fb.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, adultValidator()]],
      bio: ['', Validators.required],
    });

    this.isFirst = true;
  }

  ngOnInit(): void {
    this._jwt.logout(Environment.jwtToken);
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.imagePreview = base64;
      this._cdr.detectChanges();
      this.secondFormGroup.patchValue({ profile: base64 });
      this.secondFormGroup.get('profile')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }

  protected saveName(name: string) {
    this.savedName = name;
    this.selectedCharacter = name;
    this.thirdFormGroup.get('gender')?.setValue(name);
  }

  protected onMoveToSecundForm() {
    this.firstFormGroup.markAllAsTouched();
    if (
      this.firstFormGroup.get('name')?.touched &&
      this.firstFormGroup.get('name')?.invalid
    ) {
      if (this.firstFormGroup.get('name')?.hasError('required')) {
        this.showAlertMessage(
          'Name',
          'Name is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    if (
      this.firstFormGroup.get('email')?.touched &&
      this.firstFormGroup.get('email')?.invalid
    ) {
      if (this.firstFormGroup.get('email')?.hasError('required')) {
        this.showAlertMessage(
          'Email',
          'Email is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.firstFormGroup.get('email')?.hasError('email')) {
        this.showAlertMessage(
          'Email',
          'Please enter a valid email address.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    if (
      this.firstFormGroup.get('password')?.touched &&
      this.firstFormGroup.get('password')?.invalid
    ) {
      if (this.firstFormGroup.get('password')?.hasError('required')) {
        this.showAlertMessage(
          'Password',
          'Password is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.firstFormGroup.get('password')?.hasError('weakPassword')) {
        this.showAlertMessage(
          'Password',
          'Password is weak, try another more strong.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    if (
      this.firstFormGroup.get('confirmPassword')?.touched &&
      this.firstFormGroup.get('confirmPassword')?.invalid
    ) {
      if (this.firstFormGroup.get('confirmPassword')?.hasError('required')) {
        this.showAlertMessage(
          'Retry Password',
          'Retry Password is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (
        this.firstFormGroup.get('confirmPassword')?.hasError('weakPassword')
      ) {
        this.showAlertMessage(
          'Retry Password',
          'Retry Password is weak, try another more strong.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    if (this.firstFormGroup.hasError('passwordsDontMatch')) {
      this.showAlertMessage(
        'Password',
        'Passwords do not match.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }

    forkJoin({
      isNameTaken: this._userService.findUserByNameVal(
        this.firstFormGroup.value.name
      ),
      isEmailTaken: this._userService.findUserByEmailVal(
        this.firstFormGroup.value.email
      ),
    }).subscribe({
      next: ({ isNameTaken, isEmailTaken }) => {
        let hasError = false;

        if (isNameTaken) {
          this.showAlertMessage(
            'Name',
            'This name exists, please try another name.',
            Environment.duration,
            Mode.ERROR
          );
          hasError = true;
        }

        if (isEmailTaken) {
          this.showAlertMessage(
            'Email',
            'This email exists, please try to log in.',
            Environment.duration,
            Mode.ERROR
          );
          hasError = true;
        }
        if (!hasError && this.firstFormGroup.valid) {
          this.isFirst = false;
          this.isSecond = true;
          this._cdr.detectChanges();
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

  protected onMoveToThirdForm() {
    this.secondFormGroup.markAllAsTouched();
    if (
      this.secondFormGroup.get('profile')?.touched &&
      this.secondFormGroup.get('profile')?.invalid
    ) {
      if (this.secondFormGroup.get('profile')?.hasError('required')) {
        this.showAlertMessage(
          'Profile Image',
          'Profile Image is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (this.secondFormGroup.valid) {
      this.isSecond = false;
      this.isThird = true;
      this._cdr.detectChanges();
    }
  }

  protected onMoveToLastForm() {
    this.thirdFormGroup.markAllAsTouched();
    if (
      this.thirdFormGroup.get('gender')?.touched &&
      this.thirdFormGroup.get('gender')?.invalid
    ) {
      if (this.thirdFormGroup.get('gender')?.hasError('required')) {
        this.showAlertMessage(
          'Gender',
          'Gender is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (
      this.thirdFormGroup.get('dateOfBirth')?.touched &&
      this.thirdFormGroup.get('dateOfBirth')?.invalid
    ) {
      if (this.thirdFormGroup.get('dateOfBirth')?.hasError('required')) {
        this.showAlertMessage(
          'Date of Birth',
          'Date of birth is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
      if (this.thirdFormGroup.get('dateOfBirth')?.hasError('underage')) {
        this.showAlertMessage(
          'Date of Birth',
          'You must be an adult (18+) in order to create an account.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (
      this.thirdFormGroup.get('bio')?.touched &&
      this.thirdFormGroup.get('bio')?.invalid
    ) {
      if (this.thirdFormGroup.get('bio')?.hasError('required')) {
        this.showAlertMessage(
          'Bio',
          'Bio is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    if (this.thirdFormGroup.valid) {
      this.save();
    }
  }

  protected save() {
    const user: User = {
      id: null,
      user_hashtag_id: [],
      name: this.firstFormGroup.value.name,
      email: this.firstFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      bio: this.thirdFormGroup.value.bio,
      date_create: new Date(),
      profile_picture: this.secondFormGroup.value.profile,
      gender:
        this.thirdFormGroup.value.gender === 'female'
          ? GenderEnum.F
          : GenderEnum.M,
      date_of_birth: this.thirdFormGroup.value.dateOfBirth,
      date_last_update: new Date(),
      qr_code: 'user-' + this.firstFormGroup.value.name,
      location: 'wqeqweqewqeqwe',
    };
    this._authService.register(user).subscribe({
      next: (data: any) => {
        this._router.navigate(['/authentication/login']);
        this.showAlertMessage(
          'Save Account',
          'Account has been saved with successful.',
          Environment.duration,
          Mode.ERROR
        );
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  protected onMoveBack() {
    if (this.isSecond) {
      this.isSecond = false;
      this.isFirst = true;
    } else {
      this.isThird = false;
      this.isSecond = true;
    }
    this._cdr.detectChanges();
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

  onSelectGender(event: any) {
    this.thirdFormGroup.get('gender')?.setValue(event.target.value);
  }
}
