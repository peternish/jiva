from django.test import TestCase
from unittest.mock import Mock

from .models import Klinik, OwnerProfile


class KlinikModelTest(TestCase):
    def test_create_klinik(self):
        klinik = Klinik('Lalita')
        owner = Mock(spec=OwnerProfile)
        owner._state = Mock()
        klinik.owner = owner

        self.assertEqual(klinik.name, 'Lalita')
        self.assertEqual(klinik.owner.pk, owner.pk)
