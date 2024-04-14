// The html code the elements being added in.
const project_html = document.getElementById("default_project").innerHTML;
const task_html = document.getElementById("default_todo_template").innerHTML;



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
            document.getElementById('modal_delete').style.display = "flex";
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