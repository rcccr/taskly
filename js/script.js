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

function createListItem() {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", deleteItem);
  li.innerText = listInput.value;
  li.appendChild(deleteButton);

  return li;
}

addButton.addEventListener("click", addItem);
