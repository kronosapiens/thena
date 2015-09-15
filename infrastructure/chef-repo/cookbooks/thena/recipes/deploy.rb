#
# Cookbook Name:: thena
# Recipe:: deploy
#
# Copyright (c) 2015 Daniel Kronovet, All Rights Reserved.


# git 'clone-repo' do
#   destination node['thena']['project_dir']
#   ssh_wrapper "#{node['thena']['config_dir']}#{node['thena']['ssh_wrapper']}"
#   repository node['thena']['git_repo_uri']
#   # repository node[:deploy]['thena'][:scm][:repository]
#   revision 'master'
#   action :sync
# end

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

## FOR TESTING IN TEST KITCHEN
python_pip 'uwsgi'

directory node['thena']['app_dir'] do
  recursive true
end

file "#{node['thena']['app_dir']}/wsgi.py" do
    content "def app(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b'Hello World']"
end
## / END TESTING

service 'thena-uwsgi' do
  supports :status => true
  action [:enable, :start]
end

service 'nginx' do
  action :restart
end