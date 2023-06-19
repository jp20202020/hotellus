const form = document.querySelector('#reservaForm')
const numeroInput = document.querySelector('#numeroQuarto')
const precoInput = document.querySelector('#precoClientes')
const tipoInput = document.querySelector('#tipoQuarto')
const checkinInput = document.querySelector('#checkin')
const checkoutInput = document.querySelector('#checkout')

let permissao = false
let quartos = []
const URL = "http://localhost:8000/api_php/reservas.php"

function verificarReserva(verificarReserva) {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
        mode: "cors"
    })

        .then(response => response.json())
        .then(reservas => {

            reservas.forEach(reserva => {
                quartos.push(reserva.numero)
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
            const preco = precoInput.value
            const numero = numeroInput.value
            const tipo = tipoInput.value
            const checkin = checkinInput.value
            const checkout = checkoutInput.value

            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                body: `preco=${encodeURIComponent(preco)}&numero=${encodeURIComponent(numero)}&tipo=${encodeURIComponent(tipo)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}`
            })

                .then(response => {
                    if (response.ok) {
                        
                        
                        precoInput.value = ''
                        numeroInput.value = ''
                        tipoInput.value = ''
                        checkinInput.value = ''
                        checkoutInput.value = ''
                    } else {
                        console.error('erro ao add livro')
                        alert('error ao add livro')
                    }

                })
        }else{
           
        }
        
}

verificarReserva()

form.addEventListener('submit', adicionarReserva)