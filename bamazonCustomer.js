
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
database: "bamazon",
})

//when connecting you need a callback function
function afterConnection(){
    connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw (err);
    console.log('-----------------------------------------------');
    console.log("- .+. - .+. - .+. - .+. - .+. Welcome to Bamazon .+. - .+. - .+. - .+. - .+. -");
    console.log('-----------------------------------------------');
    // var temp = tabl
    // console.log(res);
    console.log(table.getTable(res));
    connection.end();
});
}

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id of " + connection.threadId);
    afterConnection();
    // connection.end(); 
});

console.log('');
inquirer.prompt([
{
    type: "input",
    name: "item_id",
    message: "Please provide the ID of the product that you would like to purchase.",
    validate: function(value) {
        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt (value) > 0) {
            return true;
        }
        else {
            return false;
        }
      }
    },
{
    type: "input",
    name: "quantity",
    message: "How many units of the products would you like to purchase?",
    validate: function(value) {
        
        if(isNaN(value)){
            return false;
          } else {
            return true;
      }
    }
},
]).then(function(ans){
    var idBuy = (ans.id)-1;
    var qtyBuy = parseInt(ans.quantity);
    var total = parseFloat(((res[idBuy].Price)*qtyBuy).toFixed(2));

    if(res[idBuy].StockQuantity >= qtyBuy){
    connection.query("UPDATE Products SET ? WHERE ?", [
    {StockQuantity: (res [idBuy].StockQuantity - qtyBuy)},
    {item_id: ans.id}
    ], function(err,result) {
    if (err) throw err;
    console.log("Success! Your total is $" + total.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
});

connection.query("SELECT * FROM Departments", function(err, deptRes){
    if(err) throw err;
    var index;
    for(var i = 0; i < deptRes.length; i++){
      if(deptRes[i].department_name === res[idBuy].department_name){
        index = i;
      }
    }
          
          connection.query("UPDATE Departments SET ? WHERE ?", [
            {TotalSales: deptRes[index].TotalSales + total},
            {DepartmentName: res[idBuy].DepartmentName}
            ], function(err, deptRes){
                if(err) throw err;
               
            });
        });
    }
         else {
          console.log("Sorry, there's not enough in stock!");
        }
  
        reprompt();
      })
  
  function reprompt(){
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase another item?"
    }]).then(function(ans){
      if(ans.reply){
        start();
      } else{
        console.log("See you soon!");
      }
    });
  }
  
//   start();
// function runSearch();
//  inquirer 
//  .prompt({
//      message: "Please provide the ID of the product you would like to purchase.",
//      choices: ["1","2","3","4","5","6","7","8","9","10",
//      ]
//  })
// .then(function(answer){
//     switch(answer.action) {
//     case "":
//     itemIdSearch();
//     break;
//     }
// })

    // afterConnection();
    connection.end();
