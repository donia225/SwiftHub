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
        {label: 'question',
        items: [
           
            { label: 'List questions', icon: 'pi pi-fw pi-check-square', routerLink: ['/question/list-question'] },
            
           
        ]
    },

    
    {
        label: 'Request',
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
                    }
                   
                ]
            },
            
        ]
    },

    {
        label: '',
        icon: '',
        items: [
          
            {
                label: 'Category',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'List categories',
                        icon: 'pi pi-list',
                        routerLink: ['/category/list-category']
                    },
                    {
                        label:'Add category',
                        icon: 'pi pi-plus',
                        routerLink: ['/category/add-category']
                    }
                   
                ]
            },
            
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
                    {
                        label: 'Workshop',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'workshops',
                                icon: 'pi pi-fw pi-arrow-right',
                                routerLink: ['/workshopBack/show']
                            },
                            {
                                label:'feedbacks',
                                icon: 'pi pi-fw pi-arrow-right',
                                routerLink: ['/feedback/show']
                            }
                           
                        ]
                    },





                    
                ]
            },
           
            
        ];
    }
}
