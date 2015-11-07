from app import create_app

app = create_app('production')

if __name__ == "__main__":
    app.run()

# def app(env, start_response):
#     start_response('200 OK', [('Content-Type','text/html')])
#     return [b'Hello Thena']