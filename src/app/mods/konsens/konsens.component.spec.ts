import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsensComponent } from './konsens.component';

describe('KonsensComponent', () => {
  let component: KonsensComponent;
  let fixture: ComponentFixture<KonsensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
