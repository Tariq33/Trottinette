import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteCrediterComponent } from './mon-compte-crediter.component';

describe('MonCompteCrediterComponent', () => {
  let component: MonCompteCrediterComponent;
  let fixture: ComponentFixture<MonCompteCrediterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCompteCrediterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCompteCrediterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
