from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
from .serializers import UserSerializer


@api_view(["PUT"])
def update_profile(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(
            {
                "message": "No existe el usuario.",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        user = UserSerializer(user, request.data, partial=True)
        if user.is_valid():
            user.save()

        return Response(user.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(
            {"message": "hubo un error"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["DELETE"])
def remove_image_profile(request, id, image):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(
            {
                "message": "No existe el usuario.",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        if not image in ["picture", "banner"]:
            return Response(
                {
                    "message": "La imagen no es valida.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if image == "picture":
            user.picture = None
            user.save()
        elif image == "banner":
            user.banner = None
            user.save()

        return Response(
            {"message": "Removido correctamente"}, status=status.HTTP_200_OK
        )
    except Exception as e:
        print(e)
        return Response(
            {"message": "hubo un error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["GET"])
def profile_detail(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {
                "message": "No existe el usuario.",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
