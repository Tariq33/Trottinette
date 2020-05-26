import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDaccueilComponent } from './page-daccueil.component';

describe('PageDaccueilComponent', () => {
  let component: PageDaccueilComponent;
  let fixture: ComponentFixture<PageDaccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDaccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDaccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
