import inquirer from "inquirer";
//Initializing a variable with empty Arry 
let toDos = [];
while (true) { // using while loop to repeat the code//
    let answer = await inquirer.prompt([
        //prompting the user to enter the information A/c to the questions asked//
        {
            message: "What do you want to add in your todos? (please seperate each Item with a comma ',') :",
            name: "todos",
            type: "input",
        },
        {
            message: "Do you want to add more things in your Todos? : ",
            name: "Addmore",
            type: "confirm",
            default: true,
        },
    ]);
    // using spilt method to separate every element with comma when writing the answer of the first question in prompt split creates a new arry of those elemenst
    let splitingElements = answer.todos.split(",");
    // When prompt ask first question, if the answer given by user is empty then 
    if (answer.todos !== "") {
        toDos.push(...splitingElements);
        console.log(toDos);
    }
    else if (answer.todo == null) {
        toDos.push();
        console.log(toDos);
    }
    if (answer.Addmore == false) {
        console.log("\n YOU CAN NOT ENTER ANY THING \n");
        break;
    }
}
// working for advance features Remove ,  update
while (true) {
    let askingForFeatures = await inquirer.prompt([
        {
            message: "Do you want to Update , Remove or add any Item in your current list : ",
            type: "confirm",
            name: "string",
        },
    ]);
    // giving condition to break the loop
    if (askingForFeatures.string == false) {
        console.log("\nExiting the program\n");
        break;
    }
    //IN if user wants to do some modification
    let modific = await inquirer.prompt([
        {
            message: "\nPlease select any option\n",
            choices: ["Remove a todo", "update a todo", "Add new todo"],
            type: "list",
            name: "action",
        }
    ]);
    // In case user wants to remove any todo list element
    if (modific.action === "Remove a todo") {
        let removeTodo = await inquirer.prompt([
            {
                message: "\nPlease Enter the  number of the item you want to remove\n : ",
                type: "number",
                name: "NumOfItem",
            }
        ]);
        if (!isNaN(removeTodo.NumOfItem) && removeTodo.NumOfItem >= 1 && removeTodo.NumOfItem <= toDos.length) {
            let newRemoveTodo = removeTodo.NumOfItem - 1;
            toDos.splice(newRemoveTodo, 1);
            console.log(toDos);
        }
    }
    // In case user wants to remove any to do list 
    if (modific.action === "update a todo") {
        let updateTodo = await inquirer.prompt([
            {
                message: "\nPlease Enter the number of the item you want to update\n : ",
                type: "number",
                name: "Num",
            },
            {
                message: "\nPLease input the new item\n :",
                type: "input",
                name: "Item",
            }
        ]);
        if (!isNaN(updateTodo.Num) && updateTodo.Num >= 1 && updateTodo.Num <= toDos.length) {
            let newUpdatedTodo = updateTodo.Num - 1;
            toDos.splice(newUpdatedTodo, 1, updateTodo.Item);
            console.log(toDos);
        }
    }
    if (modific.action === "Add new todo") {
        let addTodo = await inquirer.prompt([
            {
                message: "Please enter the Todo you want to add ,\n Note:(Please sperate each item with a comma ',') ",
                type: "input",
                name: "newTodo",
            }
        ]);
        if (isNaN(addTodo.newTodo) || !isNaN(addTodo.newTodo)) {
            let splitingElements = addTodo.newTodo.split(",");
            toDos.push(...splitingElements);
            console.log(toDos);
        }
    }
}
// tsc && node main.js
