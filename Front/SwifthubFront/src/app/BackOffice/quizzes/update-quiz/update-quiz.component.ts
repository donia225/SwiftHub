import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizserviceService } from '../service/quizservice.service';
import { QuizModel } from '../Model/quiz-model';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quizId: number = 0;
  updatedQuiz: QuizModel = { quiz_id: 0, quizName: '', quizTime: new Date() };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizserviceService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('quiz_id');
      if (idString !== null) { 
        const id = +idString; 
        if (!isNaN(id)) { 
          this.quizId = id;
          this.getQuizDetails(this.quizId);
        } else {
          console.error('Identifiant du quiz invalide');
        }
      } else {
        console.error('Identifiant du quiz manquant');
      }
    });
  }
  
  
  

  getQuizDetails(quiz_id: number): void {
    this.quizService.getQuizById(quiz_id).subscribe(
      (quiz: QuizModel) => {
        this.updatedQuiz = quiz;
      },
      (error) => {
        console.error('Erreur lors de la récupération du quiz :', error);
      }
    );
  }

  onSubmit(): void {
    this.quizService.updateQuiz(this.quizId, this.updatedQuiz).subscribe(
      (response) => {
        console.log('Quiz mis à jour avec succès !', response);
        this.router.navigate(['/quiz/list-quiz']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du quiz :', error);
      }
    );
  }
}