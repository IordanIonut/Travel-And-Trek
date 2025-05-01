import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  signal,
  inject,
} from '@angular/core';
import {
  AlertComponent,
  MaterialModule,
  Mode,
  Environment,
  Post,
  PostId,
  PostEnum,
  JwtService,
  User,
  Media,
  Hastag,
  SearchDTO,
  MediaEnum,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NsfwDetectionService } from 'src/app/_service/_api/nsfwDetection.service';
import { PhotoDescribeService } from 'src/app/_service/_api/photoDescribe.service';
import { HashtagGenerateService } from 'src/app/_service/_api/hashtagGenerate.service';
import e, { response } from 'express';
import { DialogService } from 'src/app/_service/_dialogs/dialog.service';
import { NsfwDetectionTextService } from 'src/app/_service/_api/nsfwDetectionText.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { UserService } from 'src/app/_service/_model/user.service';
import { error } from 'console';
import { PostService } from 'src/app/_service/_model/post.service';
import { TranslateApiService } from 'src/app/_service/_api/translate.service';

interface Tags {
  name: string;
}
interface People {
  name: string;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AlertComponent,
    MatChipsModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [
    provideNativeDateAdapter(),
    NsfwDetectionService,
    PhotoDescribeService,
    HashtagGenerateService,
    NsfwDetectionTextService,
    UserService,
    PostService,
    TranslateApiService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  formMedia!: FormGroup;
  formPost!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  hasVideoOrAudio = false;
  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;
  postType!: PostEnum;

  mediaFiles: string[] = [];
  users!: SearchDTO[];
  numberOfImages = Environment.numberOfImage;
  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _nsfwDetectionService: NsfwDetectionService,
    private _photoDescribeService: PhotoDescribeService,
    private _hashtagGenerateService: HashtagGenerateService,
    private _nsfwDetectionTextService: NsfwDetectionTextService,
    private _translateApiService: TranslateApiService,
    private _dialogService: DialogService,
    private _jwtService: JwtService,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.formMedia = this._fb.group({
      media: [null, Validators.required],
    });

    this.formPost = this._fb.group({
      text: ['o fut pe ana in pizda', Validators.required],
    });

    this.mediaFiles.push('https://picsum.photos/500/500/?random=0');
    this.mediaFiles.push('https://picsum.photos/500/500/?random=1');
    this.mediaFiles.push('https://picsum.photos/500/500/?random=2');
    this.mediaFiles.push('https://picsum.photos/500/500/?random=3');
    this.mediaFiles.push('https://picsum.photos/500/500/?random=4');
    this.mediaFiles.push('https://picsum.photos/500/500/?random=5');
    this.mediaFiles.push('https://picsum.photos/500/500/?random=8');
    this.onSelectImage(0);

    console.log(this._jwtService.getToken(Environment.jwtToken));
  }

