let currentTab = "type";
let prevTab;
let calc = "none";

function changeTab(tab) {
    if (calc == "none")
    {
        alert("Pick calculator type");
    }
    else
    {
        prevTab = currentTab;
        currentTab = tab;
    }
}

function changeLayout(tab)
{
    changeTab(tab);
    if (currentTab != prevTab && prevTab != null)
    {
        //Changes tab bar
        document.getElementById(currentTab+"-button").classList.add("active");
        document.getElementById(prevTab+"-button").classList.remove("active");
        //Changes calculator form
        document.getElementById(currentTab+"-form").classList.remove("d-none");
        document.getElementById(prevTab+"-form").classList.add("d-none");
    }
}

function calcType(type)
{
    if (calc != "none")
    {
        let house =  document.getElementById("house-form");
        let transport =  document.getElementById("transport-form");
        let recycle =  document.getElementById("recycle-form");

        let multipleCar = document.getElementById("multiple-car");
        let carAmount = document.getElementById("car-amount");
        let carUsage = document.getElementById("car-usage")
        let cars = document.getElementsByClassName("cars");

        house.reset();
        transport.reset();
        recycle.reset();

        multipleCar.classList.add("d-none");
        carAmount.classList.add("d-none");
        carUsage.classList.add("d-none");

        if (cars)
        {
            carFormRemove();
        }
    }

    calc = type;
}

function extraForm(vis, div)
{
    let multipleCar = document.getElementById("multipleYes");
    let carAmount = document.getElementById("car-amount");
    let carAmountInput = document.getElementById("car-amount-input").value
    let cars = document.getElementsByClassName("cars");

    if (calc == "simple")
    {
        if (div == "multiple-car")
        {
            if (vis)
            {
                document.getElementById("car-usage").classList.remove("d-none");
            } else {
                document.getElementById("car-usage").classList.add("d-none");
            }
        }
    }
    else if (calc == "advanced")
    {
        if (vis)
        {
            document.getElementById(div).classList.remove("d-none");

            if (div == "multiple-car")
            {
                if (multipleCar.checked == true)
                {
                    extraForm(true, "car-amount");
                }
                
                if (carAmountInput)
                {
                    onCarAmount(carAmountInput);
                }
            }

            if (multipleCar.checked == true)
                {
                    if (carAmountInput)
                    {
                        onCarAmount(carAmountInput);
                    }
                }
        } else {
            document.getElementById(div).classList.add("d-none");

            if (div == "multiple-car")
            {
                if (carAmount)
                {
                    carAmount.classList.add("d-none");
                }

                if (cars)
                {
                    carFormRemove();
                }
            }
        }
    }
}

function onCarAmount(num, e)
{
    let error = document.getElementById("car-error");

    if (num <= 1)
    {
        error.classList.remove("d-none");
    } else {
        error.classList.add("d-none");

        //Create new elements for the new form inputs as it is dynamic (during runtime). Whereas the others are static and does not need to change
        let cars = document.getElementsByClassName("cars");

        if (cars.length > 0)
        {
            carFormRemove();
        }
        carForm(num);
    }
}

function carForm(num)
{
    for (let i = 1; i <= num; i++)
    {
        let title = '<h3>Car ' + i + '</h3>';
        let emissionInput = '<div id="car-emissions' + i + '><label for="car-emissions' + i + '" class="form-label">Enter the emissions for "Car ' + i + 
            '":</label><input type="number" class="form-control" id="car-emissions' + i + '"></div>';
        let mileageInput = '<div id="car-mileages' + i + '"><label for="car-mileages' + i + '" class="form-label">Enter your total yearly mileage for "Car ' + i + 
            '":</label><input type="number" class="form-control" id="car-mileages' + i + '"></div>';
        document.getElementById("car-usage").insertAdjacentHTML('beforebegin', '<div class="mx-5 my-5 cars" id="car' + i + '">' + title + emissionInput + mileageInput + '</div>');
    }
}

function carFormRemove()
{
    let cars = document.getElementsByClassName("cars");

    for (let i = cars.length; i > 0; i--)
    {
        document.getElementById("car" + i).remove();
    }
}

function pressEnter(num, e)
{
    let key = e;
    if (key && key == 13)
    {
        onCarAmount(num);
    }
}

function scrollVis()
{
    let maxScroll = document.getElementById("parent").scrollHeight;
    let scroll = (document.getElementById("parent").scrollTop / maxScroll) * 3;

    //all of the class and href changes are needed in case the 
    //user uses the nav bar instead of just the arrows

    if (scroll <= 0.5) //top page - about
    {
        document.getElementById("nav").classList.remove("d-none");
        document.getElementById("up").classList.add("d-none");
        document.getElementById("down").classList.remove("d-none");
        document.getElementById("down").href = "#calc";
        document.getElementById("footer").classList.add("d-none");
    }
    else if (scroll >= 1.5) { //bottom page - faq
        document.getElementById("nav").classList.add("d-none");
        document.getElementById("up").classList.remove("d-none");
        document.getElementById("up").href = "#calc"
        document.getElementById("down").classList.add("d-none");
        document.getElementById("footer").classList.remove("d-none");
    } else { //middle page - calc
        document.getElementById("nav").classList.add("d-none");
        document.getElementById("up").classList.remove("d-none");
        document.getElementById("up").href = "#about"
        document.getElementById("down").classList.remove("d-none");
        document.getElementById("down").href = "#faq";
        document.getElementById("footer").classList.add("d-none");
    }
}

//Function to calculate the total carbon footprint
function calculateCarbonFootprint() {
    //Get the values entered in the form
    const electricityUsage = Number(document.getElementById("electricity-usage").value);
    const gasUsage = Number(document.getElementById("gas-usage").value);
    const oilUsage = Number(document.getElementById("oil-usage").value);
    const carMileage = Number(document.getElementById("car-usage-box").value);
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
