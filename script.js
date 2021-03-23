var header = document.querySelector('header');
var section = document.querySelector('section');

function setTitle(titre, sousTitre) {
    sectionTitre.innerHTML = "";

    var myH1 = document.createElement('h1');
    myH1.textContent = titre;
    sectionTitre.appendChild(myH1);

    var myPara = document.createElement('p');
    myPara.textContent = sousTitre;


    sectionTitre.appendChild(myPara);
}

function getJsonResponse(requestURL, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        if(request.status != 200)
        {
            setTitle(request.response.message);
        }
        else
        {
            callback(request.response);
            console.log(request.response);
        }
    }
}

function loadContent(jsonResponse) {
    setTitle("Statistiques COVID-19 par continent");
    showResults(jsonResponse);
}

getJsonResponse("https://disease.sh/v3/covid-19/continents", loadContent);


function showResults(jsonObj) {
    var heroes = jsonObj;

    for (var i = 0; i < heroes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = heroes[i].continent;
        myPara1.textContent = 'cases: ' + heroes[i].cases;
        myPara2.textContent = 'tests: ' + heroes[i].tests;
        myPara3.textContent = 'deaths: ' + heroes[i].deaths;

        var superPowers = heroes[i].countries;
        for (var j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}

/* PAYS */

function countryHTML(country) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var nbCases = document.createElement('p');
    var nbTests = document.createElement('p');
    var nbDeaths = document.createElement('p');

    myH2.textContent = country.country;
    nbCases.textContent = 'cases: ' + country.cases;
    nbTests.textContent = 'tests: ' + country.tests;
    nbDeaths.textContent = 'deaths: ' + country.deaths;


    myArticle.appendChild(myH2);
    myArticle.appendChild(nbCases);
    myArticle.appendChild(nbTests);
    myArticle.appendChild(nbDeaths);

    section.appendChild(myArticle);
 }


function showCountry(jsonResponse) {

    if(Array.isArray(jsonResponse))
    {
        for(i=0 ; i < jsonResponse.length; i++) {
            countryHTML(jsonResponse[i]);
        }
    }
    else {
        countryHTML(jsonResponse);
    }

}


function continentHTML(continent) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var nbCases = document.createElement('p');
    var nbTests = document.createElement('p');
    var nbDeaths = document.createElement('p');

    myH2.textContent = continent.continent;
    nbCases.textContent = 'cases: ' + continent.cases;
    nbTests.textContent = 'tests: ' + continent.tests;
    nbDeaths.textContent = 'deaths: ' + continent.deaths;


    myArticle.appendChild(myH2);
    myArticle.appendChild(nbCases);
    myArticle.appendChild(nbTests);
    myArticle.appendChild(nbDeaths);

    section.appendChild(myArticle);
 }


function showContinent(jsonResponse) {

    if(Array.isArray(jsonResponse))
    {
        for(i=0 ; i < jsonResponse.length; i++) {
            continentHTML(jsonResponse[i]);
        }
    }
    else {
        continentHTML(jsonResponse);
    }

}

/* REHERCHE */

function showSearch() {
    let searchInput = document.getElementById("site-search");
    let searchText = searchInput.value;

    var searchType;
    if (document.querySelector('input[name=searchType]:checked')) {
        searchType = document.querySelector('input[name=searchType]:checked').value;
    }

    callback = function (jsonResponse) {
        //efface le contenu des sections
        sectionTitre.innerHTML = "";
        sectionResultat.innerHTML = "";


        setTitle("Résultat de recherche", "Terme recherché : " + searchText)

        if(searchType == "countries") {
            showCountry(jsonResponse);
        }
        else if(searchType == "continents") {
            showContinent(jsonResponse);
        }
    }

    getJsonResponse("https://disease.sh/v3/covid-19/" + searchType + "/" + searchText + "?strict=true", callback);

}


//S'il est coché, on récupère la valeur du bouton radio.


var searchButton = document.getElementById("search-btn");
searchButton.onclick = showSearch;

