var check_circles = document.getElementsByClassName("check");
var todos = document.getElementsByClassName("todo");
var close_btn = document.getElementsByClassName("close");
var input_text = document.getElementById("addnew");
var clear_completed = document.getElementById("clear");
var filter_all = document.getElementById("all");
var filter_active = document.getElementById("active");
var filter_completed = document.getElementById("completed");
var count_todos = 0;

todos_counter();

/* COUNT TODO ITEMS */
function todos_counter() {
    for(var i = 0; i < todos.length; i++) {
        if(!todos[i].classList.contains("complete"))
        count_todos++;
    }
    document.getElementById("count").innerHTML = count_todos + " items left";
}

/* ADD EVENT FOR INPUT (ENTER KEY) */
input_text.addEventListener('keyup', function(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
        add_todo();
    }
})

/* ADD EVENTS FOR CHECK CIRCLES, CLOSE BUTTONS AND LINE THROUGH TEXT */
for(var i = 0; i < check_circles.length; i++) {
    check_circles[i].addEventListener('click', check_1);
}
for(var i = 0; i < todos.length; i++) {
    todos[i].addEventListener('click', check_2);
}
for(var i = 0; i < close_btn.length; i++) {
    close_btn[i].addEventListener('click', deleteitem);
}

/* ADD NEW TODO */
function add_todo() {
    var li = document.createElement("li");
    var input_value = input_text.value;
    var t = document.createTextNode(input_value);

    var span_check = document.createElement("span");
    span_check.className = "check";
    span_check.addEventListener('click', check_1);
    li.appendChild(span_check);

    var p = document.createElement("p");
    p.appendChild(t);
    p.className = "todo";
    p.addEventListener('click', check_2);
    li.appendChild(p);

    var span_close = document.createElement("span");
    span_close.className = "close";
    span_close.addEventListener('click', deleteitem);
    li.appendChild(span_close);
    
    if(input_value === '') {
        alert('You must write something!');
    } else {
        document.getElementById("list_items").appendChild(li);
    }
    input_text.value = "";   
    count_todos++;
    document.getElementById("count").innerHTML = count_todos + " items left";
}

/* FIND INDEX OF CHECK CIRCLE AND TODO TEXT */
function check_1() {
    var index;
    for(var i = 0; i < check_circles.length; i++) {
        if(check_circles[i] === this)
        index = i;
    }
    check(index);
}
function check_2() {
    var index;
    for(var i = 0; i < todos.length; i++) {
        if(todos[i] === this)
        index = i;
    }
    check(index);
}

/* MARK TODO ITEMS AS COMPLETED */
function check(index) {
    if(check_circles[index].classList.contains("completed")) {
        check_circles[index].classList.remove("completed");
        todos[index].classList.remove("complete");
        count_todos++;
        document.getElementById("count").innerHTML = count_todos + " items left";
    } else {
        check_circles[index].classList.add("completed");
        todos[index].classList.add("complete");
        count_todos--;
        document.getElementById("count").innerHTML = count_todos + " items left";
    }
}

/* DELETE TODO ITEMS */
function deleteitem() {
    var index;
    for(var i = 0; i < close_btn.length; i++) {
        if(close_btn[i] === this) index = i;
    }
    if(todos[index].classList.contains("complete")) {
        document.getElementById("count").innerHTML = count_todos + " items left";
    } else {
        count_todos--;
        document.getElementById("count").innerHTML = count_todos + " items left";
    }

    var list = document.getElementById("list_items");
    var list_tags = list.getElementsByTagName("li");
    for(var i = 0; i < list_tags.length; i++) {
        if(i === index)
        list_tags[i].remove();
    }
}

/* DELETE ALL COMPLETED TODOS */
clear_completed.addEventListener('click', clearCompleted);
function clearCompleted() {
    var list = document.getElementById("list_items");
    var list_tags = list.getElementsByTagName("li");
    for(var i = 0; i < todos.length; i++) {
        if(todos[i].classList.contains("complete")) {
        list_tags[i].remove(); 
        i--;
        }
    }
}

/* FILTER ALL/ACTIVE/COMPLETED TODOS */
filter_active.addEventListener('click', active_todo);
filter_completed.addEventListener('click', completed_todo);
filter_all.addEventListener('click', all_todo);
function active_todo() {
    filter_active.classList.add("active");
    filter_all.classList.remove("active");
    filter_completed.classList.remove("active");
    for(var i = 0; i < todos.length; i++) {
        var div = todos[i].parentElement;
        if(todos[i].classList.contains("complete")) {
            div.style.display = 'none';
        } else {
            div.style.display = 'flex';
        }
    }
}

function completed_todo() {
    filter_active.classList.remove("active");
    filter_all.classList.remove("active");
    filter_completed.classList.add("active");
    for(var i = 0; i < todos.length; i++) {
        var div = todos[i].parentElement;
        if(todos[i].classList.contains("complete")) {
            div.style.display = 'flex';
        } else {
            div.style.display = 'none';
        }
    }
}

function all_todo() {
    filter_active.classList.remove("active");
    filter_all.classList.add("active");
    filter_completed.classList.remove("active");
    for(var i = 0; i < todos.length; i++) {
        var div = todos[i].parentElement;
        div.style.display = 'flex';
    }
}

/* DRAG AND DROP */

var container = document.querySelector(".list");
var items = document.querySelectorAll(".li_item");

items.forEach(element => {
    element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
    })
    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    })
})

container.addEventListener('dragover', e => {
    e.preventDefault();
    var afterElement = getAfterElement(e.clientY);
    var draggingItem = document.querySelector('.dragging');
    container.insertBefore(draggingItem, afterElement);
})

function getAfterElement(y) {
    var items_arr = [...container.querySelectorAll('.li_item:not(.dragging)')];
    var closest_child, closest = Number.NEGATIVE_INFINITY;

    for(var i = 0; i < items_arr.length; i++) {
        var box = items_arr[i].getBoundingClientRect();
        var result = y - box.top - box.height/2;

        if(result < 0 && result > closest) {
            closest = result;
            closest_child = items_arr[i];
        }
    }
    return closest_child;
}

/* TOGGLE DARK/LIGHT MODE */

var btn = document.querySelector(".mode-icon");
var topImg = document.querySelector(".top-img");
var sort = document.querySelector(".sort");

btn.addEventListener('click', changeMode);

function changeMode() {
    if(document.body.classList.contains("light")) {
        document.body.classList.remove("light");
        topImg.classList.remove("light");
        btn.classList.remove("light");
        sort.classList.remove("light");
    } else {
        document.body.classList.toggle("light");
        topImg.classList.add("light");
        btn.classList.add("light");
        sort.classList.add("light");
    }
}

