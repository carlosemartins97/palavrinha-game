import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatsComponent } from './modal-stats.component';

describe('ModalStatsComponent', () => {
  let component: ModalStatsComponent;
  let fixture: ComponentFixture<ModalStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
