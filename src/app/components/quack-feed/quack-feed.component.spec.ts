import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuackFeedComponent } from './quack-feed.component';

describe('QuackFeedComponent', () => {
  let component: QuackFeedComponent;
  let fixture: ComponentFixture<QuackFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuackFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuackFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
