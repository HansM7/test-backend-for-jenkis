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
                        # Crear directorio si no existe
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'mkdir -p /ruta/app'
                        
                        # Copiar archivos
                        scp -o StrictHostKeyChecking=no -r ./* root@161.132.38.235:/ruta/app/
                        
                        # Verificar la copia
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'ls -la /ruta/app'
                    """
                }
            }
        }
    }
}
