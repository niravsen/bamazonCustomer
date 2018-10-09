
var mysql = require ("mysql");
var inquirer = require('inquirer');
var table = require("console.table");

//creating a connection from the JS file to the MYSQL database
var connection = mysql.createConnection (
{
//where your MySQL is running - which is localhost
//port number MAMP is 8889
//user: require SQL injection
//password
//database: name of the database you created in the MYSQL
host: "localhost",
port: 8889,
user: "root",
password: "root",
database: "bamazon_db",
});

//when connecting you need a callback function
connection.connect(function(err){
    if (err) {
        console.error("Error in connection: " + err.stack);
    }
    inputProducts();
});

function inputProducts(){
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        console.table(res);
    promptItems(res);
    })
}

function promptItems(inventory) {
    inquirer.prompt([
        { 
        type: "input",
        name: "choice",
        message: "Please provide the ID of the product that you would like to purchase. (Quit with Q)",
        validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "q"
        }
       }
    ])
    .then(function(val){
        ifExit(val.choice);
        var choiceID = parseInt(val.choice);
        var product = checkInventory(choiceID, inventory);
        if (product) {
            quantityPrompt(product);
        }
        else{
            console.log("\nThat item is not in the inventory.");
            inputProducts();
        }
    });
}

function quantityPrompt(product){
    inquirer.prompt([
        {
        type: "input",
        name: "quantity",
        message: "How many would you like? (Quit with Q)",
        validate: function(val){
            return val > 0 || val.toLowerCase() === "q";
        }  
      }
    ])
    .then(function(val){
        ifExit(val.quantity);
        var quantity = parseInt(val.quantity);
        if (quantity > product.stock_quantity){
            console.log("\nInsufficient quantity!");
            inputProducts();
        }
        else {
            makePurchase(product, quantity);
        }
    });
}

function makePurchase(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function(err, res) {
            console.log ("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
            inputProducts();
        }
    );
}

function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++){
        if (inventory[i].item_id === choiceId){
            return inventory[i];
        }
    }
    return null;
}

function ifExit(choice){
    if (choice.toLowerCase() === "q"){
        console.log("See Ya!");
        process.exit(0);
    }
}




