#
# Cookbook Name:: thena-infra
# Recipe:: default
#
# Copyright (c) 2015 Daniel Kronovet, All Rights Reserved.

include_recipe 'thena-infra::configure'
include_recipe 'thena-infra::deploy'
