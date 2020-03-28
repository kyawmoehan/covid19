const endPoint = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php";
const search = document.querySelector('#search');
const display = document.querySelector('#display');
const displayWorld = document.querySelector('#world-wide');
let countries;

// fetch data
fetch(endPoint, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "ddf542925cmshdcef509621c9c15p17b8dbjsn16b58a203c91"
	}
})
.then(response => {
	return response.json();
})
.then(data => {
    countries = data.countries_stat;
    worldWide();
});

// world wide 
function worldWide() {
    worldWideCase = countries.reduce((acc, curr) => {
        return acc + parseInt(curr.cases.replace(/,/g, ''));
    },0);
    worldWideDeath = countries.reduce((acc, curr) => {
        return acc + parseInt(curr.deaths.replace(/,/g, ''));
    },0);
    worldWideRecov = countries.reduce((acc, curr) => {
        return acc + parseInt(curr.total_recovered.replace(/,/g, ''));
    },0);
    worldWideNewcase = countries.reduce((acc, curr) => {
        return acc + parseInt(curr.new_cases.replace(/,/g, ''));
    },0);
    // call display world wide
    displayWorldWide();
}

// number with comma
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// display world wide
function displayWorldWide() {
    displayWorld.innerHTML = `<h2 class="text-info font-weight-bold text-center py-4">World Wide Cases</h2>
    <div class="row text-center pb-4">
        <div class="col-md-3 py-2">
            <h4>Cases</h4>
            <h3>${numberWithCommas(worldWideCase)}</h3>
        </div>
        <div class="col-md-3 text-danger py-2">
            <h4>Death</h4>
            <h3>${numberWithCommas(worldWideDeath)}</h3>
        </div>
        <div class="col-md-3 text-success py-2">
            <h4>Recovered</h4>
            <h3>${numberWithCommas(worldWideRecov)}</h3>
        </div>
        <div class="col-md-3 text-primary py-2">
            <h4>New Cases</h4>
            <h3>${numberWithCommas(worldWideNewcase)}</h3>
        </div>
    </div>`;
}

// find matach
function findMatches(worldToMatch, countries) {
    return countries.filter(country=> {
        const regex = new RegExp(worldToMatch, 'gi');
        return country.country_name.match(regex);
    });
}

// display match
function displayMatch(e){
    if(this.value === ""){
        display.innerHTML = ``;
        return;
    }
    const countrieArray = findMatches(this.value, countries);
    let html = '';
    countrieArray.forEach(county => {
        html += `
        <div class="row card-header my-3">
            <div class="col-md-4">
                <h4 class="font-weight-bold">${county.country_name}</h4>
            </div>
            <div class="col-md-2">
                <p>Cases: ${county.cases}</p> 
            </div>
            <div class="col-md-2 text-danger">
                <p>Death: ${county.deaths}</p> 
            </div>
            <div class="col-md-2 text-success">
                <p>Recovered: ${county.total_recovered}</p>
            </div>
            <div class="col-md-2 text-primary">
                <p>New Cases: ${county.new_cases}</p> 
            </div>
        </div>
        `;
    });

    display.innerHTML = html;
}


// get search input
search.addEventListener('change', displayMatch);
search.addEventListener('keyup', displayMatch);




