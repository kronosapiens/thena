#
# Cookbook Name:: thena-infra
# Recipe:: configure
#
# Copyright (c) 2015 Daniel Kronovet, All Rights Reserved.

# Resources
# https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04
# https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-an-ubuntu-14-04-vps
# https://www.digitalocean.com/community/tutorials/the-upstart-event-system-what-it-is-and-how-to-use-it

include_recipe 'apt::default'
package 'build-essential'
package 'git'

package 'python-pip'
package 'python-dev'
package 'python-numpy'

package 'libncurses5-dev'
package 'libpq-dev'

package 'nginx'
package 'supervisor'
package 'postgresql-client'



# create app directories
directory node['thena-infra']['project_dir'] do
  recursive true
end

directory node['thena-infra']['config_dir'] do
  recursive true
end

directory node['thena-infra']['uwsgi_log_dir'] do
  recursive true
end


# copy config files
template "/etc/nginx/sites-available/thena" do
   source 'thena-nginx.erb'
end

link '/etc/nginx/sites-enabled/thena' do
  to '/etc/nginx/sites-available/thena'
end

template "/etc/init/thena-uwsgi.conf" do
   source 'thena-uwsgi.conf.erb'
end

template "#{node['thena-infra']['config_dir']}thena-uwsgi.ini" do
   source 'thena-uwsgi.ini.erb'
end


# set ownership and permissions
file node['thena-infra']['nginx_logfile'] do
    mode '0644'
    owner node['thena-infra']['nginx_user']
    group node['thena-infra']['nginx_group']
end

file node['thena-infra']['nginx_errorfile'] do
    mode '0644'
    owner node['thena-infra']['nginx_user']
    group node['thena-infra']['nginx_group']
end

file node['thena-infra']['uwsgi_logfile'] do
    mode '0644'
    owner node['thena-infra']['uwsgi_user']
    group node['thena-infra']['uwsgi_group']
end

file node['thena-infra']['uwsgi_pidfile'] do
    mode '0644'
    owner node['thena-infra']['uwsgi_user']
    group node['thena-infra']['uwsgi_group']
end


# start nginx
# note: start as sudo, will spawn child processes w/ www-data owner
service 'nginx' do
  supports :status => true
  action [:enable, :start]
end

