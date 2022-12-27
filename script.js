const form = document.querySelector(".banner-superior form")
const input = document.querySelector(".banner-superior input")
const msg = document.querySelector(".banner-superior .msg")
const lista = document.querySelector(".seletor-ajax .cidades")
const apiKey = "ffeed3d2efab7e428b3d07f3833fd329"

form.addEventListener("submit", e => {
    e.preventDefault()
    let inputVal = input.value

    const listarItens = lista.querySelectorAll(".seletor-ajax .cidade")
    const listarItensdoArray = Array.from(listarItens)

    if (listarItensdoArray.length > 0) {
        const arrayFiltrado = listarItensdoArray.filter(el => {
            let conteudo = ""

            if (inputVal.includes(",")) {
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(","[0])
                    conteudo = el
                        .querySelector(".nome-da-cidade span")
                        .textContent.toLowerCase
                } else {
                    conteudo = el.querySelector(".nome-da-cidade").dataset.name.toLowerCase()

                }
            } else {
                conteudo = el.querySelector(".nome-da-cidade span")
                    .textContent.toLowerCase()
            }
            return conteudo == inputVal.toLowerCase
        })

        if (arrayFiltrado.length > 0) {
            msg.textContent = `Você já sabe que a previsão para ${arrayFiltrado[0].querySelector(".nome-da-cidade span")
                .textContent
                }...caso contrário seja mais específico ao providênciar o CEP`

            form.reset()
            input.focus()
            return
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(reposta => reposta.json())
        .then(data => {
            const { main, name, sys, weather } = data
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
                }.svg`;

            const li = document.createElement("li")
            li.classList.add("cidade")
            const markup = `
            <h2 class="nome-da-cidade" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
            </h2>
            <div class="temperatura-da-cidade">${Math.round(main.temp)}<sup>°C</sup>
            </div>
            
            <figure>
            <img class="icone-da-cidade" src="${icon}" alt="${weather[0]["descrição"]
                }>
            <figcaption>${weather[0]["descrição"]}</figcaption>
            </figure>
            `
            li.innerHTML = markup
            lista.appendChild(li)
        })
        .catch(() => {
            msg.textContent = "Por favor insira uma cidade valida"
        })
    msg.textContent = "";
    form.reset()
    input.focus()

    console.log(url)
})


