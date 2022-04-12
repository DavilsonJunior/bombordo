<p align="left">
   <img src="https://image.freepik.com/vetores-gratis/apresentacao-com-painel-de-negocios_172436-786.jpg"/>
</p>



# :bomb: Servidor da Aplicação Medra


[![Author](https://img.shields.io/badge/Davilson-Junior-red)](https://github.com/DavilsonJunior)
[![Languages](https://img.shields.io/badge/languages-1-blue)](#)
[![Contributors](https://img.shields.io/badge/contributors-4-blue)](#)
[![YARN](https://img.shields.io/badge/YARN-1.22.4-red)](#)


# :pushpin: Table of Contents

* [Features](#house-features)
* [Getting Started](#factory-getting_started)
* [Installation](#construction_worker-installation)
* [License](#closed_book-license)

# :house: Features

- feature - Quando adicionar uma funcinalidade nova para o sistema
- styles - Quando alterar somente o css ou estilização
- fix - Quando consertou algum bug
- chore - Para alteração pequena do sistema, por exemplo uma configuração

#### No projeto existem 2 branchs principais, a master como sendo o branch principal onde sempre estará o estado do código do projeto em produção. E o develop como sendo o branch onde modificações estarão sendo realizadas na fase de desenvolvimento, quando o código desse branch chegar ao nível estável, todas as alterações devem ser mergeadas de volta ao master.
> Va para develop:

```
git branch develop
```

> Para criar uma branch nova para uma funcionalidade, seja ela qual for crie assim:

```
git branch feature/nome_da_funcionalidade
```


# :factory: Getting Started

> Para clonar o projeto para a sua máquina
```
git clone https://github.com/Grupo-Medra/medra-server
```

> para ir para a branch develop
```
git checkout develop
```

> para trocar de branch
```
git checkout nome_da_branch
```

> para começar a desenvolver, criar uma branch a partir da develop. Entre na branch develop e de o comando (o -b é para criar e pular automáticamente para a nova branch):
```
git checkout -b nome_da_branch
exemplo (git checkout -b feature/login)
```

> Após alterações feitas, para adicionar as alterações pendentes e commitar:
> Para adicionar todos os arquivos
```
git add .
```

> Para criar o ponto na história (commit com a mensagem de commit seguindo as regras de * [Features](#house-features))
```
git commit -m "feature: nome_da_feature_em_inglês"
git commit -m "styles: nome_da_style_em_inglês"
git commit -m "fix: nome_da_fix_em_inglês"
git commit -m "chore: nome_da_chore_em_inglês"
```

> Para trazer todas as alterações da branch modificada para a develop, use o comando para ir para a branch develop e:
```
git merge nome_da_branch_desenvolvida
```

> Para enviar a branch develop modificada para o repositório remoto no github como pull request:
```
git push origin develop
```


> Link com lista de comandos do git para ajuda:
<a href=https://gist.github.com/leocomelli/2545add34e4fec21ec16>Comandos GIT</a>

# :construction_worker: Installation

### With Yarn

```
yarn install
```

### With NPM
```
npm install
```


## Rodando o projeto
```
yarn start ou  npm start
```


# :closed_book: License

Released in 2020

Made with love by [Davilson Junior](https://github.com/DavilsonJunior) 💜🚀
