from django.test import TestCase

# Create your tests here.
class UnitTest(TestCase):
    def smoke_test(self):
        self.assertEquals(True, True)