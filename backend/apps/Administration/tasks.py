from workers import task
from sms import send_sms
from workers.models import Task

@task(schedule=20)
def sms_reminder():
    print('')

@task(schedule=60)
def ojciec():
    print('')