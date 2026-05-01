from datetime import date

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def populate_student_fields(apps, schema_editor):
    Student = apps.get_model("api", "Student")
    for student in Student.objects.all():
        old_name = getattr(student, "name", "") or "Student"
        parts = old_name.split(" ", 1)
        student.student_id = f"STU-{student.pk:03d}"
        student.first_name = parts[0]
        student.last_name = parts[1] if len(parts) > 1 else ""
        student.gender = "Other"
        student.date_of_birth = date(2000, 1, 1)
        student.class_name = getattr(student, "grade", "") or "Unknown"
        student.joining_date = date.today()
        student.save()


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="student_id",
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="student",
            name="first_name",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="last_name",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="gender",
            field=models.CharField(
                choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")],
                max_length=10,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="student",
            name="date_of_birth",
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="class_name",
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="section",
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name="student",
            name="religion",
            field=models.CharField(
                blank=True,
                choices=[("Christian", "Christian"), ("Muslim", "Muslim"), ("Hindu", "Hindu"), ("Other", "Other")],
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="student",
            name="joining_date",
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="mobile_number",
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name="student",
            name="admission_number",
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name="student",
            name="father_name",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="student",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="students/"),
        ),
        migrations.AddField(
            model_name="student",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.RunPython(populate_student_fields, migrations.RunPython.noop),
        migrations.RemoveField(model_name="student", name="name"),
        migrations.RemoveField(model_name="student", name="age"),
        migrations.RemoveField(model_name="student", name="grade"),
        migrations.AlterField(
            model_name="student",
            name="student_id",
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name="student",
            name="first_name",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="student",
            name="last_name",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="student",
            name="gender",
            field=models.CharField(
                choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")],
                max_length=10,
            ),
        ),
        migrations.AlterField(
            model_name="student",
            name="date_of_birth",
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name="student",
            name="class_name",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="student",
            name="joining_date",
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name="student",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterModelOptions(
            name="student",
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Teacher",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("teacher_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=100)),
                ("gender", models.CharField(choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")], max_length=10)),
                ("date_of_birth", models.DateField()),
                ("mobile", models.CharField(max_length=20)),
                ("joining_date", models.DateField()),
                ("qualification", models.CharField(blank=True, max_length=100)),
                ("experience", models.CharField(blank=True, max_length=50)),
                ("username", models.CharField(max_length=50, unique=True)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("address", models.TextField(blank=True)),
                ("image", models.ImageField(blank=True, null=True, upload_to="teachers/")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Department",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("department_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=100)),
                ("head", models.CharField(max_length=100)),
                ("start_date", models.CharField(max_length=20)),
                ("no_of_students", models.IntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="Subject",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("subject_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=100)),
                ("class_name", models.CharField(max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="Book",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("book_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=200)),
                ("language", models.CharField(choices=[("English", "English"), ("Turkish", "Turkish"), ("Chinese", "Chinese"), ("Spanish", "Spanish"), ("Arabic", "Arabic")], default="English", max_length=20)),
                ("department", models.CharField(max_length=100)),
                ("class_name", models.CharField(max_length=20)),
                ("book_type", models.CharField(choices=[("Book", "Book"), ("DVD", "DVD"), ("CD", "CD"), ("Newspaper", "Newspaper")], default="Book", max_length=20)),
                ("status", models.CharField(choices=[("In Stock", "In Stock"), ("Out of Stock", "Out of Stock")], default="In Stock", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="HostelRoom",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("block", models.CharField(max_length=50)),
                ("room_no", models.CharField(max_length=20)),
                ("room_type", models.CharField(choices=[("Normal", "Normal"), ("AC", "AC"), ("Suite", "Suite"), ("Medium", "Medium"), ("Big", "Big"), ("Small", "Small")], max_length=20)),
                ("no_of_beds", models.IntegerField()),
                ("cost_per_bed", models.CharField(max_length=20)),
                ("availability", models.CharField(choices=[("Available", "Available"), ("Full", "Full")], default="Available", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["block", "room_no"]},
        ),
        migrations.CreateModel(
            name="Transport",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("route_name", models.CharField(max_length=100)),
                ("vehicle_number", models.CharField(max_length=30, unique=True)),
                ("driver_name", models.CharField(max_length=100)),
                ("license_number", models.CharField(max_length=50)),
                ("contact_number", models.CharField(max_length=20)),
                ("driver_address", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["route_name"]},
        ),
        migrations.CreateModel(
            name="Sport",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("sports_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=100)),
                ("coach_name", models.CharField(max_length=100)),
                ("started_year", models.CharField(max_length=10)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="Exam",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("class_name", models.CharField(max_length=20)),
                ("subject", models.CharField(max_length=100)),
                ("fees", models.DecimalField(decimal_places=2, default=0, max_digits=8)),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                ("event_date", models.DateField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-event_date"]},
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("event_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=200)),
                ("event_date", models.DateField()),
                ("venue", models.CharField(blank=True, max_length=200)),
                ("description", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-event_date"]},
        ),
        migrations.CreateModel(
            name="Holiday",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("holiday_id", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=200)),
                ("holiday_type", models.CharField(choices=[("National", "National"), ("Religious", "Religious"), ("School", "School"), ("Other", "Other")], max_length=20)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["start_date"]},
        ),
        migrations.CreateModel(
            name="Fee",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("due_date", models.DateField()),
                ("paid_date", models.DateField(blank=True, null=True)),
                ("status", models.CharField(choices=[("Paid", "Paid"), ("Unpaid", "Unpaid"), ("Partial", "Partial")], default="Unpaid", max_length=10)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("student", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="fees", to="api.student")),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="FeesCollection",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("fees_type", models.CharField(max_length=50)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("payment_date", models.DateField()),
                ("payment_method", models.CharField(choices=[("Cash", "Cash"), ("Card", "Card"), ("Online", "Online")], default="Cash", max_length=20)),
                ("status", models.CharField(default="Paid", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("student", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="fees_collections", to="api.student")),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Expense",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("date", models.DateField()),
                ("category", models.CharField(blank=True, max_length=50)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-date"]},
        ),
        migrations.CreateModel(
            name="Salary",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("month", models.CharField(max_length=20)),
                ("year", models.IntegerField()),
                ("paid_date", models.DateField(blank=True, null=True)),
                ("status", models.CharField(choices=[("Paid", "Paid"), ("Pending", "Pending")], default="Pending", max_length=10)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("teacher", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="salaries", to="api.teacher")),
            ],
            options={"ordering": ["-year", "-month"]},
        ),
        migrations.CreateModel(
            name="Timetable",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("class_name", models.CharField(max_length=20)),
                ("section", models.CharField(blank=True, max_length=10)),
                ("subject", models.CharField(max_length=100)),
                ("day", models.CharField(choices=[("Monday", "Monday"), ("Tuesday", "Tuesday"), ("Wednesday", "Wednesday"), ("Thursday", "Thursday"), ("Friday", "Friday"), ("Saturday", "Saturday")], max_length=15)),
                ("date", models.DateField(blank=True, null=True)),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("teacher", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="timetables", to="api.teacher")),
            ],
            options={"ordering": ["day", "start_time"]},
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("subject", models.CharField(max_length=200)),
                ("body", models.TextField()),
                ("is_read", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("recipient", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="received_messages", to=settings.AUTH_USER_MODEL)),
                ("sender", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="sent_messages", to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
