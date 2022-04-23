# django imports
from django.db.models.query import QuerySet
from django.db.models import Q

# model imports
from .models import JadwalTenagaMedis
from klinik.models import TenagaMedisProfile

# other imports
import datetime


def validate_time(
    data: dict,
    tenaga_medis: TenagaMedisProfile = None,
    current_jadwal: JadwalTenagaMedis = None,
):
    if tenaga_medis:
        start_time = data.get("start_time")
        end_time = data.get("end_time")
        current_jadwals = JadwalTenagaMedis.objects.filter(
            tenaga_medis=tenaga_medis, day=data.get("day")
        )

    elif current_jadwal:
        start_time = data.get("start_time", current_jadwal.start_time)
        end_time = data.get("end_time", current_jadwal.end_time)
        current_jadwals = JadwalTenagaMedis.objects.filter(
            tenaga_medis=current_jadwal.tenaga_medis,
            day=data.get("day", current_jadwal.day),
        ).exclude(id=current_jadwal.id)

    if not time_range_is_valid(start_time=start_time, end_time=end_time):
        return {"time": "start_time must be before end_time"}
    if time_range_will_overlap(
        current_jadwals=current_jadwals, new_time=(start_time, end_time)
    ):
        return {
            "overlap": "the time will overlap with current jadwal tenaga medis times"
        }
    return {}


def time_range_is_valid(start_time: datetime.time, end_time: datetime.time):
    return start_time < end_time


def time_range_will_overlap(current_jadwals: QuerySet, new_time: tuple):
    new_time_start = new_time[0]
    new_time_end = new_time[1]
    for jadwal in current_jadwals:
        time_start = jadwal.start_time
        time_end = jadwal.end_time
        if (time_start < new_time_end) and (time_end > new_time_start):
            return True
    return False

def filter_available_jadwal(jadwal_tenaga_medis_query: QuerySet, start_date, end_date):
    res = []
    for jadwal_tenaga_medis in jadwal_tenaga_medis_query:
        quota = jadwal_tenaga_medis.quota
        booked = jadwal_tenaga_medis.jadwal_pasien.filter(Q(date__gte=start_date) & Q(date__lte=end_date)).count()
        if booked < quota:
            res.append(jadwal_tenaga_medis)
    return res
