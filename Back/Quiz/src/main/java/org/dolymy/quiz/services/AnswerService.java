package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Answer;

import org.dolymy.quiz.repos.AnswerRepository;
import org.dolymy.quiz.repos.QuestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private static final Logger LOG = LoggerFactory.getLogger(AnswerService.class);
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with this id";

    private final AnswerRepository answerRepository;
    private  final QuestionRepository questionRepository;



    public List<Answer> getAllAnswers() {
        return this.answerRepository.findAll();
    }
    public Answer findAnswerById(Long id) {
        Answer a = null;
        if (id != null) {
            final Optional<Answer> answerOptional = this.answerRepository.findById(id);
            if (answerOptional .isPresent()) {
                a = answerOptional.get();
            } else {
                LOG.error(ERROR_NON_PRESENT_ID);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }


        return a;


    }





}
