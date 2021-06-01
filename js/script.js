"use strict";

fetch("https://swapi.dev/api/people/")
    .then(function (response){ 
        // Listen for the RESPONSE from the fetch() - Promise #1
        return response.json();
    })
    .then(function (data){
        //Listens for the DATA from response.json() - Promise #2
        buildContentCallback(data);
        return data;
    })
    .catch(function (error) {
        // Listens for a REJECTION from the fetch() promise
        console.error ('ERROR:', error);
        return error;
    })

    function buildContentCallback(data)
    {
        console.log("The data is: ", data.results);
        const listOfNames = document.createElement("ul");
        const characters = data.results;
        characters.forEach(function(character){
            const characterNameItem = document.createElement("li");
            characterNameItem.innerText = character.name;
            listOfNames.append(characterNameItem);
        })

        const root = document.querySelector("#root");
        root.append(listOfNames);
    
    }

    document.addEventListener("DOMContentLoaded", function (){
        //1. Get a form element
        //2. Add an event listener for the form submit
        //3. Get the value of the input
        //4. Use the value of the input to search the API
        //5. Append the results to #searchResults
        const searchForm = document.querySelector("#searchForm");
        searchForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const searchInput = document.querySelector('input');
            //console.log(searchInput.value);
        })
    })

    function doSearch(name)
    {
        console.log("searching for ", name);
        fetch(`https://swapi.dev/api/people/?search=${name}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("search response: ", data);
                if(data.count > 0)
                {
                    buildSearchResults(data);
                }
            })
            .catch(function (error) {
                console.error("ERROR: ", error);
                return error;
            });
    }

    function buildSearchResults(data) {
        const searchResults = data;
        const searchResultsDiv = document.querySelector("#searchResults");
        searchResults.forEach(function (result) {
            const characterInfo = document.createElement("p");
            characterInfo.innerText = `${result.name} was born in ${result.birth_year}`
            searchResultsDiv.appendChild(characterInfo);
        })
    }