import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimesComponent } from './showtimes.component';

describe('ShowtimesComponent', () => {
  let component: ShowtimesComponent;
  let fixture: ComponentFixture<ShowtimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
