package se.carestra.pacific.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Booking.
 */
@Document(collection = "booking")
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("status")
    private String status;

    @Field("activity_title")
    private String activityTitle;

    @Field("activity_date")
    private Instant activityDate;

    @Field("activity_id")
    private String activityId;

    @Field("attendee_id")
    private String attendeeId;

    @Field("last_modified_date")
    private Instant lastModifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public Booking status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getActivityTitle() {
        return activityTitle;
    }

    public Booking activityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
        return this;
    }

    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
    }

    public Instant getActivityDate() {
        return activityDate;
    }

    public Booking activityDate(Instant activityDate) {
        this.activityDate = activityDate;
        return this;
    }

    public void setActivityDate(Instant activityDate) {
        this.activityDate = activityDate;
    }

    public String getActivityId() {
        return activityId;
    }

    public Booking activityId(String activityId) {
        this.activityId = activityId;
        return this;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public String getAttendeeId() {
        return attendeeId;
    }

    public Booking attendeeId(String attendeeId) {
        this.attendeeId = attendeeId;
        return this;
    }

    public void setAttendeeId(String attendeeId) {
        this.attendeeId = attendeeId;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public Booking lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Booking)) {
            return false;
        }
        return id != null && id.equals(((Booking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", activityTitle='" + getActivityTitle() + "'" +
            ", activityDate='" + getActivityDate() + "'" +
            ", activityId='" + getActivityId() + "'" +
            ", attendeeId='" + getAttendeeId() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
