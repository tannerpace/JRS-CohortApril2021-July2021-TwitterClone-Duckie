import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuackPageComponent } from './new-quack-page.component';

describe('NewQuackPageComponent', () => {
  let component: NewQuackPageComponent;
  let fixture: ComponentFixture<NewQuackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
