execute "copy nginx config" do
   command 'sudo cp thena_nginx /etc/nginx/sites-available/thena'
end

execute "ln nginx config" do
    command 'sudo ln -s /etc/nginx/sites-available/thena /etc/nginx/sites-enabled'
end

execute "start nginx" do
    command 'sudo service nginx restart'
end