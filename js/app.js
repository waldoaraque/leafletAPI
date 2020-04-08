const ui = new UI()

document.addEventListener('DOMContentLoaded', () => {
    ui.getEstablishments()
})

const srch = document.querySelector('#buscar input')
srch.addEventListener('input', () => {
    if(srch.value.length > 5) {
        ui.getSuggestions(srch.value)
    } else {
        ui.getEstablishments()
    }
})