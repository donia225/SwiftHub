import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
          
        {
            label: 'quiz',
            items: [
                { label: 'Ajouter quiz', icon: 'pi pi-fw pi-id-card', routerLink: ['/quiz/add-quiz'] },
                { label: 'List quiz', icon: 'pi pi-fw pi-check-square', routerLink: ['/quiz/list-quiz'] },
               
            ]
        },
  /*       {
            label: 'request',
            items: [
                { label: 'Add request', icon: 'pi pi-plus', routerLink: ['/request/add-request'] },
                { label: 'List requests', icon: 'pi pi-list', routerLink: ['/request/list-request'] },
               
            ]
                 
       
            
        }, */
       
           
            
            {
                label: '',
                icon: '',
                items: [
                  
                    {
                        label: 'Request',
                        icon: 'pi pi-book',
                        items: [
                            {
                                label: 'List requests',
                                icon: 'pi pi-list',
                                routerLink: ['/request/list-request']
                            },
                            {
                                label:'Add request',
                                icon: 'pi pi-plus',
                                routerLink: ['/request/add-request']
                            }
                           
                        ]
                    },
                    
                ]
            },
           
            
        ];
    }
}
