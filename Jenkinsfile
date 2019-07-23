node {
   echo "SELECTED_ENVIRONMENT ${SELECTED_ENVIRONMENT}"
   echo "SELECT_BRANCH ${SELECT_BRANCH}"
   stage('CodeCheckout'){

         echo 'checkout'

         checkout([$class: 'GitSCM', branches: [[name: ‘*/$SELECT_BRANCH
']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '80e1efa8-beb0-4cda-a199-d0bedde6feab', url: 'https://github.com/kanakaraju043/BangleStore-Kanak.git
']]])
     }
}
