import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteAjoutAdresseComponent } from './mon-compte-ajout-adresse.component';

describe('MonCompteAjoutAdresseComponent', () => {
  let component: MonCompteAjoutAdresseComponent;
  let fixture: ComponentFixture<MonCompteAjoutAdresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCompteAjoutAdresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCompteAjoutAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
