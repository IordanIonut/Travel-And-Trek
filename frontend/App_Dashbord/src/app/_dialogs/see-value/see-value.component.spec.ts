import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeValueComponent } from './see-value.component';

describe('SeeValueComponent', () => {
  let component: SeeValueComponent;
  let fixture: ComponentFixture<SeeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
