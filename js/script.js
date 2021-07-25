const listInput = document.querySelector("#listInput");
const addButton = document.querySelector("#addButton");
const list = document.querySelector("#list");

function deleteItem(e) {
  const liToDelete = e.currentTarget.parentNode;

  list.removeChild(liToDelete);
}

function addItem() {
  const li = createListItem();
  list.appendChild(li);

  listInput.value = "";
}

function toggleEditItem(e) {
  const textSpan = e.currentTarget;

  textSpan.classList.add("hide");

  textSpan.parentNode.querySelector(".jsEditForm").classList.remove("hide");

  textSpan.parentNode.querySelector(".jsDeleteButton").classList.add("hide");
}

function editItem() {
  console.log("edit successful");
}

function createListItem() {
  const li = document.createElement("li");
  const textSpan = document.createElement("span");
  const deleteButton = document.createElement("button");
  const editForm = document.createElement("form");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  deleteButton.addEventListener("click", deleteItem);
  editForm.addEventListener("submit", editItem);
  textSpan.addEventListener("click", toggleEditItem);

  textSpan.innerText = listInput.value;
  editButton.innerText = "Done";
  deleteButton.innerText = "Delete";

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

addButton.addEventListener("click", addItem);
