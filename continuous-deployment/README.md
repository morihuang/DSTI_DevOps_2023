# Continuous Testing continuous integration and continuous delivery/deployment using Jenkins

In this task we will use [github actions](https://github.com/actions) and Jenkins.

## Installations
launch an ec2 instance on [AWS console](https://aws.amazon.com/console/) and open ports 8080, 22 and 80 in your security group

ssh into the machine.

On the ec2 instance [install Jenkins Engine]()

```
#! /bin/bash

sudo apt update -y
sudo apt-get install fontconfig openjdk-11-jre 
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update -y
sudo apt install jenkins -y
sudo systemctl start jenkins

```
Open the GUI of the jenkins engine with the password copied from 
```
/var/lib/jenkins/secrets/initialAdminPassword
```

## Jenkins configuration
from the jenkins GUI install plugins neccessary such as Nodejs, docker plugin, git and others

install redis-server from your ssh connection
```
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```
Install [docker engine](https://docs.docker.com/engine/install/ubuntu/)

create credentials for github and dockerhub and an NGINX server to manage sorce codes, building images and deployment to servers respectively

## Create a pipeline project 

On jenkins once all installations have been made, create the pipeline project and create your Jenkinsfile which is pushed into the SCM,

Remember that you need to integrate your version control system with jenkins


Run your pipeline by triggering a commit into the repository and make necessary dugging
