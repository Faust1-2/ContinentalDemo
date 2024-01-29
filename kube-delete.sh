kubectl delete service continental-frontend-service
kubectl delete service continental-backend-service
kubectl delete service continental-database-service

kubectl delete deployment continental-frontend
kubectl delete deployment continental-backend
kubectl delete deployment continental-database

echo "Continental successfully deleted !"