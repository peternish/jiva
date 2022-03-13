from rest_framework import permissions

class IsOwnerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        print(f'{request.user} access')
        if request.user.is_authenticated:
            return  request.user.profile.role == 'owner' or request.user.is_superuser
        return False

class IsStafPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['owner', 'staf']
        if request.user.is_authenticated:
            return  request.user.profile.role in allowed_roles or request.user.is_superuser
        return False

class IsTenagaMedisPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['owner', 'tenaga_medis']
        if request.user.is_authenticated:
            return  request.user.profile.role in allowed_roles or request.user.is_superuser
        return False

