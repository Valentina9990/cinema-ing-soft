import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaComponent } from './comida.component';

describe('ComidaComponent', () => {
  let component: ComidaComponent;
  let fixture: ComponentFixture<ComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
