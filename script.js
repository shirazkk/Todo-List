let input = document.querySelector("input");
let taskcontainer = document.querySelector("#taskList");
let button = document.querySelector(".add-button");

button.addEventListener("click", () => {
   if (input.value == "") {
      alert("Please enter a value");
      saveData()
   } else {
      let li = document.createElement("li");
      li.innerHTML = input.value;
      taskcontainer.appendChild(li);

      let delete_btn = document.createElement("button");
      delete_btn.innerText = "Delete";
      delete_btn.classList = "btn-btn-delete";
      li.appendChild(delete_btn);

      let edit = document.createElement("span");
      edit.innerText = "Edit";
      edit.classList = "btn-btn-edit";
      li.appendChild(edit);
      saveData()
   }
   input.value = "";
});

taskcontainer.addEventListener("click", (e) => {
   if (e.target.tagName === "BUTTON") {
      e.target.parentElement.remove();
      saveData()
   } else if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData()
   } else if (e.target.tagName === "SPAN") {
      let li_ele = e.target.parentElement;
      
      // Check if the button is in "Edit" mode or "Save" mode
      if (e.target.innerText === "Edit") {
         let currentText = li_ele.firstChild.textContent;
         let editInput = document.createElement("input");
         editInput.value = currentText;
         editInput.style.backgroundColor="transparent"
         editInput.style.width="100%"
         editInput.style.padding = "15px";

         // Replace the current text with the input field
         li_ele.firstChild.replaceWith(editInput);
         e.target.innerText = "Save";
         e.target.classList = "btn-btn-save";
         saveData()
      } else if (e.target.innerText === "Save") {
         let editInput = li_ele.querySelector("input");

         let newText = editInput.value;

         // Create a text node with the updated value
         let newTextNode = document.createTextNode(newText);
         
         // Replace the input field with the updated text
         editInput.replaceWith(newTextNode);
         e.target.innerText = "Edit";
         e.target.classList = "btn-btn-edit";
         saveData()
      }
   }
});

function saveData(){
   localStorage.setItem("data",taskcontainer.innerHTML)
}

function showTask(){
   taskcontainer.innerHTML=localStorage.getItem("data")
}
showTask()