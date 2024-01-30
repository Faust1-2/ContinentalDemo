
# ContiWebsite (API & FrontEnd)

This is a copy from the original (and private) repository ContinentalWebsite.


## Authors

- [@BenjaminLesieux](https://www.github.com/BenjaminLesieux)
- [@Faust1-2](https://www.github.com/Faust1-2)

## How to use

Make sure you have Docker and Kubernetes available on your machine.

Please free the ports **4200** and **3000** before trying to run anything.

### Docker build && Kubernetes deployments
```bash
$ ./kube-complete-deploy.sh
```

### Kubernetes deployments
```bash
$ ./kube-deploy.sh
```

### Remove deployments
```bash
$ ./kube-delete.sh
```

### Clear the database volume
```bash
$ ./clear-db.sh
```

If you have any problem with this scripts, try to elevate yourself, or give them the permission to be executed:

```
$ sudo chmod +x <script-name>
```