let currentTab = "house";
let prevTab;

function changeTab(tab) {
    prevTab = currentTab;
    currentTab = tab;
}

function changeLayout(tab)
{
    changeTab(tab)
    if (currentTab != prevTab)
    {
        //Changes tab bar
        document.getElementById(currentTab+"-button").classList.add("active");
        document.getElementById(prevTab+"-button").classList.remove("active");
        //Changes calculator form
        document.getElementById(currentTab+"-form").classList.add("d-block");
        document.getElementById(currentTab+"-form").classList.remove("d-none");
        document.getElementById(prevTab+"-form").classList.add("d-none");
        document.getElementById(prevTab+"-form").classList.remove("d-block");
    }
}

function extraForm(vis, div)
{
    if (vis)
    {
        document.getElementById(div).classList.add("d-block");
        document.getElementById(div).classList.remove("d-none");
    } else {
        document.getElementById(div).classList.add("d-none");
        document.getElementById(div).classList.remove("d-block");
    }
}

window.onload = function()
{
    
}