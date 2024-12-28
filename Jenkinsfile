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
        stage('Install Dependencies') {
            steps {
                sshagent(["ssh-agent"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 'cd /home/app-backend && npm install'
                    """
                }
            }
        }
        stage('Deploy') {
            steps {
                sshagent(["ssh-agent"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no root@161.132.38.235 '
                            # Instalar PM2 globalmente si no está instalado
                            if ! command -v pm2 &> /dev/null; then
                                npm install -g pm2
                            fi
                            
                            cd /home/app-backend
                            
                            # Detener la aplicación existente si está corriendo
                            pm2 delete app-backend || true
                            
                            # Iniciar la aplicación con PM2
                            pm2 start index.js --name app-backend
                            
                            # Guardar la configuración de PM2
                            pm2 save
                            
                            # Mostrar el estado de la aplicación
                            pm2 status
                        '
                    """
                }
            }
        }
    }
}
