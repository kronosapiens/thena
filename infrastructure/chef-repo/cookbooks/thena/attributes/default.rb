# general settings
default['thena']['project_root'] = '/srv/www/'
default['thena']['project_dir'] = '/srv/www/thena/'
default['thena']['app_dir'] = '/srv/www/thena/thena/'
default['thena']['config_dir'] = '/etc/thena/'

# nginx settings
default['thena']['server_name'] = 'thena.io'
default['thena']['uwsgi_socket'] = '/tmp/thena.sock'

# uwsgi settings
default['thena']['uwsgi_log_dir'] = '/var/log/uwsgi/'
default['thena']['uwsgi_logfile'] = '/var/log/uwsgi/uwsgi.log'
default['thena']['uwsgi_pidfile'] = '/var/tmp/uwsgi-app.pid'
default['thena']['uwsgi_user'] = 'vagrant'
default['thena']['uwsgi_group'] = 'www-data'

# git settings
default['thena']['git_repo_uri'] = 'git@github.com:kronosapiens/thena.git'
default['thena']['ssh_wrapper'] = 'git-ssh-wrapper.sh'
default['thena']['ssh_key'] = 'thena-repo.pem'