pipeline{
	agent any
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
		stage("Despliegue y envío a nexus"){
			steps{
				sh 'docker build -t backend-base-devops:latest'
				sh 'docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest'
				sh 'docker login -u admin -p admin123 localhost:8082'
				sh 'docker push localhost:8082/backend-base-devops:latest'
			}
		}	
	}	
}