import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarvendComponent } from './navbarvend.component';

describe('NavbarvendComponent', () => {
  let component: NavbarvendComponent;
  let fixture: ComponentFixture<NavbarvendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarvendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarvendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
