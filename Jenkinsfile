pipeline {
    agent {
        label 'linux-agent'
    }

    options {
        skipDefaultCheckout(true)

        buildDiscarder(
            logRotator(
                numToKeepStr: '10',
                daysToKeepStr: '15'
            )
        )
    }

    // Keep your existing parameters and environment blocks.

    stages {
        // Keep your existing stages:
        // Checkout
        // Error Handling
        // Retry
        // Timeout
        // Build
        // Test
        // Package
        // Conditional Deployment

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'backend/target/*.jar',
                                 fingerprint: true
            }
        }

        stage('Workspace Cleanup') {
            steps {
                echo 'Cleaning Jenkins workspace'
                cleanWs()
            }
        }
    }

    // Keep your existing post block.
}
