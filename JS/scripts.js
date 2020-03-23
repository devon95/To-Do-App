class ListClass {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem("LISTS"));
    if (!this.lists) {
      this.lists = [{ list: "Work" }, { list: "School" }, { list: "Home" }];
    }
    this.loadLists();
    this.addEventListener();
  }
  addEventListener() {
    document.getElementById("addList").addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        this.addList(event.target.value);
        event.target.value = "";
      }
    });
  }
  loadLists() {
    localStorage.setItem("LISTS", JSON.stringify(this.lists));
    let listHtml = this.lists.reduce(
      (html, list, index) => (html += this.generateListHtml(list, index)),
      ""
    );
    document.getElementById("listsList").innerHTML = listHtml;
  }
  generateListHtml(list, index) {
    return `
    <li class="list-group-item checkbox list-item">
          <div class="row">
            <button class="col-md-1 col-xs-1 col-lg-1 col-sm-1 list-text" onclick="">
              ${list.list}
            </button>
            <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
              <a class="" href="" onClick="List.deleteList(event, ${index})"><i id="deletelist" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
            </div>
          </div>
        </li>
  `;
  }
  deleteTask(event, ListIndex) {
    event.preventDefault();
    this.List.splice(ListIndex, 1);
    this.loadLists();
  }
  addListClick() {
    let target = document.getElementById("addList");
    this.addList(target.value);
    target.value = "";
  }
  addList(list) {
    let newList = {
      list,
      isComplete: false
    };
    let parentDiv = document.getElementById("addList").parentElement;
    if (task === "") {
      parentDiv.classList.add("has-error");
    } else {
      parentDiv.classList.remove("has-error");
      this.lists.push(newList);
      this.loadLists();
    }
  }
  createToDo(listId) {}
}

class ToDoClass {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("TASKS"));
    if (!this.tasks) {
      this.tasks = [
        { task: "Go to Grocery Shopping", isComplete: false },
        { task: "Do Homework", isComplete: true },
        { task: "Wash Car", isComplete: false }
      ];
    }
    this.loadTasks();
    this.addEventListener();
  }
  addEventListener() {
    document.getElementById("addTask").addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        this.addTask(event.target.value);
        event.target.value = "";
      }
    });
  }
  loadTasks() {
    localStorage.setItem("TASKS", JSON.stringify(this.tasks));
    let taskHtml = this.tasks.reduce(
      (html, task, index) => (html += this.generateTaskHtml(task, index)),
      ""
    );
    document.getElementById("taskList").innerHTML = taskHtml;
  }
  generateTaskHtml(task, index) {
    return `
    <li class="list-group-item checkbox task-item">
    <div class="row">
      <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
        <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${
      task.isComplete? "checked" : ""
    }></label>
      </div>
      <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${
        task.isComplete? "complete" : ""
      }">
        ${task.task}
      </div>
      <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
        <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
      </div>
    </div>
  </li>
  `;
  }
  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }
  deleteTask(event, taskIndex) {
    event.preventDefault();
    this.tasks.splice(taskIndex, 1);
    this.loadTasks();
  }
  addTaskClick() {
    let target = document.getElementById("addTask");
    this.addTask(target.value);
    target.value = "";
  }
  addTask(task) {
    let newTask = {
      task,
      isComplete: false
    };
    let parentDiv = document.getElementById("addTask").parentElement;
    if (task === "") {
      parentDiv.classList.add("has-error");
    } else {
      parentDiv.classList.remove("has-error");
      this.tasks.push(newTask);
      this.loadTasks();
    }
  }
}
let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoClass();
});
// let list;
// window.addEventListener("load", () => {
//   list = new ListClass();
// });
