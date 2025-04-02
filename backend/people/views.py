import csv
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from .models import Person
from django.db import transaction
from django.contrib import messages

@csrf_exempt
def upload_csv(request):
    if request.method == "POST":
        file = request.FILES.get("file")
        if not file or not file.name.endswith(".csv"):
            return HttpResponse("Invalid file format. Please upload a .csv file.", status=400)

        decoded_file = file.read().decode("utf-8").splitlines()
        reader = csv.DictReader(decoded_file)

        expected_fields = {"first_name", "last_name", "email", "age"}
        if not expected_fields.issubset(reader.fieldnames):
            return HttpResponse("Missing required columns in CSV file.", status=400)

        count = 0
        try:
            with transaction.atomic():
                for row in reader:
                    if not row["email"] or Person.objects.filter(email=row["email"]).exists():
                        continue
                    person = Person(
                        first_name=row["first_name"],
                        last_name=row["last_name"],
                        email=row["email"],
                        age=int(row["age"]),
                    )
                    person.save()
                    count += 1
        except Exception as e:
            return HttpResponse(f"An error occurred while saving data: {str(e)}", status=500)

        return HttpResponse(f"✅ Successfully added {count} row(s) to the database.")
    
    return HttpResponse("Upload endpoint is ready. Please POST a CSV file.")

def people_list_api(request):
    page_number = request.GET.get("page", 1)
    people = Person.objects.all().order_by("id")
    paginator = Paginator(people, 10)
    page = paginator.get_page(page_number)

    people_data = [
        {
            "first_name": person.first_name,
            "last_name": person.last_name,
            "email": person.email,
            "age": person.age
        }
        for person in page.object_list
    ]

    return JsonResponse({
        "results": people_data,
        "total_pages": paginator.num_pages,
        "current_page": page.number,
        "has_next": page.has_next(),
        "has_previous": page.has_previous()
    })

def export_csv(request):
    people = Person.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="people_export.csv"'

    writer = csv.writer(response)
    writer.writerow(['first_name', 'last_name', 'email', 'age'])
    for p in people:
        writer.writerow([p.first_name, p.last_name, p.email, p.age])

    return response
