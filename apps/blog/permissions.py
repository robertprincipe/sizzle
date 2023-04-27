from rest_framework import permissions

class IsAuthorOrAdminOrModerator(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or admins/moderators/editors to edit it.
    """
    
    def has_object_permission(self, request, view, obj):
        
        # Si el usuario es un administrador, moderador o editor, puede editar la publicación
        if request.user.role in [3, 4]:
            return True
        
        # Si no es propietario ni administrador ni moderador ni editor, no puede editar
        return obj.user == request.user