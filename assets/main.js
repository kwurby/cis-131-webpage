document.getElementById("add_work_space").onclick = function () {
    const new_section = document.createElement('div');
    new_section.classList.add("project");
    new_section.classList.add("default");
    new_section.innerHTML = `
            <div class="top_workspace">
                <h1 class="project_title">
                    <div class="edit_option">
                        <svg class="delete_project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                        <svg class="color_project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
                        <svg class="add_task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                    </div>
                    <input type="text" class="no-outline project_title_text" placeholder="Project Title">
                </h1>
                <div class="users">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                    <span class="user_count">1</span>
                </div>
            </div>
            <div class="todo_section">
                <div class="todo_template">
                    <!--  -->
                    <input type="checkbox" class="checkbox-round" />
                    <input type="text" class="no-outline" placeholder="Enter task here...">
                </div>
            </div>
    `
    document.getElementById("workspace").appendChild(new_section);
}

function cycleClass(element, classNames) {
    const currentClassIndex = classNames.findIndex(className => element.classList.contains(className));
    if (currentClassIndex !== -1) {
        element.classList.remove(classNames[currentClassIndex]);
    }
    const nextClassIndex = (currentClassIndex + 1) % classNames.length;
    element.classList.add(classNames[nextClassIndex]);
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
                <input type="checkbox" class="checkbox-round" />
                <input type="text" class="no-outline" placeholder="Enter task here...">
            `;
            let projectElement = event.target.closest('.project');
            projectElement.querySelector(".todo_section").appendChild(new_section);
        }
    });
});