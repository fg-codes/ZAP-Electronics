# ⚡ ZAP Electronics - E-Commerce project

<br>

### <p align="center"><a href="https://zap-electronics.vercel.app/">🔗 Try it Live!</a></p>

## 🟢 About

The main intention behind this full-stack project was to learn and explore new skills. It allowed me to dive into both front-end development, using React, and back-end development with Node.js, Express, and MongoDB. I had complete control over the entire development process, allowing me to customize and optimize every aspect of the project to meet my specific needs and goals.

Please be aware that this project does not support actual transactions, and its design is not responsive, as it was not part of the initial Minimum Viable Product (MVP). This project is primarily a learning platform for me to grow and develop my expertise.

<br>

## 🟢 Features

- Product Catalog: Display a wide range of products with details, images, and pricing, categorized for easy navigation.
- Shopping Cart: Allow the user to add and remove items from the cart, view the cart's content, and calculate the total cost.
- Checkout Process: Implement a seamless checkout process with credit card validation.
- Search: Enable the user to search for products
- RESTful APIs: Create a set of RESTful APIs to facilitate communication between the front-end and back-end, ensuring data retrieval and updates.

<br>

## 🟢 Demo

<br>

### <p align="center">Experience the live demo <a href="https://zap-electronics.vercel.app/">Here!</a></p>

<p align="center">
  <img align="center" src="./demo1.png" width="70%"><br><br>
  <img align="center" src="./demo2.png" width="70%"><br><br>  
  <img align="center" src="./demo3.png" width="70%"><br><br>
  <img align="center" src="./demo4.png" width="70%"><br><br>
  <img align="center" src="./demo5.png" width="70%"><br><br>
</p>

## 🟢 Project Setup
### Server side: 
1. Open a terminal in VS Code
2. Navigate to the server directory with `cd server`
3. Type `yarn install`
4. Set up your dotenv file and configure it with your database login details, using 'MONGO_URI' key.
5. Add this line to your dotenv file: `FE_ORIGIN_BASE_URL=http://localhost:3000`
6. Use `yarn start` to run the backend environment

### Client side:
1. Open a second terminal
2. Navigate to the client directory
3. Type `yarn install`
4. Create a dotenv file and add this line: `REACT_APP_BACKEND_URL=http://localhost:4000/`
5. Use `yarn start` to run the frontend environment
