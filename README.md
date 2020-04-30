<h1 align="center">
<br>
  <img src=".github/logo.png" alt="Fastfeet" width="300">
<br>
<br>
Fastfeet
</h1>

<p align="center">This code represents my solution to the challenge provided by rocketseat. All instructions can be found <a href="https://github.com/filliperomero/fastfeet/tree/master/challenge">here</a></p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
  <a href="linkedin.com/in/filliperomero">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/Made%20by-Fillipe%20Romero-blueviolet">
  </a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fgithub.com%2Ffilliperomero%2Ffastfeet%2Fblob%2Fmaster%2F.github%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<div>
  <img src=".github/web.gif" alt="demo-web" height="425">
  <p>Attention: Colors on .gif are not accurate</p>
</div>

<hr />

## Features

This app features all the latest tools and practices in web and backend development!

- ⚛️ **React Js** — A JavaScript library for building user interfaces
- ⚛️ **React Native** — A lib that provides a way to create native apps for Android and iOS (comming soon)
- 💹 **Node Js** — An an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser
- 💹 **Express Js** — A web framework for Node Js
- 🐘 **PostgreSQL** — A cross-platform and open-source document-oriented database
- 🗄️ **Redis** - An in-memory data structure project implementing a distributed, in-memory key-value database with optional durability.
- 🐝 **Bee-Queue** - A simple, fast, robust job/task queue for Node.js, backed by Redis.

## Getting started

1. Clone this repo using `git clone https://github.com/filliperomero/fastfeet.git`
2. Move yourself to the appropriate directory: `cd fastfeet`<br />

### Getting started with the backend server

1. Move yourself to the backend folder: `cd backend`
2. Create a `.env` file using `.env.example` file as an example
3. Run `yarn` to install all dependencies
4. Run `yarn sequelize db:migrate` to execute all migrations in your database
5. Run `yarn sequelize db:seed` to create admin user in your database
6. Run `yarn dev` to start the server

### Getting started with the frontend app

1. Move yourself to the frontend folder: `cd frontend`
2. Run `yarn` to install all dependencies
3. Run `yarn start` to start the web application
4. Use your admin user created before to enter the application (email: admin@fastfeet.com, password: 123456)

### Getting started with the mobile app (comming soon)

1. Move yourself to the mobile folder: `cd mobile`
2. Run `yarn` to install all dependencies
3. Run `react-native run-ios` (or `run-android` if your prefer) to start the mobile app

Note: If you choose to start the mobile app in the android emulator, you will have to start the emulator before using
the `run-android` command.

## Comming Soon
In a future update, we will add the mobile version where the deliveryman will be able to pick up packages, mark packages as delivered and place the recipient's signature,  in addition to signaling some delivery problems.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.
<hr>
Made with 💜 by [Fillipe Romero](linkedin.com/in/filliperomero)