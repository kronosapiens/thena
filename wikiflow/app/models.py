from . import db

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=db.func.now())
    updated_on = db.Column(db.DateTime, default=db.func.now(),
        onupdate=db.func.now())


class User(BaseModel):
    __tablename__ = 'users'
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User {}>'.format(self.username)


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