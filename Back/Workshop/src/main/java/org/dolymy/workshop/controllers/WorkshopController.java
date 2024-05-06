package org.dolymy.workshop.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.services.WorkshopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workshop/workshops")
@RequiredArgsConstructor
public class WorkshopController {

    private final WorkshopService workshopService;

    /**
     * creates a new workshop
     * @param workshop a workshop entity
     * @return the created workshop entity
     */
    @PostMapping
    public Workshop addWorkshop(@RequestBody Workshop workshop){
        return this.workshopService.saveWorkshop(workshop);
    }

    /**
     * Retrieve all workshops.
     * @return a List of workshops
     */
    @GetMapping
    public List<Workshop> getAllWorkshops(){
        return this.workshopService.findWorkshops();
    }

    /**
     * Retrieve a workshop by ID.
     * @param id ID of the workshop to retrieve.
     * @return The workshop if found, otherwise an empty Optional.
     */
    @GetMapping("/{id}")
    public Workshop getWorkshopById(@PathVariable String id){
        return this.workshopService.findWorkshopById(id);
    }

    /**
     * Update an existing workshop.
     * @param id ID of the workshop to update.
     * @param updatedWorkshop The updated workshop object.
     * @return The updated workshop if successful, otherwise null.
     */
    @PutMapping("/update/{id}")
    public Workshop updateWorkshop(@PathVariable String id, @RequestBody Workshop updatedWorkshop ){
        return this.workshopService.updateWorkshop(id,updatedWorkshop);
    }

    /**
     * Delete a workshop by ID.
     * @param id ID of the workshop to delete.
     */
    @DeleteMapping("/delete/{id}")
    public void deleteWorkshop(@PathVariable String id){
        this.workshopService.deleteWorkshop(id);
    }

    /**
     * Join Workshop
     */
    @PostMapping("/join")
    public boolean JoiningWorkshop(@RequestParam String workshopId,@RequestParam String userId){
       return this.workshopService.JoinWorkshop(workshopId,userId);
    }

    @GetMapping("/joined-user/{id}")
    public List<Workshop> getJoinedUserWorkshops(@PathVariable String id){
        return this.workshopService.findWorkshopsByJoinedUser(id);
    }

    @GetMapping("/user/{id}")
    public List<Workshop> getWorkshopsByUser(@PathVariable String id){
        return this.workshopService.findWorkshopsByUser(id);
    }







}
