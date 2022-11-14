let dealersData = [];
let orders = [
        {
                id: 123342,
                date: '12:05 - 30/10/2022',
                status: 'Received',
                client: {
                    name: 'Carlos',
                    tel: '5551234567'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
            {
                id: 123423,
                date: '12:54 - 31/10/2022',
                status: 'Preparing',
                client: {
                    name: 'Mario',
                    tel: '5551234598'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
            {
                id: 123424,
                date: '10:20 - 31/10/2022',
                status: 'OnTheWay',
                client: {
                    name: 'pedro',
                    tel: '55512386667'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
            {
                id: 123425,
                date: '10:20 - 31/10/2022',
                status: 'Delivered',
                client: {
                    name: 'pedro',
                    tel: '55512386667'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
        
            
        ];
(async ()=>{

    //create DATA
    dealersData.push({
        id: Math.floor(Math.random() * 100)+1,
        name:'roundsman '+0,
        email: 'roundsman'+0+'@deliverit.com',
        tel: Math.floor(Math.random() * 14000000)+86000000,
        status: 'disabled',
        orders: orders,
    })
    for (let i = 1; i < 10; i++) {
        dealersData.push({
            id: Math.floor(Math.random() * 100)+1,
            name:'roundsman '+i,
            email: 'roundsman'+i+'@deliverit.com',
            tel: Math.floor(Math.random() * 14000000)+86000000,
            status: 'active',
            orders: orders,
        })
    }
    renderTable()
    
})();

function renderTable() {
    //generate table from DATA
    const grid = new gridjs.Grid({
        columns: [
            {
                name: 'Name',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Email',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Tel',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">+504 ${cell}</span>`)
            },
            {
                name: 'Orders',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell.length}</span>`)
            },
            {
                name: 'Status',
                formatter: (cell, row) => {
                    const statusBTN = cell === 'active' ? 
                        `<button onclick="editStatus(this)" data-email="${row.cells[1].data}" class="btn activeBtn">
                        <i class="fa-solid fa-check"></i> ${cell}
                          </button>`
                        : 
                        `<button onclick="editStatus(this)" data-email="${row.cells[1].data}" class="btn desactiveBtn">
                        <i class="fa-solid fa-x"></i> ${cell}
                          </button>`
                    return gridjs.html(`
                    <div class="btnAct">
                        ${statusBTN}
                    </div>`)
                }
            },
            {
                name: 'Actions',
                formatter: (_, row) => {
                    return gridjs.html(`
                    <div class="btnAct">
                        <button onclick="viewModalCustomer(this)" data-email="${row.cells[1].data}" class="btn editBtn">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>`)
                }
            },
        ],
        search: true,
        data: dealersData,
        style: {
            td: {
              border: '1px solid #ccc'
            },
            table: {
              'width': '99%'
            }
          }
      });
      $('#table').html('');
    grid.render(document.getElementById("table"));
    grid.forceRender();
}

let custSelect = [];

function viewModalCustomer(params) {
    $('#modalDealers').css('display', 'flex');
    const email = $(params).attr('data-email');
    const cust = dealersData.find(customer => customer.email == email);
    console.log(email);
    custSelect = cust;
    $('#ID').html(cust.id);
    $('#nameroundsman').val(cust.name);
    $('#Telroundsman').val(cust.tel);
    $('#emailroundsman').val(email);
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
        data: cust.orders,
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
}

function viewModalOrder(btnOrder) {
    const ID = $(btnOrder).attr('data-order');
    const order = custSelect.orders.find(order => order.id == ID);
    $('#modalOrders').css('display', 'flex');
    $('#IDOrder').html(ID);
    $('#statusOrder').html(order.status);
    $('#nameclient').html(order.client.name);
    $('#telclient').html(order.client.tel);
    let products='';
    order['products'].forEach(product => {
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
}

function editStatus(data) {
    console.log(data);
    const ID = $(data).attr('data-email');
    const user = dealersData.find(user => user.email == ID);
    const index = dealersData.indexOf(user);
    user.status = user.status === 'active' ? 'disabled' : 'active';
    dealersData[index]=user;
    renderTable()
}