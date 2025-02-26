import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConfigurationsComponent } from './device-configurations.component';

describe('DeviceConfigurationsComponent', () => {
  let component: DeviceConfigurationsComponent;
  let fixture: ComponentFixture<DeviceConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceConfigurationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
