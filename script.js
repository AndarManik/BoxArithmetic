var clickType = "add"; 

function setClickToDelete() {
    clickType = "delete";
    document.getElementById("setClick").onclick = () => {
        setClickToAdd();
    }
    document.getElementById("setClick").textContent = "Set click to add"
}

function setClickToAdd() {
    clickType = "add";
    document.getElementById("setClick").onclick = () => {
        setClickToDelete();
    }
    document.getElementById("setClick").textContent = "Set click to delete"
}

document.addEventListener('DOMContentLoaded', function () {
    const containerLeft = document.getElementById('square-container-left');
    containerLeft.addEventListener('click', function (event) {
        handleSquareClick(event, containerLeft);
    });

    const containerRight = document.getElementById('square-container-right'); 
    containerRight.addEventListener('click', function (event) {
        handleSquareClick(event, containerRight);
    });
});

function handleSquareClick(event, container) {
    if (clickType === "add") {
        if (event.target.classList.contains('square') || event.target.classList.contains('squareC')) {
            const newSquare = document.createElement('div');
            newSquare.classList.add(event.target.classList.contains('square') ? 'squareC' : 'square');
            event.target.appendChild(newSquare);
            sortAllLevels(container);
        }
    } else if (clickType === "delete") {
        if ((event.target.classList.contains('square') || event.target.classList.contains('squareC')) && event.target.parentNode !== container) {
            event.target.remove();
            // No need to call sortAllLevels since we are removing an element
        }
    }
}


function findMax(nodeLeft, nodeRight) {
    const depthLeft = findMaxDepth(nodeLeft, 1);
    const depthRight = findMaxDepth(nodeRight, 1);

    if(depthLeft === depthRight) {

    }
}

// Recursive function to find the maximum depth of a node
function findMaxDepth(node, currentDepth) {
    let maxDepth = currentDepth;
    for (const child of node.children) {
        maxDepth = Math.max(maxDepth, findMaxDepth(child, currentDepth + 1));
    }
    return maxDepth;
}

// Function to sort divs at a given level based on their maximum depth
function sortDivs(parent) {
    // Get all the child divs as an array
    const childDivs = Array.from(parent.children);

    // Sort the array based on the maximum depth of each div
    childDivs.sort((a, b) => findMaxDepth(b, 1) - findMaxDepth(a, 1));

    // Append the sorted divs back to the parent
    childDivs.forEach(div => parent.appendChild(div));
}

// Recursive function to sort all levels of nested divs
function sortAllLevels(parent) {
    for (const child of parent.children) {
        if (child.children.length > 0) {
            sortAllLevels(child); // Recursively sort deeper levels first
        }
    }
    sortDivs(parent); // Then sort the current level
}

function clearOutput(){
    const element = document.getElementById('output');
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
    return element;
}

function add() {
    const plusElement = plus(document.getElementById('square-container-left').children[0],document.getElementById('square-container-right').children[0]);
    const element = clearOutput();
    element.appendChild(plusElement);
    sortAllLevels(element);
}

function plus(containerLeft, containerRight) {
    var newElement = document.createElement('div');
    newElement.classList.add('square');
    for (var i = 0; i < containerLeft.children.length; i++) {
        newElement.appendChild(containerLeft.children[i].cloneNode(true));
    }

    for (var j = 0; j < containerRight.children.length; j++) {
        newElement.appendChild(containerRight.children[j].cloneNode(true));
    }

    sortAllLevels(newElement);

    return newElement;
}

function mult(containerLeft, containerRight) {
    var newElement = document.createElement('div');
    newElement.classList.add('square');
    for (var i = 0; i < containerLeft.children.length; i++) {
        for (var j = 0; j < containerRight.children.length; j++) {
            const plusElement = plus(containerLeft.children[i],containerRight.children[j]);
            newElement.appendChild(plusElement);
        }
    }

    sortAllLevels(newElement);

    return newElement;
}

function carat() {
    const output =  genericOperation(document.getElementById('square-container-left').children[0],document.getElementById('square-container-right').children[0], 2)
    const element = clearOutput();
    element.appendChild(output);
}
function generic(number) {
    const output =  genericOperation(document.getElementById('square-container-left').children[0],document.getElementById('square-container-right').children[0], number)
    const element = clearOutput();
    element.appendChild(output);
}

//0 is plus
function genericOperation(containerLeft, containerRight, operationIndex) {
    if(operationIndex === 0) {
        return plus(containerLeft, containerRight)
    }

    var newElement = document.createElement('div');
    newElement.classList.add('square');
    for (var i = 0; i < containerLeft.children.length; i++) {
        for (var j = 0; j < containerRight.children.length; j++) {
            const plusElement = genericOperation(containerLeft.children[i],containerRight.children[j], operationIndex - 1);
            newElement.appendChild(plusElement);
        }
    }

    sortAllLevels(newElement);

    return newElement;
}


function times() {
    const multElement = mult(document.getElementById('square-container-left').children[0],document.getElementById('square-container-right').children[0]);
    const element = clearOutput();
    element.appendChild(multElement);
}

document.getElementById('square-container-left').addEventListener('mousemove', function(e) {
    let elements = document.elementsFromPoint(e.clientX, e.clientY);
    let topElement = elements.find(el => el.classList.contains('square') || el.classList.contains('squareC'));

    document.querySelectorAll('.square').forEach(el => el.classList.remove('hover-effect'));
    document.querySelectorAll('.squareC').forEach(el => el.classList.remove('hover-effect'));


    if (topElement) {
        topElement.classList.add('hover-effect');
    }
});

document.getElementById('square-container-right').addEventListener('mousemove', function(e) {
    let elements = document.elementsFromPoint(e.clientX, e.clientY);
    let topElement = elements.find(el => el.classList.contains('square') || el.classList.contains('squareC'));

    document.querySelectorAll('.square').forEach(el => el.classList.remove('hover-effect'));
    document.querySelectorAll('.squareC').forEach(el => el.classList.remove('hover-effect'));


    if (topElement) {
        topElement.classList.add('hover-effect');
    }
});



function getInputValue() {
    var inputVal = document.getElementById("numberInput").value;
    return parseInt(inputVal, 10); // Parse the value to an integer
}