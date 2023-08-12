document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.getElementById("create-task-form");
  const ulElement = document.getElementById("tasks");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let input = document.getElementById("new-task-description");
    if (input.value !== "") {
      const liElement = document.createElement("li");
      const task = document.createElement("span");
      task.textContent = input.value;
      liElement.appendChild(task);

      const deleteBtn = document.createElement("button");

      deleteBtn.style.color = "red";
      deleteBtn.style.verticalAlign = "middle";
      deleteBtn.style.fontSize = "8px";

      const editBtn = document.createElement("button");
      editBtn.textContent = "edit";
      editBtn.style.margin = "0 2px";
      editBtn.style.verticalAlign = "middle";
      editBtn.style.fontSize = "8px";

      editBtn.textContent = "Edit";

      editBtn.addEventListener("click", function () {
        task.contentEditable = true;
        task.focus();
      });

      const selectEl = document.createElement("select");

      const priorities = ["priority", "Low", "Medium", "High"];

      priorities.forEach((priority) => {
        const option = document.createElement("option");
        option.textContent = priority;
        selectEl.appendChild(option);
      });

      selectEl.style.marginLeft = "6px";
      selectEl.addEventListener("change", handleSelect);

      //add date
      const dateInput = document.createElement("span");
      const date = new Date().toLocaleString();
      dateInput.textContent = `  ${date}  `;
      dateInput.style.margin = "0 3px";

      deleteBtn.textContent = "x";
      liElement.appendChild(task);
      liElement.appendChild(dateInput);
      liElement.appendChild(deleteBtn);
      liElement.appendChild(editBtn);
      liElement.appendChild(selectEl);

      deleteBtn.addEventListener("click", (e) => {
        e.target.parentNode.remove();
      });
      ulElement.appendChild(liElement);

      //handle select
      function handleSelect() {
        let selectValue = selectEl.value;

        if (selectValue === "High") {
          liElement.style.color = "red";
        } else if (selectValue === "Medium") {
          liElement.style.color = "orange";
        } else if (selectValue === "Low") {
          liElement.style.color = "green";
        } else if (selectValue === "priority") {
          liElement.style.color = "black";
        }
      }
    }
    form.reset();
  });
  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort";
  sortButton.style.fontSize = "12px";
  form.appendChild(sortButton);

  // sort tasks based on priority
  sortButton.addEventListener("click", (e) => {
    e.preventDefault();
    const liArray = Array.from(ulElement.getElementsByTagName("li"));
    liArray.sort((a, b) => {
      const priorityA = getPriorityValue(a);
      const priorityB = getPriorityValue(b);
      return priorityB - priorityA;
    });

    liArray.forEach((item) => ulElement.appendChild(item));
    function getPriorityValue(item) {
      const taskPriority = item.style.color;
      if (taskPriority === "red") return 3;
      if (taskPriority === "orange") return 2;
      if (taskPriority === "green") return 1;
      return -1;
    }
  });
});
