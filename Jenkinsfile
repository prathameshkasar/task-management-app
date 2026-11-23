
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
                echo "Build Number: ${env.BUILD_NUMBER}"
                echo "Job Name: ${env.JOB_NAME}"
                echo "Agent Name: ${env.NODE_NAME}"

                sh '''
                    echo "Workspace: $WORKSPACE"
                    echo "Deployment Environment: $DEPLOY_ENV"
                '''
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
