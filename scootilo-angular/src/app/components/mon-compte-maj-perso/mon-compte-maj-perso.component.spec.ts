import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteMajPersoComponent } from './mon-compte-maj-perso.component';

describe('MonCompteMajPersoComponent', () => {
  let component: MonCompteMajPersoComponent;
  let fixture: ComponentFixture<MonCompteMajPersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCompteMajPersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCompteMajPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
