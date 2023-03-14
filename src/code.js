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
        changeTab();
        changeCalc();
    }
}

function changeTab()
{
    //Changes tab bar
    document.getElementById(currentTab+"-button").classList.add("active");
    document.getElementById(prevTab+"-button").classList.remove("active");
}

function changeCalc()
{
    //Changes calculator form
    document.getElementById(currentTab+"-form").classList.add("d-block");
    document.getElementById(currentTab+"-form").classList.remove("d-none");
    document.getElementById(prevTab+"-form").classList.add("d-none");
    document.getElementById(prevTab+"-form").classList.remove("d-block");
}

function enableFlight()
{
    document.getElementById("flights-taken").classList.add("d-block");
    document.getElementById("flights-taken").classList.remove("d-none");
}

function disableFlight()
{
    document.getElementById("flights-taken").classList.add("d-none");
    document.getElementById("flights-taken").classList.remove("d-block");
}

window.onload = function()
{
    
}