import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuackCardComponent } from './quack-card.component';

describe('QuackCardComponent', () => {
  let component: QuackCardComponent;
  let fixture: ComponentFixture<QuackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuackCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
