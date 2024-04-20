import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

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
       
           
            
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                  
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/login']
                            },
                            {
                                label:'Register'
                            }
                           
                        ]
                    },
                    
                ]
            },
           
            
        ];
    }
}
