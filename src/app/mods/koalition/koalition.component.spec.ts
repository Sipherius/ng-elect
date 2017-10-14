import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoalitionComponent } from './koalition.component';

describe('KoalitionComponent', () => {
  let component: KoalitionComponent;
  let fixture: ComponentFixture<KoalitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoalitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoalitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
