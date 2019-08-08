def runTests(Map versionInfo) {
    withCredentials([
		file(credentialsId: 'JenkinsEKSUserKubeConfig', variable: 'FILE'), 
		file(credentialsId: 'JenkinsAWSProfileCreds', variable: 'FILE2')])
    {
        withEnv(["KUBECONFIG=${FILE}", "AWS_SHARED_CREDENTIALS_FILE=${FILE2}"]) {
            println("this is in Test.Jenkinsfile.groovy")
            def testName = "func"
            def baseUrl = "http://localhost:80"

            sh """
                helm init --client-only
                helm upgrade --install --tiller-namespace tiller --namespace ${versionInfo.buildNamespace}-${testName} ${testName} ./helm/${versionInfo.longName} -i --wait
            """

            container("newman") {
                sh """
                    newman run "tests/newman/App.AlertAggregator.Functional.postman_collection.json" --global-var baseUrl=${baseUrl} --reporters cli,junit,html								
                """
                junit 'newman/*.xml';
                archiveArtifacts 'newman/*.html';
            }
        }
    }
}

return this