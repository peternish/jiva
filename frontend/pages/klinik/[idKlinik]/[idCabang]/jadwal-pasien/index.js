// React Big Calendar Components
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from "date-fns/getDay";
import isThisWeek from "date-fns/isThisWeek";
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css"

// React utils
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

// Formik
import { Formik, Form } from "formik";

// API
import { getJadwalTenagaMedisList } from "@redux/modules/jadwalTenagaMedis/thunks";
import { getTenagaMedis } from "@redux/modules/tenagaMedis/thunks";
import { getJadwalPasienList } from "@redux/modules/jadwalPasien/thunks";

// CSS
import Layout from "@components/Layout";
import Jadwal_Tenaga_Medis from "@components/JadwalTenagaMedis/Calender"
import Form_Calender from "@components/JadwalTenagaMedis/FormCalender";
import Calender_Container from "@components/JadwalTenagaMedis/CalenderContainer";
import LoadingButton from "@mui/lab/LoadingButton"
import Filter_Tenaga_Medis from "@components/JadwalTenagaMedis/Filter";
import List_Pasien from "@components/JadwalPasien/ListPasien";

const Jadwal = () => {
  const { query, isReady } = useRouter()

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) {
      return
    }
    const { idCabang } = query;
    dispatch(getJadwalTenagaMedisList({ idCabang }));
    dispatch(getTenagaMedis({ idCabang }));
    dispatch(getJadwalPasienList({ idCabang }));
  }, [dispatch, isReady, query]);

  const { jadwalTenagaMedisList } = useSelector(state => state.jadwalTenagaMedis);
  const { tenagaMedisList } = useSelector(state => state.tenagaMedis);
  const { jadwalPasien } = useSelector(state => state.jadwalPasien);

  const locales = {
    'en-US': enUS,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => {
      return startOfWeek(new Date(), { weekStartsOn: 1 })
    },
    getDay,
    locales,
  })

  let [allEvents, setAllEvents] = useState([{}]);
  const [tenagaMedisDict, setTenagaMedisDict] = useState({});
  const [tenagaMedisDict2, setTenagaMedisDict2] = useState({});
  const [currentId, setCurrentId] = useState(0);
  let [TM, setTM] = useState("")

  const parseTenagaMedis = useCallback(() => {
    if (tenagaMedisList) {
      tenagaMedisList.map((tenagaMedis) => {
        const id_tenaga_medis_list = tenagaMedis.account.id;
        const nama_tenaga_medis = tenagaMedis.account.full_name;

        tenagaMedisDict[id_tenaga_medis_list] = nama_tenaga_medis
        setTenagaMedisDict(tenagaMedisDict);

        tenagaMedisDict2[nama_tenaga_medis] = id_tenaga_medis_list
        setTenagaMedisDict2(tenagaMedisDict2)
      })
    }
  }, [tenagaMedisDict, tenagaMedisDict2, tenagaMedisList])

  const parseData = useCallback((id_filter, force_filter) => {
    let tempId = 0;
    if (force_filter === 1) {
      tempId = 0
    } else {
      tempId = currentId
    }
    if (jadwalTenagaMedisList && tempId === 0 && jadwalPasien) {
      jadwalTenagaMedisList.map((jadwalTenagaMedis) => {
        const title = jadwalTenagaMedis.tenaga_medis.account.full_name;
        const start_time = jadwalTenagaMedis.start_time;
        const end_time = jadwalTenagaMedis.end_time;
        const day = jadwalTenagaMedis.day;
        const quota = jadwalTenagaMedis.quota;
        const id_tenaga_medis = jadwalTenagaMedis.tenaga_medis.account.id;
        const id = jadwalTenagaMedis.id;
        const listPasien = []

        const dayDict = {
          "mon": 1,
          "tue": 2,
          "wed": 3,
          "thu": 4,
          "fri": 5,
          "sat": 6,
          "sun": 7,
        }

        const currentDate = new Date()

        let day_num = getDayDifference(currentDate, dayDict, day)

        currentDate.setDate(new Date(currentDate.getDate() + day_num))

        const start = timeSplitEntry(start_time, currentDate)

        const end = timeSplitEntry(end_time, currentDate)

        setCurrentId(id)

        jadwalPasien.map((pasien) => {
          const id_jadwal_pasien_TM = pasien.jadwalTenagaMedis.id;
          if (id_jadwal_pasien_TM == id) {
            if (isThisWeek(new Date(pasien.date), { weekStartsOn: 1 })) {
              listPasien.push(pasien.lamaranPasien.nik)
            }
          }
        })

        if (id_filter > -1) {
          if (id_tenaga_medis === id_filter) {
            setAllEvents((prev) => [...prev, { id, start, end, title, quota, id_tenaga_medis, listPasien }])
          }
        } else {
          setAllEvents((prev) => [...prev, { id, start, end, title, quota, id_tenaga_medis, listPasien }])
        }
      })
    }
  }, [currentId, jadwalTenagaMedisList, jadwalPasien])

  useEffect(() => {
    parseData(jadwalTenagaMedisList, -1, 0);
    parseTenagaMedis(tenagaMedisList);
  }, [jadwalTenagaMedisList, tenagaMedisList, parseData, parseTenagaMedis])

  function timeSplitEntry(time, date) {
    return (new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.split(":")[0], time.split(":")[1], time.split(":")[2]))
  }

  function getDayDifference(date, dayDict, day) {
    const day_int = dayDict[day];
    let day_num = 0;
    if (date.getDay() > 0) {
      day_num = day_int - date.getDay();
    } else {
      day_num = day_int - 7;
    }
    return day_num
  }

  const updateMyEvents = (value) => {
    const id = tenagaMedisDict2[value]
    allEvents = [{}]
    setAllEvents(allEvents)

    TM = value
    setTM(TM)
    parseData(id, 1)

    batalEvent()
  }

  const updateAllMyEvents = () => {
    allEvents = []
    setAllEvents(allEvents)

    TM = ""
    setTM(TM)

    parseData(-1, 1)
    batalEvent()
  }

  const [currentEvent, setCurrentEvent] = useState(undefined)

  const selectEvent = useCallback(
    (event) => {
      setCurrentEvent(event)
    },
    [],
  )

  const batalEvent = () => {
    setCurrentEvent(undefined)
  }

  return jadwalTenagaMedisList && tenagaMedisList ? (
    <Layout navType="sidebar" title="Jadwal Pasien Minggu Ini">
      <Calender_Container>
        <Jadwal_Tenaga_Medis>
          <Calendar
            defaultView={Views.WEEK}
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 793, width: 1266 }}
            onSelectEvent={selectEvent}
          />
        </Jadwal_Tenaga_Medis>
        <Form_Calender>
          <Formik enableReinitialize>
            {() =>
              <Form>
                <h2>Filter</h2>
                <br></br>
                <h4>Tenaga Medis</h4>
                <Filter_Tenaga_Medis>
                  <select value={TM} onChange={(event) => updateMyEvents(event.target.value)} style={{ width: '100%' }}>
                    <option value="" selected="selected" hidden="hidden">Pilih Tenaga Medis</option>
                    {Object.keys(tenagaMedisDict2).map(key => <option key={key} value={tenagaMedisDict[key]}>{key}</option>)}
                  </select>
                  <LoadingButton
                    onClick={updateAllMyEvents}
                    variant="contained"
                    type="button"
                    width="100%"
                    id="updateAllMyEvents"
                  >
                    Tampilkan Semua Tenaga Medis
                  </LoadingButton>
                  {currentEvent === undefined ? <h2></h2> :
                    <LoadingButton
                      onClick={batalEvent}
                      variant="contained"
                      type="button"
                      width="100%"
                      id="updateAllMyEvents"
                      style={{ background: "#F44336" }}
                    >
                      Kembali
                    </LoadingButton>
                  }
                  {currentEvent === undefined ? <h2></h2> :
                    <List_Pasien>
                      {currentEvent.listPasien.length > 0 ?
                        <ul>
                          <h4 data-testid="DaftarPasien">Daftar Pasien</h4>
                          {Object.keys(currentEvent.listPasien).map(key => <p key={key}>- {currentEvent.listPasien[key]}</p>)}
                        </ul> :
                        <ul>
                          <h4 data-testid="DaftarPasien">Tidak ada pasien yang terdaftar</h4>
                        </ul>
                      }
                    </List_Pasien>
                  }
                </Filter_Tenaga_Medis>
              </Form>
            }
          </Formik>
        </Form_Calender>
      </Calender_Container>
    </Layout>
  ) : null
}

export default Jadwal;