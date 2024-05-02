package com.rzem.appointment.repos;

import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.entities.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends MongoRepository<Notification,Long> {
    void deleteById(String id);
    Optional<Notification> findById(String id);
}
