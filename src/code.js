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

function onCarAmount(num)
{

    let p = '<p class="text-danger" id="car-error">Number must be over zero</p>';
    let pExist = document.getElementById("car-error");

    if (num <= 0)
    {
        if (!pExist)
        {
            document.getElementById("car-usage").insertAdjacentHTML('beforebegin', p);
        }
    } else {
        if (pExist)
        {
            pExist.removeChild(pExist);
        }
        //Create new elements for the new form inputs as it is dynamic, runs during runtime. Whereas the others are static and does not need to change
        for (let i = 1; i <= num; i++)
        {
            let title = '<h4>Car ' + i + '</h3>';
            document.getElementById("car-usage").insertAdjacentHTML('beforebegin', title);
        }
    }
}

 //Function to calculate the total carbon footprint
 function calculateCarbonFootprint() {
    //Get the values entered in the form
    const electricityUsage = Number(document.getElementById("electricity-usage").value);
    const gasUsage = Number(document.getElementById("gas-usage").value);
    const oilUsage = Number(document.getElementById("oil-usage").value);
    const carMileage = Number(document.getElementById("car-mileage").value);
    const flightsShort = Number(document.getElementById("flight-less-usage").value);
    const flightsLong = Number(document.getElementById("flight-over-usage").value);
    const newspaperRecycling = document.getElementById("newspaperYes").checked;
    const aluminumRecycling = document.getElementById("aluminumYes").checked;
    
    //Calculate the total carbon footprint
    let totalCarbonFootprint = (electricityUsage * 105) + (gasUsage * 105) + (oilUsage * 113) + (carMileage * 0.79) + (flightsShort * 1100) + (flightsLong * 4400);
    if (!newspaperRecycling) {
    totalCarbonFootprint += 184;
    }
    if (!aluminumRecycling) {
    totalCarbonFootprint += 166;
    }
    //Debugging
    console.log(electricityUsage);
    console.log(gasUsage);
    console.log(oilUsage);
    console.log(carMileage);
    console.log(flightsShort);
    console.log(flightsLong);
    console.log(newspaperRecycling);
    console.log(aluminumRecycling);
    console.log(totalCarbonFootprint);
    //Display the result
    document.getElementById("carbonresult").innerHTML = `Your total carbon footprint is ${totalCarbonFootprint.toFixed(2)} kg CO<sub>2</sub>e per year.`;
} 
