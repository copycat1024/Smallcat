# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from models import Teacher, Course
from rest_framework import viewsets
from serializers import TeacherSerializer, CourseSerializer

# Create your views here.
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('name')
    serializer_class = CourseSerializer

