from django.test import TestCase
from model_bakery import baker
from unittest.mock import Mock

from .models import Account, Cabang, Klinik, Profile, OwnerProfile


class ProfileModelTest(TestCase):

    def setUp(self) -> None:
        self.profile = baker.make('klinik.Profile')
        return super().setUp()

    def test_profile_model_instace_of_Profile_class(self):
        self.assertIsInstance(self.profile, Profile)

    def test_profile_model_has_role(self):
        self.assertEqual(self.profile.role, 'tenaga_medis')

    def test_profile_model_has_Account(self):
        self.assertIsNotNone(self.profile.account.pk)


class OwnerProfileModelTest(TestCase):
    def test_ownerprofile_is_subclass_of_profile(self):
        self.assertTrue(issubclass(OwnerProfile, Profile))

    def test_ownerprofile_has_role_owner(self):
        self.owner_profile = baker.make('klinik.OwnerProfile')
        self.assertEqual(self.owner_profile.role, 'owner')


class KlinikModelTest(TestCase):
    def test_created_klinik_instace_of_Klinik_class(self):
        klinik = Klinik('Lalita')
        owner = Mock(spec=OwnerProfile)
        owner._state = Mock()
        klinik.owner = owner

        self.assertIsInstance(klinik, Klinik)

    def test_created_klinik_has_owner(self):
        klinik = Klinik('Lalita')
        owner = Mock(spec=OwnerProfile)
        owner._state = Mock()
        klinik.owner = owner

        self.assertEqual(klinik.owner.pk, owner.pk)

    def test_created_klinik_has_name(self):
        klinik = Klinik('Lalita')
        owner = Mock(spec=OwnerProfile)
        owner._state = Mock()
        klinik.owner = owner

        self.assertEqual(self.name, 'Lalita')


class CabangModelTest(TestCase):
    def test_created_cabang_instace_of_Cabang_class(self):
        cabang = Cabang('alam sutra')
        klinik = Mock(spec=Klinik)
        klinik._state = Mock()
        cabang.klinik = klinik

        self.assertIsInstance(cabang, Cabang)

    def test_created_cabang_belongs_to_klinik(self):
        cabang = Cabang('alam sutra')
        klinik = Mock(spec=Klinik)
        klinik._state = Mock()
        cabang.klinik = klinik

        self.assertEqual(cabang.klinik.pk, klinik.pk)

    def test_created_cabang_has_location(self):
        cabang = Cabang('alam sutra')
        klinik = Mock(spec=Klinik)
        klinik._state = Mock()
        cabang.klinik = klinik

        self.assertEqual(cabang.location, 'alam sutra')
