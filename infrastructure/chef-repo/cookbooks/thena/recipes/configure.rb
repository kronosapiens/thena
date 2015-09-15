#
# Cookbook Name:: thena
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
directory node['thena']['project_dir'] do
  recursive true
end

directory node['thena']['config_dir'] do
  recursive true
end

directory node['thena']['uwsgi_log_dir'] do
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

template "#{node['thena']['config_dir']}thena-uwsgi.ini" do
   source 'thena-uwsgi.ini.erb'
end

file node['thena']['uwsgi_logfile'] do

    mode '0644'
end

file node['thena']['uwsgi_pidfile'] do
    mode '0644'
end

# can remove once we move to opsworks
# cookbook_file "copy deploy key" do
#     source node['thena']['ssh_key']
#     path "#{node['thena']['config_dir']}#{node['thena']['ssh_key']}"
#     mode '0644'
# end

# file node['thena']['ssh_wrapper'] do
#   path node['thena']['config_dir'] + name
#   # mode "0755"
#   mode "0777"
#   content "#!/bin/sh\nexec /usr/bin/ssh -i #{node['thena']['config_dir']}#{node['thena']['ssh_key']} \'$@\'"
#   # content "#!/bin/sh\nexec /usr/bin/ssh -i #{node['thena']['config_dir']}#{node[:deploy]['appshortname'][:scm][:ssh_key]} \'$@\'"
# end


# start nginx
service 'nginx' do
  supports :status => true
  action [:enable, :start]
end

