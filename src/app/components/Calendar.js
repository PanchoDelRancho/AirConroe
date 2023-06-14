"use client";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Alert, AlertIcon, Flex } from "@chakra-ui/react";
import AppointmentModal from "./AppointmentModal";

const localizer = momentLocalizer(moment);

const errorAlert = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      There was an error processing your request
    </Alert>
  );
};

const successAlert = () => {
  return (
    <Alert status="success">
      <AlertIcon />
      Appointment successfully created. Please check your email for a
      confirmation message.
    </Alert>
  );
};

function Cal() {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(" ");

  const now = moment();
  const currentTime = new Date();

  useEffect(() => {
    async function getEvents() {
      const res = await fetch("/api/get-events", { method: "GET" });
      const { data } = await res.json();
      const formattedEvents = data.items.map((event) => ({
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
      }));
      setEvents(formattedEvents);
    }
    getEvents();
  }, [isModalOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSelectSlot = (slotInfo) => {
    const { start } = slotInfo;
    if (start < currentTime) return;
    const end = moment(start).add(2, "hours").toDate();
    setSelectedSlot({ start, end });
  };

  const getSlotStyle = (date) => {
    if (date < currentTime) {
      return {
        className: "is-past",
        style: { pointerEvents: "none" },
      };
    }
    if (selectedSlot == null) return;
    if (
      moment(date).isSame(selectedSlot.start) ||
      moment(date).isBetween(selectedSlot.start, selectedSlot.end)
    ) {
      return {
        style: {
          backgroundColor: "#81e6d9",
          borderColor: "#81e6d9",
        },
      };
    }

    return {};
  };

  const myDayPropGetter = (date) => {
    const isPast = date < now.startOf("day");
    const isToday = moment(date).isSame(now, "day");

    return {
      className: isPast ? "is-past" : isToday ? "is-today" : "",
      style: isPast ? { pointerEvents: "none" } : {},
    };
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        onSelectSlot={handleSelectSlot}
        style={{ height: "80vh" }}
        step={120}
        defaultView="week"
        views={["week", "day", "month"]}
        dayPropGetter={myDayPropGetter}
        slotPropGetter={getSlotStyle}
        timeslots={1}
        titleAccessor={() => null}
      />
      {selectedSlot && (
        <Flex justify="center">
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => setIsModalOpen(true)}
            my="3"
          >
            Create Appointment for {selectedSlot.start.toLocaleString()}
          </Button>
        </Flex>
      )}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedSlot={selectedSlot}
        setAlert={setAlert}
      />
      {alert === 1 && errorAlert()}
      {alert === 0 && successAlert()}
    </>
  );
}

export default Cal;
