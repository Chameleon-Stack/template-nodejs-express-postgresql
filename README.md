# CHAMELEON STACK - KANBAN

### 📋 PREREQUISITES

- Docker
- NodeJs
- NPM

## 🔧 INSTALLATION PREREQUISITES

### Installing NodeJS

Access the following link and download the LTS version

```
    https://nodejs.org/en
```

After that, just double-click on the file that was downloaded and install Node by clicking next until it is installed. Run the following command to check the version:

```
    node --version
```

Also, check the installed NPM version:

```
    npm --version
```

### Installing Docker

The first step is to set up Docker. For each operating system, you need to follow a step-by-step process:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (WSL installation and configuration are required)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- macOS

```
               https://docs.docker.com/desktop/install/mac-install/
```

### Installing the Container for the Project

To install the container that will run in the project, you need to enter the following command in the terminal:

```
docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

## ⚙️ CONFIGURING THE PROJECT

### Adding Database Connection Values to .env

Create a file named ".env" at the root of the project and add the variables from the ".env.example" file with the connection values you provided when creating the container in the previous step. The .env file, according to the container created, would look like this:

```
POSTGRESQL_PORT=5432
POSTGRESQL_PASSWORD=mypassword
NODE_ENV=dev
```

### Installing Node.js Packages

Run the following command in the project:

```
npm install
```

or

```
yarn
```

### Running Migrations

To add the project's tables to your database, run the following command:

```
npm run typeorm migration:run
```

or

```
yarn typeorm migration:run
```

### Starting the Project

Run the following command in the project:

```
npm run dev
```

or

```
yarn dev
```

The project will run at the following URL:

        http://localhost:3333

### 🚀 TESTS

## Running Tests

To run the project's tests, you need to add a test database to your project with the name "test" and then change the NODE_ENV variable from dev to test. Your .env file should look like this:

```
POSTGRESQL_PORT=5432
POSTGRESQL_PASSWORD=mypassword
NODE_ENV=test
```

Execute the command:

```
npm run test
```

or

```
yarn test
```
