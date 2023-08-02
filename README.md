// SERVER: 
yarn install
yarn start


// CLIENT:
yarn install
yarn start



//TODO
1. .env

2. update stock:
   1. grab the cart items
   2. if items is empty array, return 400
   3. map the items and each item needs a stock update query to the db ( $set: numInStock - quantity )
   4. make sure the user cant add more than the item.quantity / voir info.txt
