import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDeplacerTarifComponent } from './se-deplacer-tarif.component';

describe('SeDeplacerTarifComponent', () => {
  let component: SeDeplacerTarifComponent;
  let fixture: ComponentFixture<SeDeplacerTarifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeDeplacerTarifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeDeplacerTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
