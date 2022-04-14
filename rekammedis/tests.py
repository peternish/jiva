from rest_framework.test import APITestCase
from klinik.models import TenagaMedisProfile
from rekammedis.models import Pasien, RekamanMedis

# Create your tests here.


class RekamMedisAPITest(APITestCase):

    def setUp(self) -> None:
        return super().setUp()

    def test_get_all_rekaman_medis_from_nik(self):
        pass

    def test_get_all_rekaman_medis_from_nik_but_nik_not_found(self):
        pass

    def test_get_all_rekaman_medis_from_nik_but_unauthorized(self):
        pass

    def test_get_rekaman_medis_from_id(self):
        pass

    def test_get_rekaman_medis_from_id_but_not_found(self):
        pass

    def test_get_rekaman_medis_from_id_but_unauthorized(self):
        pass

    def test_post_rekaman_medis(self):
        pass

    def test_post_rekaman_medis_but_unauthorized(self):
        pass

    def test_post_rekaman_medis_missing_schema_fields(self):
        pass

    def test_put_rekaman_medis(self):
        pass

    def test_put_rekaman_medis_but_unauthorized(self):
        pass

    def test_delete_rekaman_medis_from_id(self):
        pass

    def test_delete_rekaman_medis_from_id_but_not_found(self):
        pass

    def test_delete_rekaman_medis_from_id_but_unauthorized(self):
        pass
