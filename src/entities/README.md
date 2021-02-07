# Architecture

## Activity

An activity is an event that can be created or manage by an event admin, 'EventAdmin'.
The activity consist of

    '''
    ## Activity
    {
        id: String,
        title: String,
        startDate: DateTime,
        endDate: DateTime,
        recurrenceRule: String, // iCalendar RRULE format.
        excludedRecurrenceDates: [String], // iCalendar RRULE format.
        activityType: ActivityType.id,
        isEnabled: Boolean,
        location: String,
        info: String,
        instructors: [{id: Instructor.id, name: Instructor.name}],
        restriction: Restriction,
        bookingPreference: BookingPreference,
        deviations: [Deviation],
        permission: Permission,
        createdBy: Instructor.id,
        createdDate: DateTime,
        lastModifiedby: Instructor.id
        lastModifiedDate: DateTime
    }

    ## Instructor
    {
        id: String,
        name: Srring
    }
        - This is a resource with
            {
                fieldName: 'instructors',
                title: 'Instructor',
                instances: [Instructor]
            }

    ## ActivityType
    {
        id: String,
        name: String
    }
        - This is a resource with
            {
                fieldName: 'activityType',
                title: 'Activity',
                instances: [ActivityType]
            }

    ## Restriction
    {
        id: String,
        maxCapacity: Int,
        minAttendees: Int
    }

    ## BookingPreference
    {
        id: String,
        bookingOpens: DateTime,
        bookingCloses: DateTime
    }

    ## Deviation
    {
        id: String,
        date: DateTime,
        location: String,
        info: String,
        instructors: [{id: Instructor.id, name: Instructor.name}],
        restriction: Restriction,
        bookingPreference: BookingPreference,
    }

    ## Permission
    {
        modify: [{id: Instructor.id, name: Instructor.name}],
        delete: [{id: Instructor.id, name: Instructor.name}]
    }

    '''

## Booking

A booking is an event that has been book by an attendee, Attendee'.
The booking consist of.

    ```
    ## Booking
    {
        id: String,
        activityId: String,
        activityTitle: String,
        activityDate: DateTime,
        attendeeId: Attendee.id,
        status: BookingStatus,
        lastModifiedDate: DateTime,
        history: [BookingHistory]
    }

    ## BookingHistory
    {
        id: String,
        date: DateTime,
        status: BookingStatus,
        activityId: String,
        activityTitle: String
    }

    ## BookingStatus - enum
    {
        id: String,
        status: String (Booked | Cancelled | Reserved)
    }

    ## Attendee
    {
        id: String,
        name: String
    }
    ```
