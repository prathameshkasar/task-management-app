
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
            description: 'Select deployment environment'
        )
    }

    environment {
        APP_NAME = 'task-management-app'
        APP_VERSION = '1.0.0'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
                checkout scm
            }
        }

        stage('Error Handling with Try Catch') {
            steps {
                script {
                    try {
                        echo 'Executing application validation'
                        sh 'echo "Validation successful"'
                    } catch (Exception e) {
                        echo "Error occurred: ${e.getMessage()}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Retry Example') {
            steps {
                retry(3) {
                    echo 'Executing retry example'
                    sh 'echo "Command executed successfully"'
                }
            }
        }

        stage('Timeout Example') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    echo 'Executing command within 2 minutes'
                    sh 'sleep 5'
                    echo 'Command completed within timeout'
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    sh 'mvn clean compile'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Package') {
            steps {
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
                echo 'Deployment stage running for DEV'
            }
        }

        stage('Deploy to Staging') {
            when {
                expression {
                    params.DEPLOY_ENV == 'staging'
                }
            }
            steps {
                echo 'Deployment stage running for STAGING'
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    params.DEPLOY_ENV == 'production'
                }
            }
            steps {
                echo 'Deployment stage running for PRODUCTION'
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
        unstable {
            echo 'Pipeline completed with unstable status'
        }
        failure {
            echo 'Pipeline failed. Check Console Output'
        }
        always {
            echo 'Pipeline execution finished'
        }
    }
}
