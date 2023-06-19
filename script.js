const form = document.querySelector('#hotelForms')
const numeroInput = document.querySelector('#numeroInput')
const precoInput = document.querySelector('#precoInput')
const tipoInput = document.querySelector('#tipoInput')
const disponivelInput = document.querySelector('#disponivelInput')
const checkinInput = document.querySelector('#checkinInput')
const checkoutInput = document.querySelector('#checkoutInput')
const tableBody = document.querySelector('#reservaTabela tbody')

let permissao = false
let quartos = []
const URL = "http://localhost:8080/hotellusjp/api_php"

function carregarReserva() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
        mode: "cors"
    })

        .then(response => response.json())
        .then(reservas => {
            tableBody.innerHTML = ''

            reservas.forEach(reserva => {
                quartos.push(reserva.numero)
                const tr = document.createElement('tr')

                let disponibilidade 
                if(reserva.disponivel == 1){
                    disponibilidade = "disponivel"
                }else{
                    disponibilidade = "indisponivel"
                }

                tr.innerHTML = `
        
        <td>${reserva.nome}</td>
        <td>${reserva.numero}</td>
        <td>${reserva.tipo}</td>
        <td>${disponibilidade}</td>
        <td>${reserva.checkout}</td>
        <td>${reserva.checkin}</td>
        <td>
        <button data-id="${reserva.id}" onclick="atualizarReserva(${reserva.id})">Editar</button>
        <button onclick="excluirReserva(${reserva.id})">Excluir</button>
        </td>
        `
                tableBody.appendChild(tr)

            })
        })
}

function adicionarReserva(event) {
    event.preventDefault()

    for(let i = 0; i <= quartos.length; i++){
        if(quartos[i] == numeroInput.value){
            permissao = false
            alert("Esse quarto já está registrado!! tente outro")
            break
        }else{
            permissao = true
        }
    }
    if(permissao == true){

        const nome = nomeInput.value
        const preco = precoInput.value
        const numero = numeroInput.value
        const tipo = tipoInput.value
        const disponivel = disponivelInput.value
        const checkin = checkinInput.value
        const checkout = checkoutInput.value
    
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
    
            },
            body: `nome=${encodeURIComponent(nome)}&numero=${encodeURIComponent(numero)}&tipo=${encodeURIComponent(tipo)}&disponivel=${encodeURIComponent(disponivel)}&checkout=${encodeURIComponent(checkin)}&checkin=${encodeURIComponent(checkout)}`
        })
    
            .then(response => {
                if (response.ok) {
                    carregarReserva()
                    nomeInput.value = ''
                    precoInput.value = ''
                    numeroInput.value = ''
                    tipoInput.value = ''
                    disponivelInput.value = ''
                    checkinInput.value = ''
                    checkoutInput.value = ''
                } else {
                    console.error('erro ao add livro')
                    alert('error ao add livro')
                }
    
            })
    }
}

function excluirReserva(id) {
    if (confirm('Deseja excluir essa reserva?')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })

            .then(response => {
                if (response.ok) {
                    carregarReserva()
                } else {
                    console.error('Erro ao excluir')
                    alert('Error ao excluir reserva')
                }
            })
    }
}

function atualizarReserva(id) {

    const novoPreco = prompt('Digite o preço')
    const novoNumero = prompt('Digite o número')
    const novoTipo = prompt('Digite o tipo')
    const novoDisp_quartos = prompt('Informe a disponibilidade')
    const novocheckin = prompt('Informe o checkin')
    const novocheckout = prompt('Informe o checkout')

    if (novoNumero && novoTipo && novoDisp_quartos) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'

            },
            body: `preco=${encodeURIComponent(novoPreco)}&numero=${encodeURIComponent(novoNumero)}&tipo=${encodeURIComponent(novoTipo)}&Disp_quartos=${encodeURIComponent(novoDisp_quartos)}&checkin=${novocheckin}&checkout=${encodeURIComponent(novocheckout)}`
        })
            .then(response => {
                if (response.ok){
                    carregarReserva()                    
                }else{
                    console.error('Erro ao editar')
                    alert('Error ao editar o quarto')
                }
            })


    }


}


carregarReserva()
form.addEventListener('submit', adicionarReserva)