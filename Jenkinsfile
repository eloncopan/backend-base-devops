pipeline{
	agent any
	stages{
		stage("Instala node"){
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
			}
		}	
	}	
}