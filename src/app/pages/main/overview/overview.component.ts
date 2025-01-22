import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-overview',
  imports: [ButtonModule,OverlayBadgeModule,FormsModule,DrawerModule,SelectButtonModule,TooltipModule,AvatarModule,TagModule ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {





  constructor() {}



}
