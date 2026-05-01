from django.db import models
from django.contrib.auth.models import User


# ─── Student ──────────────────────────────────────────────────
class Student(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    RELIGION_CHOICES = [('Christian', 'Christian'), ('Muslim', 'Muslim'), ('Hindu', 'Hindu'), ('Other', 'Other')]

    student_id       = models.CharField(max_length=20, unique=True)
    first_name       = models.CharField(max_length=100)
    last_name        = models.CharField(max_length=100)
    gender           = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth    = models.DateField()
    class_name       = models.CharField(max_length=20)
    section          = models.CharField(max_length=10, blank=True)
    religion         = models.CharField(max_length=20, choices=RELIGION_CHOICES, blank=True)
    joining_date     = models.DateField()
    mobile_number    = models.CharField(max_length=20, blank=True)
    admission_number = models.CharField(max_length=20, blank=True)
    father_name      = models.CharField(max_length=100, blank=True)
    image            = models.ImageField(upload_to='students/', blank=True, null=True)
    created_at       = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ['-created_at']


# ─── Teacher ──────────────────────────────────────────────────
class Teacher(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]

    teacher_id    = models.CharField(max_length=20, unique=True)
    name          = models.CharField(max_length=100)
    gender        = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    mobile        = models.CharField(max_length=20)
    joining_date  = models.DateField()
    qualification = models.CharField(max_length=100, blank=True)
    experience    = models.CharField(max_length=50, blank=True)
    username      = models.CharField(max_length=50, unique=True)
    email         = models.EmailField(unique=True)
    address       = models.TextField(blank=True)
    image         = models.ImageField(upload_to='teachers/', blank=True, null=True)
    created_at    = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']


# ─── Department ───────────────────────────────────────────────
class Department(models.Model):
    department_id   = models.CharField(max_length=20, unique=True)
    name            = models.CharField(max_length=100)
    head            = models.CharField(max_length=100)
    start_date      = models.CharField(max_length=20)
    no_of_students  = models.IntegerField(default=0)
    created_at      = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# ─── Subject ──────────────────────────────────────────────────
class Subject(models.Model):
    subject_id = models.CharField(max_length=20, unique=True)
    name       = models.CharField(max_length=100)
    class_name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# ─── Fee ──────────────────────────────────────────────────────
class Fee(models.Model):
    STATUS_CHOICES = [('Paid', 'Paid'), ('Unpaid', 'Unpaid'), ('Partial', 'Partial')]

    student    = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='fees')
    amount     = models.DecimalField(max_digits=10, decimal_places=2)
    due_date   = models.DateField()
    paid_date  = models.DateField(blank=True, null=True)
    status     = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Unpaid')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fee - {self.student} - {self.amount}"

    class Meta:
        ordering = ['-created_at']


# ─── Fees Collection ──────────────────────────────────────────
class FeesCollection(models.Model):
    PAYMENT_CHOICES = [('Cash', 'Cash'), ('Card', 'Card'), ('Online', 'Online')]

    student        = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='fees_collections')
    fees_type      = models.CharField(max_length=50)
    amount         = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date   = models.DateField()
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='Cash')
    status         = models.CharField(max_length=20, default='Paid')
    created_at     = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.fees_type} - {self.amount}"

    class Meta:
        ordering = ['-created_at']


# ─── Expense ──────────────────────────────────────────────────
class Expense(models.Model):
    name       = models.CharField(max_length=100)
    amount     = models.DecimalField(max_digits=10, decimal_places=2)
    date       = models.DateField()
    category   = models.CharField(max_length=50, blank=True)
    notes      = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.amount}"

    class Meta:
        ordering = ['-date']


# ─── Salary ───────────────────────────────────────────────────
class Salary(models.Model):
    STATUS_CHOICES = [('Paid', 'Paid'), ('Pending', 'Pending')]

    teacher    = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='salaries')
    amount     = models.DecimalField(max_digits=10, decimal_places=2)
    month      = models.CharField(max_length=20)
    year       = models.IntegerField()
    paid_date  = models.DateField(blank=True, null=True)
    status     = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.teacher} - {self.month} {self.year}"

    class Meta:
        ordering = ['-year', '-month']


