const axios = require('axios')

const url = "https://jsonmock.hackerrank.com/api/countries/search"

async function getDataFromPage(name, page) {
    return axios.get(url, {
        params: {
            name,
            page
        }
    })
}

async function findCountries(s, p) {
    let hasNextPage = true
    let currentPage = 1
    let countries = []

    while (hasNextPage) {
        // getting current page
        const res = await getDataFromPage(s, currentPage)
        // getting total_pages for iterate and data
        const { total_pages, data } = res.data;

        // check if exists a next page
        if (currentPage <= total_pages) {
            data.map(c => {
                // filter data to prevent save all in memory
                if (c.population > p && c.name.match(new RegExp(s, "i"))) {
                    countries.push({ name: c.name, population: c.population })
                }
            })
            currentPage++
        } else {
            hasNextPage = false
        }
    }
}

// where search match with countries and has population greater than
findCountries("uni", 300).then(res => console.log(res))