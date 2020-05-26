import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteClientComponent } from './mon-compte-client.component';

describe('MonCompteClientComponent', () => {
  let component: MonCompteClientComponent;
  let fixture: ComponentFixture<MonCompteClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCompteClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