# ─── Book (Library) ───────────────────────────────────────────
class Book(models.Model):
    STATUS_CHOICES   = [('In Stock', 'In Stock'), ('Out of Stock', 'Out of Stock')]
    LANGUAGE_CHOICES = [('English','English'),('Turkish','Turkish'),('Chinese','Chinese'),('Spanish','Spanish'),('Arabic','Arabic')]
    TYPE_CHOICES     = [('Book','Book'),('DVD','DVD'),('CD','CD'),('Newspaper','Newspaper')]

    book_id    = models.CharField(max_length=20, unique=True)
    name       = models.CharField(max_length=200)
    language   = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, default='English')
    department = models.CharField(max_length=100)
    class_name = models.CharField(max_length=20)
    book_type  = models.CharField(max_length=20, choices=TYPE_CHOICES, default='Book')
    status     = models.CharField(max_length=20, choices=STATUS_CHOICES, default='In Stock')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# ─── Hostel Room ──────────────────────────────────────────────
class HostelRoom(models.Model):
    AVAILABILITY_CHOICES = [('Available', 'Available'), ('Full', 'Full')]
    ROOM_TYPE_CHOICES    = [('Normal','Normal'),('AC','AC'),('Suite','Suite'),('Medium','Medium'),('Big','Big'),('Small','Small')]

    block        = models.CharField(max_length=50)
    room_no      = models.CharField(max_length=20)
    room_type    = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    no_of_beds   = models.IntegerField()
    cost_per_bed = models.CharField(max_length=20)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='Available')
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.block} - Room {self.room_no}"

    class Meta:
        ordering = ['block', 'room_no']


# ─── Transport ────────────────────────────────────────────────
class Transport(models.Model):
    route_name     = models.CharField(max_length=100)
    vehicle_number = models.CharField(max_length=30, unique=True)
    driver_name    = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=20)
    driver_address = models.TextField(blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.route_name} - {self.vehicle_number}"

    class Meta:
        ordering = ['route_name']


# ─── Sport ────────────────────────────────────────────────────
class Sport(models.Model):
    sports_id    = models.CharField(max_length=20, unique=True)
    name         = models.CharField(max_length=100)
    coach_name   = models.CharField(max_length=100)
    started_year = models.CharField(max_length=10)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# ─── Exam ─────────────────────────────────────────────────────
class Exam(models.Model):
    name       = models.CharField(max_length=100)
    class_name = models.CharField(max_length=20)
    subject    = models.CharField(max_length=100)
    fees       = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    start_time = models.TimeField()
    end_time   = models.TimeField()
    event_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.class_name}"

    class Meta:
        ordering = ['-event_date']


# ─── Event ────────────────────────────────────────────────────
class Event(models.Model):
    event_id   = models.CharField(max_length=20, unique=True)
    name       = models.CharField(max_length=200)
    event_date = models.DateField()
    venue      = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-event_date']


# ─── Holiday ──────────────────────────────────────────────────
class Holiday(models.Model):
    TYPE_CHOICES = [('National','National'),('Religious','Religious'),('School','School'),('Other','Other')]

    holiday_id   = models.CharField(max_length=20, unique=True)
    name         = models.CharField(max_length=200)
    holiday_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    start_date   = models.DateField()
    end_date     = models.DateField()
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['start_date']


# ─── Timetable ────────────────────────────────────────────────
class Timetable(models.Model):
    DAY_CHOICES = [
        ('Monday','Monday'),('Tuesday','Tuesday'),('Wednesday','Wednesday'),
        ('Thursday','Thursday'),('Friday','Friday'),('Saturday','Saturday'),
    ]

    teacher    = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='timetables')
    class_name = models.CharField(max_length=20)
    section    = models.CharField(max_length=10, blank=True)
    subject    = models.CharField(max_length=100)
    day        = models.CharField(max_length=15, choices=DAY_CHOICES)
    date       = models.DateField(blank=True, null=True)
    start_time = models.TimeField()
    end_time   = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.teacher} - {self.subject} - {self.day}"

    class Meta:
        ordering = ['day', 'start_time']


# ─── Message ──────────────────────────────────────────────────
class Message(models.Model):
    sender     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient  = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    subject    = models.CharField(max_length=200)
    body       = models.TextField()
    is_read    = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} → {self.recipient}: {self.subject}"

    class Meta:
        ordering = ['-created_at']