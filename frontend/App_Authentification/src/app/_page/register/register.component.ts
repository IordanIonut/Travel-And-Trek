import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { APP_NAME, GOOGLE_LOGO_URL } from 'src/app/_constant/constant';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
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
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  passwordMatchValidator,
  passwordValidator,
} from 'src/app/_validator/password.validator';
import { Environment } from 'src/environments/environment.local';
import { AlertComponent } from 'src/app/_components/alert/alert.component';
import { adultValidator } from 'src/app/_validator/age.validator';
import { UserService } from 'src/app/_service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/_components/_model/user';
import { AuthService } from 'src/app/_service/auth.service';
import { JwtService } from 'src/app/_service/jwt.service';
import { Mode } from 'src/app/_components/_model/Mode';
import { GoogleComponent } from 'src/app/_components/google/google.component';
import { RouterModule } from '@angular/router';

export interface Hobby {
  name: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    MatNativeDateModule,
    MatStepperModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    AlertComponent,
    GoogleComponent,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNativeDateAdapter(), UserService, AuthService, JwtService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  name = APP_NAME;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  lastFormGroup!: FormGroup;
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
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly hobby = signal<Hobby[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _userService: UserService,
    private _authService: AuthService,
    private _jwt: JwtService
  ) {
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
    });
    this.lastFormGroup = this._fb.group({
      hashtag: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  protected onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this._cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
    this.secondFormGroup.patchValue({ profile: file });
    this.secondFormGroup.get('profile')?.updateValueAndValidity();
  }

  protected saveName(name: string) {
    this.savedName = name;
    this.selectedCharacter = name;
    this.thirdFormGroup.get('gender')?.setValue(name);
  }

  protected add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hobby.update((hobby) => [...hobby, { name: value }]);
    }
    event.chipInput!.clear();
  }

  protected remove(fruit: Hobby): void {
    this.hobby.update((hobby) => {
      const index = hobby.indexOf(fruit);
      if (index < 0) {
        return hobby;
      }

      hobby.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...hobby];
    });
  }

  protected edit(fruit: Hobby, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(fruit);
      return;
    }
    this.hobby.update((hobby) => {
      const index = hobby.indexOf(fruit);
      if (index >= 0) {
        hobby[index].name = value;
        return [...hobby];
      }
      return hobby;
    });
  }

  protected ngOnInit() {}

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
    }

    if (
      this.firstFormGroup.get('confirmPassword')?.touched &&
      this.firstFormGroup.get('confirmPassword')?.invalid
    ) {
      if (this.firstFormGroup.get('confirmPassword')?.hasError('required')) {
        this.showAlertMessage(
          'Password',
          'Password is required.',
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
          this.stepper.next();
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
      this.stepper.next();
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
          'You must be an adult in order to create an account.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (this.thirdFormGroup.valid) {
      this.stepper.next();
    }
  }

  protected save() {
    if (this.hobby.length > 0) {
      this.lastFormGroup.get('hashtag')!.setValue(this.hobby);
    }
    if (
      this.lastFormGroup.get('hashtag')?.touched &&
      this.lastFormGroup.get('hashtag')?.invalid
    ) {
      if (this.lastFormGroup.get('hashtag')?.hasError('required')) {
        this.showAlertMessage(
          'Hobby',
          'Hobbs is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }
    if (
      this.lastFormGroup.get('bio')?.touched &&
      this.lastFormGroup.get('bio')?.invalid
    ) {
      if (this.lastFormGroup.get('bio')?.hasError('required')) {
        this.showAlertMessage(
          'Bio',
          'Bio is required.',
          Environment.duration,
          Mode.ERROR
        );
        return;
      }
    }

    this.lastFormGroup.markAllAsTouched();
    if (this.lastFormGroup.valid) {
      const user: User = {
        id: null,
        user_hashtag_id: [],
        name: this.firstFormGroup.value.name,
        email: this.firstFormGroup.value.email,
        password: this.firstFormGroup.value.password,
        bio: this.lastFormGroup.value.bio,
        date_create: new Date(),
        profile_picture: this.secondFormGroup.value.profile,
        gender: this.thirdFormGroup.value.gender === 'Female' ? 'F' : 'M',
        date_of_birth: this.thirdFormGroup.value.dateOfBirth,
        date_last_update: new Date(),
        qr_code: 'user-' + this.firstFormGroup.value.name,
        location: 'wqeqweqewqeqwe',
      };
      console.log(user);
      this._authService.register(user).subscribe({
        next: (data: any) => {
          // this._jwt.saveToken(data.token);

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
  }

  protected onMoveBack() {
    this.stepper.previous();
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
}
