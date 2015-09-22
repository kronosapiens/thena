#
# Cookbook Name:: thena-infra
# Recipe:: deploy
#
# Copyright (c) 2015 Daniel Kronovet, All Rights Reserved.


# include_recipe 'deploy'

# node[:deploy].each do |application, deploy|
#   opsworks_deploy_dir do
#     user deploy[:user]
#     group deploy[:group]
#     path deploy[:deploy_to]
#   end

#   opsworks_deploy do
#     deploy_data deploy
#     app application
#   end
# end

# execute 'update packages' do
#     cwd node['thena-infra']['app_dir']
#     command 'pip install -r requirements.txt'
# end

## FOR TESTING IN TEST KITCHEN
python_pip 'uwsgi'

directory node['thena-infra']['app_dir'] do
  recursive true
end

file "#{node['thena-infra']['app_dir']}/wsgi.py" do
    content "def app(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b'Hello Thena\\n']"
    owner node['thena-infra']['uwsgi_user']
    group node['thena-infra']['uwsgi_group']
end
## / END TESTING

service 'thena-uwsgi' do
  supports :status => true
  action [:enable, :restart]
end

service 'nginx' do
  action :restart
end