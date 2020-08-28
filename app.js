const url = 'http://localhost:8000/properties/zap'

document.getElementById('get-page').addEventListener('click', (event) => {
    const page = document.getElementById('page-number').value
    getData(page)
})

function getData(page) {
    fetch(url + '?page=' + page)
        .then(data => data.json())
        .then(data => {
            document.getElementById('total-items').innerHTML = data.totalCount
            document.getElementById('total-pages').innerHTML = data.totalPages
            document.getElementById('current-page').innerText = data.pageNumber

            let mainDiv = document.getElementById('properties-list')
            mainDiv.innerHTML = ''

            data.listings.forEach(item => {
                const usableAreas = item.usableAreas
                const parkingSpaces = item.parkingSpaces
                const images = item.images
                const address = {
                    city: item.address.city,
                    neighborhood: item.address.neighborhood
                }

                let propertyDiv = document.createElement('div')
                propertyDiv.classList.add('property')
                const titleDiv = createTitleDiv(address)
                const commonDiv = createCommonDiv(usableAreas, parkingSpaces)
                const imagesDiv = createImagesDiv(images)
                propertyDiv.appendChild(titleDiv)
                propertyDiv.appendChild(commonDiv)
                propertyDiv.appendChild(imagesDiv)
                mainDiv.appendChild(propertyDiv)
            })
        })

}


function createImagesDiv(images) {
    let imagesDiv = document.createElement('div')
    images.forEach(image => {
        imagesDiv.innerHTML += "<img src='https://via.placeholder.com/150' />"
    })

    return imagesDiv
}

function createCommonDiv(usableAreas, parkingSpaces) {
    let commonDiv = document.createElement('div')
    commonDiv.innerHTML = "" +
        "<ul>" +
        "<li>Área usável: " + usableAreas + " metros</li>" +
        "<li>Vagas de estacionamento: " + parkingSpaces + "</li>" +
        " </ul>"

    return commonDiv
}

function createTitleDiv(address) {
    let titleDiv = document.createElement('div')
    titleDiv.innerText = address.city + ' - ' + address.neighborhood

    return titleDiv
}