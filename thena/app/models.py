from flask.ext.login import UserMixin

from . import db, login_manager

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(),
        onupdate=db.func.now())


class User(UserMixin, BaseModel):
    __tablename__ = 'users'
    email = db.Column(db.String(120), unique=True)
    auth_token = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    arcs = db.relationship('Arc', backref='user', lazy='dynamic')

    def __init__(self, email, auth_token):
        self.email = email
        self.auth_token = auth_token

    def __repr__(self):
        return '<User [{}] {}>'.format(self.id, self.email)

    @classmethod
    def get_or_create(cls, email, auth_token=''):
        user = cls.query.filter_by(email=email).first()
        if user is None:
            user = cls(email=email, auth_token=auth_token)
            db.session.add(user)
            db.session.commit()
        elif auth_token and user.auth_token != auth_token:
            user.auth_token = auth_token
            db.session.add(user)
            db.session.commit()
        return user

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Arc(BaseModel):
    __tablename__ = 'arcs'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tail = db.Column(db.String(255))
    head = db.Column(db.String(255))
    tail_url = db.Column(db.String(255))
    head_url = db.Column(db.String(255))

    def __init__(self, user_id, tail_url, head_url):
        self.user_id = user_id
        self.tail_url = tail_url
        self.head_url = head_url
        self.tail = tail_url.split('wiki/')[-1]
        self.head = head_url.split('wiki/')[-1]

    def __repr__(self):
        return '<Arc [{}] {} -> {}>'.format(self.user_id, self.tail, self.head)