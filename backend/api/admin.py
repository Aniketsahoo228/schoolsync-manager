from django.contrib import admin
from .models import (
    Student, Teacher, Department, Subject,
    Fee, FeesCollection, Expense, Salary,
    Book, HostelRoom, Transport, Sport,
    Exam, Event, Holiday, Timetable, Message,
)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display  = ['student_id', 'first_name', 'last_name', 'class_name', 'gender', 'joining_date']
    list_filter   = ['gender', 'class_name', 'religion']
    search_fields = ['student_id', 'first_name', 'last_name']

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display  = ['teacher_id', 'name', 'gender', 'mobile', 'joining_date']
    list_filter   = ['gender']
    search_fields = ['teacher_id', 'name', 'email']

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display  = ['department_id', 'name', 'head', 'no_of_students']
    search_fields = ['name', 'head']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display  = ['subject_id', 'name', 'class_name']
    search_fields = ['name']

@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display  = ['student', 'amount', 'due_date', 'status']
    list_filter   = ['status']

@admin.register(FeesCollection)
class FeesCollectionAdmin(admin.ModelAdmin):
    list_display  = ['student', 'fees_type', 'amount', 'payment_date', 'payment_method']
    list_filter   = ['payment_method', 'status']

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display  = ['name', 'amount', 'date', 'category']
    list_filter   = ['category']

@admin.register(Salary)
class SalaryAdmin(admin.ModelAdmin):
    list_display  = ['teacher', 'amount', 'month', 'year', 'status']
    list_filter   = ['status', 'year']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display  = ['book_id', 'name', 'language', 'department', 'status']
    list_filter   = ['status', 'language', 'book_type']
    search_fields = ['book_id', 'name']

@admin.register(HostelRoom)
class HostelRoomAdmin(admin.ModelAdmin):
    list_display  = ['block', 'room_no', 'room_type', 'no_of_beds', 'availability']
    list_filter   = ['block', 'availability', 'room_type']

@admin.register(Transport)
class TransportAdmin(admin.ModelAdmin):
    list_display  = ['route_name', 'vehicle_number', 'driver_name', 'contact_number']
    search_fields = ['route_name', 'vehicle_number', 'driver_name']

@admin.register(Sport)
class SportAdmin(admin.ModelAdmin):
    list_display  = ['sports_id', 'name', 'coach_name', 'started_year']
    search_fields = ['name', 'coach_name']

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display  = ['name', 'class_name', 'subject', 'event_date', 'start_time']
    list_filter   = ['class_name']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display  = ['event_id', 'name', 'event_date', 'venue']
    search_fields = ['name']

@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    list_display  = ['holiday_id', 'name', 'holiday_type', 'start_date', 'end_date']
    list_filter   = ['holiday_type']

@admin.register(Timetable)
class TimetableAdmin(admin.ModelAdmin):
    list_display  = ['teacher', 'class_name', 'subject', 'day', 'start_time', 'end_time']
    list_filter   = ['day', 'class_name']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display  = ['sender', 'recipient', 'subject', 'is_read', 'created_at']
    list_filter   = ['is_read']