#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = []; 

console.log(chalk.cyanBright.bold("\n \t***Welcome To Todo List***\n"));


async function createTodo(todos: string[]) {
  do {

    let option = await inquirer.prompt([
      {
        name: "select",
        type: "list",
        message: ("slect an option you want to do:"),
        choices: ["Add Task", "Update Task", "View Todo List", "Delete Task", "Exit"],
      }
    ]);
    if (option.select === "Add Task") {
      let addTodo = await inquirer.prompt([
        {
          name: "add",
          type: "input",
          message: "What You Want To Add In Your Todos:",
        }
      ]);
      
      todos.push(addTodo.add);
      console.log(chalk.greenBright.bold.italic("Task Added Successfully."));
      todos.forEach((task, index) => {
        console.log(chalk.cyan(`${index + 1}. ${task}`));
       });
       console.log("\n");
    }
     if (option.select === "Update Task") {
      let updateTodo = await inquirer.prompt([
        {
          type: "list",
          message: "Update task in the list:",
          name: "todo",
          choices: todos.map(item => item)
        }
      ]);
      let addTodo = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: "Add task in the list",
        }
      ]);
      let newTodo = todos.filter(val => val !== updateTodo.todo);
      todos = [...newTodo, addTodo.todo]
         console.log(chalk.green.bold.italic("Task Updated Successfully.\n"));
    }

     if (option.select === "View Todo List") {
      console.log(chalk.greenBright.bold.italic("\n***TO DO LIST***"));
       todos.forEach((task, index) => {
        console.log(chalk.cyan(`${index + 1}. ${task}`))
      });
      console.log("\n")
    }

     if (option.select === "Delete Task") {
      let deleteTodo = await inquirer.prompt([
        {
          type: "list",
          message: "Select the task to delete",
          name: "remove",
          choices: todos.map(item => item)
        }
      ]);

      todos = todos.filter(val => val !== deleteTodo.remove);
      console.log(chalk.red.bold.italic("Task Deleted Successfully.\n"));
      }

    else if (option.select === "Exit") {
      break;
    }

  } while (true)

}
createTodo(todos);