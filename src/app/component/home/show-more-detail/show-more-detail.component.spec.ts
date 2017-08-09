import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreDetailComponent } from './show-more-detail.component';

describe('ShowMoreDetailComponent', () => {
  let component: ShowMoreDetailComponent;
  let fixture: ComponentFixture<ShowMoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
