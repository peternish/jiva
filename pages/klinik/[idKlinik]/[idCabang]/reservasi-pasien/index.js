import styled from "styled-components";

// components
import Layout from "@components/Layout";

// other imports
import moment from "moment";

// calendar imports
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";

const CSS = styled.div``;

const ReservasiPasien = () => {
  // handle heading
  const currentDay = moment().format("d");
  const currentDate = moment().format("D");
  const month = moment().format("MMM");
  const firstDay = currentDate - currentDay + 1;
  const lastDay = currentDate + 5 - currentDay;

  return (
    <Layout
      title={`Reservasi Jadwal ${firstDay} ${month} - ${lastDay} ${month}`}
    >
      <CSS>
        <Calendar
          selectable
          defaultView={Views.WEEK}
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 793, width: 1266 }}
          onSelectEvent={selectEvent}
        />
      </CSS>
    </Layout>
  );
};

export default ReservasiPasien;
