
pipeline {
    agent {
        label 'linux-agent'
    }

    options {
        skipDefaultCheckout(true)
    }

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['dev', 'staging', 'production'],
            description: 'Select the deployment environment'
        )
    }

    environment {
        APP_NAME = 'task-management-app'
        APP_VERSION = '1.0.0'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Show Parameters and Environment') {
            steps {
                echo "Application: ${env.APP_NAME}"
                echo "Version: ${env.APP_VERSION}"
                echo "Selected Environment: ${params.DEPLOY_ENV}"
            }
        }

        stage('Build') {
            steps {
                echo 'Building Spring Boot application'
                dir('backend') {
                    sh 'mvn clean compile'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests'
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Package') {
            steps {
                echo 'Creating application JAR'
                dir('backend') {
                    sh 'mvn package'
                }
            }
        }

        stage('Deploy to Development') {
            when {
                expression {
                    params.DEPLOY_ENV == 'dev'
                }
            }
            steps {
                echo 'Deployment stage is running for DEV environment'
            }
        }

        stage('Deploy to Staging') {
            when {
                expression {
                    params.DEPLOY_ENV == 'staging'
                }
            }
            steps {
                echo 'Deployment stage is running for STAGING environment'
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    params.DEPLOY_ENV == 'production'
                }
            }
            steps {
                echo 'Deployment stage is running for PRODUCTION environment'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'backend/target/*.jar',
                                 fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed. Check Console Output'
        }
        always {
            echo 'Pipeline execution finished'
        }
    }
}
