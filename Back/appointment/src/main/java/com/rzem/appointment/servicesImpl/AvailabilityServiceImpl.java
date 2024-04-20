package com.rzem.appointment.servicesImpl;

import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.repos.AvailabilityRepository;
import com.rzem.appointment.services.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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




    @Override
    public List<Availability> getAll() {
        return this.availabilityRepository.findAll();
    }

    @Override
    public Availability findById(Long id) {
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
    public void delete(Long id) {
        this.availabilityRepository.deleteById(id);
    }

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
}
