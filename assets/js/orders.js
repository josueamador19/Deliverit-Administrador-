let ordersData = [];
let dealersData = [];

(async ()=>{
    const status = ['Received', 'On the way', 'Delivered'];
    const names = ['James','Robert','John','Michael','David','William','Richard','Joseph','Thomas','Charles','Christopher','Steven']
    for (let i = 0; i < 10; i++) {
        const name1 = names[Math.floor(Math.random()*names.length)]
        const name2 = names[Math.floor(Math.random()*names.length)]
        ordersData.push({
            id: Math.floor(Math.random() * 90000)+10000,
            date: '10:20 - 31/10/2022',
            status: status[Math.floor(Math.random()*3)],
            client: {
                name: name1,
                email: name1+'@deliverit.com',
                tel: Math.floor(Math.random() * 14000000)+86000000,
            },
            roundman: {
                name: name2,
                email: name2+'@deliverit.com',
                tel: Math.floor(Math.random() * 14000000)+86000000,
            },
            service: Number(Math.random() * 14).toFixed(2),
            products: [
                {
                    img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                    name: 'Burger',
                    store: 'McDonalds',
                    price: 12.99
                }
            ]
        })
        
    }
    dealersData.push({
        id: Math.floor(Math.random() * 100)+1,
        name:'roundsman '+0,
        email: 'roundsman'+0+'@deliverit.com',
        tel: Math.floor(Math.random() * 14000000)+86000000,
        status: 'disabled',
    })
    renderTable()
})();

function changeFilter(filter) {
    const attr =  $(filter).attr('data-filter');
    $('.active').removeClass('active');
    $(filter).addClass('active');
    $('#tableBody').html('')
    ordersData.forEach(order => {
        if (order.status == attr || attr == 'all') {
            $('#tableBody').append(`
            <tr>
            <td>${order.id}</td>
            <td>${order.client.email}</td>
            <td>${order.roundman.email}</td>
            <td>$1${order.service}</td>
            <td>${order.status}</td>
            <td><button onclick="viewModalOrder(this)" data-id="${order.id}" class="btn"><i class="fa-solid fa-receipt"></i></button></td>
        </tr>
            `)
        }
    });
}

function renderTable() {
    let pending = 0;
    let OTW = 0;
    let delivered = 0;
    ordersData.forEach(order => {
        if (order.status == 'Received') {
            pending++
        }
        if (order.status == 'On the way') {
            OTW++
        }
        if (order.status == 'Delivered') {
            delivered++
        }
        $('#tableBody').append(`
        <tr>
        <td>${order.id}</td>
        <td>${order.client.email}</td>
        <td>${order.roundman.email}</td>
        <td>$1${order.service}</td>
        <td>${order.status}</td>
        <td><button onclick="viewModalOrder(this)" data-id="${order.id}" class="btn"><i class="fa-solid fa-receipt"></i></button></td>
    </tr>
        `)
    });
    $('#allcount').html((pending + OTW + delivered))
    $('#pendingcount').html(pending)
    $('#otwcount').html(OTW)
    $('#deliveredcount').html(delivered)
}

function viewModalOrder(orderRef) {
    const attr =  $(orderRef).attr('data-id');
    const order = ordersData.find(orderr => orderr.id == attr);
    $('#orderID').html(order.id)
    $('#status').html(order.status)
    $('#service').html(order.service)
    $('#total').html('12.99')
    $('#nameClient').html(order.client.name)
    $('#emailClient').html(order.client.email)
    $('#telClient').html(order.client.tel)
    $('#nameRoundsman').html(order.roundman.name)
    $('#emailRoundsman').html(order.roundman.email)
    $('#telRoundsman').html(order.roundman.tel)

    if (order.status == 'Received') {
        $('.assigRoundsman').css('display', 'inline')
        $('#nameRoundsman').html('not assigned')
        $('#emailRoundsman').html('not assigned')
        $('#telRoundsman').html('not assigned')
    }
    $('#modalOrder').css('display', 'flex')
}