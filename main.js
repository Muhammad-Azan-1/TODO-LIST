#!/usr/bin/env node
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
    // When prompt ask first question, if the answer given by user is empty then execute [empty list] , if the answer contains some thing then execute [answer]
    if (answer.todos !== "") {
        toDos.push(...splitingElements); // ...(spread syntax) coverts each element of split Arry into toDos Arry
        console.log(toDos);
    }
    else if (answer.todo == null) {
        toDos.push();
        console.log(toDos);
    }
    // if the answer provided by the user is no then loop will be breaks
    if (answer.Addmore == false) {
        console.log("\n YOU CAN NOT ENTER ANY THING \n");
        break;
    }
}
// working for advance features Remove ,  update or add
while (true) {
    let askingForFeatures = await inquirer.prompt([
        {
            // asking user that what he wants to do with his current list //
            message: "Do you want to Update , Remove or add any Item in your current list : ",
            type: "confirm",
            name: "string",
        },
    ]);
    // if in the answer of the question user enter no then loop will breaks
    if (askingForFeatures.string == false) {
        console.log("\nExiting the program\n");
        break;
    }
    //IN Case if user wants to do some modification
    let modific = await inquirer.prompt([
        {
            message: "Please select any option",
            choices: ["Remove a todo", "update a todo", "Add new todo"],
            type: "list",
            name: "action",
        }
    ]);
    // In case user wants to remove any Item in his todo list 
    if (modific.action === "Remove a todo") {
        let removeTodo = await inquirer.prompt([
            {
                // asking him to enter the number of the item he wants to delete//
                message: "Please Enter the  number of the item you want to remove : ",
                type: "number",
                name: "NumOfItem",
            }
        ]);
        // checking condition if all the conditions are satisfied then a new toDo list will be print , !isNaN use to ture the Number enter by user , the number user enter should be euqal to 1 or greater then 1 but less then the length of toDo list
        if (!isNaN(removeTodo.NumOfItem) && removeTodo.NumOfItem >= 1 && removeTodo.NumOfItem <= toDos.length) {
            let newRemoveTodo = removeTodo.NumOfItem - 1; // minus the number entered by user with 1 to make the index number of that Item 
            toDos.splice(newRemoveTodo, 1); // splice(startingindex,starting index say jitne numbers delete krne hay,)
            console.log(toDos);
        }
    }
    // In case user wants to remove any Item from his todo list 
    if (modific.action === "update a todo") {
        let updateTodo = await inquirer.prompt([
            {
                message: "\nPlease Enter the number of the item you want to update\n : ",
                type: "number",
                name: "Num",
            },
            // now asking the user that what he wants to update instead of the Item whoes number is provided by him
            {
                message: "\nPLease input the new item\n :",
                type: "input",
                name: "Item",
            }
        ]);
        //checking condition if all the conditions are satisfied then a new toDo list will be print , !isNaN use to ture the Number enter by user, the number user enter should be euqal to 1 or greater then 1 but less then the length of toDo list
        if (!isNaN(updateTodo.Num) && updateTodo.Num >= 1 && updateTodo.Num <= toDos.length) {
            let newUpdatedTodo = updateTodo.Num - 1; // minus the number entered by user with 1 to make the index number of that Item 
            toDos.splice(newUpdatedTodo, 1, updateTodo.Item); //// splice(startingindex, starting index say jitne numbers ko delete krna hay, new numbers/string jo add hu gy )
            console.log(toDos);
        }
    }
    // if user wants to add a new item in todo list
    if (modific.action === "Add new todo") {
        let addTodo = await inquirer.prompt([
            {
                message: "Please enter the Todo you want to add ,\n Note:(Please sperate each item with a comma ',') ", //asking user to enter the item he wants to add in todo
                type: "input",
                name: "newTodo",
            }
        ]);
        //using isNaN to check if the item is string then the block of code execute but if the item is number then also the same thing happens
        if (isNaN(addTodo.newTodo) || !isNaN(addTodo.newTodo)) {
            let splitingElements = addTodo.newTodo.split(",");
            toDos.push(...splitingElements);
            console.log(toDos);
        }
    }
}
