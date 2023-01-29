import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirHistoricoComponent } from './modal-excluir-historico.component';

describe('ModalExcluirHistoricoComponent', () => {
  let component: ModalExcluirHistoricoComponent;
  let fixture: ComponentFixture<ModalExcluirHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalExcluirHistoricoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
