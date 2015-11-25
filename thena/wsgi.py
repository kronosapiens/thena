import newrelic.agent

from app import create_app

newrelic.agent.initialize('/etc/thena/newrelic.ini')
app = create_app('production')

if __name__ == "__main__":
    app.run()