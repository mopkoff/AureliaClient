function selectX(arg, value) {
    document.getElementById("inputX").value = value;
}

function selectR(arg, value) {
    if (value <= 0){
        alert("Incorrect R choice")
        arg.checked = false;
    }
    else
        document.getElementById("inputR").value = value;
}