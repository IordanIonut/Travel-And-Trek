import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { APP_NAME, GOOGLE_LOGO_URL } from 'src/app/_constant/constant';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

export interface Hobby {
  name: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MaterialModule, BrowserAnimationsModule, NoopAnimationsModule,
    MatNativeDateModule, MatStepperModule, MatChipsModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

export class RegisterComponent {
  google = GOOGLE_LOGO_URL;
  name = APP_NAME;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  lastFormGroup!: FormGroup;

  isLinear: boolean = false;
  constructor(private _fb: FormBuilder) {
    this.firstFormGroup = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.secondFormGroup = this._fb.group({
      profile: ['', Validators.required],
    });
    this.thirdFormGroup = this._fb.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    })
    this.lastFormGroup = this._fb.group({
      hashtag: ['', Validators.required],
      bio: ['', Validators.required]
    })
  }

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<Hobby[]>([{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.update(fruits => [...fruits, { name: value }]);
    }
    event.chipInput!.clear();
  }

  remove(fruit: Hobby): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  edit(fruit: Hobby, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(fruit);
      return;
    }
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }

  ngOnInit() { }

  onMoveToSecundForm() { }

  onMoveToThirdForm() { }

  onMoveToLastForm() { }
}
