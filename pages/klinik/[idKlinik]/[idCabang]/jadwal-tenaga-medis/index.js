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
import { getJadwalTenagaMedisList, getJadwalTenagaMedis, createJadwalTenagaMedis } from "@redux/modules/jadwalTenagaMedis/thunks";
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
      console.log(query);
      dispatch(getJadwalTenagaMedisList({ idCabang }));
    }, [dispatch, isReady, query]);
    //const { idKlinik, idCabang } = query;

    const { jadwalTenagaMedisList } = useSelector(state => state.jadwalTenagaMedis);
    console.log(jadwalTenagaMedisList, "jadwalTenagaMedisList")

    useEffect(() => {
      if (!isReady) return;
      const { idCabang } = query;
      dispatch(getTenagaMedis({ idCabang }));
    }, [isReady, dispatch, query]);
  
    const { tenagaMedisList } = useSelector(state => state.tenagaMedis);
    console.log(tenagaMedisList, "List Tenaga Medis")

    useEffect(() =>  {
      parseData(jadwalTenagaMedisList);
      console.log("----------")
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

      let currentId = 0;

      const parseTenagaMedis = (tenagaMedisList) => {
        console.log("Test")
        if(tenagaMedisList) {
          tenagaMedisList.map((tenagaMedis) => {
            const id_tenaga_medis_list = tenagaMedis.account.id;
            console.log("1")
            const nama_tenaga_medis = tenagaMedis.account.full_name;
            console.log("2")

            tenagaMedisDict[id_tenaga_medis_list] = nama_tenaga_medis
            setTenagaMedisDict(tenagaMedisDict);

            tenagaMedisDict2[nama_tenaga_medis] = id_tenaga_medis_list
            setTenagaMedisDict2(tenagaMedisDict2)

            console.log("parseTenagaMedis")


            console.log(tenagaMedisDict, "tenagaMedisDict")
            console.log(tenagaMedisDict2, "tenagaMedisDict2")
          })
        }
      }

      const parseData = (jadwalTenagaMedisList) => {
        if(jadwalTenagaMedisList) {
          jadwalTenagaMedisList.map((jadwalTenagaMedis) => {
            console.log("jadwalTenagaMedisList")
            //console.log(jadwalTenagaMedis, "For loop")
            const title = jadwalTenagaMedis.tenaga_medis.account.full_name;
            //console.log(title, "title")
            const start_time = jadwalTenagaMedis.start_time;
            const end_time = jadwalTenagaMedis.end_time;
            const day = jadwalTenagaMedis.day;
            const quota = jadwalTenagaMedis.quota;
            const id_tenaga_medis = jadwalTenagaMedis.tenaga_medis.account.id;
  
            // console.log(typeof day, "tipe hari")
            // console.log(dayDict)
  
            const day_int = dayDict[day];
            console.log(day_int, "day_int")
            const currentDate = new Date();
            console.log(currentDate, "currentDate")
            console.log(currentDate.getDay(), "GetDay")
            const day_num = day_int - currentDate.getDay();
            console.log(day_num, "day_num")
            currentDate.setDate(new Date(currentDate.getDate() + day_num))
            console.log(currentDate, "parseCurrentDate")

            console.log(start_time.split(":"), "starttime")
  
            const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 
              start_time.split(":")[0], start_time.split(":")[1], start_time.split(":")[2])
              console.log(start, "old")

            start.setHours(start.getHours() + Math.abs(currentDate.getTimezoneOffset())/60)
              console.log(start, "new")
  
            const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 
              end_time.split(":")[0], end_time.split(":")[1], end_time.split(":")[2])

            end.setHours(end.getHours() + Math.abs(currentDate.getTimezoneOffset())/60)
  
            console.log(start, "start");
            console.log(end, "end");

            currentId = currentId + 1;
            const id = currentId;
  
            setEvents((prev) => [...prev, { id, start, end, title, quota, id_tenaga_medis }])
          })
        }
      }

      
    const addEventsFromDB = () => {
      //dispatch(createJadwalTenagaMedis())
      console.log(currentEvent)
    }

    const [currentEvent, setCurrentEvent] = useState(undefined)
    
    const currentDate = new Date()
    console.log(currentDate.getTimezoneOffset(), "time offset")
    // console.log(new Date(1648572262670), "angka")
    // console.log(currentDate.getDate(), "getdate")
    // currentDate.setDate(new Date(currentDate.getDate()-4))
    // console.log(currentDate, "Tanggal Hari ini")
    // console.log(currentDate.getDay(), "hari ke")
    // console.log(currentDate.getTimezoneOffset(), "offset")


    //console.log(jadwalTenagaMedisList, "JadwalList")

    // console.log(parseInt(currentDate.toISOString().split("T")[1].substr(0,2)), "isostring")

    const selectEvent = useCallback(
      (event) => {setCurrentEvent(event)
      console.log(event.start.toISOString().split("T")[1].substr(0, 5), event, "fullEvent")},
      [],
    )

    const deleteEvent = useCallback()
    
    
    //console.log(currentDate.toString() + " test")
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
                console.log(idTenagaMedis, "ID")

                startdb.setHours(startdb.getHours() - Math.abs(new Date().getTimezoneOffset())/60)
                 console.log(start, "oldstart")
                 console.log(startdb, 'newstart')

                const startTime = startdb.toISOString().split("T")[1].substr(0,8)
                const temp = startTime.split(":")
                startTime = String(parseInt(temp[0]) + Math.abs(new Date().getTimezoneOffset())/60 + ":" + temp[1] + ":" + temp[2])
                console.log(startTime, "start_hours")

                enddb.setHours(enddb.getHours() - Math.abs(new Date().getTimezoneOffset())/60)
                 console.log(end, "oldend")
                 console.log(enddb, "newend")
                console.log(title, "title")

                const endTime = enddb.toISOString().split("T")[1].substr(0,8)
                const temp2 = endTime.split(":")
                endTime = String(parseInt(temp2[0]) + Math.abs(new Date().getTimezoneOffset())/60 + ":" + temp2[1] + ":" + temp2[2])
                console.log(endTime, "end_hours")

                const temp_date = values.jadwal_hari
                console.log(typeof temp_date)
                temp_date = new Date(temp_date)
                console.log(typeof temp_date, "--------")
                temp_date = temp_date.getDay()
                console.log(temp_date, "temp_date")
                if(startdb.getDate() < start.getDate()) {
                  temp_date = temp_date - 1;
                }
                const day = dayDict2[temp_date]
                console.log(day, "day")
                if(title) {
                  setEvents((prev) => [...prev, { id, start, end, title, quota, idTenagaMedis }])
                  dispatch(createJadwalTenagaMedis({ idTenagaMedis, startTime, endTime, quota, day }))
                }
            }}
            >
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
              </Form>
            </Formik>
          </Form_Calender>
          </Calender_Container>
  </Layout>
    )
  
}

export default Jadwal;