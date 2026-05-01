from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'students',         views.StudentViewSet)
router.register(r'teachers',         views.TeacherViewSet)
router.register(r'departments',      views.DepartmentViewSet)
router.register(r'subjects',         views.SubjectViewSet)
router.register(r'fees',             views.FeeViewSet)
router.register(r'fees-collections', views.FeesCollectionViewSet)
router.register(r'expenses',         views.ExpenseViewSet)
router.register(r'salary',           views.SalaryViewSet)
router.register(r'books',            views.BookViewSet)
router.register(r'hostel',           views.HostelRoomViewSet)
router.register(r'transport',        views.TransportViewSet)
router.register(r'sports',           views.SportViewSet)
router.register(r'exams',            views.ExamViewSet)
router.register(r'events',           views.EventViewSet)
router.register(r'holiday',          views.HolidayViewSet)
router.register(r'timetable',        views.TimetableViewSet)
router.register(r'messages',         views.MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('test/',                  views.test_api),
    path('auth/profile/',          views.ProfileView.as_view(),       name='profile'),
    path('dashboard/stats/',       views.DashboardStatsView.as_view(), name='dashboard-stats'),
    path('invoice/<int:pk>/',      views.InvoiceView.as_view(),       name='invoice'),
]