import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackBarConversaoComponent } from './snack-bar-conversao.component';

describe('SnackBarConversaoComponent', () => {
  let component: SnackBarConversaoComponent;
  let fixture: ComponentFixture<SnackBarConversaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarConversaoComponent ],
      imports: [MatSnackBarModule],
      providers : [{
        provide: MatSnackBarRef,
        useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarConversaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
