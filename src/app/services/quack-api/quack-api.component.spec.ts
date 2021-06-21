import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuackAPIComponent } from './quack-api.component';

describe('QuackAPIComponent', () => {
  let component: QuackAPIComponent;
  let fixture: ComponentFixture<QuackAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuackAPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuackAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
