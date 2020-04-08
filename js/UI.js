class UI {
    constructor() {
        this.api = new API()
        this.markers = new L.LayerGroup()
         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([40.0456284, -7.7966738], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    }

    getEstablishments() {
        this.api.getData()
            .then( data => {
                console.log(data)
                const result = data.resJSON.features
                this.getPines(result)

            })
            .catch( err => {
                console.log(`An error has been ocurred: ${err}`)
            })
    }

    getPines(data) {
        console.log(data)
        this.markers.clearLayers()

        data.forEach(d => {
            const {latitud, longitud, dirección, precio_gasolina_95, precio_gasóleo_a} = d.attributes
            const popup = L.popup()
                .setContent(`
                    <p>Calle: ${dirección}</p>
                    <p>Precio Gasolina: ${precio_gasolina_95.toFixed(2)} € </p>
                    <p>Precio Gasóleo: ${precio_gasóleo_a.toFixed(2)} € </p>
                `)

            const marker = new L.marker([
                parseFloat(latitud),
                parseFloat(longitud)
            ]).bindPopup(popup)

            this.markers.addLayer(marker)
        })
        this.markers.addTo(this.mapa)
    }

    getSuggestions(srch) {
        this.api.getData()
            .then( data => {
                const results = data.resJSON.features
                this.filterSuggestions(results, srch)
            })
            .catch( err => {
                console.log(`An error has been ocurred: ${err}`)
            })
    }

    filterSuggestions(res, srch) {
        const fil = res.filter(fil => fil.attributes.dirección.indexOf(srch) !== -1)
        this.getPines(fil)
    }
}