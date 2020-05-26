import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteAdministrateurComponent } from './mon-compte-administrateur.component';

describe('MonCompteAdministrateurComponent', () => {
  let component: MonCompteAdministrateurComponent;
  let fixture: ComponentFixture<MonCompteAdministrateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCompteAdministrateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCompteAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
