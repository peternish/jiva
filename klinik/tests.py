from re import A
from django.test import TestCase
from unittest.mock import Mock

from .models import Account, Cabang, Klinik, Profile, OwnerProfile


class ProfileModelTest(TestCase):
    def test_profile_model_instace_of_Profile_class(self):
        profile = Profile('terapis')
        account = Mock(spec=Account)
        account._state = Mock()
        profile.account = account

        self.assertIsInstance(profile, Profile)

    def test_profile_model_has_role(self):
        profile = Profile('terapis')
        account = Mock(spec=Account)
        account._state = Mock()
        profile.account = account

        self.assertEqual(profile.role, 'terapis')

    def test_profile_model_has_Account(self):
        profile = Profile('terapis')
        account = Mock(spec=Account)
        account._state = Mock()
        profile.account = account

        self.assertEqual(profile.account.pk, account.pk)


class OwnerProfileModelTest(TestCase):
    def test_ownerprofile_is_subclass_of_profile(self):
        self.assertTrue(issubclass(OwnerProfile, Profile))

    def test_ownerprofile_has_role_owner(self):
        owner_profile = OwnerProfile()
        self.assertEqual(owner_profile.role, 'owner')


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
