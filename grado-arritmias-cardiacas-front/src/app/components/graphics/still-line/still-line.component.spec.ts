import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StillLineComponent } from './still-line.component';

describe('StillLineComponent', () => {
  let component: StillLineComponent;
  let fixture: ComponentFixture<StillLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StillLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StillLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
