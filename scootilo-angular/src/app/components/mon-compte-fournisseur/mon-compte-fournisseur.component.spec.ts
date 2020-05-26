import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteFournisseurComponent } from './mon-compte-fournisseur.component';

describe('MonCompteFournisseurComponent', () => {
  let component: MonCompteFournisseurComponent;
  let fixture: ComponentFixture<MonCompteFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCompteFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCompteFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
