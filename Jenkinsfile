pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']], // Cambia 'main' por 'master' si corresponde
                    userRemoteConfigs: [[url: 'https://github.com/HansM7/test-backend-for-jenkis.git']]
                ])
            }
        }
    }
}
