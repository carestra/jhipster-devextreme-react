package se.carestra.pacific.web.rest;

import se.carestra.pacific.PacificApp;
import se.carestra.pacific.config.TestSecurityConfiguration;
import se.carestra.pacific.domain.Booking;
import se.carestra.pacific.repository.BookingRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BookingResource} REST controller.
 */
@SpringBootTest(classes = { PacificApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class BookingResourceIT {

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVITY_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVITY_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_ACTIVITY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACTIVITY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ACTIVITY_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVITY_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ATTENDEE_ID = "AAAAAAAAAA";
    private static final String UPDATED_ATTENDEE_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private MockMvc restBookingMockMvc;

    private Booking booking;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Booking createEntity() {
        Booking booking = new Booking()
            .status(DEFAULT_STATUS)
            .activityTitle(DEFAULT_ACTIVITY_TITLE)
            .activityDate(DEFAULT_ACTIVITY_DATE)
            .activityId(DEFAULT_ACTIVITY_ID)
            .attendeeId(DEFAULT_ATTENDEE_ID)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return booking;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Booking createUpdatedEntity() {
        Booking booking = new Booking()
            .status(UPDATED_STATUS)
            .activityTitle(UPDATED_ACTIVITY_TITLE)
            .activityDate(UPDATED_ACTIVITY_DATE)
            .activityId(UPDATED_ACTIVITY_ID)
            .attendeeId(UPDATED_ATTENDEE_ID)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return booking;
    }

    @BeforeEach
    public void initTest() {
        bookingRepository.deleteAll();
        booking = createEntity();
    }

    @Test
    public void createBooking() throws Exception {
        int databaseSizeBeforeCreate = bookingRepository.findAll().size();
        // Create the Booking
        restBookingMockMvc.perform(post("/api/bookings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isCreated());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeCreate + 1);
        Booking testBooking = bookingList.get(bookingList.size() - 1);
        assertThat(testBooking.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testBooking.getActivityTitle()).isEqualTo(DEFAULT_ACTIVITY_TITLE);
        assertThat(testBooking.getActivityDate()).isEqualTo(DEFAULT_ACTIVITY_DATE);
        assertThat(testBooking.getActivityId()).isEqualTo(DEFAULT_ACTIVITY_ID);
        assertThat(testBooking.getAttendeeId()).isEqualTo(DEFAULT_ATTENDEE_ID);
        assertThat(testBooking.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    public void createBookingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookingRepository.findAll().size();

        // Create the Booking with an existing ID
        booking.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookingMockMvc.perform(post("/api/bookings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isBadRequest());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllBookings() throws Exception {
        // Initialize the database
        bookingRepository.save(booking);

        // Get all the bookingList
        restBookingMockMvc.perform(get("/api/bookings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(booking.getId())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].activityTitle").value(hasItem(DEFAULT_ACTIVITY_TITLE)))
            .andExpect(jsonPath("$.[*].activityDate").value(hasItem(DEFAULT_ACTIVITY_DATE.toString())))
            .andExpect(jsonPath("$.[*].activityId").value(hasItem(DEFAULT_ACTIVITY_ID)))
            .andExpect(jsonPath("$.[*].attendeeId").value(hasItem(DEFAULT_ATTENDEE_ID)))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    public void getBooking() throws Exception {
        // Initialize the database
        bookingRepository.save(booking);

        // Get the booking
        restBookingMockMvc.perform(get("/api/bookings/{id}", booking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(booking.getId()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.activityTitle").value(DEFAULT_ACTIVITY_TITLE))
            .andExpect(jsonPath("$.activityDate").value(DEFAULT_ACTIVITY_DATE.toString()))
            .andExpect(jsonPath("$.activityId").value(DEFAULT_ACTIVITY_ID))
            .andExpect(jsonPath("$.attendeeId").value(DEFAULT_ATTENDEE_ID))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }
    @Test
    public void getNonExistingBooking() throws Exception {
        // Get the booking
        restBookingMockMvc.perform(get("/api/bookings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBooking() throws Exception {
        // Initialize the database
        bookingRepository.save(booking);

        int databaseSizeBeforeUpdate = bookingRepository.findAll().size();

        // Update the booking
        Booking updatedBooking = bookingRepository.findById(booking.getId()).get();
        updatedBooking
            .status(UPDATED_STATUS)
            .activityTitle(UPDATED_ACTIVITY_TITLE)
            .activityDate(UPDATED_ACTIVITY_DATE)
            .activityId(UPDATED_ACTIVITY_ID)
            .attendeeId(UPDATED_ATTENDEE_ID)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restBookingMockMvc.perform(put("/api/bookings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBooking)))
            .andExpect(status().isOk());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeUpdate);
        Booking testBooking = bookingList.get(bookingList.size() - 1);
        assertThat(testBooking.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testBooking.getActivityTitle()).isEqualTo(UPDATED_ACTIVITY_TITLE);
        assertThat(testBooking.getActivityDate()).isEqualTo(UPDATED_ACTIVITY_DATE);
        assertThat(testBooking.getActivityId()).isEqualTo(UPDATED_ACTIVITY_ID);
        assertThat(testBooking.getAttendeeId()).isEqualTo(UPDATED_ATTENDEE_ID);
        assertThat(testBooking.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    public void updateNonExistingBooking() throws Exception {
        int databaseSizeBeforeUpdate = bookingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookingMockMvc.perform(put("/api/bookings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isBadRequest());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteBooking() throws Exception {
        // Initialize the database
        bookingRepository.save(booking);

        int databaseSizeBeforeDelete = bookingRepository.findAll().size();

        // Delete the booking
        restBookingMockMvc.perform(delete("/api/bookings/{id}", booking.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
