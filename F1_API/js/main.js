const DOMElements = {
    'formula1list' : '.formula-list'
}

let form = document.querySelector('#f1Form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    let querySeason = document.querySelector('#season').value
    let queryRound = document.querySelector('#round').value
    loadData (querySeason, queryRound)
});

const getData = async () => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    console.log(response);
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
     
};

const createList = (position, name, nationality, sponsor, points) => {
    const html = `<div class='card mt-3 mb-3' style="width: 18rem;">
            <ul class='list-group list-group-flush'>

                <li class='list-group-item'>Position: ${position}</li>
                <li class='list-group-item'>Name: ${name}</li>
                <li class='list-group-item'>Nationality: ${nationality}</li>
                <li class='list-group-item'>Sponsor: ${sponsor}</li>
                <li class='list-group-item'>Points: ${points}</li>
            </ul>
        </div>`;

        document.querySelector(DOMElements['formula1list']).insertAdjacentHTML('beforeend', html);
};

const loadData = async (season, round) => {
        const driverStandings = await getData(season, round);

        driverStandings.forEach(driver => {
            createList(driver.position, `${driver.Driver.givenName} ${driver.Driver.familyName}`, driver.Driver.nationality, driver.Constructors[0].name, driver.points);
        });
}

const clearData = () => {
     document.querySelector(DOMElements['formula1list']).innerHTML = '';
};


