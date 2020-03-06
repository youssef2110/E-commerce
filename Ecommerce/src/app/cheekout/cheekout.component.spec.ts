import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheekoutComponent } from './cheekout.component';

describe('CheekoutComponent', () => {
  let component: CheekoutComponent;
  let fixture: ComponentFixture<CheekoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheekoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheekoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
