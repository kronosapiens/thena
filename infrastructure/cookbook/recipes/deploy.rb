execute "pull repo" do
    command 'sudo service nginx restart'
end

execute "restart uwsgi" do
    'uwsgi --ini /srv/www/thena/thena/thena.ini'
end

execute "start nginx" do
    command 'sudo service nginx restart'
end