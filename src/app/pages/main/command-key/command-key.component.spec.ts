import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandKeyComponent } from './command-key.component';

describe('CommandKeyComponent', () => {
  let component: CommandKeyComponent;
  let fixture: ComponentFixture<CommandKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
