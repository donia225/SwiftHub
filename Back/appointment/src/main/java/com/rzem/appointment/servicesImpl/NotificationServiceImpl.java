package com.rzem.appointment.servicesImpl;

import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.entities.Notification;
import com.rzem.appointment.repos.NotificationRepository;
import com.rzem.appointment.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {



    private static final Logger LOG = LoggerFactory.getLogger(NotificationServiceImpl.class);
    private static final String ERROR_NULL_ID = "Posted ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = "Cannot find a Notification with id : %s";
    private static final String ERROR_UPDATE = "Error occured while updating";
    private static final String ERROR_SAVE = "Error occured while saving";

    @Autowired
    private NotificationRepository notificationRepository;


    @Override
    public List<Notification> getAll() {
        return this.notificationRepository.findAll();
    }

    @Override
    public Notification findById(String id) {
        Notification notification = null;
        if (id != null) {
            final Optional<Notification> optionalNotification = this.notificationRepository.findById(id);
            if (optionalNotification.isPresent()) {
                notification = optionalNotification.get();
            } else {
                LOG.info(String.format(ERROR_NON_PRESENT_ID, id));
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }
        return notification;
    }

    @Override
    public Notification update(Notification notification) {
        Notification updatedNotification = null;
        if (notification != null) {
            updatedNotification = this.notificationRepository.save(notification);
        } else {
            LOG.error(ERROR_UPDATE);
        }
        return updatedNotification;
    }

    @Override
    public void delete(String id) {
        this.notificationRepository.deleteById(id);
    }

    @Override
    public Notification save(Notification notification) {
        Notification addedNotification = null;
        if (notification != null) {
            addedNotification = this.notificationRepository.save(notification);
        } else {
            LOG.error(ERROR_SAVE);
        }
        return addedNotification;
    }
}
