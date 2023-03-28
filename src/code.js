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
    const newspaperRecyclingYes = document.getElementById("newspaperYes").checked;
    const newspaperRecyclingNo = document.getElementById("newspaperNo").checked;
    const aluminumRecyclingYes = document.getElementById("aluminumYes").checked;
    const aluminumRecyclingNo = document.getElementById("aluminumNo").checked;
    
    //Calculate the total carbon footprint
    let houseEmissions = (electricityUsage * 105) + (gasUsage * 105) + (oilUsage * 113);
    let transportEmissions = (carMileage * 0.79) + (flightsShort * 1100) + (flightsLong * 4400);
    let recycleEmissions = 0;
    let totalCarbonFootprint = houseEmissions + transportEmissions + recycleEmissions;
    if (newspaperRecyclingNo===true) {
    recycleEmissions += 184;   
    totalCarbonFootprint += 184;
    }
    if (aluminumRecyclingNo===true) {
    recycleEmissions += 166;
    totalCarbonFootprint += 166;
    }
    //Debugging
    console.log(electricityUsage);
    console.log(gasUsage);
    console.log(oilUsage);
    console.log(carMileage);
    console.log(flightsShort);
    console.log(flightsLong);
    console.log(newspaperRecyclingYes);
    console.log(newspaperRecyclingNo);
    console.log(aluminumRecyclingYes);
    console.log(aluminumRecyclingNo);
    console.log(totalCarbonFootprint);
    //Display the result
    document.getElementById("householdResult").innerHTML = `Your total household carbon footprint is ${houseEmissions.toFixed(2)} kg CO<sub>2</sub>e per year.`;
    document.getElementById("transportResult").innerHTML = `Your total transport carbon footprint is ${transportEmissions.toFixed(2)} kg CO<sub>2</sub>e per year.`;
    document.getElementById("recyclingResult").innerHTML = `Your total recycling carbon footprint is ${recycleEmissions.toFixed(2)} kg CO<sub>2</sub>e per year.`;
    document.getElementById("carbonResult").innerHTML = `Your total carbon footprint is ${totalCarbonFootprint.toFixed(2)} kg CO<sub>2</sub>e per year.`;
} 
