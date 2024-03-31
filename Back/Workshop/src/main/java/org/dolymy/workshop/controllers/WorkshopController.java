package org.dolymy.workshop.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Workshop;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workshop/workshops")
@RequiredArgsConstructor
public class WorkshopController {


    @PostMapping
    public Workshop addWorkshop(@RequestBody Workshop workshop){
        return null;
    }





}
