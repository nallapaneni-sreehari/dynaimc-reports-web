import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDilogComponent } from './confirmation-dilog.component';

describe('ConfirmationDilogComponent', () => {
  let component: ConfirmationDilogComponent;
  let fixture: ComponentFixture<ConfirmationDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDilogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
