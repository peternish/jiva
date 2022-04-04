import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from "date-fns/getDay";
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getJadwalTenagaMedisList, getJadwalTenagaMedis, createJadwalTenagaMedis, deleteJadwalTenagaMedis, updateJadwalTenagaMedis } from "@redux/modules/jadwalTenagaMedis/thunks";
import { getTenagaMedis } from "@redux/modules/tenagaMedis/thunks";
import Layout from "@components/Layout";
import Jadwal_Tenaga_Medis from "@components/JadwalTenagaMedis/Calender"
import Form_Calender from "@components/JadwalTenagaMedis/FormCalender";
import Calender_Container from "@components/JadwalTenagaMedis/CalenderContainer";
import { useRouter } from 'next/router'


const Jadwal = (props) => {
    const {query, isReady} = useRouter()

    const dispatch = useDispatch();

    useEffect(() => {
      if(!isReady) {
        return
      }
      const { idCabang } = query;
      dispatch(getJadwalTenagaMedisList({ idCabang }));
    }, [dispatch, isReady, query]);

    const { jadwalTenagaMedisList } = useSelector(state => state.jadwalTenagaMedis);

    useEffect(() => {
      if (!isReady) return;
      const { idCabang } = query;
      dispatch(getTenagaMedis({ idCabang }));
    }, [isReady, dispatch, query]);
  
    const { tenagaMedisList } = useSelector(state => state.tenagaMedis);

    useEffect(() =>  {
      parseData(jadwalTenagaMedisList);
      parseTenagaMedis(tenagaMedisList);
    },[jadwalTenagaMedisList, tenagaMedisList])

    const locales = {
        'en-US': enUS,
      }
      
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => {
          return startOfWeek(new Date(), {weekStartsOn: 1})
        },
        getDay,
        locales,
      })

      const dayDict = {
        "mon": 1,
        "tue": 2,
        "wed": 3,
        "thu": 4,
        "fri": 5,
        "sat": 6,
        "sun": 7,
      }

      const dayDict2 = {
        1: "mon",
        2: "tue",
        3: "wed",
        4: "thu",
        5: "fri",
        6: "sat",
        7: "sun",
      }

      const [myEvents, setEvents] = useState([{}]);

      const [tenagaMedisDict, setTenagaMedisDict] = useState({});

      const [tenagaMedisDict2, setTenagaMedisDict2] = useState({});

      const [currentId, setCurrentId] = useState(0);

      const parseTenagaMedis = (tenagaMedisList) => {
        if(tenagaMedisList) {
          tenagaMedisList.map((tenagaMedis) => {
            const id_tenaga_medis_list = tenagaMedis.account.id;
            const nama_tenaga_medis = tenagaMedis.account.full_name;

            tenagaMedisDict[id_tenaga_medis_list] = nama_tenaga_medis
            setTenagaMedisDict(tenagaMedisDict);

            tenagaMedisDict2[nama_tenaga_medis] = id_tenaga_medis_list
            setTenagaMedisDict2(tenagaMedisDict2)
          })
        }
      }

      const parseData = (jadwalTenagaMedisList) => {
        if(jadwalTenagaMedisList) {
          jadwalTenagaMedisList.map((jadwalTenagaMedis) => {
            const title = jadwalTenagaMedis.tenaga_medis.account.full_name;
            const start_time = jadwalTenagaMedis.start_time;
            const end_time = jadwalTenagaMedis.end_time;
            const day = jadwalTenagaMedis.day;
            const quota = jadwalTenagaMedis.quota;
            const id_tenaga_medis = jadwalTenagaMedis.tenaga_medis.account.id;
            const id = jadwalTenagaMedis.id;
  
            const day_int = dayDict[day];
            const currentDate = new Date();
            const day_num = day_int - currentDate.getDay();
            currentDate.setDate(new Date(currentDate.getDate() + day_num))
  
            const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 
              start_time.split(":")[0], start_time.split(":")[1], start_time.split(":")[2])

            start.setHours(start.getHours() + Math.abs(currentDate.getTimezoneOffset())/60)
  
            const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 
              end_time.split(":")[0], end_time.split(":")[1], end_time.split(":")[2])

            end.setHours(end.getHours() + Math.abs(currentDate.getTimezoneOffset())/60)

            currentId = id;
            setCurrentId(currentId)
  
            setEvents((prev) => [...prev, { id, start, end, title, quota, id_tenaga_medis }])
          })
        }
      }

      
    const addEventsFromDB = () => {
      console.log(myEvents)
    }

    const [currentEvent, setCurrentEvent] = useState(undefined)
    
    const currentDate = new Date()

    const selectEvent = useCallback(
      (event) => {setCurrentEvent(event)
      console.log(event.start.toISOString().split("T")[1].substr(0, 5), event, "fullEvent")},
      [],
    )

    const deleteEvent = () => {
      const id = currentEvent.id

      for(let i = 0; i < myEvents.length; i++) {
        if(myEvents[i].id === id) {
          myEvents.splice(i, 1)
          setEvents(myEvents)
        }
      }
      const idJadwal = id;
      dispatch(deleteJadwalTenagaMedis({ idJadwal }))
    }

    const updateEvent = (values) => {
      const id = currentEvent.id

      for(let i = 0; i < myEvents.length; i++) {
        if(myEvents[i].id === id) {
          myEvents[i].start = new Date(values.jadwal_hari + " " + values.start)
          myEvents[i].end = new Date(values.jadwal_hari + " " + values.end)
          myEvents[i].title = values.jadwal_title
          myEvents[i].quota = values.quota
          setEvents(myEvents)

          const start = new Date(values.jadwal_hari + " " + values.start)
          const startdb = new Date(values.jadwal_hari + " " + values.start)
          const enddb = new Date(values.jadwal_hari + " " + values.end)
          startdb.setHours(startdb.getHours() - Math.abs(new Date().getTimezoneOffset())/60)

          const startTime = startdb.toISOString().split("T")[1].substr(0,8)
          const temp = startTime.split(":")
          startTime = String(parseInt(temp[0]) + Math.abs(new Date().getTimezoneOffset())/60 + ":" + temp[1] + ":" + temp[2])

          enddb.setHours(enddb.getHours() - Math.abs(new Date().getTimezoneOffset())/60)

          const endTime = enddb.toISOString().split("T")[1].substr(0,8)
          const temp2 = endTime.split(":")
          endTime = String(parseInt(temp2[0]) + Math.abs(new Date().getTimezoneOffset())/60 + ":" + temp2[1] + ":" + temp2[2])

          const temp_date = values.jadwal_hari
          temp_date = new Date(temp_date)
          temp_date = temp_date.getDay()
          if(startdb.getDate() < start.getDate()) {
            temp_date = temp_date - 1;
          }
          const day = dayDict2[temp_date]

          const idJadwal = id;
          const quota = myEvents[i].quota;
          dispatch(updateJadwalTenagaMedis({ idJadwal, startTime, endTime, quota, day }))
        }
      }
    }
    return (
      <Layout navType = "sidebar">
        <Calender_Container>
          <Jadwal_Tenaga_Medis>
            <Calendar
            selectable
            defaultView={Views.WEEK}
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{height : 793, width: 1266, margin: "50px"}}
            onSelectEvent={selectEvent}
            />
          </Jadwal_Tenaga_Medis>
          <Form_Calender>
            <Formik enableReinitialize
            initialValues={
              {start: currentEvent ? currentEvent.start?.toISOString().split("T")[1].substr(0, 5) : undefined, 
              end: currentEvent ? currentEvent.end?.toISOString().split("T")[1].substr(0, 5) : undefined, 
              jadwal_hari: currentEvent ? currentEvent.start?.toISOString().split('T')[0] : undefined, 
              jadwal_title: currentEvent ?  currentEvent.title : undefined,
              quota: currentEvent ? currentEvent.quota : undefined}}
            onSubmit = {async (values) => {
                const start = new Date(values.jadwal_hari + " " + values.start)
                const startdb = new Date(values.jadwal_hari + " " + values.start)
                const end = new Date(values.jadwal_hari + " " + values.end)
                const enddb = new Date(values.jadwal_hari + " " + values.end)
                const title = values.jadwal_title
                const quota = values.quota
                currentId = currentId + 1
                const id = currentId
                const idTenagaMedis = tenagaMedisDict2[title]

                startdb.setHours(startdb.getHours() - Math.abs(new Date().getTimezoneOffset())/60)

                const startTime = startdb.toISOString().split("T")[1].substr(0,8)
                const temp = startTime.split(":")
                startTime = String(parseInt(temp[0]) + Math.abs(new Date().getTimezoneOffset())/60 + ":" + temp[1] + ":" + temp[2])

                enddb.setHours(enddb.getHours() - Math.abs(new Date().getTimezoneOffset())/60)

                const endTime = enddb.toISOString().split("T")[1].substr(0,8)
                const temp2 = endTime.split(":")
                endTime = String(parseInt(temp2[0]) + Math.abs(new Date().getTimezoneOffset())/60 + ":" + temp2[1] + ":" + temp2[2])

                const temp_date = values.jadwal_hari
                temp_date = new Date(temp_date)
                temp_date = temp_date.getDay()
                if(startdb.getDate() < start.getDate()) {
                  temp_date = temp_date - 1;
                }
                const day = dayDict2[temp_date]
                if(title) {
                  setEvents((prev) => [...prev, { id, start, end, title, quota, idTenagaMedis }])
                  dispatch(createJadwalTenagaMedis({ idTenagaMedis, startTime, endTime, quota, day }))
                }
            }}
            >{({values}) => 
              <Form>
                <label>Pilih Tenaga Medis</label>
                <Field id="jadwal_title" name="jadwal_title" placeholder="Tenaga Medis" as="select">
                  {Object.keys(tenagaMedisDict2).map(key => <option value={tenagaMedisDict[key]}>{key}</option>)}
                </Field>
                <label>Pilih Hari</label>
                <Field id="jadwal_hari" name="jadwal_hari" type="date" placeholder={currentDate}></Field>
                <label>Pilih Rentang Waktu</label>
                <Field id="Start" name="start" type="time"></Field>
                <Field id="End" name="end" type="time"></Field>
                <label>Quota</label>
                <Field id="quota" name="quota" type="number"></Field>
                <button type="submit">Submit</button>
                <button type="button" onClick={deleteEvent}>Delete</button>
                <button type="button" onClick={addEventsFromDB}>Cek</button>
                <button type="button" onClick={() => updateEvent(values)}>Simpan</button>
              </Form>}
            </Formik>
          </Form_Calender>
          </Calender_Container>
  </Layout>
    )
  
}

export default Jadwal;