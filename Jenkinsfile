pipeline {
    agent any

    environment {
        APP_NAME = "car-showroom"
        DOCKER_IMAGE = "com.carshowroom/mycar_showroom"
        VERSION = "0.0.1-SNAPSHOT"
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins usually does this automatically for Multibranch pipelines, 
                // but good to have for clarity.
                checkout scm
            }
        }

        stage('Compile & Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh './mvnw clean test'
                    } else {
                        bat 'mvnw.cmd clean test'
                    }
                }
            }
            post {
                always {
                    // Record test results in Jenkins
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    if (isUnix()) {
                        sh './mvnw package -DskipTests'
                    } else {
                        bat 'mvnw.cmd package -DskipTests'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    echo "Building Docker image: ${DOCKER_IMAGE}:${VERSION}"
                    if (isUnix()) {
                        sh "docker build -t ${DOCKER_IMAGE}:${VERSION} ."
                        sh "docker tag ${DOCKER_IMAGE}:${VERSION} ${DOCKER_IMAGE}:latest"
                    } else {
                        bat "docker build -t ${DOCKER_IMAGE}:${VERSION} ."
                        bat "docker tag ${DOCKER_IMAGE}:${VERSION} ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application using Docker Compose...'
                    // Uncomment the following lines if you want to deploy automatically
                    /*
                    if (isUnix()) {
                        sh 'docker-compose up -d'
                    } else {
                        bat 'docker-compose up -d'
                    }
                    */
                }
            }
        }
    }

    post {
        success {
            echo "Build and Deployment of ${APP_NAME} finished successfully!"
        }
        failure {
            echo "Build failed! Please check the console output."
        }
    }
}
