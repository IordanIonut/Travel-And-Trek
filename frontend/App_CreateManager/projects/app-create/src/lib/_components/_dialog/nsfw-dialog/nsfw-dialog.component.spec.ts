import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsfwDialogComponent } from './nsfw-dialog.component';

describe('NsfwDialogComponent', () => {
  let component: NsfwDialogComponent;
  let fixture: ComponentFixture<NsfwDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsfwDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsfwDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
