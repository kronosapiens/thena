import requests

from flask import render_template, redirect, url_for, abort, flash, request,\
    current_app, make_response
from flask.ext.login import login_required, current_user, login_user, logout_user
from flask.ext.sqlalchemy import get_debug_queries

from . import chex
from .. import db
from ..models import User, Arc

GOOGLE_AUTH_URL = "https://www.googleapis.com/userinfo/email?alt=json&access_token="
url = 'http://127.0.0.1:5000'


@chex.route('/arc', methods=['GET', 'POST'])
def log_arc():
    if request.data:
        data = request.get_json(force=True) # TODO: Update extension to set correct Mimetype
        email = get_email_from_auth(data['token'])
        if email:
            user = User.get_or_create(email, auth_token=data['token'])
            arc = Arc(user.id, data['tail_url'], data['head_url'])
            db.session.add(arc)
            db.session.commit()
            return 'Arc saved!'
        else:
            return 'Authentication token invalid!'
    return 'POST your arcs here!'

@chex.route('/login', methods=['GET', 'POST'])
def login():
    if request.data:
        data = request.get_json(force=True) # TODO: Update extension to set correct Mimetype
        email = get_email_from_auth(data['token'])
        if email:
            user = User.get_or_create(email)
            login_user(user, remember=True)
            return 'Logged in', str(user)
        else:
            return 'User not found!'
    return render_template('login.html')

@chex.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return render_template('logout.html')

def get_email_from_auth(token):
    resp = requests.get(GOOGLE_AUTH_URL + token)
    return resp.json().get('data', {}).get('email')

# Browser Headers
# EnvironHeaders([
#     ('Content-Length', u''),
#     ('User-Agent', u'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'),
#     ('Connection', u'keep-alive'),
#     ('Host', u'127.0.0.1:5000'),
#     ('Cache-Control', u'max-age=0'),
#     ('Accept', u'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
#     ('Accept-Language', u'en-US,en;q=0.8'),
#     ('Content-Type', u''),
#     ('Accept-Encoding', u'gzip, deflate, sdch')])

# Extension Headers
# EnvironHeaders([
#     ('Origin', u'chrome-extension://oojfkcgechlbjcbbjplhcomclmobkiam'),
#     ('Content-Length', u'142'),
#     ('User-Agent', u'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'),
#     ('Connection', u'keep-alive'),
#     ('Csp', u'active'),
#     ('Host', u'127.0.0.1:5000'),
#     ('Accept', u'*/*'),
#     ('Accept-Language', u'en-US,en;q=0.8'),
#     ('Content-Type', u'text/plain;charset=UTF-8'),
#     ('Accept-Encoding', u'gzip, deflate')])