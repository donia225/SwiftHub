package org.dolymy.quiz.listeners;

import org.dolymy.quiz.entities.Question;


import org.dolymy.quiz.services.SequenceGeneratorService;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class QuestionListener extends AbstractMongoEventListener<Question> {
    private final SequenceGeneratorService sequenceGenerator;

    public QuestionListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Question> event) {
        if (event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGenerator.generateSequence(Question.SEQUENCE_NAME));
        }
    }
}
