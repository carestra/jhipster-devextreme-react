package se.carestra.pacific.web.rest;

import se.carestra.pacific.domain.Booking;
import se.carestra.pacific.repository.BookingRepository;
import se.carestra.pacific.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link se.carestra.pacific.domain.Booking}.
 */
@RestController
@RequestMapping("/api")
public class BookingResource {

    private final Logger log = LoggerFactory.getLogger(BookingResource.class);

    private static final String ENTITY_NAME = "booking";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookingRepository bookingRepository;

    public BookingResource(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    /**
     * {@code POST  /bookings} : Create a new booking.
     *
     * @param booking the booking to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new booking, or with status {@code 400 (Bad Request)} if the booking has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) throws URISyntaxException {
        log.debug("REST request to save Booking : {}", booking);
        if (booking.getId() != null) {
            throw new BadRequestAlertException("A new booking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Booking result = bookingRepository.save(booking);
        return ResponseEntity.created(new URI("/api/bookings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /bookings} : Updates an existing booking.
     *
     * @param booking the booking to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated booking,
     * or with status {@code 400 (Bad Request)} if the booking is not valid,
     * or with status {@code 500 (Internal Server Error)} if the booking couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bookings")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking booking) throws URISyntaxException {
        log.debug("REST request to update Booking : {}", booking);
        if (booking.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Booking result = bookingRepository.save(booking);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, booking.getId()))
            .body(result);
    }

    /**
     * {@code GET  /bookings} : get all the bookings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bookings in body.
     */
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        log.debug("REST request to get all Bookings");
        return bookingRepository.findAll();
    }

    /**
     * {@code GET  /bookings/:id} : get the "id" booking.
     *
     * @param id the id of the booking to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the booking, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable String id) {
        log.debug("REST request to get Booking : {}", id);
        Optional<Booking> booking = bookingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(booking);
    }

    /**
     * {@code DELETE  /bookings/:id} : delete the "id" booking.
     *
     * @param id the id of the booking to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String id) {
        log.debug("REST request to delete Booking : {}", id);
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
