import {
  Component,
  ElementRef,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';
import {
  FilterSeach,
  iconsObject,
  JwtService,
  MaterialModule,
  SearchDTO,
  ShadowService,
} from 'travel-and-trek-app-core/dist/app-core';
import { DialogService } from 'projects/app-dashboard/src/lib/_service/dialog/dialog.service';
import { UserService } from 'projects/app-dashboard/src/lib/_service/models/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  setLoadingOnRequest,
  SkeletonService,
} from 'projects/app-dashboard/src/lib/_service/common/skeleton.service';

@Component({
  selector: 'app-masthead',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './masthead.component.html',
  styleUrl: './masthead.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MastheadComponent {
  buttonPosition!: Position;
  selectValue!: FilterSeach;
  formSearch!: FormGroup;
  placeholder: SearchDTO = {
    name: 'Search...',
    type: 'Search...',
    id: 'Search...',
    profile_picture: '',
  };
  profile!: string;
  iconsObjectNow = iconsObject;
  @ViewChild('masthead') masthead!: ElementRef;
  @ViewChild('img', { static: false })
  img!: ElementRef<HTMLImageElement>;
  @ViewChild('con', { static: false })
  con!: ElementRef<HTMLElement>;
  @ViewChild('input') inputField!: ElementRef;

  filters: FilterSeach[] = [
    {
      value: 'all',
      icon: 'apps',
      name: 'All',
    },
    { value: 'location', icon: 'location_on', name: 'Location' },
    {
      value: 'people',
      icon: 'person',
      name: 'Person',
    },
    {
      value: 'group',
      icon: 'group',
      name: 'Group',
    },
    { value: 'post', icon: 'pages', name: 'Post' },
    { value: 'tag', icon: 'tag', name: 'Tag' },
  ];
  options!: SearchDTO[];
  params!: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private shadow: ShadowService,
    private userService: UserService,
    private router: Router,
    private _jwtService: JwtService,
    protected _skeletonService: SkeletonService
  ) {
    this.profile = this._jwtService.getUserInfo()?.img!;
    this.formSearch = this.fb.group({
      search: [''],
    });

    this.route.queryParams.subscribe((params) => {
      this.formSearch.get('search')?.setValue(params['search']);
      if (params['search'])
        this.placeholder = {
          name: params['search'],
          type: params['type'],
          id: 'Search...',
          profile_picture: '',
        };
      this.selectValue = this.filters.find((f) => f.value === params['type'])!;
      if (this.selectValue === undefined) {
        this.selectValue = this.filters[0];
      }
      this.params = params;
    });
  }

  ngAfterViewChecked(): void {
    if (this.img !== undefined && this.con !== undefined) {
      const image = this.img.nativeElement;
      const content = this.con.nativeElement;
      image.crossOrigin = 'anonymous';
      if (image.complete) {
        this.shadow.applyShadowStory(image, content);
      } else
        image.addEventListener('load', () => {
          this.shadow.applyShadowStory(image, content);
        });
    }
  }

  protected onOpenChat(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const divHeight = this.masthead.nativeElement.clientHeight;

    this.buttonPosition = {
      pos_x: rect.x,
      pos_y: divHeight,
    };

    this.dialog.openDialogChat(this.buttonPosition);
  }

  protected onOpenNotification(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const divHeight = this.masthead.nativeElement.clientHeight;

    this.buttonPosition = {
      pos_x: rect.x,
      pos_y: divHeight,
    };

    this.dialog.openDialogNotification(this.buttonPosition);
  }

  protected onOpenProfile(event: MouseEvent, name: string) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const divHeight = this.masthead.nativeElement.clientHeight;
    this.buttonPosition = {
      pos_x: rect.x,
      pos_y: divHeight,
    };
    this.dialog.openDialogProfile(this.buttonPosition, name, 'all');
  }

  protected onOpenPosibility(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    // const divHeight = this.inputField.nativeElement.clientHeight;
    this.buttonPosition = {
      pos_x: rect.right,
      pos_y: rect.y,
    };
    this.dialog.openDialogFilter(
      this.filters,
      this.buttonPosition,
      (selectedValue) => {
        this.selectValue = selectedValue;
        this.onInputChange(event);
      }
    );
  }

  protected onInputChange(event: Event) {
    this.userService
      .findSuggestersSearch(
        this.formSearch.value.search,
        this.selectValue.value,
        0,
        10
      )
      .subscribe({
        next: (data: SearchDTO[]) => {
          this.options = data;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }

  protected onWillBeSelect(option: SearchDTO) {
    this.placeholder = option;
  }

  protected onSelectValue(option: SearchDTO, type: string) {
    const searchValue =
      type === 'enter' ? this.formSearch?.get('search')?.value : option;
    this.router
      .navigate(['/dashboard/search'], {
        queryParams: {
          type: this.selectValue.value,
          search: searchValue.name ? searchValue.name : searchValue,
        },
      })
      .then(() => {
        window.location.reload();
      });
  }
}
