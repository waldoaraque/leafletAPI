class UI {
    constructor() {
        this.api = new API()
         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
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
    }
}