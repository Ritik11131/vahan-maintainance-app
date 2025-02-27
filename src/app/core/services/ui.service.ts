import { Injectable, signal, type TemplateRef } from "@angular/core"
import { Router } from "@angular/router";
import { MessageService } from "primeng/api"


@Injectable({
  providedIn: "root",
})
export class UiService {

  selectedSampleAppsSidebarNav: any;
  private isDrawerOpenSignal = signal(false)
  private drawerContentSignal = signal<TemplateRef<any> | null>(null)
  private drawerHeaderSignal = signal<string>("Drawer")

  anotherComponentAction = signal<{isActive:boolean, value:any }>({isActive: false, value: null });

  isDrawerOpen = this.isDrawerOpenSignal.asReadonly()
  drawerContent = this.drawerContentSignal.asReadonly()
  drawerHeader = this.drawerHeaderSignal.asReadonly()

  constructor(private messageService: MessageService, private router:Router) {}

  openDrawer(content: TemplateRef<any>, header = "Drawer") {
    this.drawerContentSignal.set(content)
    this.drawerHeaderSignal.set(header)
    this.isDrawerOpenSignal.set(true)
  }

  closeDrawer() {
    this.isDrawerOpenSignal.set(false)
    this.drawerContentSignal.set(null)
    this.drawerHeaderSignal.set("Drawer")
  }

  showToast(severity: "success" | "info" | "warn" | "error", summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail })
  }

  setSelectedSampleAppsSidebarNav(title: any, href: string) {
    localStorage.setItem('lastSelectedNav', [title, href].join(','));
    this.selectedSampleAppsSidebarNav = title;
    this.router.navigate([href])
  }


  triggerComponentAction(isActive:boolean, value: any) {
    this.anotherComponentAction.set({isActive: false, value:null}); // Reset first to ensure a change is detected
    setTimeout(() => this.anotherComponentAction.set({isActive, value}), 0); // Delay to allow reset to take effect
  }
}

