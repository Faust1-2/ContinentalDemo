
# ContiWebsite (API & FrontEnd)

Répo commun pour l'api et le front-end du site.


## Authors

- [@BenjaminLesieux](https://www.github.com/BenjaminLesieux)



Create a postgress image:

docker run -dit --name conti-postgres -p 5432:5432 -e POSTGRES_USER=<user> -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=continental postgres

## Secrets

You have many secrets to create in order for the api to work.
Here's the list:
- name: **jwt-secret** | key: **secret** 
- name: **postgres-user** | key: **postgres-username**
- name: **postgres-pwd** | key: **postgres-password**
- name: **postgres-db** | key: **postgres-database**
- name: **pgadmin-email** | key: **pgadmin-default-email**
- name: **pgadmin-pwd** | key: **pgadmin-password**
- name: **gmail-user** | key: **gmail-username** // should be an email
- name: **gmail-pwd** | key: **gmail-password**
- name: **gmail-client-id** | key: **gmail-id**
- name: **gmail-client-secret** | key: **gmail-secret**
- name: **gmail-client-auth-code** | key: **gmail-auth-code**
- name: **gmail-client-refresh-token** | key: **gmail-refresh-token**
- name: **gmail-client-access-token** | key: **gmail-access-token**

in order to create a secret, use the command: 

> kubectl create secret generic <secret_name> --from-literal=<secret_key>='<secret_value>'