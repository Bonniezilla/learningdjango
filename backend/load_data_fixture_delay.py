import json
import time
import os 
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product

fixture_path = os.path.join(os.path.dirname(__file__), 'api/fixtures/products.json')

with open(fixture_path, 'r') as file:
    data = json.load(file)

for item in data:
    model = item['model']
    fields = item['fields']

    Product.objects.create(**fields)

    print(f"Loaded product: %s" % fields['name'])

    time.sleep(0.05)  # Delay of 50 ms between loading each product