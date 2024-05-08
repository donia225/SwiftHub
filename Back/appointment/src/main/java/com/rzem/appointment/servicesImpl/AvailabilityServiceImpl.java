package com.rzem.appointment.servicesImpl;

import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.entities.TimeSlot;
import com.rzem.appointment.repos.AvailabilityRepository;
import com.rzem.appointment.services.AvailabilityService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {


    private static final Logger LOG = LoggerFactory.getLogger(AvailabilityServiceImpl.class);
    private static final String ERROR_NULL_ID = "Posted ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = "Cannot find a availability with id : %s";
    private static final String ERROR_UPDATE = "Error occured while updating";
    private static final String ERROR_SAVE = "Error occured while saving";

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Resource
    private MongoTemplate mongoTemplate;



    @Scheduled(fixedRate = 100000)
    public void deleteExpiredAvailability() {

        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Availability> availabilities = mongoTemplate.findAll(Availability.class);
        for (Availability availability : availabilities) {
            List<TimeSlot> timeSlots = availability.getAvailableTimeSlots();
            Iterator<TimeSlot> iterator = timeSlots.iterator();
            while (iterator.hasNext()) {
                TimeSlot timeSlot = iterator.next();
                Instant instant = timeSlot.getStartTime().atZone(ZoneId.systemDefault()).toInstant();
                LocalDateTime startTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                if (startTime.isBefore(currentDateTime)) {
                    iterator.remove();
                }
            }

            mongoTemplate.save(availability);
        }
    }




    @Override
    public List<Availability> getAll() {
        return this.availabilityRepository.findAll();
    }

    @Override
    public Availability findById(String id) {
        Availability availability = null;
        if (id != null) {
            final Optional<Availability> optionalAvailability = this.availabilityRepository.findById(id);
            if (optionalAvailability.isPresent()) {
                availability = optionalAvailability.get();
            } else {
                LOG.info(String.format(ERROR_NON_PRESENT_ID, id));
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }
        return availability;
    }

    @Override
    public Availability update(Availability availability) {
        Availability updatedAvailability = null;
        if (availability != null) {
            updatedAvailability = this.availabilityRepository.save(availability);
        } else {
            LOG.error(ERROR_UPDATE);
        }
        return updatedAvailability;
    }

    @Override
    public void delete(String id) {
        this.availabilityRepository.deleteById(id);
    }



    /*
    @Override
    public Availability save(Availability availability) {
        Availability addedAvailability = null;
        if (availability != null) {
            addedAvailability = this.availabilityRepository.save(availability);
        } else {
            LOG.error(ERROR_SAVE);
        }
        return addedAvailability;
    }

     */

    @Override
    public Availability save(Availability availability) {
        if (availability != null) {
            // Parcourir chaque TimeSlot et attribuer un ID unique s'il n'en a pas déjà un
            List<TimeSlot> timeSlots = availability.getAvailableTimeSlots();
            for (TimeSlot timeSlot : timeSlots) {
                if (timeSlot.getId() == null) {
                    timeSlot.setId(UUID.randomUUID().toString());
                }
            }

            // Enregistrer la disponibilité avec les TimeSlots mis à jour
            availability = this.availabilityRepository.save(availability);
        } else {
            LOG.error(ERROR_SAVE);
        }
        return availability;
    }






    @Override
    public List<Availability> findAvailabilityByUserId(String id) {
        return this.availabilityRepository.findAvailabilityByUserId(id);
    }

    @Override
    public void updateReservedStatus(String availabilityId, String timeSlotId) {
        // Rechercher l'Availability par son ID
        Optional<Availability> optionalAvailability = availabilityRepository.findById(availabilityId);
        if (optionalAvailability.isPresent()) {
            Availability availability = optionalAvailability.get();
            List<TimeSlot> timeSlots = availability.getAvailableTimeSlots();
            // Rechercher le TimeSlot par son ID et mettre à jour reserved en true
            for (TimeSlot timeSlot : timeSlots) {
                if (timeSlot.getId().equals(timeSlotId)) {
                    timeSlot.setReserved(true);
                    break;
                }
            }
            availabilityRepository.save(availability);
        } else {
            LOG.error(String.format("Availability with ID %s not found.", availabilityId));
        }
    }

    @Override
    public void updateReservedStatusfromTeacher(String teacherId, String start, String end) {
        Optional<Availability> optionalAvailability = availabilityRepository.findFirstByUserId(teacherId);
        if (optionalAvailability.isPresent()) {
            Availability availability = optionalAvailability.get();
            List<TimeSlot> timeSlots = availability.getAvailableTimeSlots();
            for (TimeSlot timeSlot : timeSlots) {
                System.out.println(timeSlot);
                System.out.println("hahahahaha");
                System.out.println(start+"    "+end);
                if (timeSlot.getStartTime().toString().equals(start) && timeSlot.getEndTime().toString().equals(end)) {
                   // System.out.println(teacherId +"  "+ start+"    "+ end);
                    //System.out.println(timeSlot.getStartTime().toString()+"    "+ timeSlot.getEndTime().toString());
                    timeSlot.setReserved(false);
                    break;
                }
            }
            System.out.println(availability);
            availabilityRepository.save(availability);
        }else {
            LOG.error(String.format("teacher with ID %s not found in availability list.", teacherId));
        }
    }



/*
    public void addTimeSlot(String userId, TimeSlot newTimeSlot) {
        List<TimeSlot> existingTimeSlots = getTimeSlotsByUserId(userId);
        for (TimeSlot existingTimeSlot : existingTimeSlots) {
            if (timeSlotsOverlap(existingTimeSlot, newTimeSlot)) {
                throw new IllegalArgumentException("Le nouveau créneau horaire se chevauche avec un créneau existant.");
            }
        }
        addTimeSlotToAvailability(userId, newTimeSlot);
    }

    private boolean timeSlotsOverlap(TimeSlot timeSlot1, TimeSlot timeSlot2) {
        return !timeSlot1.getEndTime().isBefore(timeSlot2.getStartTime()) &&
                !timeSlot2.getEndTime().isBefore(timeSlot1.getStartTime());
    }


    private List<TimeSlot> getTimeSlotsByUserId(String userId) {
        List<Availability> a = availabilityRepository.findAvailabilityByUserId(userId);
        List<TimeSlot> b = null;
        for (int i=0; i<a.size(); i++){
            b = a.get(i).getAvailableTimeSlots();
        }
        return b;
    }


    @Override
    public void addTimeSlotToAvailability(String availabilityId, TimeSlot timeSlot) {
        Availability availability = availabilityRepository.findById(availabilityId).orElse(null);
        if (availability != null) {
            List<TimeSlot> timeSlots = availability.getAvailableTimeSlots();
            timeSlots.add(timeSlot);
            availability.setAvailableTimeSlots(timeSlots);
            availabilityRepository.save(availability);
        }
    }

 */
/*

    public void addTimeSlot(String userId, TimeSlot newTimeSlot) {
        // Récupérer l'objet Availability pour l'utilisateur donné
        List<Availability> availabilityOptional = availabilityRepository.findAvailabilityByUserId(userId);
        Availability availability;
        if (availabilityOptional.isPresent()) {
            availability = availabilityOptional.get();
        } else {
            availability = new Availability(userId, new ArrayList<>());
        }

        // Vérifier si le nouveau créneau horaire se chevauche avec un créneau existant
        if (timeSlotOverlaps(availability.getAvailableTimeSlots(), newTimeSlot)) {
            throw new IllegalArgumentException("Le nouveau créneau horaire se chevauche avec un créneau existant.");
        }

        // Ajouter le nouveau créneau horaire à la liste des créneaux horaires disponibles
        availability.getAvailableTimeSlots().add(newTimeSlot);

        // Enregistrer ou mettre à jour l'objet Availability dans la base de données
        availabilityRepository.save(availability);
    }

    // Méthode pour vérifier si deux créneaux horaires se chevauchent
    private boolean timeSlotOverlaps(List<TimeSlot> existingTimeSlots, TimeSlot newTimeSlot) {
        for (TimeSlot existingTimeSlot : existingTimeSlots) {
            if (timeSlotsOverlap(existingTimeSlot, newTimeSlot)) {
                return true;
            }
        }
        return false;
    }

    // Méthode pour vérifier si deux créneaux horaires se chevauchent
    private boolean timeSlotsOverlap(TimeSlot timeSlot1, TimeSlot timeSlot2) {
        return !timeSlot1.getEndTime().isBefore(timeSlot2.getStartTime()) &&
                !timeSlot2.getEndTime().isBefore(timeSlot1.getStartTime());
    }

 */


}
