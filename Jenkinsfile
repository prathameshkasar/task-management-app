
pipeline {
    agent {
        label 'linux-agent'
    }

    options {
        skipDefaultCheckout(true)

        buildDiscarder(
            logRotator(
                numToKeepStr: '5',
                daysToKeepStr: '5'
            )
        )
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
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Show Environment') {
            steps {
                echo "Application: ${env.APP_NAME}"
                echo "Version: ${env.APP_VERSION}"
                echo "Environment: ${params.DEPLOY_ENV}"
                echo "Build Number: ${env.BUILD_NUMBER}"
                echo "Agent Name: ${env.NODE_NAME}"
            }
        }

        stage('Error Handling') {
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

        stage('Verify Jenkins Credentials') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        if [ -n "$DOCKERHUB_USERNAME" ] && [ -n "$DOCKERHUB_TOKEN" ]; then
                            echo "Docker Hub credentials are available"
			    echo "$DOCKERHUB_USERNAME"
                        else
                            echo "Docker Hub credentials are missing"
                            exit 1
                        fi
                    '''
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
                archiveArtifacts(
                    artifacts: 'backend/target/*.jar',
                    fingerprint: true
                )
            }
        }

        stage('Workspace Cleanup') {
            steps {
                echo 'Cleaning Jenkins workspace'
                cleanWs()
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
