from httmock import HTTMock
import json
import unittest

from flask import url_for

from app import create_app, db
from app.models import User, Arc
from . import utils


class FlaskClientTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client(use_cookies=True)

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_register_and_login_with_valid_token(self):
        assert User.query.count() == 0

        # register a new account
        with HTTMock(utils.google_auth):
            response = self.client.post(url_for('chex.login'),
                data=json.dumps({'token': 'cat'}),
                content_type='application/json')

        assert User.query.count() == 1

    def test_register_and_login_without_valid_token(self):
        assert User.query.count() == 0

        # register a new account
        with HTTMock(utils.google_auth):
            response = self.client.post(url_for('chex.login'),
                data=json.dumps({'token': ''}),
                content_type='application/json')

        assert User.query.count() == 0