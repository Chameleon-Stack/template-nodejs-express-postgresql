# CHAMALEON STACK - KAMBAN

## Configuração do Docker

O primeiro passo é configurar o docker. Para cada sistema operacional é necessário seguir um passo a passo:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (Necessário ter o WSL instalado e configurado)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- MAC

```
               https://docs.docker.com/desktop/install/mac-install/
```

## Instalando o container que irá rodar no projeto

Para instalar o container que será rodado no projeto é necessário colocar o seguinte comando no terminal:

```
docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

## Adicionando valores de conexão do banco ao .env

Crie um arquivo chamado ".env" na raiz do projeto e adicione as variáveis contidas no arquivo ".env.example" com os valores de conexão que você informou ao criar o container no passo anterior. O arquivo env de acordo com o que container criado ficaria assim:

```
POSTGRESQL_PORT=5432
POSTGRESQL_PASSWORD=mypassword
```

## Instalando pacotes NodeJs

Rode o seguinte comando no projeto:

```
npm install
```

ou

```
yarn
```

## Iniciando o projeto

Rode o seguinte comando no projeto:

```
npm run dev
```

ou

```
yarn dev
```
