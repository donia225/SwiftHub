package org.dolymy.quiz.controllers;

import lombok.RequiredArgsConstructor;


import org.dolymy.quiz.entities.Result;


import org.dolymy.quiz.services.ResultService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes/result")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;


    @PostMapping("/add")
    public Result addResult(@RequestBody Result result) {

        return this.resultService.createResult(result);
    }

    }

