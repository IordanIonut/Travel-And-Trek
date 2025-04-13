import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateApiService } from 'src/app/_service/_api/translate.service';
import { response } from 'express';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-translate-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatMenuModule,
    HttpClientModule,
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
  constructor(
    private _fb: FormBuilder,
    private _translateApiService: TranslateApiService,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.text = data.message;

    this.form = this._fb.group({
      detect: [{ value: null, disabled: true }],
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
        this.form.get('detect')?.setValue(response[0].language);
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
        this.form.get('detect')?.value,
        event.value.language
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.form
            .get('translate')
            ?.setValue(response.data.translations.translatedText[0]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  translateText() {}
}
export const languages = [
  {
    language: 'af',
    name: 'Afrikaans',
  },
  { language: 'sq', name: 'Albanian' },
  { language: 'ar', name: 'Arabic' },
  { language: 'hy', name: 'Armenian' },
  { language: 'bn', name: 'Bengali' },
  { language: 'bs', name: 'Bosnian' },
  {
    language: 'bg',
    name: 'Bulgarian',
  },
  { language: 'ca', name: 'Catalan' },
  { language: 'zh', name: 'Chinese' },
  { language: 'hr', name: 'Croatian' },
  { language: 'cs', name: 'Czech' },
  { language: 'da', name: 'Danish' },
  { language: 'nl', name: 'Dutch' },
  { language: 'en', name: 'English' },
  {
    language: 'eo',
    name: 'Esperanto',
  },
  { language: 'et', name: 'Estonian' },
  { language: 'tl', name: 'Filipino' },
  { language: 'fi', name: 'Finnish' },
  { language: 'fr', name: 'French' },
  { language: 'de', name: 'German' },
  { language: 'el', name: 'Greek' },
  { language: 'gu', name: 'Gujarati' },
  { language: 'hi', name: 'Hindi' },
  {
    language: 'hu',
    name: 'Hungarian',
  },
  {
    language: 'is',
    name: 'Icelandic',
  },
  {
    language: 'id',
    name: 'Indonesian',
  },
  { language: 'it', name: 'Italian' },
  { language: 'ja', name: 'Japanese' },
  { language: 'jw', name: 'Javanese' },
  { language: 'ko', name: 'Korean' },
  { language: 'la', name: 'Latin' },
  { language: 'lv', name: 'Latvian' },
  {
    language: 'lt',
    name: 'Lithuanian',
  },
  {
    language: 'mk',
    name: 'Macedonian',
  },
  {
    language: 'ml',
    name: 'Malayalam',
  },
  { language: 'mr', name: 'Marathi' },
  {
    language: 'my',
    name: 'Myanmar (Burmese)',
  },
  { language: 'ne', name: 'Nepali' },
  {
    language: 'no',
    name: 'Norwegian',
  },
  { language: 'pl', name: 'Polish' },
  {
    language: 'pt',
    name: 'Portuguese',
  },
  { language: 'ro', name: 'Romanian' },
  { language: 'ru', name: 'Russian' },
  { language: 'sr', name: 'Serbian' },
  { language: 'si', name: 'Sinhala' },
  { language: 'sk', name: 'Slovak' },
  {
    language: 'sl',
    name: 'Slovenian',
  },
  { language: 'es', name: 'Spanish' },
  { language: 'sw', name: 'Swahili' },
  { language: 'sv', name: 'Swedish' },
  { language: 'ta', name: 'Tamil' },
  { language: 'te', name: 'Telugu' },
  { language: 'th', name: 'Thai' },
  { language: 'tr', name: 'Turkish' },
  {
    language: 'uk',
    name: 'Ukrainian',
  },
  { language: 'ur', name: 'Urdu' },
  {
    language: 'vi',
    name: 'Vietnamese',
  },
  { language: 'cy', name: 'Welsh' },
  { language: 'zu', name: 'Zulu' },
];
