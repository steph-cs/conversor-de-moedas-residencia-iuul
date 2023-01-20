import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSimbolosComponent } from './listar-simbolos.component';

describe('ListarSimbolosComponent', () => {
  let component: ListarSimbolosComponent;
  let fixture: ComponentFixture<ListarSimbolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSimbolosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
