import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AlertComponent,
  MaterialModule,
  Mode,
} from 'travel-and-trek-app-core/dist/app-core';
import { TranslateApiService } from '../../../_service/_api/translate.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-translate-dialog',
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    // MatMenuModule,
    HttpClientModule,
    NgClass,
    AlertComponent,
  ],
  providers: [TranslateApiService],
  templateUrl: './translate-dialog.component.html',
  styleUrl: './translate-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TranslateDialogComponent {
  text!: string;
  translatedText!: boolean;
  languages = languages;
  form!: FormGroup;

  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;
  constructor(
    private _fb: FormBuilder,
    private _translateApiService: TranslateApiService,
    private _dialogRef: MatDialogRef<
      TranslateDialogComponent,
      { text: string; error: boolean }
    >,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.text = data.message;

    this.form = this._fb.group({
      detect: [{ value: null }],
      to: [null],
      text: [
        {
          value: [data.message],
          disabled: true,
        },
      ],
      language: [null],
      translate: [{ value: null, disabled: true }],
    });
    this.form.get('detect')?.disable;
    this.form.get('text')?.disable;
    this.form.get('translate')?.disabled;

    this.onDetectText(this.text);
  }

  private onDetectText(text: string) {
    this._translateApiService.checkLangues(text).subscribe({
      next: (response) => {
        console.log(response);
        this.form
          .get('detect')
          ?.setValue(
            languages.find(
              (l) => l.language === response.iso && l.name === response.language
            ).flag
          );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onChange(event: any) {
    this._translateApiService
      .checkTranslate(
        this.text!,
        this.languages.find((l) => l.flag === this.form.get('detect')?.value)
          .language,
        this.languages.find((l) => l.flag === event.value).language
      )
      .subscribe({
        next: (response) => {
          this.form
            .get('translate')
            ?.setValue(response.data.translations.translatedText[0]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  translateText() {
    if (this.form.get('translate')?.value === null) {
      this._dialogRef.close({ text: '', error: true });
      return;
    }
    this._dialogRef.close({
      text: this.form.get('translate')?.value,
      error: false,
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
export const languages = [
  { language: 'af', name: 'Afrikaans', flag: 'za' }, // South Africa
  { language: 'sq', name: 'Albanian', flag: 'al' },
  { language: 'ar', name: 'Arabic', flag: 'sa' }, // Saudi Arabia
  { language: 'hy', name: 'Armenian', flag: 'am' },
  { language: 'bn', name: 'Bengali', flag: 'bd' },
  { language: 'bs', name: 'Bosnian', flag: 'ba' },
  { language: 'bg', name: 'Bulgarian', flag: 'bg' },
  { language: 'ca', name: 'Catalan', flag: 'es' }, // Spain (Catalonia region)
  { language: 'zh', name: 'Chinese', flag: 'cn' },
  { language: 'hr', name: 'Croatian', flag: 'hr' },
  { language: 'cs', name: 'Czech', flag: 'cz' },
  { language: 'da', name: 'Danish', flag: 'dk' },
  { language: 'nl', name: 'Dutch', flag: 'nl' },
  { language: 'en', name: 'English', flag: 'gb' }, // or 'us' depending on context
  { language: 'eo', name: 'Esperanto', flag: 'eu' }, // Not a country, use EU
  { language: 'et', name: 'Estonian', flag: 'ee' },
  { language: 'tl', name: 'Filipino', flag: 'ph' },
  { language: 'fi', name: 'Finnish', flag: 'fi' },
  { language: 'fr', name: 'French', flag: 'fr' },
  { language: 'de', name: 'German', flag: 'de' },
  { language: 'el', name: 'Greek', flag: 'gr' },
  { language: 'gu', name: 'Gujarati', flag: 'in' },
  { language: 'hi', name: 'Hindi', flag: 'in' },
  { language: 'hu', name: 'Hungarian', flag: 'hu' },
  { language: 'is', name: 'Icelandic', flag: 'is' },
  { language: 'id', name: 'Indonesian', flag: 'id' },
  { language: 'it', name: 'Italian', flag: 'it' },
  { language: 'ja', name: 'Japanese', flag: 'jp' },
  { language: 'jw', name: 'Javanese', flag: 'id' }, // Indonesia
  { language: 'ko', name: 'Korean', flag: 'kr' },
  { language: 'la', name: 'Latin', flag: 'va' }, // Vatican
  { language: 'lv', name: 'Latvian', flag: 'lv' },
  { language: 'lt', name: 'Lithuanian', flag: 'lt' },
  { language: 'mk', name: 'Macedonian', flag: 'mk' },
  { language: 'ml', name: 'Malayalam', flag: 'in' },
  { language: 'mr', name: 'Marathi', flag: 'in' },
  { language: 'my', name: 'Myanmar (Burmese)', flag: 'mm' },
  { language: 'ne', name: 'Nepali', flag: 'np' },
  { language: 'no', name: 'Norwegian', flag: 'no' },
  { language: 'pl', name: 'Polish', flag: 'pl' },
  { language: 'pt', name: 'Portuguese', flag: 'pt' },
  { language: 'ro', name: 'Romanian', flag: 'ro' },
  { language: 'ru', name: 'Russian', flag: 'ru' },
  { language: 'sr', name: 'Serbian', flag: 'rs' },
  { language: 'si', name: 'Sinhala', flag: 'lk' },
  { language: 'sk', name: 'Slovak', flag: 'sk' },
  { language: 'sl', name: 'Slovenian', flag: 'si' },
  { language: 'es', name: 'Spanish', flag: 'es' },
  { language: 'sw', name: 'Swahili', flag: 'ke' }, // Kenya
  { language: 'sv', name: 'Swedish', flag: 'se' },
  { language: 'ta', name: 'Tamil', flag: 'in' },
  { language: 'te', name: 'Telugu', flag: 'in' },
  { language: 'th', name: 'Thai', flag: 'th' },
  { language: 'tr', name: 'Turkish', flag: 'tr' },
  { language: 'uk', name: 'Ukrainian', flag: 'ua' },
  { language: 'ur', name: 'Urdu', flag: 'pk' },
  { language: 'vi', name: 'Vietnamese', flag: 'vn' },
  { language: 'cy', name: 'Welsh', flag: 'gb' }, // UK
  { language: 'zu', name: 'Zulu', flag: 'za' }, // South Africa
];
