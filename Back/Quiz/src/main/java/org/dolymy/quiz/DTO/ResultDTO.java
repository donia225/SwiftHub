package org.dolymy.quiz.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResultDTO {
    private Long quizId;
    private double score;
  private String studentId;


}
