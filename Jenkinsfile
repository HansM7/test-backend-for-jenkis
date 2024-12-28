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
                        # Verificar que /home existe y tenemos permisos
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'ls -ld /home'
                        
                        # Crear directorio si no existe
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'mkdir -p /home/app-backend'
                        
                        # Asignar permisos correctos
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'chmod 755 /home/app-backend'
                        
                        # Copiar archivos
                        scp -o StrictHostKeyChecking=no -r ./* root@161.132.38.235:/home/app-backend/
                        
                        # Verificar la copia
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'ls -la /home/app-backend'
                    """
                }
            }
        }
    }
}
