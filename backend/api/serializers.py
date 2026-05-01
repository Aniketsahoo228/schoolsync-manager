from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Student, Teacher, Department, Subject,
    Fee, FeesCollection, Expense, Salary,
    Book, HostelRoom, Transport, Sport,
    Exam, Event, Holiday, Timetable, Message,
)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Student
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Teacher
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Department
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Subject
        fields = '__all__'


class FeeSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.__str__', read_only=True)

    class Meta:
        model  = Fee
        fields = '__all__'


class FeesCollectionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.__str__', read_only=True)

    class Meta:
        model  = FeesCollection
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Expense
        fields = '__all__'


class SalarySerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.name', read_only=True)

    class Meta:
        model  = Salary
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Book
        fields = '__all__'


class HostelRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model  = HostelRoom
        fields = '__all__'


class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Transport
        fields = '__all__'


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Sport
        fields = '__all__'


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Exam
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Event
        fields = '__all__'


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Holiday
        fields = '__all__'


class TimetableSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.name', read_only=True)

    class Meta:
        model  = Timetable
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    sender_name    = serializers.CharField(source='sender.get_full_name', read_only=True)
    recipient_name = serializers.CharField(source='recipient.get_full_name', read_only=True)

    class Meta:
        model  = Message
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']