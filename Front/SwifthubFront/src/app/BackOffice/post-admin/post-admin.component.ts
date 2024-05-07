import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PostService } from 'src/app/FrontOffice/post/post.service';
import { Post } from 'src/app/FrontOffice/post/post.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.scss']
})
export class PostAdminComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  posts: Post[] = []; // Déclaration de la propriété posts comme un tableau vide

  constructor(private confirmationService: ConfirmationService,private postService: PostService,private messageService: MessageService) {
    this.loadPosts();
  }

  ngOnInit() {
   
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  } 


  hidePost(post: Post): void {
    this.confirmationService.confirm({
      message: 'Do you want to hide this post?',
      header: 'Hide Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        post.visibility = 0; // Mettre à jour la visibilité localement
        this.postService.updatePost(post).subscribe(
          () => {
            // Actualiser les posts après la mise à jour
            this.loadPosts();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          },
          (error) => {
            console.error('Error hiding post:', error);
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  
showPost(post: Post): void {
  this.confirmationService.confirm({
    message: 'Do you want to show this post ?',
    header: 'Show Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon: 'none',
    rejectIcon: 'none',
    rejectButtonStyleClass: 'p-button-text',
    accept: () => {
      post.visibility = 1; // Mettre à jour la visibilité localement
      this.postService.updatePost(post).subscribe(
        () => {
          // Actualiser les posts après la mise à jour
          this.loadPosts();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        (error) => {
          console.error('Error showing post:', error);
        }
      );
    },
    reject: () => {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
}

}
