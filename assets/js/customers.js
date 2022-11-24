let clients = [];
const server = "http://localhost:3000";

(async ()=>{
    renderClients()
})();

async function renderClients() {
    const settings = {
            "async": true,
            "crossDomain": true,
            "url": server +"/admin/clients",
            "method": "GET"}
        
    await $.ajax(settings).done(function (response) {
        clients = response
    });
    const grid = new gridjs.Grid({
        columns: [
            {
                name: '_ID',
                formatter: (cell, row) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Username',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Email',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Actions',
                formatter: (_, row) => gridjs.html(`<div class="btnAct"><button onclick="viewModalCustomer(this)" data-id="${row.cells[0].data}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></div>`)
            },
        ],
        search: true,
        data: clients,
        style: {
            td: {
              border: '1px solid #ccc'
            },
            table: {
              'width': '99%'
            }
          }
      });
    document.getElementById("table").innerHTML = "";
    grid.render(document.getElementById("table"));
    grid.forceRender();
}


let custSelect = [];

async function viewModalCustomer(params) {
    $('#modalCustomer').css('display', 'flex');
    const ID = $(params).attr('data-id');
    const client =clients.find(cl => cl._id === ID);
    $('#ID').html(ID);
    $('#nameCustomer').val(client.username);
    $('#emailCustomer').val(client.email);

    let orders = [];

    //TODO: get orders of a client

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": server + "/admin/orderOfClient/"+ID,
        "method": "GET"}
    
    await $.ajax(settings).done(function (response) {
        const grid = new gridjs.Grid({
            columns: [
                {
                    name: 'ID',
                    formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
                },
                {
                    name: 'Status',
                    formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
                },
                {
                    name: 'products',
                    formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell.length}</span>`)
                },
                {
                    name: 'Actions',
                    formatter: (_, row) => gridjs.html(`<div class="btnAct"><button onclick="viewModalOrder(this)" data-order="${row.cells[0].data}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></div>`)
                },
            ],
            search: true,
            data: response,
            style: {
                td: {
                  border: '1px solid #ccc'
                },
                table: {
                  'width': '99%'
                }
              }
          });
        $('#orders').html('');
        grid.render(document.getElementById("orders"));
        grid.forceRender();
    });

}

async function viewModalOrder(btnOrder) {
    const ID = $(btnOrder).attr('data-order');
    $('#modalOrders').css('display', 'flex');
    //TODO: get a order specific
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": server +"/admin/order/"+ID,
        "method": "GET"}
    
    await $.ajax(settings).done(function (response) {
        $('#IDOrder').html(ID);
        $('#statusOrder').html(response.status);
        $('#nameroundsman').html(response.dealer.name);
        $('#telroundsman').html(response.dealer.tel);
        let products='';
        response['products'].forEach(product => {
            products += 
                `<div class="pr row center-y">
                    <img width="20%" src="${product.img}" alt="">
                    <div class="col infoPr">
                        <strong>${product.name}</strong><br>
                        <span>${product.store}</span>
                    </div>
                    <div class="col center-xy price">
                        <span>$${product.price}</span>
                    </div>
                </div>`
        });
        $('#orderProducts').html(products)
    });
    
}

function updateClient() {
    const data = {
        "idClient": $('#ID').html(),
        "username": $('#nameCustomer').val(),
        "email": $('#emailCustomer').val()}
    const settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/admin/updateClient",
            "method": "PUT",
            data: data}
          
    $.ajax(settings).done(function (response) {
        renderClients()
        $('#modalCustomer').css('display', 'none');
    });
}

function deleteClient() {
    const data = {
        "img": $('#imgPr').val(),
        "price": $('#pricePr').val(),
        "description": $('#descriptionPr').val(), 
        "idProduct": idProductCS._id, 
        "name": $('#namePrt').val(),}
    const settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/admin/deleteClient",
            "method": "PUT",
            data: data}
          
    $.ajax(settings).done(function (response) {
          renderStores()
    });
}