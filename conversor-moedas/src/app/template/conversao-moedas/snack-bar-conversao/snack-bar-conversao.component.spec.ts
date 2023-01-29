import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarConversaoComponent } from './snack-bar-conversao.component';

describe('SnackBarConversaoComponent', () => {
  let component: SnackBarConversaoComponent;
  let fixture: ComponentFixture<SnackBarConversaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarConversaoComponent ]
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
