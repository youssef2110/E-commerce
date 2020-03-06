import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacevendeurComponent } from './espacevendeur.component';

describe('EspacevendeurComponent', () => {
  let component: EspacevendeurComponent;
  let fixture: ComponentFixture<EspacevendeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacevendeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacevendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
