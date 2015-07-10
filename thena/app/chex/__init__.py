from flask import Blueprint

chex = Blueprint('chex', __name__)

from . import views#, errors
# from ..models import Permission


# @chex.app_context_processor
# def inject_permissions():
#     return dict(Permission=Permission)