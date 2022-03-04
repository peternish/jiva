from django.utils import lorem_ipsum
from klinik.models import Cabang, Klinik, OwnerProfile
import factory


class OwnerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OwnerProfile

    @factory.lazy_attribute_sequence
    def account(self, n):
        return n


class KlinikFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Klinik

    @factory.lazy_attribute_sequence
    def name(self, n):
        return '{0}_{1}'.format(lorem_ipsum.words(1, False), n)

    @factory.lazy_attribute_sequence
    def owner(self, n):
        return n


class CabangFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Cabang

    @factory.lazy_attribute_sequence
    def location(self, n):
        return '{0}_{1}'.format(lorem_ipsum.words(1, False), n)

    @factory.lazy_attribute_sequence
    def klinik(self, n):
        return n
