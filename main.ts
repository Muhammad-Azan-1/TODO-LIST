#!/usr/bin/env node

import inquirer from "inquirer";

let toDos = [];
while (true) {
  let answer = await inquirer.prompt([
    {
      message:
        "What do you want to add in your todos? (please seperate each Item with a comma ',') :",
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

  let splitingElements = answer.todos.split(",");

  if (answer.todos !== "") {
    toDos.push(...splitingElements); // ...(spread syntax) coverts each element of split Arry into toDos Arry
    console.log(toDos);
  } else if (answer.todo == null) {
    toDos.push();
    console.log(toDos);
  }

  if (answer.Addmore == false) {
    console.log("\n YOU CAN NOT ENTER ANY THING \n");
    break;
  }
}

// more features

while (true) {
  let askingForFeatures = await inquirer.prompt([
    {
      message:
        "Do you want to Update , Remove or add any Item in your current list : ",
      type: "confirm",
      name: "string",
    },
  ]);

  if (askingForFeatures.string == false) {
    console.log("\nExiting the program\n");
    break;
  }

  let modific = await inquirer.prompt([
    {
      message: "Please select any option",
      choices: ["Remove a todo", "update a todo", "Add new todo"],
      type: "list",
      name: "action",
    },
  ]);

  if (modific.action === "Remove a todo") {
    let removeTodo = await inquirer.prompt([
      {
        message: "Please Enter the  number of the item you want to remove : ",
        type: "number",
        name: "NumOfItem",
      },
    ]);

    if (
      !isNaN(removeTodo.NumOfItem) &&
      removeTodo.NumOfItem >= 1 &&
      removeTodo.NumOfItem <= toDos.length
    ) {
      let newRemoveTodo = removeTodo.NumOfItem - 1;

      toDos.splice(newRemoveTodo, 1);
    } else {
      console.log("\nInvaled List number\n");
    }
  }

  if (modific.action === "update a todo") {
    let updateTodo = await inquirer.prompt([
      {
        message: "Please Enter the number of the item you want to update : ",
        type: "number",
        name: "Num",
      },

      {
        message: "PLease input the new item :",
        type: "input",
        name: "Item",
      },
    ]);

    if (
      !isNaN(updateTodo.Num) &&
      updateTodo.Num >= 1 &&
      updateTodo.Num <= toDos.length
    ) {
      let newUpdatedTodo = updateTodo.Num - 1;

      toDos.splice(newUpdatedTodo, 1, updateTodo.Item);
      console.log(toDos);
    } else if (updateTodo.Num != toDos.length) {
      console.log("\nInput a valid list number that you wants to update\n");
    }
  }

  if (modific.action === "Add new todo") {
    let addTodo = await inquirer.prompt([
      {
        message:
          "Please enter the Todo you want to add , Note:(Please sperate each item with a comma ',') ",
        type: "input",
        name: "newTodo",
      },
    ]);

    if (isNaN(addTodo.newTodo) || !isNaN(addTodo.newTodo)) {
      let splitingElements = addTodo.newTodo.split(",");
      toDos.push(...splitingElements);
      console.log(toDos);
    }
  }
}
