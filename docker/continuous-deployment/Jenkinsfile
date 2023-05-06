pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Cloning Git') {
      steps {
        git url: 'https://github.com/debisic/lab-deploy.git',
            credentialsId: 'git-jenkins'
      }
    }
    stage('Start Redis') {
      steps {
        sh 'docker run -d --name my-redis -p 6379:6379 redis'
     }
        }   

    stage('Install dependencies') {
      steps {
        sh 'cd userapi'
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
         sh 'cd userapi'
         sh 'cd test'
         sh 'npm test'
      }
    }

    // stage('Build') {
    //   steps {
    //      sh 'cd src'
    //      sh 'npm run build'
    //   }
    // }
    stage('Deploy to Tomcat') {
      steps {
         deploy adapters: [tomcat9(credentialsId: 'TOMCAT', path: '', url: 'http://15.188.185.64:8080/')], contextPath: '/app', war: '**/*.war'
      }
    }

  }
}
