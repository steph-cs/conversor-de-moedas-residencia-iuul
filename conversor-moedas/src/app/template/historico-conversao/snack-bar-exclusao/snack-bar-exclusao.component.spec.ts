import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarExclusaoComponent } from './snack-bar-exclusao.component';

describe('SnackBarExclusaoComponent', () => {
  let component: SnackBarExclusaoComponent;
  let fixture: ComponentFixture<SnackBarExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarExclusaoComponent ]
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
