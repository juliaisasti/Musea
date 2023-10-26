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