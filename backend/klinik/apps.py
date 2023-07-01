from django.apps import AppConfig


class KlinikConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "klinik"

    def ready(self):
        import klinik.signals
