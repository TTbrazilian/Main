# Projeto E-commerce: NexusCart

## 🎯 Objetivo

O objetivo deste projeto é desenvolver uma aplicação web full-stack de e-commerce funcional, utilizando a stack MERN, como parte da avaliação da disciplina. A plataforma NexusCart permitirá que usuários se cadastrem, explorem um catálogo de produtos, gerenciem um carrinho de compras e finalizem pedidos de forma segura.

## 🚀 Tecnologias Utilizadas

A seguir estão as tecnologias escolhidas para a construção da nossa aplicação:

* *Front-end:*
    * *React.js:* Biblioteca JavaScript para construir interfaces de usuário modernas e reativas.
    * *React Router:* Para gerenciamento de rotas e navegação na nossa Single-Page Application (SPA).
    * *Axios:* Cliente HTTP para realizar requisições à nossa API back-end de forma assíncrona.

* *Back-end:*
    * *Node.js:* Ambiente de execução JavaScript no lado do servidor.
    * *Express.js:* Framework para estruturar nossa API RESTful, rotas e middlewares.

* *Banco de Dados:*
    * *MongoDB:* Banco de dados NoSQL orientado a documentos, utilizado com o Mongoose ODM para modelagem de dados.

* *Criptografia e Autenticação:*
    * *Bcrypt.js:* Biblioteca para hashing de senhas, garantindo o armazenamento seguro das credenciais dos usuários.
    * *JSON Web Token (JWT):* Para criar sessões de usuário seguras e proteger rotas da API que exigem autenticação.

* *Containerização:*
    * *Docker:* (Planejado) Utilizaremos o Docker para criar containers isolados para o front-end, back-end e banco de dados, garantindo um ambiente consistente e facilitando o deploy.

* *Inteligência Artificial:*
    * (Visão Futura) Como próximo passo, poderíamos explorar a implementação de um sistema simples de recomendação de produtos baseado no histórico de navegação e compras.

* *Arquitetura da Aplicação:*
    * A aplicação segue uma arquitetura desacoplada, onde o Front-end (cliente React) se comunica com o Back-end (servidor Node/Express) exclusivamente através de uma API RESTful, trocando dados no formato JSON.

---
