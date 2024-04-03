// The html code the elements being added in.
const project_html = `
<div class="heading">
    <div class="project_title">
        <div class="edit_option">
            <svg class="delete_project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            <svg class="color_project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
            <svg class="add_task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
        </div>
        <input value="" oninput="save_input_data(this)" type="text" class="no-outline project_title_text" placeholder="Project Title">
    </div>
</div>
<div class="todo_section">
    <div class="todo_template">
        <div>
            <input checked="false" oninput="save_input_check(this)" type="checkbox" class="checkbox-round task_check" />
            <input value="" oninput="save_input_data(this)" type="text" class="no-outline task_name" placeholder="Task name...">
        </div>
        <textarea value="" oninput="save_input_note(this)" class="no-outline task_note" placeholder="Task notes..."></textarea>
        <span>
            <input value="" oninput="save_input_data(this)" type="date" class="no-outline task_date" placeholder="Enter task here...">
            <span class="delete_task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </span>
        </span>
    </div>
</div>
`;
const task_html = `
<div>
    <input checked="false" oninput="save_input_check(this)" type="checkbox" class="checkbox-round task_check" />
    <input value="" oninput="save_input_data(this)" type="text" class="no-outline task_name" placeholder="Task name...">
</div>
<textarea value="" oninput="save_input_note(this)" class="no-outline task_note" placeholder="Task notes..."></textarea>
<span>
    <input value="" oninput="save_input_data(this)" type="date" class="no-outline task_date" placeholder="Enter task here...">
    <span class="delete_task">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
    </span>
</span>
`;



// This adds a new project to the user's workspace:
document.getElementById("add_work_space").onclick = function () {
    const new_section = document.createElement('div'); // creates element
    new_section.classList.add("project"); //adds class
    new_section.classList.add("default"); //adds class
    new_section.setAttribute('draggable', true); // adds the draggable attr for drag and drop
    new_section.innerHTML = project_html; //  adds the html code into the created element.
    document.getElementById("workspace").appendChild(new_section);// appends it to the new section so the section is not updated.
    dragEventUpdate(); // updates the drag event listener
}

//happens on page load:
document.addEventListener('DOMContentLoaded', function() {
    overdue_modal_check();//checks for overdue module
    //checks what element the user clicks on:
    document.body.addEventListener('click', async function (event) {
        // if the user tries to delete project it will display the delete project modal:
        if (event.target.closest('.delete_project')) {
            document.getElementById('modal_delete').display = "flex";
            LAST_CHECKED_PROJECT = event.target.closest('.project'); // saves clicked project
        }
        // cycles the color type of the project:
        if (event.target.closest('.color_project')) {
            const colorList = ['default', 'orange', 'red', 'purple', 'blue', 'green']; // color order list
            let projectElement = event.target.closest('.project'); // gets clicked project
            if (projectElement) { // if element is real it will call the cycle class for project
                cycleClass(projectElement, colorList);
            }
        }
        // adds task to project:
        if (event.target.closest('.add_task')) {
            const new_section = document.createElement('div'); // creates task element
            new_section.classList.add("todo_template"); // adds class to element
            new_section.innerHTML = task_html; //loads element with task html
            let projectElement = event.target.closest('.project'); //selects clicked project
            projectElement.querySelector(".todo_section").appendChild(new_section); // appends html to project
        }
        //deletes task in project
        if (event.target.closest('.delete_task')) {
            let taskElement = event.target.closest('.todo_template'); // gets selected task
            if (taskElement) { // if it is real it removes it from project
                taskElement.remove();
            }
        }
    });
});
// cycles element classes from list
function cycleClass(element, classNames) {
    // deselects current class
    const currentClassIndex = classNames.findIndex(className => element.classList.contains(className));
    if (currentClassIndex !== -1) {
        element.classList.remove(classNames[currentClassIndex]);
    }
    //adds next class in list
    const nextClassIndex = (currentClassIndex + 1) % classNames.length;
    element.classList.add(classNames[nextClassIndex]);
}
// ?modal stuff
// checks for overdue tasks on launch:
function overdue_modal_check() {
    OUT_OF_DATE = []; // global list of overdue tasks

    // breaks down date into a comparable number
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    const today_value = (year*10000) + (month * 100) + (day);

    // gets the date of each created task.
    document.querySelectorAll('.task_date').forEach( el => {
        let date_items = el.value.split('-');
        let task_value = (date_items[0]*10000) + (date_items[1] * 100) + (date_items[2]*1);
        if (task_value < today_value) {
            OUT_OF_DATE.push(el);
        }
        console.log("today: " + today_value + "| task: " + task_value);
    });

    //if there are no out of date tasks, exit the function
    if (OUT_OF_DATE.length < 1) return;

    // show modal for overdue tasks
    document.getElementById('modal_overdue').style.display = "flex";
}

// if the user clicks delete all on the overdue task delete modal:
function delete_task_check(){
    //deletes each out of date element that is included in out of date global list.
    OUT_OF_DATE.forEach( el => {
        el.closest('.todo_template').remove();
    });
    // hides modal
    document.getElementById('modal_overdue').style.display = "none";
}
// if the user clicks keep all: hides modal
function delete_task_hide() {
    document.getElementById('modal_overdue').style.display = "none";
}

// removes project if that is what the user clicked
function delete_modal_check(){
    let projectElement = LAST_CHECKED_PROJECT;
    if (projectElement) {
        projectElement.remove();
    }
    document.getElementById('modal_delete').style.display = "none";
}
// hides modal if that is what the user clicked
function delete_modal_hide() {
    document.getElementById('modal_delete').style.display = "none";
}

// ?Drag and drop stuff
// removes over class from all projects
function handleDragEnd() {
    let items = document.querySelectorAll('#workspace .project');
    items.forEach(function (item) {
        item.classList.remove('over');
    });
}
// adds over class
function handleDragEnter() {
    this.classList.add('over');
}
// removes over class
function handleDragLeave() {
    this.classList.remove('over');
}
// prevents page refresh
function handleDragOver(e) {
    e.preventDefault();
    return false;
}


// the problem section, tutorial guy did not share his secrets on this section
function handleDragStart(e) {
    source_element = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", this.outerHTML);
}
//tutorial guy did not share his secrets on this section
function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    if (source_element !== this) {
        source_element.outerHTML = this.outerHTML;
        this.outerHTML = e.dataTransfer.getData("text/html");
        source_element = ""
        dragEventUpdate()
    }
    return false;
}

// adds these event listeners for every project
function dragEventUpdate() {
    let items = document.querySelectorAll('#workspace .project');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
}


// saves input value to inner html or element value for each ype of input:
function save_input_data(element) { // text, dates
    element.setAttribute("value", element.value);
    console.log(element.value)
}

function save_input_check(element) {// check boxes
    element.setAttribute("checked", element.checked);
}

function save_input_note(element){ // text areas
    element.innerHTML = element.value;
}