  protected onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (this.mediaFiles.length > this.numberOfImages) {
      this.showAlertMessage(
        'Select Media',
        `You can only add ${this.numberOfImages} images, videos, or audios.`,
        Environment.duration,
        Mode.ERROR
      );
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        if (file.type.startsWith('image/')) {
          if (!this.hasVideoOrAudio) {
            this._nsfwDetectionService.checkImageForNsfw(file!).subscribe({
              next: (response) => {
                if (!response.unsafe) {
                  this.showAlertMessage(
                    'Select Media',
                    `You file is safe to use.`,
                    Environment.duration,
                    Mode.SUCCESS
                  );
                  this._cdr.detectChanges();
                  this.postType = PostEnum.POST;
                  this.mediaFiles.push(base64String);
                } else {
                  this.showAlertMessage(
                    'Select Media',
                    `You file is not safe to use. Will show what is wrong with the image.`,
                    Environment.duration,
                    Mode.ERROR
                  );
                  this._cdr.detectChanges();

                  this.onNSFWDetection(base64String, response.objects);
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
          } else {
            this.showAlertMessage(
              'Choose Items',
              'Cannot add an image after a video or audio!',
              Environment.duration,
              Mode.ERROR
            );
          }
        } else if (
          file.type.startsWith('video/') ||
          file.type.startsWith('audio/')
        ) {
          if (this.mediaFiles.length === 0) {
            this.hasVideoOrAudio = true;
            this.mediaFiles.push(base64String);
            this.postType = PostEnum.REEL;

            this.formMedia.get('media')?.disable();
          } else {
            this.showAlertMessage(
              'Choose Items',
              'Cannot add a video or audio after images.',
              Environment.duration,
              Mode.ERROR
            );
          }
        }
        if (this.mediaFiles.length === 1) {
          this.onSelectImage(0);
        }

        this._cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
    input.value = '';
    this.formMedia.patchValue({ media: file });
    this.formMedia.get('media')?.updateValueAndValidity();
  }

  onSelectImage(index: number): void {
    this.imagePreview = this.mediaFiles[index];
  }

  onGenerateDescription() {
    if (this.mediaFiles.length === 0) {
      this.showAlertMessage(
        'Generate Description',
        'To use generate description, you need to insert images or video.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }

    this.fetchMediaAsFile(this.imagePreview as string)
      .then((file) => {
        this._photoDescribeService.checkImageForDescribe(file).subscribe({
          next: (response) => {
            this.formPost
              .get('text')
              ?.setValue(response.caption.replace('<error>', ''));
          },
          error: (error) => {
            console.error(error);
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching media as file:', error);
      });
  }

  onGenerateTags() {
    if (this.mediaFiles.length === 0) {
      this.showAlertMessage(
        'Generate Tags',
        'To use generate tags, you need to insert images or video.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }

    this.fetchMediaAsFile(this.imagePreview as string)
      .then((file) => {
        this._photoDescribeService.checkImageForDescribe(file).subscribe({
          next: (response) => {
            this._hashtagGenerateService
              .checkHashtagGenerate(response.caption)
              .subscribe({
                next: (response) => {
                  response.data.slice(0, 5).forEach((tag: any) => {
                    this.addTag({
                      value: tag.tag as string,
                    } as MatChipInputEvent);
                  });
                },
                error: (error) => {
                  console.error(error);
                },
              });
          },
          error: (error) => {
            console.error(error);
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching media as file:', error);
      });
  }

  onCheckNSFWText() {
    if (this.formPost.get('text')?.value == null) {
      this.showAlertMessage(
        'Check Description NSFW',
        'To use this verification, you need to insert or generate a description.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }
    this._translateApiService
      .checkLangues(this.formPost.get('text')?.value)
      .subscribe({
        next: (response) => {
          this._translateApiService
            .checkTranslate(
              this.formPost.get('text')?.value!,
              response[0].language,
              'en'
            )
            .subscribe({
              next: (response) => {
                this._nsfwDetectionTextService
                  .checkTextForNsfw(
                    response.data.translations.translatedText[0]
                  )
                  .subscribe({
                    next: (response) => {
                      if (response.flagged || response.sexual) {
                        let reasons: string[] = [];
                        if (response.flagged) {
                          reasons.push('flagged true');
                        }
                        if (response.sexual_score > 0.5) {
                          reasons.push(
                            `sexual true (sexual_score: ${response.sexual_score.toFixed(
                              2
                            )})`
                          );
                        }
                        const reasonText =
                          reasons.length > 0
                            ? reasons.join(' and ')
                            : 'unknown reason';

                        this.showAlertMessage(
                          'Check Description NSFW',
                          `This description didn't pass the NSFW check. Reason: ${reasonText}`,
                          Environment.duration,
                          Mode.ERROR
                        );
                        this._cdr.detectChanges();
                      } else {
                        this.showAlertMessage(
                          'Description NSFW',
                          'The description passed the NSFW check.',
                          Environment.duration,
                          Mode.SUCCESS
                        );
                        this._cdr.detectChanges();
                      }
                    },
                    error: (error) => {
                      console.error(error);
                    },
                  });
              },
              error: (error) => {
                console.log(error);
              },
            });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onTranslate() {
    if (this.formPost.get('text')?.value == null) {
      this.showAlertMessage(
        'Description Post',
        'To use Translate, you need to insert or generate a description.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }
    this._dialogService
      .openTranslateDialog(this.formPost.get('text')?.value)
      .subscribe((result) => {
        if (result) {
          if (result.error) {
            this.showAlertMessage(
              'Send Translate',
              'To get a translation, you must select a language to translate.',
              Environment.duration,
              Mode.ERROR
            );
            this._cdr.detectChanges();
            return;
          }
          this.formPost.get('text')?.setValue(result.text);
          this.showAlertMessage(
            'Send Translate',
            'The description has been translated.',
            Environment.duration,
            Mode.SUCCESS
          );
          this._cdr.detectChanges();
        } else {
          this.showAlertMessage(
            'Send Translate',
            'Text is the same as the original.',
            Environment.duration,
            Mode.SUCCESS
          );
        }
      });
  }

  onSavePost() {
    this.formMedia.markAllAsTouched();
    this.formPost.markAllAsTouched();

    if (
      this.mediaFiles.length === 0 &&
      this.formMedia.get('media')?.touched &&
      this.formMedia.get('media')?.invalid
    ) {
      this.showAlertMessage(
        'Select Media',
        'You need to select media.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }

    if (
      this.formPost.get('text')?.touched &&
      this.formPost.get('text')?.invalid
    ) {
      this.showAlertMessage(
        'Select Description',
        'You need to insert a description or generate with AI.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }

    if (this.tags().length === 0) {
      this.showAlertMessage(
        'Select Tags',
        'You need to insert a tag or generate with AI.',
        Environment.duration,
        Mode.ERROR
      );
      return;
    }

    if (this.formMedia.valid && this.formPost.valid) {
      this.showAlertMessage(
        'Save Post',
        'Post has been saved.',
        Environment.duration,
        Mode.SUCCESS
      );
      const postId: PostId = {
        id: '',
        type: this.postType,
      };

      const media: Media[] = this.mediaFiles.map((m) => {
        return {
          id: {
            id: '',
            type: this.postType === 'REEL' ? MediaEnum.VIDEO : MediaEnum.PHOTO,
          },
          url: m,
          media_user_id: {
            name: this._jwtService.getUserInfo()?.name,
            email: this._jwtService.getUserInfo()?.email,
          } as User,
          media_group_id: null,
          latitude: 0,
          longitude: 0,
          create_at: new Date(),
        };
      });

      const hastag: Hastag[] = this.tags().map((t) => {
        return {
          id: '',
          name: t.name,
        } as Hastag;
      });

      const users: User[] = this.peoples().map((t) => {
        return { id: '', name: t.name } as User;
      });

      const post: Post = {
        id: postId,
        post_user_id: {
          name: this._jwtService.getUserInfo()?.name,
          email: this._jwtService.getUserInfo()?.email,
        } as User,
        post_medias_id: [...media],
        post_hashtag_id: [...hastag],
        post_group_id: null,
        tagged_users: [...users],
        description: this.formPost.get('text')?.value.replace('\n', ''),
        visible: true,
        create_at: new Date(),
        update_at: new Date(),
      };
      this._postService.createPost(post).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onSelectPerson(event: any) {
    this.addPerson({ value: event.target.innerText } as MatChipInputEvent);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._userService
      .findSuggestersSearch(inputElement.value, 'person', 0, Environment.number)
      .subscribe({
        next: (response) => {
          this.users = response;
          this._cdr.detectChanges();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private onNSFWDetection(image: string, obj: any) {
    this._dialogService.openNSFWDialog(image, obj);
  }

  private fetchMediaAsFile(url: string): Promise<File> {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch media file');
        }
        return response.blob();
      })
      .then((blob) => {
        const fileName = url.split('/').pop() || 'random-file';
        return new File([blob], fileName, { type: blob.type });
      });
  }

  private showAlertMessage(
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
      this._cdr.detectChanges();
    }, duration);
  }

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tags[]>([]);
  readonly peoples = signal<People[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.update((tags: any) => [...tags, { name: value }]);
    }
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

  removeTag(tag: Tags): void {
    this.tags.update((tags: any) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }
      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag.name}`);
      return [...tags];
    });
  }

  editTag(tag: Tags, event: any) {
    const value = event.value.trim();
    if (!value) {
      this.removeTag(tag);
      return;
    }
    this.tags.update((tags: any) => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  addPerson(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const newPerson: People = {
        name: value,
      };
      this.peoples.update((people: any) => [...people, newPerson]);
    }
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

  removePerson(person: People): void {
    this.peoples.update((people: any) => {
      const index = people.indexOf(person);
      if (index < 0) {
        return people;
      }
      people.splice(index, 1);
      this.announcer.announce(`Removed ${person.name}`);
      return [...people];
    });
  }

  editPerson(person: People, event: any) {
    const value = event.value.trim();
    if (!value) {
      this.removePerson(person);
      return;
    }
    this.peoples.update((people: any) => {
      const index = people.indexOf(person);
      if (index >= 0) {
        people[index].name = value;
        return [...people];
      }
      return people;
    });
  }
}
