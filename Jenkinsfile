pipeline{
	agent any
	options{
		disableConcurrentBuilds()
	}
	stages{
		stage("Construye, prueba y despliega"){
			agent{
				docker {
					image "node:20.11-alpine3.19"
					reuseNode true
				}
			}
			stages{ ->
				stage("Instala dependencias"){ 
					steps{
						sh 'npm install'
					}
				}
				stage("Ejecuta pruebas"){ 
					steps{
						sh 'npm run test'
					}
				}
				stage("Construye"){ 
					steps{
						sh 'npm run build'
					}
				}
			}
		}
		stage('Calidad del codigo'){
			stages{
				stage('análisis Sonar'){
					agent {
						docker{
							image 'sonarsource/sonar-scanner-cli'
							args '--network="devops-infra_default"'
							reuseNode true
						}
					}
					steps{
						withSonarQubeEnv('sonar'){
							sh 'sonar-scanner'
						}
					}
				}
				stage('Puerta de calidad'){
					steps{
						timeout(time:1, unit: 'MINUTES'){
							waitForQualityGate abortPipeline: true
						}
					}
				}
			}
		}
		stage("Entrega"){
			steps{
				script{
					docker.withRegistry('http://localhost:8082', 'nexus-key'){
						sh 'docker build -t backend-base-devops:latest .'
						sh 'docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest' 
						sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
						sh 'docker push localhost:8082/backend-base-devops:latest'
						sh "docker push localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
					}
				}
			}
		}
		stage("Despliegue"){
			steps{
				script{
					if (env.BRANCH_NAME == 'main'){
						ambiente = 'prod'
					}else{
						ambiente = 'dev'
					}

					docker.withRegistry('http://localhost:8082', 'nexus-key'){
							withCredentials([file(credentialsId: "${ambiente}-env", variable: 'ENV_FILE')]){
								sh 'docker compose pull'
								sh "export ENV_FILE=${ENV_FILE}"
								sh 'docker compose up --force-recreate --build -d'
							}
					}
				}
			}
		}	
	}	
}