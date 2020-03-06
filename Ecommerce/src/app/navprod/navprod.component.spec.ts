import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavprodComponent } from './navprod.component';

describe('NavprodComponent', () => {
  let component: NavprodComponent;
  let fixture: ComponentFixture<NavprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
