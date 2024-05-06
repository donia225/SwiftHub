package org.dolymy.quiz.listeners;

import org.dolymy.quiz.entities.Answer;
import org.dolymy.quiz.services.SequenceGeneratorService;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class AnswerListener extends AbstractMongoEventListener<Answer> {
    private final SequenceGeneratorService sequenceGenerator;

    public AnswerListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Answer> event) {
        Answer answer = event.getSource();


        if (answer.getAnswer_id() == null) {
            answer.setAnswer_id(sequenceGenerator.generateSequence(Answer.SEQUENCE_NAME));
        }
    }
}
