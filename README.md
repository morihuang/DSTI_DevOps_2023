# DevOps Project - User API web application

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Author

Clement Adebisi: [clement.adebisi@edu.dsti.institute](mailto:clement.adebisi@edu.dsti.institute)

Mori Huang: mori.huang@dsti.edu.institute

## Functionality

1. Start a web server
2. Create, read, update, delete(CRUD) a user implementing in Redis database.

## 1. Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

4. install [minikube](https://minikube.sigs.k8s.io/docs/start/) and start minikube in the terminal:

   ```
   minikube start --driver=docker

5. install [istio](https://github.com/istio/istio/releases/tag/1.17.2)

Go to the root directory of the application (where `package.json` file located) and run:

```
npm install 
```

## 2. Usage

1. Start a web server

From the root directory of the project run:

```
npm start
```

It will start a web server available in your browser at http://localhost:3000.

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

Another way to test your REST API is to use [Postman](https://www.postman.com/).

## Testing

From the root directory of the project, run:

```
npm test
```

## kubernetes

activate kubernetes by running in the root folder:

```
kubectl apply -f deployment.yaml
```

## istio

