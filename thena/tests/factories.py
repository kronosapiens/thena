import factory
from faker import Faker

from app import models

faker = Faker()

#TODO: Get the factories working
class UserFactory(factory.Factory):
    class Meta:
        model = models.User

    email = faker.email()
    first_name = faker.first_name()
    last_name = faker.last_name()
