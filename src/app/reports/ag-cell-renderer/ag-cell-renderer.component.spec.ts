import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCellRendererComponent } from './ag-cell-renderer.component';

describe('AgCellRendererComponent', () => {
  let component: AgCellRendererComponent;
  let fixture: ComponentFixture<AgCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgCellRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
