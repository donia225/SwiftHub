import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../post/post.model';
import { PostService } from '../post/post.service';
import { Comment } from '../post/post.model';
import { CommentService } from '../post/comment.service';
import {  MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],

})
export class PostDetailsComponent implements OnInit {
  @Input() postId: number | null = null;
  post: Post | null = null;
  comments: Comment[] = [];
  newCommentText: string = '';
  textColor: string = '#000000';
  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderline: boolean=false;
  isHighlighted: boolean = false;
  showForm = false;
  editingComment: Comment | null = null;
  showEditForm = false;
  LoggedInUser!:User;
  
  constructor(private postService: PostService,
     private commentService: CommentService,
     private messageService:MessageService,
     private userService:UserService
    ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.postId && !changes.postId.firstChange) {
      this.loadPostDetails();
    }
  }
  
  ngOnInit(): void {
    this.loadPostDetails();
   
      //fetch local storage
    var email= window.localStorage.getItem("email");
    console.log(email);
    
   if (email ) {
   
    this.userService.findUserByEmail(email).subscribe(
      res=>{
     this.LoggedInUser=res as User;   
     console.log(this.LoggedInUser);
     
      },
      err=>{
        console.log(err);
        
      }
    );
  }
  }

  
  
  loadPostDetails(): void {
    if (this.postId !== null) {
      this.postService.getPostById(this.postId).subscribe(post => {
        this.post = post;
        this.loadComments();
      });
    }
  }
 

  loadComments(): void {
    this.comments = [];
    if (this.postId !== null) {
      this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  addComment(): void {
    
    if (this.postId !== null) {
      let commentContent = this.newCommentText;
  
      commentContent = commentContent.replace(/\/g/g, '<span style="font-weight: bold">');
      commentContent = commentContent.replace(/\/i/g, '<span style="font-style: italic">');
      commentContent = commentContent.replace(/\/c(\w+)/g, '<span style="color: $1">');
      commentContent = commentContent.replace(/\/end/g, '</span>');
  
      const newComment: Comment = {
        id: null,
        postId: this.postId, 
        content: commentContent,
        commentDate: new Date(),
        idUser: this.LoggedInUser.username,
        textColor: this.textColor,
        isBold: this.isBold,
        isItalic: this.isItalic,
        isUnderline: this.isUnderline,
        isHighlighted: this.isHighlighted
      };
      this.commentService.addComment(newComment, this.postId).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment added successfully !' });

          console.log('Comment added successfully:', response);
          // Ajouter le nouveau commentaire à la liste locale des commentaires avec les styles
          this.comments.push(response);
          this.newCommentText = ''; // Réinitialiser le champ de texte après l'ajout
          // Réinitialiser les styles pour le prochain commentaire
          this.textColor = '#000000';
          this.isBold = false;
          this.isItalic = false;
          this.isUnderline = false;
          this.isHighlighted = false;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed : Comment contain bad words !!' });

          console.error('Error adding comment:', error);
          // Gérer les erreurs en conséquence
        }
      );
    } else {
      console.error('Post ID is null');
    }
   
  }
 
  
  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(
      () => {
        console.log('Comment deleted successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error deleting comment:', error);
        alert('Une erreur s\'est produite lors de la suppression du commentaire. Veuillez réessayer.');
      }
    );
  }
  
  editComment(comment: Comment): void {
    this.editingComment = { ...comment }; 
    this.showEditForm = true; // Assurez-vous que showEditForm est défini sur true
  }
  cancelEdit(): void {
    this.editingComment = null;
    this.showEditForm = false;
  }
  updateComment(comment: Comment): void {
    if (this.postId !== null) {
      const updatedComment: any = {
        id: comment.id,
        idUser: comment.idUser,
        content: comment.content,
        postId: this.postId,
      };
  
      this.commentService.updateComment(updatedComment, this.postId).subscribe(
        (updatedComment) => {
          console.log('Comment updated successfully:', updatedComment);
          this.loadComments();
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating comment:', error);
        }
      );
    } else {
      console.error('Post ID is null');
    }
  }
  

}

