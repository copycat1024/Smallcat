from models import Teacher, Course
from rest_framework import serializers

class TeacherSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Teacher
		fields = ('pk', 'forename', 'surname', 'username', 'email')

class CourseSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Course
		fields = ('pk', 'name', 'group', 'teacher')
