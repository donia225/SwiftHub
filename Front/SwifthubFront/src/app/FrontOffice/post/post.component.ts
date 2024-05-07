import { Component } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Router } from '@angular/router';
import { CommentService } from './comment.service';
import { Comment } from './post.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  formData: any = {
    idUser: "",
    description: ""
  };
  posts: Post[] = [];
  selectedFile: File | null = null;
  showForm = false;
  editingPost: Post | null = null;
  showEditForm = false;
  selectedEditFile: File | null = null;
  textColor: string = '#000000';
  comments: Comment[] = [];
  constructor(private router: Router, private postService: PostService,private commentService: CommentService) {
    this.loadPosts();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const newPost: any = {
      idUser: this.formData.idUser,
      title: this.formData.title,
      description: this.formData.description,
      postDate: new Date(),
      attachment: this.selectedFile ? this.selectedFile.name : null
    };

    this.postService.createPost(newPost).subscribe(
      (createdPost) => {
        console.log('Post added successfully:', createdPost);
        // Réinitialiser les données du formulaire après la soumission
        this.formData = {};
        this.selectedFile = null;
        this.showForm = false; // Masquer le formulaire après avoir ajouté le post

        // Recharger la page après avoir ajouté le post
        this.loadPosts();
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
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

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(
      () => {
        console.log('Post deleted successfully');
        this.loadPosts();
      },
      (error) => {
        console.error('Error deleting post:', error);
        alert('Une erreur s\'est produite lors de la suppression du post. Veuillez réessayer.');
      }
    );
  }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }
  toggleEditFormVisibility(): void {
    this.showEditForm = !this.showEditForm;
  }

  editPost(post: Post): void {
    this.editingPost = { ...post }; 
    this.showEditForm = true; // Assurez-vous que showEditForm est défini sur true
  }
  

  cancelEdit(): void {
    this.editingPost = null;
    this.showEditForm = false;
  }

  onEditFileSelected(event: any): void {
    this.selectedEditFile = event.target.files[0];
  }

  updatePost(post: Post): void {
    // Créer un nouvel objet Post avec les données mises à jour
    const updatedPost: any = {
      id: post.id,
      idUser: post.idUser,
      title: post.title,
      description: post.description,
      postDate: new Date(),
      visibility: post.visibility,
      attachment: this.selectedEditFile ? this.selectedEditFile.name : post.attachment
    };

    this.postService.updatePost(updatedPost).subscribe(
      (updatedPost) => {
        console.log('Post updated successfully:', updatedPost);
        this.loadPosts();
        this.cancelEdit();
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }

  cancelAdd(): void {
    this.showForm = false;
    this.formData = {};
    this.selectedFile = null;
  }

  selectedPostId: number | null = null;
  showPostDetails(postId: number): void {
    this.selectedPostId = postId;
    if (this.selectedPostId !== null) {
      this.loadComments(this.selectedPostId);
    }
  }
  loadComments(postId: number): void {
    this.commentService.getCommentsByPostId(postId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }
  
  formGroup!: FormGroup;
  searchTerm: string = '';

  
  ngOnInit() {
    this.formGroup = new FormGroup({
      value: new FormControl('')
    });

    // Écoutez les changements dans le champ de recherche
    this.formGroup.get('value')?.valueChanges.subscribe(value => {
      this.searchTerm = value;
      this.searchPosts();
    });
  }

  searchPosts(): void {
    if (!this.searchTerm) {
      this.loadPosts();
      return;
    }

    this.posts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (post.description && post.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
  

