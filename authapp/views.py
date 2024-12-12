from django.shortcuts import render
from rest_framework import serializers,views,status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

# Create your views here.

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminLoginSerializer(data = request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = User.objects.filter(username=username,is_superuser=True).first()

            if user and user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh' : str(refresh),
                    'access': str(refresh.access_token),
                    'is_admin': True
                })

            return Response({"message": "Invalid admin credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class RegisterView(views.APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(views.APIView):
    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.filter(username=serializer.validated_data['username']).first()
            if user and user.check_password(serializer.validated_data['password']):
                print("login user is correct")
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh' : str(refresh),
                    'access' : str(refresh.access_token)
                })
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        response.data['username'] = request.user.username
        return response
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])

def protected_route(request):
    return Response({'message':'you have access ss to this route'})


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({"error": "No refresh token provided"}, status=400)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=200)
        
        except Exception as e:
            return Response({"error": "Invalid token or logout failed"}, status=400)