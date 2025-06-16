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
import { NsfwDetectionService } from 'projects/app-create/src/lib/_service/_api/nsfwDetection.service';
import { PhotoDescribeService } from 'projects/app-create/src/lib/_service/_api/photoDescribe.service';
import { HashtagGenerateService } from 'projects/app-create/src/lib/_service/_api/hashtagGenerate.service';
import { DialogService } from 'projects/app-create/src/lib/_service/_dialogs/dialog.service';
import { NsfwDetectionTextService } from 'projects/app-create/src/lib/_service/_api/nsfwDetectionText.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { UserService } from 'projects/app-create/src/lib/_service/_model/user.service';
import { TranslateApiService } from '../../_service/_api/translate.service';
import { timingSafeEqual } from 'crypto';

interface Tags {
  name: string;
}
interface People {
  name: string;
  profile_picture?: string;
}

@Component({
  selector: 'app-post',
  imports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AlertComponent,
    // MatChipsModule,
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
    private _userService: UserService
  ) {
    this.formMedia = this._fb.group({
      media: [null, Validators.required],
    });

    this.formPost = this._fb.group({
      text: [null, Validators.required],
    });

    // this.mediaFiles.push('https://picsum.photos/500/500/?random=0');
    // this.mediaFiles.push('https://picsum.photos/500/500/?random=1');
    // this.mediaFiles.push('https://picsum.photos/500/500/?random=2');
    // this.mediaFiles.push('https://picsum.photos/500/500/?random=3');
    // this.mediaFiles.push('https://picsum.photos/500/500/?random=4');
    // this.mediaFiles.push('https://picsum.photos/500/500/?random=5');
    // this.mediaFiles.push('https://picsum.photos/500/500/?random=8');
    // this.onSelectImage(0);
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
                  if (this.imagePreview === null) {
                    this.imagePreview = this.mediaFiles[0];
                  }
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
        this._photoDescribeService.describeImage(file).then((response: any) => {
          console.log(response);
          this.formPost.get('text')?.setValue(response);
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
        this._photoDescribeService.describeImage(file).then((response: any) => {
          this._hashtagGenerateService
            .checkHashtagGenerate(response)
            .subscribe({
              next: (response) => {
                response.data.slice(0, 5).forEach((tag: any) => {
                  this.newTag = tag.tag;
                  this.addTagFromInput();
                });
              },
              error: (error) => {
                console.error(error);
              },
            });
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
              response.language,
              'en'
            )
            .subscribe({
              next: (response) => {
                if (response.error.code !== 400) {
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
                }
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

  onGeneratePost() {
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
            profile_picture: this._jwtService.getUserInfo()?.img,
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
        return {
          id: '',
          name: t.name,
          profile_picture: t.profile_picture,
        } as User;
      });

      const post: Post = {
        id: postId,
        post_user_id: {
          name: this._jwtService.getUserInfo()?.name,
          email: this._jwtService.getUserInfo()?.email,
          profile_picture: this._jwtService.getUserInfo()?.img,
        } as User,
        post_medias_id: [...media],
        post_hashtag_id: [...hastag],
        post_group_id: null,
        tagged_users: [...users],
        description: this.formPost.get('text')?.value[0],
        visible: true,
        create_at: new Date(),
        update_at: new Date(),
      };
      console.log(post);

      this._dialogService.openPreviewPostDialog(post);
    }
  }

  onSelectPerson(event: any) {
    this.newPerson = event.target.innerText;
    this.addPersonFromInput();
  }

  showSuggestions = signal(false);

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim();
    this.newPerson = query;

    if (!query) {
      this.users = [];
      this.showSuggestions.set(false);
      return;
    }

    this._userService
      .findSuggestersSearch(query, 'person', 0, Environment.number)
      .subscribe({
        next: (response) => {
          this.users = response;
          this.showSuggestions.set(this.users.length > 0);
          this._cdr.detectChanges();
        },
        error: (error) => {
          console.log('Autocomplete error:', error);
          this.showSuggestions.set(false);
        },
      });
  }

  selectSuggestion(name: string) {
    this.newPerson = name;
    this.addPersonFromInput();
    this.showSuggestions.set(false);
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

  readonly announcer = inject(LiveAnnouncer);

  readonly tags = signal<Tags[]>([]);
  readonly peoples = signal<People[]>([]);

  newTag = '';
  newPerson = '';

  // Helper: trackBy functions for ngFor
  trackByTag(index: number, item: Tags) {
    return item.name;
  }

  trackByPerson(index: number, item: People) {
    return item.name;
  }

  // Add tag/people on Enter or Comma key press
  handleInputKeydown(event: KeyboardEvent, type: 'tag' | 'person') {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      if (type === 'tag') {
        this.addTagFromInput();
      } else {
        this.addPersonFromInput();
      }
    }
  }

  addTagFromInput() {
    const value = this.newTag.trim();
    if (value) {
      this.tags.update((tags) => [...tags, { name: value }]);
      this.announcer.announce(`Added ${value}`);
    }
    this.newTag = '';
  }

  removeTag(tag: Tags) {
    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) return tags;
      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag.name}`);
      return [...tags];
    });
  }

  editTag(tag: Tags, newValue: string | null) {
    const value = (newValue ?? '').trim();
    if (!value) {
      this.removeTag(tag);
      return;
    }
    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  addPersonFromInput() {
    const value = this.newPerson.trim();
    if (value) {
      const newPerson: People = {
        name: value,
        profile_picture: '',
      };
      this.peoples.update((people) => [...people, newPerson]);
      this.announcer.announce(`Added ${value}`);
    }
    this.newPerson = '';
  }

  removePerson(person: People) {
    this.peoples.update((people) => {
      const index = people.indexOf(person);
      if (index < 0) return people;
      people.splice(index, 1);
      this.announcer.announce(`Removed ${person.name}`);
      return [...people];
    });
  }

  editPerson(person: People, newValue: string | null) {
    const value = (newValue ?? '').trim();
    if (!value) {
      this.removePerson(person);
      return;
    }
    this.peoples.update((people) => {
      const index = people.indexOf(person);
      if (index >= 0) {
        people[index].name = value;
        return [...people];
      }
      return people;
    });
  }

  blurTarget(target: EventTarget | null): void {
    if (
      target &&
      'blur' in target &&
      typeof (target as HTMLElement).blur === 'function'
    ) {
      (target as HTMLElement).blur();
    }
  }

  editPersonFromEvent(person: People, target: EventTarget | null) {
    if (target && 'textContent' in target) {
      const text = (target as HTMLElement).textContent?.trim() ?? '';
      this.editPerson(person, text);
    }
  }

  editTagFromEvent(tag: Tags, target: EventTarget | null) {
    if (target && 'textContent' in target) {
      const text = (target as HTMLElement).textContent?.trim() ?? '';
      this.editTag(tag, text);
    }
  }
}
