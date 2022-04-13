<p align="center">
    <img alt="docker" title="#docker" src="https://user-images.githubusercontent.com/35976070/162973525-0c4af094-3c92-42aa-b160-c0242149b7a7.jpg" width="400px" />
</p>

# Bombordo

Sistema desenvolvido para criação e movimentações de containers

# Guia

* [Funcionalidades](#rocket-funcionalidades)<br/>
* [Começando](#runner-começando)<br/>
* [Instalação](#construction_worker-instalação)<br/>
* [Tecnologias](#satellite-tecnologias)<br/>
* [Endpoints](#cyclone-endpoints)<br/>
* [Preview](#loop-preview)<br/>

## :rocket: Funcionalidades

* 👩  Listar, Criar, Editar e Deletar um container.
* 🍕   Listar, Criar, Editar e deletar uma movimentação.
* 🌏  Permitir que somente datas futuras sejam cadastradas não datas passadas.
* 🎨  Nao permitir que sejam criados containers com mesmo nome.
* 🍕  Geração de relatório.

## :runner: Começando
As instruções a seguir são para fornecer uma cópia deste projeto que poderá ser executada na sua máquina local para fins de desenvolvimento e teste.

### Pré Requisitos


* É necessário que você tenha o `Node.js` e o `Docker` instalado em sua máquina. 

## :construction_worker: Instalação

Clonando este repositório em sua máquina local e acessando a pasta do projeto:

```bash
git clone https://github.com/DavilsonJunior/bombordo
cd bombordo
```

### Back-end:

Instalando as dependências do backend da aplicação:

```bash
cd server
yarn install ou
npm install
```

Executando as migrations:

```bash
yarn sequelize db:migrate
```

Usando os testes de integração:

```bash
yarn test
```

Rodando o servidor:

```bash
yarn dev
```

### Front-end:

Instalando as dependências do front-end:

```bash
cd material-kit-react
yarn install ou
npm install
```

Executando a aplicação:

```bash
yarn dev
```

## :satellite: Tecnologias
### Back-end
* [Node.js](https://nodejs.org/) - Usado para construir o backend (webservice REST) do projeto
* [express](https://expressjs.com/) - Framework Web utilizado no backend
* [sequelize](http://sequelize.org/) - ORM usado no backend para auxiliar no versionamento do banco de dados
* [postgreSQL](https://www.postgresql.org/) - Banco de dados utilisado no backend para peristência dos dados
* [Docker](https://www.docker.com/) - Criacão de containers para facilitação do desenvolvimento 
* [date-fns](https://date-fns.org/) - Para tratamento de datas
* [yup](https://github.com/jquense/yup) - Para validação de dados junto com o react-hook-form
* [jest](https://jestjs.io/pt-BR/) - Para testes da aplicação

### Front-end
* [Next.js](https://nextjs.org) - framework front-end
* [date-fns](https://date-fns.org/) - Para tratamento de datas
* [react-hook-form](https://react-hook-form.com/) - Para validação de dados
* [yup](https://github.com/jquense/yup) - Para validação de dados junto com o react-hook-form

## :cyclone: Endpoints
### Rotas da aplicação

Agora que você já está com o projeto configurado, e pronto para continuar, listarei alguns endpoints para testes ou usar no frontend

`Rotas destinadas ao container:`

- **`GET /containers/current`**: A rota que listara os `5` últimos containers.

- **`GET /containers`**: A rota que listara todos os containers da aplicacao seguindo os filtros `filter` e `search`.

- **`POST /containers`**: A rota cadastrara um novo container. A rota deve receber os dados em json, `cliente`, `numero_container`, `tipo`, `status` e `categoria`.

- **`PUT /containers/:id`**: A rota que fara a atualização do container. A rota devera receber qualquer um desses dados em json, `cliente`, `numero_container`, `tipo`, `status` ou `categoria`, ou também todos os dados juntos.

- **`DELETE /containers/:id`**: A rota que fara a remoção do container.


`Rotas destinadas a uma movimentação:`

- **`GET /movements/current`**: A rota que listara as `5` últimas movimentações.

- **`GET /movements`**: A rota que listara todos as movimentações da aplicacao seguindo os filtros `filter`, `search`, `startDate` e `endDate`.

- **`POST /movements`**: A rota cadastrara uma nova movimentação. A rota deve receber os dados em json, `tipo_de_movimentacao`, `data_inicio` e `id_container`.

- **`PUT /movements/:id`**: A rota que fara a atualização de uma movimentação. A rota devera receber qualquer um desses dados em json, `tipo_de_movimentacao`, `data_inicio`,  `data_fim` e `id_container`

- **`DELETE /movements/:id`**: A rota que fara a remoção da movimentação.

`Rotas destinadas ao relatório:`

- **`GET /report/pdf`**: A rota que criação um relatorio em pdf.

- **`GET /report`**: A rota que listara o total das movimentações, importação, exportação e a listagem de movimentações agrupadas por clientes.

## :loop: Preview
<div>
   <img src="https://user-images.githubusercontent.com/35976070/162985620-500d08d7-c26f-4b97-9c8f-292e4bfad659.png" width="400px">
   <img src="https://user-images.githubusercontent.com/35976070/162985766-6e577f75-a215-48b7-bea4-2b54febd24b9.png" width="400px">
   <img src="https://user-images.githubusercontent.com/35976070/162985855-6a7fc707-056b-4c2f-ac7a-31bd822972e0.png" width="400px">
   <img src="https://user-images.githubusercontent.com/35976070/162985973-851a4230-d9b1-4efa-a60b-bb09e618accf.png" width="400px">
   <img src="https://user-images.githubusercontent.com/35976070/162986063-bf170067-1b20-4a67-aefa-717629990710.png" width="400px">
   <img src="https://user-images.githubusercontent.com/35976070/162986134-9dd5d24d-9972-427b-886e-95796a1fc8af.png" width="400px">
</div>
<br/>

Confira a lista completa de libs utilizadas no arquivo `package.json`, presente na pasta raiz do projeto.

Feito com ♥ por [Davilson Junior](https://www.linkedin.com/in/davilson-paulino-da-cunha-junior-23029315a/)
