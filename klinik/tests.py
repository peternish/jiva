from re import A
from django.test import TestCase
from unittest.mock import Mock

from .models import Account, Klinik, Profile, OwnerProfile


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
