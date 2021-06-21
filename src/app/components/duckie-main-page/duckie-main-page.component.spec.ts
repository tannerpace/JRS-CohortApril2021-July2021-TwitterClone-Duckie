import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckieMainPageComponent } from './duckie-main-page.component';

describe('DuckieMainPageComponent', () => {
  let component: DuckieMainPageComponent;
  let fixture: ComponentFixture<DuckieMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuckieMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuckieMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
