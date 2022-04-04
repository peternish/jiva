from rest_framework import permissions, serializers


class IsOwnerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        print(f"{request.user} access")
        if request.user.is_authenticated:
            return request.user.profile.role == "owner" or request.user.is_superuser
        return False


class IsStafPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ["owner", "staf"]
        if request.user.is_authenticated:
            return (
                request.user.profile.role in allowed_roles or request.user.is_superuser
            )
        return False


class IsTenagaMedisPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ["owner", "tenaga_medis"]
        if request.user.is_authenticated:
            return (
                request.user.profile.role in allowed_roles or request.user.is_superuser
            )
        return False

class ValidateJSONForm(serializers.ModelSerializer):
    def validate(self, data):
        """
        Validates JSON form
        """
        fields = data["fields"]
        try:
            for input in fields:
                type = input["type"]
                required = input["required"]
                value = input["value"]
                if required and not value:
                    raise serializers.ValidationError("input wajib belum diisi")
                if (type == "number") and not value.isnumeric():
                    raise serializers.ValidationError("input salah")
        except Exception:
            raise serializers.ValidationError("format fields salah")
        return data
