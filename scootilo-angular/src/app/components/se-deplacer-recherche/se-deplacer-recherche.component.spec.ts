import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDeplacerRechercheComponent } from './se-deplacer-recherche.component';

describe('SeDeplacerRechercheComponent', () => {
  let component: SeDeplacerRechercheComponent;
  let fixture: ComponentFixture<SeDeplacerRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeDeplacerRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeDeplacerRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
