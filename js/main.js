document.getElementById("add_work_space").onclick = function () {
    const new_section = document.createElement('div');
    new_section.classList.add("project");
    new_section.classList.add("default");
    new_section.setAttribute('draggable', true);
    new_section.innerHTML = `
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
    `
    document.getElementById("workspace").appendChild(new_section);

    dragEventUpdate();
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.closest('.delete_project')) {
            let projectElement = event.target.closest('.project');
            if (projectElement) {
                projectElement.remove();
            }
        }
        let colorList;
        if (event.target.closest('.color_project')) {
            colorList = ['default', 'orange', 'red', 'purple', 'blue', 'green']
            let projectElement = event.target.closest('.project');
            if (projectElement) {
                cycleClass(projectElement, colorList);
            }
        }
        if (event.target.closest('.add_task')) {
            const new_section = document.createElement('div');
            new_section.classList.add("todo_template");
            new_section.innerHTML = `
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
            let projectElement = event.target.closest('.project');
            projectElement.querySelector(".todo_section").appendChild(new_section);
        }
        if (event.target.closest('.delete_task')) {
            let taskElement = event.target.closest('.todo_template');
            if (taskElement) {
                taskElement.remove();
            }
        }
    });
});

function cycleClass(element, classNames) {
    const currentClassIndex = classNames.findIndex(className => element.classList.contains(className));
    if (currentClassIndex !== -1) {
        element.classList.remove(classNames[currentClassIndex]);
    }
    const nextClassIndex = (currentClassIndex + 1) % classNames.length;
    element.classList.add(classNames[nextClassIndex]);
}

// Drag and drop stuff


function handleDragEnd(e) {
    let items = document.querySelectorAll('#workspace .project');
    items.forEach(function (item) {
        item.classList.remove('over');
    });
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}


// the problem section
function handleDragStart(e) {
    source_element = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", this.outerHTML);
}

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

function save_input_data(element) {
    element.setAttribute("value", element.value);
    console.log(element.value)
}

function save_input_check(element) {
    element.setAttribute("checked", element.checked);
    console.log(element.checked)
}

function save_input_note(element){
    element.innerHTML = element.value;
    console.log(element.value)
}

function delete_modal_check(){

}