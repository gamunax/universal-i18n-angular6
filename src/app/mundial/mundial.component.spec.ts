import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MundialComponent } from './mundial.component';

describe('MundialComponent', () => {
  let component: MundialComponent;
  let fixture: ComponentFixture<MundialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MundialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MundialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
