import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Workshop } from 'src/app/models/workshop/workshop';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-show-workshop',
  templateUrl: './show-workshop.component.html',
  styleUrls: ['./show-workshop.component.scss']
})
export class ShowWorkshopComponent implements OnInit {


  displyDialogDelete: boolean = false;
  breadcrumbItems: MenuItem[] = [];
  workshops!: Workshop[];
  selectedWorkshopId: string | null = null;

  constructor(public serviceWorkshop: WorkshopService, public router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  //  get all workshops
  getWorkshops() {
    this.serviceWorkshop.getAllWorkshops().subscribe(
      res => {
        this.workshops = res;

      },
      err => {
        console.log(err);

      }
    );
  }

  // delete workshop
  cancelDelete() {
    this.selectedWorkshopId = null;
  }

  deleteWorkshop(workshopId: string) {
    this.selectedWorkshopId = workshopId;
    this.confirmationService.confirm({
      header: 'deleting workshop',
      message: 'Are you sure ?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        if (this.selectedWorkshopId != null) {
          this.serviceWorkshop.deleteWorkshop(this.selectedWorkshopId).subscribe(
            () => {
              console.log("delete success");
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have confirmed deletion', life: 3000 });
              this.selectedWorkshopId = null;
              setTimeout(() => {
                this.getWorkshops();
              }, 1000);
            },
            err => {
              console.log("error deleting workshop:" + err);

            }
          );
        }
      },
      reject: () => {
        this.cancelDelete();
        this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: 'You have cancelled deletion', life: 3000 });
      }
    });
  }


  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'dashboard', routerLink: '/dashboard' },
      { label: 'workshops' }
    ];

    this.getWorkshops();


  }

}
