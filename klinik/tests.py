from django.test import TestCase
from unittest.mock import Mock

from .models import Klinik, OwnerProfile


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
