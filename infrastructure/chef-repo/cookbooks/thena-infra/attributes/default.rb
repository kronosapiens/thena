# general settings
default['thena-infra']['project_root'] = '/srv/www/'
default['thena-infra']['project_dir'] = '/srv/www/thena/'
default['thena-infra']['app_dir'] = '/srv/www/thena/thena/'
default['thena-infra']['config_dir'] = '/etc/thena/'

# nginx settings
default['thena-infra']['server_port'] = '80'
# default['thena-infra']['server_name'] = 'thena.io'
default['thena-infra']['server_name'] = '0.0.0.0' # Local chef development
default['thena-infra']['nginx_logfile'] = '/var/log/nginx/access.log' # default
default['thena-infra']['nginx_errorfile'] = '/var/log/nginx/error.log' # default
default['thena-infra']['nginx_user'] = 'www-data' # default
default['thena-infra']['nginx_group'] = 'www-data'
default['thena-infra']['uwsgi_socket'] = '/tmp/thena.sock'



# uwsgi settings
default['thena-infra']['uwsgi_module'] = 'wsgi:app'
# default['thena-infra']['uwsgi_user'] = 'ubuntu'
default['thena-infra']['uwsgi_user'] = 'vagrant' # Local chef development
default['thena-infra']['uwsgi_group'] = 'www-data'
default['thena-infra']['uwsgi_log_dir'] = '/var/log/uwsgi/'
default['thena-infra']['uwsgi_logfile'] = '/var/log/uwsgi/uwsgi.log'
default['thena-infra']['uwsgi_pidfile'] = '/var/tmp/uwsgi-app.pid'

# # git settings
# default['thena-infra']['git_repo_uri'] = 'git@github.com:kronosapiens/thena.git'
# default['thena-infra']['ssh_wrapper'] = 'git-ssh-wrapper.sh'
# default['thena-infra']['ssh_key'] = 'thena-repo.pem'