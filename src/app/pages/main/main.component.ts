import { Component } from '@angular/core';
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
import { SelectButton } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { deviceSettings, moreSidebarNavigations, sidebarNavigations } from '@/app/shared/constants';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ButtonModule, InputTextModule, CardModule, ToastModule, DividerModule, SelectModule, MultiSelectModule, 
            AvatarModule, RouterModule, FormsModule, SelectButton, TooltipModule, OverlayBadgeModule,DrawerModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {


  sampleOptions: any[];
  selectedSampleOption: any;

  sampleAppsSidebarNavs: any = sidebarNavigations;

  sampleAppsSidebarNavsMore: any = moreSidebarNavigations;

  selectedSampleAppsSidebarNav: any = 'Overview';

  isSlimMenu: boolean = true;

  drawerVisible: boolean = false;

  deviceSettings:any[] = deviceSettings

  constructor(private router: Router) {

    this.sampleOptions = [
      { icon: 'pi pi-home', title: 'Overview', href: '/main/overview' },
    ];
    this.selectedSampleOption = this.sampleOptions[0];

  }

  setSelectedSampleAppsSidebarNav(title: any, href:string) {
    this.selectedSampleAppsSidebarNav = title;
    this.router.navigate([href])
  }

}
