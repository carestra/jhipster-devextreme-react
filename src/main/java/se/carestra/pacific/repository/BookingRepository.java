package se.carestra.pacific.repository;

import se.carestra.pacific.domain.Booking;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Booking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
}
