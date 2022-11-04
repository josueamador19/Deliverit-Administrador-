let customersData = [];
let orders = [
        {
                id: 123342,
                date: '12:05 - 30/10/2022',
                status: 'Received',
                dealer: {
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
                dealer: {
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
                dealer: {
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
                dealer: {
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
    for (let i = 0; i < 10; i++) {
        customersData.push({
            id: Math.floor(Math.random() * 100)+1,
            name:'Customer '+i,
            email: 'cust'+i+'@deliverit.com',
            orders: orders,
        })
    }

    //generate table from DATA
    const grid = new gridjs.Grid({
        columns: [
            {
                name: 'ID',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Name',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Email',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Orders',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell.length}</span>`)
            },
            {
                name: 'Actions',
                formatter: (_, row) => gridjs.html(`<div class="btnAct"><button onclick="viewModalCustomer(this)" data-custom="${row.cells[0].data}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></div>`)
            },
        ],
        search: true,
        data: customersData,
        style: {
            td: {
              border: '1px solid #ccc'
            },
            table: {
              'width': '99%'
            }
          }
      });
    grid.render(document.getElementById("table"));
    grid.forceRender();
})();

let custSelect = [];

function viewModalCustomer(params) {
    $('#modalCustomer').css('display', 'flex');
    const ID = $(params).attr('data-custom');
    const cust = customersData.find(customer => customer.id == ID);
    custSelect = cust;
    $('#ID').html(ID);
    $('#nameCustomer').val(cust.name);
    $('#emailCustomer').val(cust.email);
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
    $('#nameroundsman').html(order.dealer.name);
    $('#telroundsman').html(order.dealer.tel);
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