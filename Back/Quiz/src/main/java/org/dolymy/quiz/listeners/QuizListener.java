package org.dolymy.quiz.listeners;

import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.services.SequenceGeneratorService;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class QuizListener extends AbstractMongoEventListener<Quiz> {
    private final SequenceGeneratorService sequenceGenerator;

    public QuizListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Quiz> event) {
        if (event.getSource().getQuizId() < 1) {
            event.getSource().setQuizId(sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME));
        }
    }
}
