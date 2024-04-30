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
  quiz_id!: number 
  updatedQuiz: QuizModel = { quiz_id: 0, quizName: '', quizTime: new Date(),   questions: [] };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizserviceService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('quiz_id');
      if (id !== null) { 
     this.quiz_id=+id;
     this.getQuizDetails(this.quiz_id);
        
  }
});
this.quiz_id=this.route.snapshot.params['quiz_id']
this.updatedQuiz= { quiz_id: 0, quizName: '', quizTime: new Date() ,   questions: []};
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
    this.quizService.updateQuiz(this.quiz_id, this.updatedQuiz).subscribe(
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