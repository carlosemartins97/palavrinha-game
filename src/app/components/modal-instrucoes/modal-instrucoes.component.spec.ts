import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInstrucoesComponent } from './modal-instrucoes.component';

describe('ModalInstrucoesComponent', () => {
  let component: ModalInstrucoesComponent;
  let fixture: ComponentFixture<ModalInstrucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInstrucoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInstrucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
