import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuackFormComponent } from './new-quack-form.component';

describe('NewQuackFormComponent', () => {
  let component: NewQuackFormComponent;
  let fixture: ComponentFixture<NewQuackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
