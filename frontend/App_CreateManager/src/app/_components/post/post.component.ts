import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Environment } from 'src/environments/environment.local';
import { NsfwDetectionService } from 'src/app/_service/nsfwDetection.service';
import { PhotoDescribeService } from 'src/app/_service/photoDescribe.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [
    provideNativeDateAdapter(),
    NsfwDetectionService,
    PhotoDescribeService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  formMedia!: FormGroup;
  formPost!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  hasVideoOrAudio = false;
  mediaFiles: string[] = [];
  numberOfImages = Environment.numberOfImage;
  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _nsfwDetectionService: NsfwDetectionService,
    private _photoDescribeService: PhotoDescribeService
  ) {
    this.formMedia = this._fb.group({
      media: [null, Validators.required],
    });

    this.formPost = this._fb.group({});
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this._photoDescribeService.checkImageForDescribe(file!).subscribe({
        next: (response) => {
          console.log(response.caption);
        },
        error: (error) => {
          console.error(error);
        },
      });
      this._nsfwDetectionService.checkImageForNsfw(file!).subscribe({
        next: (response) => {
          ///logs
          //logs
          //logs
          //spinner
          //spinner
          //spinner
          if (response.length === 0) {
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;

              if (file.type.startsWith('image/')) {
                if (!this.hasVideoOrAudio) {
                  this.mediaFiles.push(base64String);
                } else {
                  alert('Cannot add an image after a video or audio!');
                }
              } else if (
                file.type.startsWith('video/') ||
                file.type.startsWith('audio/')
              ) {
                if (this.mediaFiles.length === 0) {
                  this.hasVideoOrAudio = true;
                  this.mediaFiles.push(base64String);
                  this.formMedia.get('media')?.disable();
                } else {
                  //add error from core
                  //add error from core
                  //add error from core
                  alert('Cannot add a video or audio after images!');
                }
              }
              this._cdr.detectChanges();
            };

            reader.readAsDataURL(file);
          } else {
            //add a dialog with image and what is wrong on that
            //add a dialog with image and what is wrong on that
            //add a dialog with image and what is wrong on that
            //add a dialog with image and what is wrong on that
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    input.value = '';
    this.formMedia.patchValue({ media: file });
    this.formMedia.get('media')?.updateValueAndValidity();
  }

  onSelectImage(index: number): void {
    this.imagePreview = this.mediaFiles[index];
  }
}
