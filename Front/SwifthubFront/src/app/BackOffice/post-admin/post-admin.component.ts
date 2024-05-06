import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PostService } from 'src/app/FrontOffice/post/post.service';
import { Post } from 'src/app/FrontOffice/post/post.model';

@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.scss']
})
export class PostAdminComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  posts: Post[] = []; // Déclaration de la propriété posts comme un tableau vide

  constructor(private postService: PostService) {
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
    const confirmation = window.confirm('Are you sure you want to hide this post?');
    if (confirmation) {
        post.visibility = 0; // Mettre à jour la visibilité localement
        this.postService.updatePost(post).subscribe(
            () => {
                // Actualiser les posts après la mise à jour
                this.loadPosts();
            },
            (error) => {
                console.error('Error hiding post:', error);
            }
        );
    }
}
showPost(post: Post): void {
  const confirmation = window.confirm('Are you sure you want to show this post?');
  if (confirmation) {
      post.visibility = 1; // Mettre à jour la visibilité localement
      this.postService.updatePost(post).subscribe(
          () => {
              // Actualiser les posts après la mise à jour
              this.loadPosts();
          },
          (error) => {
              console.error('Error showing post:', error);
          }
      );
  }
}
text?:string;


}
