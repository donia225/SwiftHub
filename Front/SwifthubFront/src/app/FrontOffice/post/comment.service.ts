import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://52.228.152.99:8222'; 

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/api/post/${postId}/comments`);
  }
  

  addComment(comment: Comment, idPost: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/api/post/comments?idPost=${idPost}`, comment);
  }
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/post/comments/${id}`);
  } 

  updateComment(comment: Comment,idPost: number): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/api/post/comments/${comment.id}?idPost=${idPost}`, comment); 
  }
}
