let ordersData = [];
let dealersData = [];

(async ()=>{
    const options = {method: 'GET'}
    fetch('https://deliverit-backend.vercel.app/admin/history', options)
    .then((response) => response.json())
    .then((data) => {
        ordersData = data
        renderTable()   
    });
    
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
            <td>${order.dealer.email}</td>
            <td>$${order.service}</td>
            <td>${order.status}</td>
            <td><button onclick="viewModalOrder(this)" data-id="${order.id}" class="btn"><i class="fa-solid fa-receipt"></i></button></td>
        </tr>
            `)
        }
    });
}

function renderTable() {
    let Received = 0;
    let Preparing = 0;
    let OTW = 0;
    let delivered = 0;
    $('#tableBody').html(" ");
    ordersData.forEach(order => {
        if (order.status == 'Received') {
            Received++
        }
        if (order.status == 'Preparing') {
            Preparing++
        }
        if (order.status == 'OnTheWay') {
            OTW++
        }
        if (order.status == 'Delivered') {
            delivered++
        }
        
        $('#tableBody').append(`
        <tr>
        <td>${order.id}</td>
        <td>${order.client.email}</td>
        <td>${order.dealer.email}</td>
        <td>$${order.service}</td>
        <td>${order.status}</td>
        <td><button id="orderModalBTN" onclick="viewModalOrder(this)" data-id="${order.id}" class="btn"><i class="fa-solid fa-receipt"></i></button></td>
    </tr>
        `)
    });
    $('#allcount').html((Received + Preparing + OTW + delivered))
    $('#receivedcount').html(Received)
    $('#pendingcount').html(Preparing)
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
    $('#nameRoundsman').html(order.dealer.name)
    $('#emailRoundsman').html(order.dealer.email)
    $('#telRoundsman').html(order.dealer.tel)

    $('#modalOrder').css('display', 'flex')
    $('.assigRoundsman').css('display', 'none')
    if (order.status == 'Received') {
        $('.assigRoundsman').css('display', 'inline')
        $('#nameRoundsman').html('not assigned')
        $('#emailRoundsman').html('not assigned')
        $('#telRoundsman').html('not assigned')
    }
}

function searchRoundsman() {
    const data = $('#searchRoundsman').val()
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://deliverit-backend.vercel.app/admin/searchRoundsman/"+data,
        "method": "get",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
         },}
    
    $.ajax(settings).done(function (response) {
        $('#resultSearch').html('')
        response.forEach(rm => {
            const btn = rm.active ? `<button data-id="${rm._id}" onClick="assignedRM(this)" id="btnAssigned">Assign</button>`: '';
            $('#resultSearch').append( ` <tr>
            <th>${rm.name}</th>
            <th>${rm.phoneNumber}</th>
            <th>${rm.email}</th>
            <th>${rm.active}</th>
            <th>${btn}</th>
        </tr>`)
        })
    });
   
}

function assignedRM(btn) {
    const data = {
        idDealer: $(btn).attr('data-id'),
        id: $('#orderID').html()
    }
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://deliverit-backend.vercel.app/admin/assigned",
        "method": "PUT",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },
        "data": data}
    
    $.ajax(settings).done(function (response) {
        $('#modalOrder').css('display', 'none')
        const options = {method: 'GET'}
        fetch('https://deliverit-backend.vercel.app/admin/history', options)
        .then((response) => response.json())
        .then((data) => {
            ordersData = data
            renderTable()   
        });
        
    });
}