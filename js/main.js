const addToDoButton = document.getElementById("addToDo");
const toDoContainer = document.getElementById("toDoContainer");
const inputField = document.getElementById("inputField");

let tasks = [];

if (window.localStorage.getItem("data")) {
  tasks = JSON.parse(window.localStorage.getItem("data"));
  tasks.forEach((task) => {
    showTask(task);
  });
}

function addNewBook(newtask) {
  let task = {
    id: Date.now(),
    task: newtask,
    completed: false,
  };
  showTask(task);

  tasks.push(task);

  setData(tasks);
}
inputField.addEventListener('keyup', myFn)
function myFn() {
    if (inputField.value){
        addToDoButton.classList.add("active")
    } else {
        addToDoButton.classList.remove("active")
    }
}
function setData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

addToDoButton.addEventListener("click", function () {
    if (inputField.value) {
        addNewBook(inputField.value);
        inputField.value = "";
        addToDoButton.classList.remove("active")
    }
});

function showTask(task) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-styling");
  paragraph.innerText = task.task;
  paragraph.id = task.id;

  const paragraph__box = document.createElement("div");
  paragraph__box.classList.add("paragraph__box");
  paragraph__box.appendChild(paragraph);

  const paragraph__item = document.createElement("li");
  paragraph__item.classList.add("paragraph__item");
  paragraph__item.appendChild(paragraph__box);

  const paragraph__complete = document.createElement("button");
  paragraph__complete.classList.add("paragraph__complete");
  paragraph__box.appendChild(paragraph__complete);

  const paragraph__close = document.createElement("button");
  paragraph__close.classList.add("paragraph__close");
  paragraph__box.appendChild(paragraph__close);

  toDoContainer.appendChild(paragraph__item);

  if (task.completed == true) {
    paragraph__box.classList.add("completed");
  } else {
    paragraph__box.classList.remove("completed");
  }

  paragraph__complete.addEventListener("click", function () {

    tasks.map((localtask) => {
      if (localtask.id == paragraph.id) {
        if (localtask.completed == false) {
          localtask.completed = true;
          paragraph__box.classList.add("completed");

          setData(tasks);
        } else {
          localtask.completed = false;
          paragraph__box.classList.remove("completed");
          setData(tasks);
        }
      }
    });
  });

  paragraph__close.addEventListener("click", function () {
    const filterTasks = tasks.filter((localtask) => {
      if (localtask.id != paragraph.id) {
        return localtask
      } else {
        toDoContainer.removeChild(paragraph__item);
      }
    });
    setData(tasks = filterTasks);
  });
}

document.body.onload = () => {
    document.body.classList.add('loaded')
}

let changeThemeButtons = document.querySelectorAll('.change-theme'); // Помещаем кнопки смены темы в переменную

changeThemeButtons.forEach(button => {
    button.addEventListener('click', function () { 
        let theme = this.dataset.theme;
        applyTheme(theme); 
    });
});

function applyTheme(themeName) {
    document.querySelector('[title="theme"]').setAttribute('href', `css/theme-${themeName}.css`);
    changeThemeButtons.forEach(button => {
        button.style.display = 'block';
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none'; 
}


changeThemeButtons.forEach(button => {
    button.addEventListener('click', function () {
        let theme = this.dataset.theme;
        applyTheme(theme);
    });
});

function applyTheme(themeName) {
    document.querySelector('[title="theme"]').setAttribute('href', `css/theme-${themeName}.css`);
    changeThemeButtons.forEach(button => {
        button.style.display = 'block';
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none';
    localStorage.setItem('theme', themeName);
}

let activeTheme = localStorage.getItem('theme');

if(activeTheme === null || activeTheme === 'light') { 
} else if (activeTheme === 'dark') {
    applyTheme('dark');
}