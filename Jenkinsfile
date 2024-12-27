pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/HansM7/test-backend-for-jenkis.git']]
                ])
            }
        }
        stage('Build') {
            steps {
              
                sshagent(["ssh-agent"]) {
                    sh """
                        scp -r ./* root@161.132.38.235:/root/
                    """
                }
            }
        }
    }
}
