from cgi import test
from django.test import TestCase
from model_bakery import baker
from unittest.mock import Mock
from django.core import files
from django.core.files.uploadedfile import SimpleUploadedFile

from .models import Account, Cabang, Klinik, Profile, OwnerProfile


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
        mock_file = Mock(spec=files.File, name="mocktest")
        mock_file.name = "test.jpg"
        test_file = SimpleUploadedFile("best_file_eva.txt", b"these are the file contents!")
        self.klinik = baker.make("klinik.Klinik", name="Lalita", sik=test_file, _create_files=True)
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
