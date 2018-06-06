import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaymComponent } from './displaym.component';

describe('DisplaymComponent', () => {
  let component: DisplaymComponent;
  let fixture: ComponentFixture<DisplaymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
