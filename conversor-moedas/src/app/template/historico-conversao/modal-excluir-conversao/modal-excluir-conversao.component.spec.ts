import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirConversaoComponent } from './modal-excluir-conversao.component';

describe('ModalExcluirConversaoComponent', () => {
  let component: ModalExcluirConversaoComponent;
  let fixture: ComponentFixture<ModalExcluirConversaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirConversaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirConversaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
