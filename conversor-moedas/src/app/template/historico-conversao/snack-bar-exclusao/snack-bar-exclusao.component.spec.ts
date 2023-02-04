import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackBarExclusaoComponent } from './snack-bar-exclusao.component';

describe('SnackBarExclusaoComponent', () => {
  let component: SnackBarExclusaoComponent;
  let fixture: ComponentFixture<SnackBarExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackBarExclusaoComponent],
      imports: [MatSnackBarModule],
      providers: [{
        provide: MatSnackBarRef,
        useValue: {}
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SnackBarExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
