import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDataComponent } from './config-data.component';

describe('ConfigDataComponent', () => {
  let component: ConfigDataComponent;
  let fixture: ComponentFixture<ConfigDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
