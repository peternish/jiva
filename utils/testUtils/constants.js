import constants from "@utils/constants";

export const SAMPLE_SCHEMA = [
{
    "id": 1,
    "cabang_id": 1,
    "formtype": "pendaftaran_pasien",
    "fields": [
        {
            "name": "text-1649092362528-0",
            "type": "text",
            "label": "Field 1",
            "access": false,
            "subtype": "text",
            "required": true,
            "className": "form-control"
        }
    ],
    "klinik": {
        "name": "Klinik Staging 1"
    }
  },
  {
    "id": 1,
    "cabang_id": 1,
    "formtype": constants.FORM_TYPES.HEALTH_RECORD,
    "fields": [
        {
            "name": "text-1649092362528-0",
            "type": "text",
            "label": "Field 1",
            "access": false,
            "subtype": "text",
            "required": true,
            "className": "form-control"
        }
    ],
    "klinik": {
        "name": "Klinik Staging 1"
    }
  }
]

export const SAMPLE_JADWAL = [
  {
    "id": 2,
    "tenaga_medis": {
      "account": {
        "id": 2,
        "full_name": "TM 2",
        "email": "tm2@klinik99.com",
        "date_joined": "2022-03-31T12:49:11.378628Z",
        "last_login": "2022-03-31T12:49:11.378628Z",
        "role": "tenaga_medis",
        "cabang": 1,
        "klinik": 1
      },
      "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
    },
    "start_time": "10:00:00",
    "end_time": "12:00:00",
    "quota": 5,
    "day": "mon"
  },
  {
    "id": 3,
    "tenaga_medis": {
      "account": {
        "id": 3,
        "full_name": "TM 3",
        "email": "tm3@klinik99.com",
        "date_joined": "2022-04-02T10:43:33.797983Z",
        "last_login": "2022-04-02T10:43:33.797983Z",
        "role": "tenaga_medis",
        "cabang": 1,
        "klinik": 1
      },
      "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
    },
    "start_time": "11:00:00",
    "end_time": "14:00:00",
    "quota": 5,
    "day": "mon"
  }
]

export const SAMPLE_PASIEN = {
  id: 1,
  nik: "123",
  full_name: "sample"
}