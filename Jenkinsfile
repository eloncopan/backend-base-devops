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
			}
		}	
	}	
}