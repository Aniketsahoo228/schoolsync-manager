from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .models import (
    Student, Teacher, Department, Subject,
    Fee, FeesCollection, Expense, Salary,
    Book, HostelRoom, Transport, Sport,
    Exam, Event, Holiday, Timetable, Message,
)
from .serializers import (
    StudentSerializer, TeacherSerializer, DepartmentSerializer, SubjectSerializer,
    FeeSerializer, FeesCollectionSerializer, ExpenseSerializer, SalarySerializer,
    BookSerializer, HostelRoomSerializer, TransportSerializer, SportSerializer,
    ExamSerializer, EventSerializer, HolidaySerializer, TimetableSerializer,
    MessageSerializer, UserSerializer,
)


# ─── Helper: standard response wrapper ────────────────────────
def success(data, count=None, status_code=status.HTTP_200_OK):
    body = {"status": "success", "data": data}
    if count is not None:
        body["count"] = count
    return Response(body, status=status_code)


def error(message, errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    body = {"status": "error", "message": message}
    if errors:
        body["errors"] = errors
    return Response(body, status=status_code)


# ─── Base ViewSet (shared CRUD logic) ─────────────────────────
class BaseViewSet(viewsets.ModelViewSet):
    """
    All ViewSets inherit from this.
    Override get_serializer_class() or queryset as needed.
    """

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        serializer = self.get_serializer(qs, many=True)
        return success(serializer.data, count=qs.count())

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success(serializer.data, status_code=status.HTTP_201_CREATED)
        return error("Validation failed", errors=serializer.errors)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object_or_404(kwargs.get('pk'))
        if isinstance(instance, Response):
            return instance
        serializer = self.get_serializer(instance)
        return success(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object_or_404(kwargs.get('pk'))
        if isinstance(instance, Response):
            return instance
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return success(serializer.data)
        return error("Validation failed", errors=serializer.errors)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object_or_404(kwargs.get('pk'))
        if isinstance(instance, Response):
            return instance
        instance.delete()
        return Response(
            {"status": "success", "message": "Deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

    def get_object_or_404(self, pk):
        try:
            return self.get_queryset().get(pk=pk)
        except self.get_queryset().model.DoesNotExist:
            return error(
                f"{self.get_queryset().model.__name__} with id {pk} not found",
                status_code=status.HTTP_404_NOT_FOUND
            )


# ─── Test ──────────────────────────────────────────────────────
@api_view(['GET'])
def test_api(request):
    return Response({"status": "success", "message": "API is working"})


# ─── ViewSets ──────────────────────────────────────────────────

class StudentViewSet(BaseViewSet):
    queryset         = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(BaseViewSet):
    queryset         = Teacher.objects.all()
    serializer_class = TeacherSerializer


class DepartmentViewSet(BaseViewSet):
    queryset         = Department.objects.all()
    serializer_class = DepartmentSerializer


class SubjectViewSet(BaseViewSet):
    queryset         = Subject.objects.all()
    serializer_class = SubjectSerializer


class FeeViewSet(BaseViewSet):
    queryset         = Fee.objects.all()
    serializer_class = FeeSerializer


class FeesCollectionViewSet(BaseViewSet):
    queryset         = FeesCollection.objects.all()
    serializer_class = FeesCollectionSerializer


class ExpenseViewSet(BaseViewSet):
    queryset         = Expense.objects.all()
    serializer_class = ExpenseSerializer


class SalaryViewSet(BaseViewSet):
    queryset         = Salary.objects.all()
    serializer_class = SalarySerializer


class BookViewSet(BaseViewSet):
    queryset         = Book.objects.all()
    serializer_class = BookSerializer


class HostelRoomViewSet(BaseViewSet):
    queryset         = HostelRoom.objects.all()
    serializer_class = HostelRoomSerializer


class TransportViewSet(BaseViewSet):
    queryset         = Transport.objects.all()
    serializer_class = TransportSerializer


class SportViewSet(BaseViewSet):
    queryset         = Sport.objects.all()
    serializer_class = SportSerializer


class ExamViewSet(BaseViewSet):
    queryset         = Exam.objects.all()
    serializer_class = ExamSerializer


class EventViewSet(BaseViewSet):
    queryset         = Event.objects.all()
    serializer_class = EventSerializer


class HolidayViewSet(BaseViewSet):
    queryset         = Holiday.objects.all()
    serializer_class = HolidaySerializer


class TimetableViewSet(BaseViewSet):
    queryset         = Timetable.objects.all()
    serializer_class = TimetableSerializer


class MessageViewSet(BaseViewSet):
    queryset         = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        # Only return messages for the logged-in user
        user = self.request.user
        if user.is_authenticated:
            return Message.objects.filter(recipient=user) | Message.objects.filter(sender=user)
        return Message.objects.none()


# ─── Profile View ──────────────────────────────────────────────
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return success(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success(serializer.data)
        return error("Validation failed", errors=serializer.errors)


# ─── Dashboard Stats View ──────────────────────────────────────
class DashboardStatsView(APIView):

    def get(self, request):
        stats = {
            "students":    Student.objects.count(),
            "teachers":    Teacher.objects.count(),
            "departments": Department.objects.count(),
            "subjects":    Subject.objects.count(),
            "books":       Book.objects.count(),
            "hostel_rooms": HostelRoom.objects.count(),
            "transports":  Transport.objects.count(),
            "sports":      Sport.objects.count(),
            "exams":       Exam.objects.count(),
            "events":      Event.objects.count(),
            "holidays":    Holiday.objects.count(),
            "revenue": {
                "total_fees":    str(Fee.objects.filter(status='Paid').values_list('amount', flat=True).first() or 0),
                "total_expenses":str(Expense.objects.values_list('amount', flat=True).first() or 0),
            },
            "hostel": {
                "available": HostelRoom.objects.filter(availability='Available').count(),
                "full":      HostelRoom.objects.filter(availability='Full').count(),
            },
            "library": {
                "in_stock":     Book.objects.filter(status='In Stock').count(),
                "out_of_stock": Book.objects.filter(status='Out of Stock').count(),
            },
        }
        return success(stats)


# ─── Invoice View ──────────────────────────────────────────────
class InvoiceView(APIView):

    def get(self, request, pk):
        try:
            collection = FeesCollection.objects.get(pk=pk)
        except FeesCollection.DoesNotExist:
            return error(f"Invoice {pk} not found", status_code=status.HTTP_404_NOT_FOUND)

        invoice_data = {
            "invoice_id":     collection.id,
            "student":        str(collection.student),
            "fees_type":      collection.fees_type,
            "amount":         str(collection.amount),
            "payment_date":   str(collection.payment_date),
            "payment_method": collection.payment_method,
            "status":         collection.status,
        }
        return success(invoice_data)