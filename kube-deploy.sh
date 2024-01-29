kubectl apply -f database.yaml
kubectl apply -f api/backend.yaml
kubectl apply -f client/frontend.yaml

kubectl get services | grep continental-frontend-service | awk '{split($5, resArr, ":")
print "Frontend deployed on adress: http://" $4 ":" resArr[1]}'
kubectl get services | grep continental-backend-service | awk '{split($5, resArr, ":")
print "Backend deployed on adress: http://" $4 ":" resArr[1]}'