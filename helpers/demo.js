import metadata from '../src/data/metadata.json' assert {type: 'json'};

let dbGranjas = [];

const boton = document.getElementById('btnSearch')
const busqueda = document.getElementById('busqueda');
const resultados = document.getElementById('resultados');
const granjas = document.getElementById('granjas');
const minimo = document.getElementById('inpMin');
const maximo = document.getElementById('inpMax');
const lugar = document.getElementById('rightInput');
const fecha = document.getElementById('fecha');
const footer = document.getElementById('demoFooter');
const mbIzq = document.getElementById('mbIzq');
let deshabilitar = false;
let granjasTotales = 0;
let populares = "";
let hasSearched = false;
window.buscar = () => {
    let totalResults = 0;
    console.log(dbGranjas);
    deshabilitar = minimo.value == "" || maximo == "" || maximo.value.length < minimo.value.length;
    if(deshabilitar) return;
    console.log(minimo.value.length, maximo.value.length, (minimo.value.length > 3 ? (minimo.value.substring(0,1)+','+minimo.value.substring(1)) : (minimo.value)));
    mbIzq.innerHTML = `
        <img id="btnBack" src="src/back.png" onclick="loadGranjas(false)"/>
        <h2 id="busqueda">${'$'+(minimo.value.length > 3 ? (minimo.value.substring(0,1)+','+minimo.value.substring(1)) : (minimo.value)) +" - $" + (maximo.value.length > 3 ? maximo.value.substring(0,1)+','+maximo.value.substring(1) : maximo.value)}</h2>
    `
    let resultado = "";
    dbGranjas.forEach(granja => {
        console.log("precio: "+granja.precio);
        if(granja.precio >= minimo.value && granja.precio <= maximo.value){
            resultado += granja.html;
            totalResults++;
        }
    })
    populares = granjas.innerHTML;
    granjas.innerHTML = resultado;
    hasSearched = true;
    resultados.innerHTML = `Se encontraron ${totalResults} elementos${lugar.value != "" ? " en "+lugar.value : ""}${fecha.value != "" ? " para el "+fecha.value : ""}.`;
    footer.innerHTML = ``;
    window.scrollTo(0,0);
}

window.loadGranjas = (start = true) => {
    console.log(granjasTotales);
    if(start)
        granjas.innerHTML = "";
    else {
        if(hasSearched){
            granjas.innerHTML = populares;
            mbIzq.innerHTML = `
            <h2 id="busqueda">Populares</h2>
            `;
            resultados.innerHTML = "";
            hasSearched = false;
        }
    }
    let granjasGeneradas = "";
    let granjasFinales = granjasTotales;
    let j = 0;
    for( let i = granjasTotales; i<granjasTotales+20; i++) {
        let granjaGenerada = "";
        let granjaElement = {};
        j++;
        if(j == 9) j = 1;
        granjaGenerada+=`
        <article class="granja">
                <img class="granjaImg" src="src/granjas/granja${j}.jpg"/>
                <div class="granjaTop">
                    <h6 class="granjaCategoria">${metadata.categorias[Math.ceil(Math.random()*metadata.categorias.length-1)]}</h6>
                    <div class="host">
        `;
        let stars = "";
        let rating = Math.random()*(5-3)+3;
        for (let index = 0; index < 5; index++) {
            if(rating - index < 1)
                stars+=`<span class="fa fa-star rating"></span>`;
            else
                stars+=`<span class="fa fa-star checked rating"></span>`;

        }
        let entero = Math.ceil(Math.random()*9);
        let centesimas = Math.ceil(Math.random()*9)*100;
        granjaElement.precio = parseInt(entero+""+centesimas);
        granjaGenerada+=`${stars}
                    </div>
                </div>
                <div class="costo">
                    <p class="precio">$${entero},${centesimas}</p>
                    <p class="tiempo">${Math.ceil(Math.random()*9)} horas</p>
                </div>
                <div class="ubi">
                    <img class="ubiIcon" src="src/location.png"/>
                    <p class="granjaUbi">${metadata.direcciones[Math.ceil(Math.random()*metadata.direcciones.length-1)]}</p>
                </div>
                <hr>
                <div class="goods">
        `;
        let pool = Math.round(Math.random()) == 1;
        if(pool)
            granjaGenerada+=`
                <img class="icon" src="src/pool.png"/>
                <p class="gItems">Alberca</p>
            `;
        let wc = Math.random() > 0.25;
        if(wc)
            granjaGenerada+=`
                <img class="icon" src="src/wc.png"/>
                <p class="gItems">${Math.round(Math.random()*(5-2)+2)} baños</p>
            `;
        if(!(wc && pool))
            granjaGenerada+=`
                <img class="icon" src="src/bedrooms.png"/>
                <p class="gItems">${Math.round(Math.random()*(5-2)+2)} cuartos</p>
            `;
            
        granjaGenerada+=`
                </div>
                <button class="btnReservar" id="${i}">Reservar</button>
            </article>
        `;
        granjaElement.html = granjaGenerada;
        granjasFinales++;
        console.log(dbGranjas.push(granjaElement));
        granjasGeneradas+= granjaGenerada;
    }
    granjasTotales = granjasFinales;
    footer.innerHTML = `<img id="plus" src="src/plus.png" onclick="loadGranjas(false)"/>`;
    if(start)
        granjas.innerHTML = granjasGeneradas;
    else granjas.innerHTML += granjasGeneradas;
}

window.onscroll = (ev) => {
    if ((window.innerHeight + window.scrollY) - 75>= document.body.scrollHeight && !hasSearched) {
        window.loadGranjas(false);
    }
};