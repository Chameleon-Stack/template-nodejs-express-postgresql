# CHAMELEON STACK - KANBAN

## Docker Configuration

The first step is to configure Docker. For each operating system, you need to follow a step-by-step guide:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (WSL installation and configuration required)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- macOS

```
               https://docs.docker.com/desktop/install/mac-install/
```

## Installing the Container for Project Execution

To install the container that will run your project, you need to execute the following command in the terminal:

```
docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

## Adding Database Connection Values to .env

Create a file named ".env" in the root of your project and add the variables from the ".env.example" file with the connection values you provided when creating the container in the previous step. The .env file, according to the created container, would look like this:

```
POSTGRESQL_PORT=5432
POSTGRESQL_PASSWORD=mypassword
NODE_ENV=test
```

## Installing NodeJs Packages

Run the following command in your project:

```
npm install
```

or

```
yarn
```

## Running Migrations

To add the project's tables to your database, run the following command:

```
npm run typeorm migration:run -- -d src/shared/infra/typeorm/index.ts
```

or

```
yarn typeorm migration:run
```

## Starting the Project

Run the following command in your project:

```
npm run dev
```

or

```
yarn dev
```

The project will run at the following URL:

        http://localhost:3333

## Running the Tests

To run the project's tests, you need to add a test database to your project with the name "test" and then change the NODE_ENV variable from dev to test. Your .env file should look like this:

```
POSTGRESQL_PORT=5432
POSTGRESQL_PASSWORD=mypassword
NODE_ENV=test
```
