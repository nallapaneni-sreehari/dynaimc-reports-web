import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyofficeSuitComponent } from './onlyoffice-suit.component';

describe('OnlyofficeSuitComponent', () => {
  let component: OnlyofficeSuitComponent;
  let fixture: ComponentFixture<OnlyofficeSuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyofficeSuitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyofficeSuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
