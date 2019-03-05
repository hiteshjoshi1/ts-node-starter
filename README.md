## Boiler plate for typescript based NodeJs API

-   Uses tslint and prettier

-   Uses Winston for logging

-   Uses verror and http-error

## Build the Image (DOCKER)

```
docker build -t ts-node .
```

## Run the Image (DOCKER)

```
docker run -d -p 4100:4100 ts-node:latest
```

# Run the Image Kubernetes

    Instructions for Mac - now that I work on Mac , hell with other OS. But seriously , windows should be similar.

### Install Minikube on Mac

    brew cask install minikube

    curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit && sudo install -o root -g wheel -m 4755 docker-machine-driver-hyperkit /usr/local/bin/

    brew install kubernetes-cli

    brew install skaffold

     curl -LO https://storage.googleapis.com/container-structure-test/latest/container-structure-test-darwin-amd64 && chmod +x container-structure-test-darwin-amd64 && sudo mv container-structure-test-darwin-amd64 /usr/local/bin/container-structure-test



     Starting Minikube
        cd ts-node-starter

     minikube start --vm-driver=hyperkit  <== Bring up the minikube if it is NOT running

    minikube status  <== to check the status of the minikube

    ### Create an alias to work around an issue with skaffold for now - 2019-02-27

    Create alias *skaffold_dev* by adding following in ur ~./bash_profile

    ```
    alias skaffold_dev='(eval $(minikube docker-env); skaffold dev --default-repo localhost:5000 )'
    ```

    Run application using Skaffold , use
    skaffold dev
    OR
    skaffold_dev (alias created above)

    Skaffold is an  awesome tool from Google -
    https://github.com/GoogleContainerTools/skaffold
