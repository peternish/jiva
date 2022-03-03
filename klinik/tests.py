from django.test import TestCase
from model_bakery import baker
from unittest.mock import patch

# Models
from klinik.models import Cabang, Klinik, Profile, OwnerProfile

# Views

from klinik import views

# Rest
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory
from rest_framework import status

# Errors
from psycopg2 import IntegrityError


def mock_object_raise_integrity_error(self):
    raise IntegrityError()


class ProfileModelTest(TestCase):
    def setUp(self) -> None:
        self.profile = baker.make("klinik.Profile")
        return super().setUp()

    def test_profile_model_instace_of_Profile_class(self):
        self.assertIsInstance(self.profile, Profile)

    def test_profile_model_has_role(self):
        self.assertEqual(self.profile.role, "tenaga_medis")

    def test_profile_model_has_Account(self):
        self.assertIsNotNone(self.profile.account.pk)


class OwnerProfileModelTest(TestCase):
    def test_ownerprofile_is_subclass_of_profile(self):
        self.assertTrue(issubclass(OwnerProfile, Profile))

    def test_ownerprofile_has_role_owner(self):
        self.owner_profile = baker.make("klinik.OwnerProfile")
        self.assertEqual(self.owner_profile.role, "owner")


class KlinikModelTest(TestCase):
    def setUp(self) -> None:
        self.klinik = baker.make("klinik.Klinik", name="Lalita")
        return super().setUp()

    def test_created_klinik_instace_of_Klinik_class(self):
        self.assertIsInstance(self.klinik, Klinik)

    def test_created_klinik_has_owner(self):
        self.assertIsNotNone(self.klinik.owner.pk)

    def test_created_klinik_has_name(self):
        self.assertEqual(self.klinik.name, "Lalita")


class CabangModelTest(TestCase):
    def setUp(self) -> None:
        self.cabang = baker.make("klinik.Cabang", location="alam sutra")
        return super().setUp()

    def test_created_cabang_instace_of_Cabang_class(self):
        self.assertIsInstance(self.cabang, Cabang)

    def test_created_cabang_belongs_to_klinik(self):
        self.assertIsNotNone(self.cabang.klinik.pk)

    def test_created_cabang_has_location(self):
        self.assertEqual(self.cabang.location, "alam sutra")


class CabangEndpointTest(TestCase):
    def setUp(self) -> None:
        self.api = APIRequestFactory()
        self.TEST_KLINIK_PK = 1919
        self.TEST_CABANG_PK = 9191
        self.TEST_LOCATION = "Alam Sutra"
        return super().setUp()

    def test_fetch_all_cabang_that_belongs_to_klinik(self):
        payload = {"klinik": self.TEST_KLINIK_PK}
        request = self.api.get("/cabang/all", data=payload, format="json")
        response = views.get_all_cabang(request)
        rest_response = Response(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        cabang = response.data["cabang"]
        self.assertEqual(cabang, rest_response.data["cabang"])
        self.assertIsInstance(cabang, list)

    def test_fetch_cabang_with_id(self):
        # TODO: refactor payload
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "cabang": self.TEST_CABANG_PK}
        request = self.api.get("/cabang/fetch", data=payload, format="json")
        response = views.get_cabang(request)
        rest_response = Response(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        cabang = response.data["cabang"]
        self.assertEqual(cabang, rest_response.data["cabang"])
        self.assertIsInstance(cabang, Cabang)

    def test_create_cabang_from_klinik(self):
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "location": self.TEST_LOCATION}
        with patch.object(Cabang, "create_cabang", autospec=True) as mock_do:
            request = self.api.post(
                "/cabang/register", data=payload, format="json")
            response = views.create_cabang(request)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            # TODO: mock serializer

    def test_create_cabang_from_klinik_fail_without_location(self):
        """
        Payload should be handled manually
        """
        payload = {
            "klinik": self.TEST_KLINIK_PK,
        }
        request = self.api.post(
            "/cabang/register", data=payload, format="json")
        response = views.create_cabang(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch(
        "klinik.models.Cabang.objects.first",
        new=mock_object_raise_integrity_error,
    )
    def test_create_cabang_from_klinik_fail_not_found(self):
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "cabang": self.TEST_CABANG_PK}
        request = self.api.post(
            "/cabang/register", data=payload, format="json")
        response = views.create_cabang(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_cabang_with_id(self):
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "cabang": self.TEST_CABANG_PK}
        request = self.api.get("/cabang/revise", data=payload, format="json")
        response = views.update_cabang(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch(
        "klinik.models.Cabang.objects.first",
        new=mock_object_raise_integrity_error,
    )
    def test_update_cabang_with_id_fail_not_found(self):
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "cabang": self.TEST_CABANG_PK}
        request = self.api.get("/cabang/revise", data=payload, format="json")
        response = views.update_cabang(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch(
        "klinik.models.Cabang.objects.first",
        new=lambda: True,
    )
    def test_delete_cabang_with_id(self, mock_cabang):
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "cabang": self.TEST_CABANG_PK}
        request = self.api.get("/cabang/remove", data=payload, format="json")
        response = views.remove_cabang(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(mock_cabang.call_count, 1)

    @patch(
        "klinik.models.Cabang.objects.first",
        new=mock_object_raise_integrity_error,
    )
    def test_delete_cabang_with_id_not_found(self):
        payload = {"klinik": self.TEST_KLINIK_PK,
                   "cabang": self.TEST_CABANG_PK}
        request = self.api.get("/cabang/remove", data=payload, format="json")
        response = views.remove_cabang(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
