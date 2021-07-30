const listInput = document.querySelector("#listInput");
const listInputForm = document.querySelector("#listInputForm");
const list = document.querySelector("#list");
let data = {
  data: [],
};

function deleteItem(e) {
  const liToDelete = e.currentTarget.parentNode;

  list.removeChild(liToDelete);

  const newData = data.data.filter((item) => item.id !== liToDelete.dataset.id);

  data = { ...data, data: newData };

  localStorage.setItem("tasklyData", JSON.stringify(data));
}

function addItem(e) {
  e.preventDefault();

  if (listInput.value.replace(/ /g, "") === "") {
    return;
  }

  const elData = {
    id: new Date(),
    task: listInput.value,
  };

  console.log(elData);

  const li = createListItem(elData);
  list.appendChild(li);

  listInput.value = "";

  data.data.push(elData);
  localStorage.setItem("tasklyData", JSON.stringify(data));
}

function toggleEditItem(e, parent) {
  let parentEl;

  if (parent) {
    parentEl = parent;
  } else {
    parentEl = e.currentTarget.parentNode;
  }

  parentEl.querySelector(".jsTextSpan").classList.toggle("hide");
  parentEl.querySelector(".jsEditForm").classList.toggle("hide");
  parentEl.querySelector(".jsDeleteButton").classList.toggle("hide");
}

function editItem(e) {
  e.preventDefault();

  const newValue = e.currentTarget.querySelector("input").value;
  const parentNode = e.currentTarget.parentNode;
  const newData = data.data.map((item) => {
    if (item.id === parentNode.dataset.id) {
      return { ...item, task: newValue };
    }

    return item;
  });

  parentNode.querySelector(".jsTextSpan").innerText = newValue;

  data = { ...data, data: newData };
  localStorage.setItem("tasklyData", JSON.stringify(data));

  toggleEditItem(e, parentNode);
}

function createListItem(elData) {
  const li = document.createElement("li");
  const textSpan = document.createElement("span");
  const deleteButton = document.createElement("button");
  const editForm = document.createElement("form");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  deleteButton.addEventListener("click", deleteItem);
  editForm.addEventListener("submit", editItem);
  textSpan.addEventListener("click", toggleEditItem);

  deleteButton.classList.add("btn", "delete-btn");
  editButton.classList.add("btn", "edit-btn");

  editInput.setAttribute("type", "text");
  li.setAttribute("data-id", elData.id);
  textSpan.innerText = elData.task;
  editButton.innerText = "Done";
  deleteButton.innerText = "Delete";
  editInput.value = elData.task;

  textSpan.classList.add("jsTextSpan");
  deleteButton.classList.add("jsDeleteButton");
  editForm.classList.add("hide", "jsEditForm");

  editForm.appendChild(editInput);
  editForm.appendChild(editButton);

  li.appendChild(textSpan);
  li.appendChild(editForm);
  li.appendChild(deleteButton);

  return li;
}

function populateData() {
  let dataFragment = document.createDocumentFragment();
  data.data.forEach((item) => {
    const li = createListItem(item);
    dataFragment.appendChild(li);
  });

  list.appendChild(dataFragment);
}

if (!localStorage.tasklyData) {
  localStorage.setItem("tasklyData", JSON.stringify(data));
} else {
  data = JSON.parse(localStorage.getItem("tasklyData"));
  populateData();
}

listInputForm.addEventListener("submit", addItem);
