package com.rzem.appointment.servicesImpl;
/*
import com.rzem.appointment.entities.Absence;
import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.repos.AbsenceRepository;
import com.rzem.appointment.services.AbsenceService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AbsenceServiceImpl implements AbsenceService {



    private static final Logger LOG = LoggerFactory.getLogger(AbsenceServiceImpl.class);
    private static final String ERROR_NULL_ID = "Posted ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = "Cannot find a Absence with id : %s";
    private static final String ERROR_UPDATE = "Error occured while updating";
    private static final String ERROR_SAVE = "Error occured while saving";

    @Autowired
    private AbsenceRepository absenceRepository;




    @Override
    public List<Absence> getAll() {
        return this.absenceRepository.findAll();
    }

    @Override
    public Absence findById(Long id) {
        Absence absence = null;
        if (id != null) {
            final Optional<Absence> optionalAbsence = this.absenceRepository.findById(id);
            if (optionalAbsence.isPresent()) {
                absence = optionalAbsence.get();
            } else {
                LOG.info(String.format(ERROR_NON_PRESENT_ID, id));
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }
        return absence;
    }

    @Override
    public Absence update(Absence absence) {
        Absence updatedAbsence = null;
        if (absence != null) {
            updatedAbsence = this.absenceRepository.save(absence);
        } else {
            LOG.error(ERROR_UPDATE);
        }
        return updatedAbsence;
    }

    @Override
    public void delete(Long id) {
        this.absenceRepository.deleteById(id);
    }

    @Override
    public Absence save(Absence absence) {
        Absence addedAbsence = null;
        if (absence != null) {
            addedAbsence = this.absenceRepository.save(absence);
        } else {
            LOG.error(ERROR_SAVE);
        }
        return addedAbsence;
    }
}
*/