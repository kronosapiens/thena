# package 'build-essential'

# package 'python-pip'
# package 'python-dev'
# package 'python-numpy'

# package 'libncurses5-dev'
# package 'libpq-dev'
# package 'postgresql-client'


# package 'nginx'
# package 'supervisor'

# template "/etc/nginx/sites-available/thena" do
#    source 'thena-nginx.erb'
# end

# execute "link nginx config" do
#     command 'sudo ln -s /etc/nginx/sites-available/thena /etc/nginx/sites-enabled'
# end

# service 'nginx' do
#   supports :status => true
#   action [:enable, :start]
# end

# template "/etc/supervisor/conf.d/uwsgi_script.conf" do
#    source 'uwsgi_supervisor.conf.erb'
# end