package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.WorkshopRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkshopService {

    private static final Logger LOG = LoggerFactory.getLogger(WorkshopService.class);
    private  static  final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";
    private static final String ERROR_UPDATE= "Error occurred while updating";

    private final WorkshopRepository workshopRepository;


    public Workshop saveWorkshop(Workshop workshop) {
        return this.workshopRepository.save(workshop);
    }

    public List<Workshop> findWorkshops() {
        return this.workshopRepository.findAll();
    }

    public Workshop findWorkshopById(String id) {
        Workshop workshop =null;
        if(id != null){
            final Optional<Workshop> optionalWorkshop =this.workshopRepository.findById(id);
            if(optionalWorkshop.isPresent()){
                workshop=optionalWorkshop.get();
            }else{
                LOG.info(ERROR_NON_PRESENT_ID,id);
            }
        }else {
            LOG.error(ERROR_NULL_ID);
        }



        return workshop;
    }

    public Workshop updateWorkshop(String id, Workshop updatedWorkshop) {
        Optional<Workshop> existingWorkshop = this.workshopRepository.findById(id);

        if (existingWorkshop.isPresent()){
            if (updatedWorkshop != null){
                updatedWorkshop.setWorkshop_id(existingWorkshop.get().getWorkshop_id());
                return this.workshopRepository.save(updatedWorkshop);
            }else {
                LOG.error(ERROR_UPDATE);
            }
        }else {
            LOG.error(ERROR_NON_PRESENT_ID);
        }

        return Workshop.builder()
                .title("NOT_FOUND")
                .description("NOT_FOUND")
                .build();
    }

    public void deleteWorkshop(String id) {
        if (id!= null)
        {
           if(this.workshopRepository.findById(id).isPresent()) this.workshopRepository.deleteById(id);
           else LOG.error(ERROR_NON_PRESENT_ID, id);
        }
        else LOG.error(ERROR_NULL_ID);

    }
}
