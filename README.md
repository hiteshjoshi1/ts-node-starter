[![Build Status](https://travis-ci.org/hiteshjoshi1/ts-node-starter.svg?branch=master)](https://travis-ci.org/hiteshjoshi1/ts-node-starter)

# Boiler plate for typescript based NodeJs API

-   Uses tslint and prettier

-   Uses Winston for logging

-   Uses verror and http-error

Note -Uses tsoa for Anotating REST controllers and generating swagger.
That introduces some complications, the Routes are generated and then added to the applications.

### What that means everytime you add a new Route in the controllers you would have to rebuild amd hot reloading for such changes.

npm run build

## Hot Reloading

npm run watch

## Hot Reloading with debug

npm run watch-debug

#Typescript
#Nodejs
#API
#JEST
#ESLINT
#Prettier

#DOCKER
#Kubernetes
#Skaffold
#Hot Reload with K8

## Build Locally with hjot reload

npm run dev

### To generate the Swaager and the Routes

npm run route-gen

## Build the Image (DOCKER)

```
docker build -t ts-node .
```

## Run the Image (DOCKER)

```
docker run -d -p 4100:4100 ts-node:latest
```

## The image is now pushed to DockerHub and can be run as

```
docker run -d -p 4100:4100 hiteshjoshi1/ts-node:latest
```

# Build and run continously with Kubernetes, minikube, and skaffold

## Run the Image Kubernetes

If you have Kubernetes and minikube installed, just install Skaffold and do

```
skaffold dev
```


### Install Minikube on Mac

```
brew cask install minikube
```

```
curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit && sudo install -o root -g wheel -m 4755 docker-machine-driver-hyperkit /usr/local/bin/

```

### Install Kubernetes cli

```
brew install kubernetes-cli
```

### Install Skaffold

```
brew install skaffold
```

```
curl -LO https://storage.googleapis.com/container-structure-test/latest/container-structure-test-darwin-amd64 && chmod +x container-structure-test-darwin-amd64 && sudo mv container-structure-test-darwin-amd64 /usr/local/bin/container-structure-test
```

cd ts-node-starter

### Starting Minikube - <== Bring up the minikube if it is NOT running

```
minikube start 
```

Check Minikube status

```
minikube status  <== to check the status of the minikube
```


Skaffold is an awesome tool from Google -
https://github.com/GoogleContainerTools/skaffold

The minikube cluster will run three pods and a loadbalancer service.

Get the LoadBalancer url as
```
minikube service ts-node-service --url
```