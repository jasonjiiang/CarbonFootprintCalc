let currentTab = "house";
let prevTab;

function changeTab(tab) {
    prevTab = currentTab;
    currentTab = tab;
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

function extraForm(vis, div)
{
    const multipleCar = document.getElementById("multipleYes").checked;
    const noMultipleCar = document.getElementById("multipleNo").checked;
    const carAmount = document.getElementById("car-amount");
    const carAmountInput = document.getElementById("car-amount-input").value;
    const carUsage = document.getElementById("car-usage");
    const cars = document.getElementsByClassName("cars");
    const flightsTaken = document.getElementById("flights-taken");

    if (vis)
    {
        if (div == "multiple-car")
        {
            document.getElementById("multiple-car").classList.remove("d-none");
            if (multipleCar) extraForm(true, "car-amount");
            else if (noMultipleCar) extraForm(false, "car-amount");
            else if (!noMultipleCar && carAmountInput) onCarAmount(carAmountInput);
        }
        else if (div == "car-amount")
        {
            carAmount.classList.remove("d-none");
            carUsage.classList.add("d-none");
        }
        else if (div == "flights-taken") flightsTaken.classList.remove("d-none");
        return;
    }

    if (div == "multiple-car")
    {
        document.getElementById("multiple-car").classList.add("d-none");
        carUsage.classList.add("d-none");
        carAmount.classList.add("d-none");
       if (cars) carFormRemove();
    }
    else if (div == "car-amount")
    {
        carAmount.classList.add("d-none");
        carUsage.classList.remove("d-none");
    }
    else if (div == "flights-taken") flightsTaken.classList.add("d-none");
}

function onCarAmount(num)
{
    const error = document.getElementById("car-error");

    if (num <= 1)
    {
        error.classList.remove("d-none");
        return;
    }

    error.classList.add("d-none");

    //Create new elements for the new form inputs as it is dynamic (during runtime). Whereas the others are static and does not need to change
    let cars = document.getElementsByClassName("cars");

    if (cars.length > 0) carFormRemove();
    carForm(num);
}

function carForm(num)
{
    for (let i = 1; i <= num; i++)
    {
        let title = '<h3>Car ' + i + '</h3>';
        let emissionInput = '<div id="car-emissions' + i + '><label for="car-emissions' + i + '" class="form-label">Enter the emissions for "Car ' + i + 
            '":</label><input type="number" class="form-control" id="car-emissions-input' + i + '" onchange="calculateCarbonFootprint()"></div>';
        let mileageInput = '<div id="car-mileages' + i + '"><label for="car-mileages' + i + '" class="form-label">Enter your total yearly mileage for "Car ' + i + 
            '":</label><input type="number" class="form-control" id="car-mileages-input' + i + '" onchange="calculateCarbonFootprint()"></div>';
        document.getElementById("car-usage").insertAdjacentHTML('beforebegin', '<div class="mx-5 my-5 cars" id="car' + i + '">' + title + emissionInput + mileageInput + '</div>');
    }
}

function carFormRemove()
{
    const cars = document.getElementsByClassName("cars");

    for (let i = cars.length; i > 0; i--) document.getElementById("car" + i).remove();
}

function pressEnter(num, e)
{
    const key = e;
    if (key && key == 13) onCarAmount(num);
}

function scrollVis()
{
    const maxScroll = document.getElementById("parent").scrollHeight;
    const scroll = (document.getElementById("parent").scrollTop / maxScroll) * 3;

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

function resultTextError(bool, label)
{
    if (bool)
    {
        label.classList.remove("text-danger");
        return true;
    }

    label.classList.add("text-danger");
    label.innerHTML = "Form not complete";
}

function houseSectionComplete() {
    const household = Number(document.getElementById("household").value);
    const electricityUsage = Number(document.getElementById("electricity-usage").value);
    const gasUsage = Number(document.getElementById("gas-usage").value);
    const oilUsage = Number(document.getElementById("oil-usage").value);

    const householdResult = document.getElementById("householdResult");

    if (household && electricityUsage && gasUsage && oilUsage)
    {
        return resultTextError(true, householdResult);
    }

    resultTextError(false, householdResult);
}

function transportSectionComplete() {
    const carNo = document.getElementById("carNo").checked;
    const multipleCar = document.getElementById("multipleYes").checked;
    const carAmountInput = document.getElementById("car-amount-input").value;
    const cars = document.getElementsByClassName("cars");
    const carEmission = document.getElementById("car-emission-box").value;
    const carMile = document.getElementById("car-usage-box").value;
    const flightNo = document.getElementById("flightNo").checked;
    const flightsShort = document.getElementById("flight-less-usage").value;
    const flightsLong = document.getElementById("flight-over-usage").value;

    const transportResult = document.getElementById("transportResult");

    if ((carNo && flightNo) ||
        (carEmission && carMile && flightNo && !carNo && !multipleCar) ||
        (flightsShort && flightsLong && carNo && !flightNo) ||
        (carEmission && carMile && flightsShort && flightsLong && !carNo && !flightNo && !multipleCar))
    {
        return resultTextError(true, transportResult);
    }
    else if (multipleCar && carAmountInput && cars)
    {
        let carsFilled = true;

        for (let i = cars.length; i > 0; i--)
        {
            let emission = document.getElementById("car-emissions-input" + i).value;
            let mileage = document.getElementById("car-mileages-input" + i).value;

            if (!emission || !mileage)
            {
                carsFilled = false;
                break;
            }
        }

        if ((flightsShort && flightsLong && !flightNo && carsFilled) || (flightNo && carsFilled))
        {
            return resultTextError(true, transportResult)
        }
    }
    
    resultTextError(false, transportResult);
}

function recycleSectionComplete() {
    const newspaperRecyclingYes = document.getElementById("newspaperYes").checked;
    const newspaperRecyclingNo = document.getElementById("newspaperNo").checked;
    const aluminumRecyclingYes = document.getElementById("aluminumYes").checked;
    const aluminumRecyclingNo = document.getElementById("aluminumNo").checked;

    const recyclingResult = document.getElementById("recyclingResult");

    if ((newspaperRecyclingYes || newspaperRecyclingNo) && (aluminumRecyclingYes || aluminumRecyclingNo)) return resultTextError(true, recyclingResult);
    
    resultTextError(false, recyclingResult);
}

//Function to calculate the total carbon footprint
function calculateCarbonFootprint() {
    //Get the values entered in the form
    const household = Number(document.getElementById("household").value);
    const electricityUsage = Number(document.getElementById("electricity-usage").value);
    const gasUsage = Number(document.getElementById("gas-usage").value);
    const oilUsage = Number(document.getElementById("oil-usage").value);
    const carNo = document.getElementById("carNo").checked;
    const carEmission = Number(document.getElementById("car-emission-box").value); //Not yet used
    const carMileage = Number(document.getElementById("car-usage-box").value);
    const cars = document.getElementsByClassName("cars");
    const flightNo = document.getElementById("flightNo").checked;
    const flightsShort = Number(document.getElementById("flight-less-usage").value);
    const flightsLong = Number(document.getElementById("flight-over-usage").value);
    const newspaperRecyclingNo = document.getElementById("newspaperNo").checked;
    const aluminumRecyclingNo = document.getElementById("aluminumNo").checked;
    
    //Calculate the total carbon footprint
    let houseEmissions = ((electricityUsage * 105) + (gasUsage * 105) + (oilUsage * 113)) / household;
    let transportEmissions = 0;
    let recycleEmissions = 0;

    if (!carNo) transportEmissions += (carEmission * (carMileage * 1.60934));
    if (!flightNo) transportEmissions += ((flightsShort * 1100) + (flightsLong * 4400));

    if (cars)
    {
        for (let i = cars.length; i > 0; i--)
        {
            let emission = document.getElementById("car-emissions-input" + i).value;
            let mileage = document.getElementById("car-mileages-input" + i).value;

            transportEmissions += (emission * (mileage * 1.60934));
        }
    }

    if (newspaperRecyclingNo) recycleEmissions += 184;
    if (aluminumRecyclingNo) recycleEmissions += 166;

    //Convert to tonnes
    houseEmissions = houseEmissions / 1000
    transportEmissions = transportEmissions / 1000000
    recycleEmissions = recycleEmissions / 1000
    
    let totalCarbonFootprint = houseEmissions + transportEmissions + recycleEmissions;

    //Result labels
    const householdResult = document.getElementById("householdResult");
    const transportResult = document.getElementById("transportResult");
    const recyclingResult = document.getElementById("recyclingResult");
    const householdResultSection = document.getElementById("houseResultSection");
    const transportResultSection = document.getElementById("transportResultSection");
    const recyclingResultSection = document.getElementById("recycleResultSection");
    const totalCarbonResult = document.getElementById("totalCarbonResult");
    const averageResult = document.getElementById("averageDiff");

    //Display the results
    if (houseSectionComplete()) householdResult.innerHTML = `Your total household carbon footprint is ${houseEmissions.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;
    if (transportSectionComplete()) transportResult.innerHTML = `Your total transport carbon footprint is ${transportEmissions.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;
    if (recycleSectionComplete()) recyclingResult.innerHTML = `Your total recycling carbon footprint is ${recycleEmissions.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;

    //For the result section
    if (houseSectionComplete()) householdResultSection.innerHTML = `House carbon footprint emissions: ${houseEmissions.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;
    if (transportSectionComplete()) transportResultSection.innerHTML = `Transport carbon footprint emissions: ${transportEmissions.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;
    if (recycleSectionComplete()) recyclingResultSection.innerHTML = `Recycle carbon footprint emissions: ${recycleEmissions.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;
    
    totalCarbonResult.innerHTML = `Total carbon footprint: ${totalCarbonFootprint.toFixed(2)} tonnes of CO<sub>2</sub>e per year.`;

    //Calculates the difference between the user's footprint against the average
    const average  = 10
    const belowAverage = (((totalCarbonFootprint - average) / totalCarbonFootprint) * 100) / -1;
    const aboveAverage = (((average - totalCarbonFootprint) / average) * 100) /-1;

    if (totalCarbonFootprint < 10)
    {
        averageResult.innerHTML =  `${Math.round(belowAverage)}% below average`;
        return;
    }

    averageResult.innerHTML = `${Math.round(aboveAverage)}% above average`;
} 
