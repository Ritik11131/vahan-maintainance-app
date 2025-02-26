import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { moreSidebarNavigations, sidebarNavigations } from '@/app/shared/constants';
import { AuthService } from '@/app/core/services/auth.service';
import { UiService } from '@/app/core/services/ui.service';
import { GenericDrawerComponent } from '@/app/shared/components/generic-drawer/generic-drawer.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GeneralComponent } from "./settings/general/general.component";
import { DeviceConfigurationsComponent } from './settings/device-configurations/device-configurations.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ButtonModule, InputTextModule, CardModule, ToastModule, DividerModule, SelectModule, MultiSelectModule,
    AvatarModule, RouterModule, FormsModule, TooltipModule, OverlayBadgeModule, DrawerModule, GenericDrawerComponent, SelectButtonModule, GeneralComponent, DeviceConfigurationsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  @ViewChild("settingsContent") settingsContent!: TemplateRef<any>;



  selectedSampleOption: any;
  sampleAppsSidebarNavs: any = sidebarNavigations;
  sampleAppsSidebarNavsMore: any = moreSidebarNavigations;
  isSlimMenu: boolean = true;
  settingsOptions = [
    { label: 'General', value: 'general' },
    { label: 'Device', value: 'device' }
  ];

  selectedSetting = this.settingsOptions[0]; // Default: General Settings

  constructor(private router: Router,public uiService:UiService, private authService:AuthService) {
    const lastSelectedNav = localStorage.getItem('lastSelectedNav')?.split(',');
    this.uiService.setSelectedSampleAppsSidebarNav(lastSelectedNav?.[0] || 'Device', lastSelectedNav?.[1] || '/main/device');
    // this.setSelectedSampleAppsSidebarNav(lastSelectedNav?.[0] || 'Device', lastSelectedNav?.[1] || '/main/device');
  }

  setSelectedSampleAppsSidebarNav(title: any, href: string) {
    this.uiService.setSelectedSampleAppsSidebarNav(title, href);
    // localStorage.setItem('lastSelectedNav', [title, href].join(','));
    // this.selectedSampleAppsSidebarNav = title;
    // this.router.navigate([href])
  }

  handleMoreNavClick(event: any) {
    this.uiService.openDrawer(this.settingsContent, "Settings & More");
  }

  handleLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
