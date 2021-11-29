import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFormComponentComponent } from './player-form-component.component';

describe('PlayerFormComponentComponent', () => {
  let component: PlayerFormComponentComponent;
  let fixture: ComponentFixture<PlayerFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
