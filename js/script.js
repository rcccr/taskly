const listInput = document.querySelector("#listInput");
const addButton = document.querySelector("#addButton");
const list = document.querySelector("#list");

function addItem() {
  const inputValue = listInput.value;
  const li = document.createElement("li");

  li.innerText = inputValue;

  list.appendChild(li);

  listInput.value = "";
}

addButton.addEventListener("click", addItem);
