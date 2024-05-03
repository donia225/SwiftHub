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
  posts?: Post[];

  constructor( private postService: PostService) {
    this.loadPosts();
  }

  ngOnInit() {
   
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        // Trier les posts par date décroissante, puis par ID du plus grand au plus petit en cas d'égalité de dates
        this.posts = posts.sort((a, b) => {
          const dateA = new Date(a.postDate);
          const dateB = new Date(b.postDate);
          // Si les dates sont différentes, tri par date décroissante
          if (dateB.getTime() !== dateA.getTime()) {
            return dateB.getTime() - dateA.getTime();
          } else {
            return b.id - a.id;
          }
        });
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }

 
}
