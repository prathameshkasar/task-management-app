pipeline {

    agent {
        label 'linux-agent'
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
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
