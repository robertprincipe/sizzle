from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
from .serializers import UserSerializer

@api_view(["POST"])
def signup(request):
    user_serializer = UserSerializer(data=request.data)
    
    if user_serializer.is_valid():
        user_serializer.save()
        return Response({'message': 'Registro exitoso.'}, status=status.HTTP_201_CREATED)

    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signin(request):
    try:
        user = User.objects.get(request.data["email"])
        return Response({
            'user': user,
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({
            'message': 'Error en email o contraseña.',
        }, status=status.HTTP_404_NOT_FOUND)
    
    