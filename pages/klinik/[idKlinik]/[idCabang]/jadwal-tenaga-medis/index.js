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
import { getJadwalTenagaMedisList, createJadwalTenagaMedis, deleteJadwalTenagaMedis, updateJadwalTenagaMedis } from "@redux/modules/jadwalTenagaMedis/thunks";
import { getTenagaMedis } from "@redux/modules/tenagaMedis/thunks";
import Layout from "@components/Layout";
import Jadwal_Tenaga_Medis from "@components/JadwalTenagaMedis/Calender"
import Form_Calender from "@components/JadwalTenagaMedis/FormCalender";
import Calender_Container from "@components/JadwalTenagaMedis/CalenderContainer";
import { useRouter } from 'next/router'
import TextInput from "@components/common/TextInput"
import LoadingButton from "@mui/lab/LoadingButton"
import Filter_Tenaga_Medis from "@components/JadwalTenagaMedis/Filter";

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

      let [myEvents, setEvents] = useState([{}]);

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

      const parseData = (jadwalTenagaMedisList, id_filter, force_filter) => {
        let tempId = 0;
        if(force_filter === 1) {
          tempId = 0
          //console.log("")
        } else {
          tempId = currentId
        }
        //console.log(currentId)
        if(jadwalTenagaMedisList && tempId === 0) {
          jadwalTenagaMedisList.map((jadwalTenagaMedis) => {
            //console.log("Here")
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

            //start.setHours(start.getHours() + Math.abs(currentDate.getTimezoneOffset())/60)
  
            const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 
              end_time.split(":")[0], end_time.split(":")[1], end_time.split(":")[2])

            //end.setHours(end.getHours() + Math.abs(currentDate.getTimezoneOffset())/60)

            setCurrentId(id)

            if(id_filter > -1) {
              if(id_tenaga_medis === id_filter) {
                setEvents((prev) => [...prev, { id, start, end, title, quota, id_tenaga_medis }])
              }
            } else {
              setEvents((prev) => [...prev, { id, start, end, title, quota, id_tenaga_medis }])
            }
          })
        }
      }

      useEffect(() =>  {
        parseData(jadwalTenagaMedisList, -1, 0);
        parseTenagaMedis(tenagaMedisList);
      }, [parseData, parseTenagaMedis, jadwalTenagaMedisList, tenagaMedisList])

    const [currentEvent, setCurrentEvent] = useState(undefined)
    
    const currentDate = new Date()

    const updateMyEvents = (value) => {
      const id = tenagaMedisDict2[value]
      myEvents = [{}]
      setEvents(myEvents)

      parseData(jadwalTenagaMedisList, id, 1)
    }

    const updateAllMyEvents = () => {
      myEvents = []
      setEvents(myEvents)

      parseData(jadwalTenagaMedisList, -1, 1)
    }

    const selectEvent = useCallback(
      (event) => {setCurrentEvent(event)
       ,console.log(event, "event")
      },
      //console.log(event.start.toISOString().split("T")[1].substr(0, 5), event, "fullEvent")},
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
      dispatch(deleteJadwalTenagaMedis({ idJadwal, idCabang:query.idCabang  }))

      batalEvent()

      location.assign(location.pathname)
    }

    const batalEvent = () => {
      setCurrentEvent(undefined)
    }

    const updateEvent = (values) => {
      const id = currentEvent.id

      for(let i = 0; i < myEvents.length; i++) {
        if(myEvents[i].id === id) {
          const startTime = getISOtime(values.start)
          const endTime = getISOtime(values.end)
          const day = values.jadwal_hari
          const title = values.jadwal_title
          const quota = values.quota
          const idJadwal = id

          const startDate = getISODate(values.start) 
          const endDate = getISODate(values.end) 

          myEvents[i].start = startDate
          myEvents[i].end = endDate
          myEvents[i].title = title
          myEvents[i].quota = quota
          setEvents(myEvents)

          dispatch(updateJadwalTenagaMedis({ idJadwal, startTime, endTime, quota, day }))

          batalEvent()

          location.assign(location.pathname)
        }
      }
    }

    function getISOtime(timeString) {
      const timeArr = timeString.split(':')
      const hour = timeArr[0]
      const minutes = timeArr[1]

      const time = new Date()

      time.setUTCHours(hour)
      time.setUTCMinutes(minutes)

      const hourUTC = String(time.getUTCHours()).padStart(2, "0");
      const minuteUTC = String(time.getUTCMinutes()).padStart(2, "0");

      return `${hourUTC}:${minuteUTC}:00`
    }

    function getISODate(timeString) {
      const timeArr = timeString.split(':')
      const hour = timeArr[0]
      const minutes = timeArr[1]

      const date = new Date()

      date.setUTCHours(hour)
      date.setUTCMinutes(minutes)

      return date
    }

    return jadwalTenagaMedisList && tenagaMedisList ? (
      <Layout navType = "sidebar" title="Jadwal Tenaga Medis">
        <Filter_Tenaga_Medis>
          <select onChange={(event) => updateMyEvents(event.target.value)} style={{width: '10%'}}>
            {Object.keys(tenagaMedisDict2).map(key => <option key={key} value={tenagaMedisDict[key]}>{key}</option>)}
          </select>
          <LoadingButton
          onClick={updateAllMyEvents}
          variant="outlined"
          type="button"
          >
            Tampilkan Semua Jadwal
          </LoadingButton>
        </Filter_Tenaga_Medis>
        <Calender_Container>
          <Jadwal_Tenaga_Medis>
            <Calendar
            selectable
            defaultView={Views.WEEK}
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height : 793, width: 1266 }}
            onSelectEvent={selectEvent}
            />
          </Jadwal_Tenaga_Medis>
          <Form_Calender>
            <Formik enableReinitialize
            initialValues={
              {start: currentEvent ? currentEvent.start?.toISOString().split("T")[1].substr(0, 5) : undefined, 
              end: currentEvent ? currentEvent.end?.toISOString().split("T")[1].substr(0, 5) : undefined,
              jadwal_hari: "mon",
              jadwal_title: currentEvent ?  currentEvent.title : undefined,
              quota: currentEvent ? currentEvent.quota : undefined}}
            onSubmit = {async (values) => {
                const startTime = getISOtime(values.start)
                const endTime = getISOtime(values.end)
                const day = values.jadwal_hari
                const title = values.jadwal_title
                const quota = values.quota

                const startDate = getISODate(values.start) 
                const endDate = getISODate(values.end) 

                currentId = currentId + 1
                const id = currentId
                const idTenagaMedis = tenagaMedisDict2[title]
                if(title) {
                  setEvents((prev) => [...prev, { id, startDate, endDate, title, quota, idTenagaMedis }])
                  dispatch(createJadwalTenagaMedis({ idTenagaMedis, startTime, endTime, quota, day }))
                  location.assign(location.pathname)
                }
            }}
            >{({values}) => 
              <Form>
                <TextInput
                  label="Pilih Tenaga Medis"
                  id="jadwal_title" 
                  name="jadwal_title" 
                  placeholder="Tenaga Medis" 
                  as="select"
                  data-testid="selectTenaga"                  
                >
                  {Object.keys(tenagaMedisDict2).map(key => <option key={key} value={tenagaMedisDict[key] } data-testid="select-option">{key}</option>)}
                </TextInput>
                <TextInput
                  as="select"
                  label="Pilih Hari"
                  id="jadwal_hari" name="jadwal_hari" type="select"
                  data-testid="jadwal-hari-select"
                >
                  <option value="mon">Senin</option>
                  <option value="tue">Selasa</option>
                  <option value="wed">Rabu</option>
                  <option value="thu">Kamis</option>
                  <option value="fri">Jumat</option>
                  <option value="sat">Sabtu</option>
                  <option value="sun">Minggu</option>
                  
                </TextInput>
                <div id="time-range">
                  <label>Pilih Rentang Waktu</label>
                  <div id="inputs">
                    <Field id="Start" name="start" type="time" data-testid="start"></Field>
                    <Field id="End" name="end" type="time" data-testid="end"></Field>
                  </div>
                </div>
                <TextInput
                  label="Quota"
                  id="quota" 
                  name="quota" 
                  type="number"
                  data-testid="quota"
                />
                {currentEvent === undefined ? 
                <LoadingButton 
                variant="contained"
                type="submit"
                id="input_button"
                data-testid="create"
                >
                  Simpan
                </LoadingButton> 
                : <div id="update_inputs">
                  <div id="top">
                  <LoadingButton 
                  variant="contained"
                  type="button"
                  id="input_button"
                  data-testid="update"
                  onClick={() => updateEvent(values)}
                >
                  Simpan
                </LoadingButton>
                
                <LoadingButton
                  variant="outlined"
                  id="input_button"
                  data-testid="batal"
                  onClick={batalEvent}
                >
                  Batal
                </LoadingButton>
                  </div>
                

                <LoadingButton
                  variant="contained"
                  id="hapus"
                  type="button" 
                  data-testid="delete"
                  onClick={deleteEvent}
                  style={{ background: "#F44336" }}
                >
                  Hapus
                </LoadingButton>
                </div>}
              </Form>}
            </Formik>
          </Form_Calender>
          </Calender_Container>
  </Layout>
    ): null
  
} 

export default Jadwal;