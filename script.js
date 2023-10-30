
//Fetch de los objetos del museo
async function getObject() {
    try {
        let response = await fetch ("https://collectionapi.metmuseum.org/public/collection/v1/objects");
        let objectsData =await response.json();
        return objectsData;
    } catch (error) {
        console.log("Error");
    }
}

getObject().then((objectsData) => console.log(objectsData));

// Función para obtener imagen random para el slider cada vez que se refresca la página
async function getSliderImg() {
    let id = Math.floor(Math.random() * 500)
    try {
        let response2 = await fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        let objectsImgData = await response2.json();
        let img = objectsImgData.primaryImage;
        let name = objectsImgData.title;
        document.getElementById("photoSlider").innerHTML = `<section>
        <img src="${img}" alt="${name}"
        <h1>${name}</h1>
        </section>`;
    } catch (error) {
        console.log("Error");
    }
}

getSliderImg();