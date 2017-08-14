import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailComponent } from './more-detail.component';

describe('MoreDetailComponent', () => {
  let component: MoreDetailComponent;
  let fixture: ComponentFixture<MoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
