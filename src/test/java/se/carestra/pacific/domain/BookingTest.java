package se.carestra.pacific.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import se.carestra.pacific.web.rest.TestUtil;

public class BookingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Booking.class);
        Booking booking1 = new Booking();
        booking1.setId("id1");
        Booking booking2 = new Booking();
        booking2.setId(booking1.getId());
        assertThat(booking1).isEqualTo(booking2);
        booking2.setId("id2");
        assertThat(booking1).isNotEqualTo(booking2);
        booking1.setId(null);
        assertThat(booking1).isNotEqualTo(booking2);
    }
}
