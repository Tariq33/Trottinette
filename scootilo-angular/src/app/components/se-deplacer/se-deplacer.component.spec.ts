import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDeplacerComponent } from './se-deplacer.component';

describe('SeDeplacerComponent', () => {
  let component: SeDeplacerComponent;
  let fixture: ComponentFixture<SeDeplacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeDeplacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeDeplacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
