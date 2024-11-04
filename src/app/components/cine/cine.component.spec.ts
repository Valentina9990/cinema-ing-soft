import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CineComponent } from './cine.component';

describe('CineComponent', () => {
  let component: CineComponent;
  let fixture: ComponentFixture<CineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
