class API {
    constructor() {}

    async getData() {
        const data = await fetch(`https://www.mapabase.es/arcgis/rest/services/Otros/Gasolineras/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`)

        const resJSON = await data.json()

        return {
            resJSON
        }
    }
}