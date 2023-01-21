import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListarSimbolosComponent } from './listar-simbolos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListarSimbolosComponent', () => {
  let component: ListarSimbolosComponent;
  let fixture: ComponentFixture<ListarSimbolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarSimbolosComponent
      ],
      imports: [HttpClientTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule
      ]
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
