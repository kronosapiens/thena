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

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<User [{}] {}>'.format(self.id, self.email)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Arc(BaseModel):
    __tablename__ = 'arcs'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tail = db.Column(db.String(255))
    head = db.Column(db.String(255))

    def __init__(self, user_id, tail, head):
        self.user_id = user_id
        self.tail = tail
        self.head = head

    def __repr__(self):
        return '<Arc {}>'.format(self.username)