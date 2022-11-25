let dealersData = [];
let orders = [];
(async ()=>{
    const options = {method: 'GET'}
    fetch('http://localhost:3000/admin/allTheRoundsman', options)
    .then((response) => response.json())
    .then((data) => {
        dealersData = data
        renderTable()   
    });
    renderTable()
})();

function renderTable() {
    //generate table from DATA
    const grid = new gridjs.Grid({
        columns: [
            {
                name: '_ID',
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
                name: 'phoneNumber',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">+504 ${cell}</span>`)
            },
            {
                name: 'Active',
                formatter: (cell, row) => {
                    const statusBTN = cell ? 
                        `<button onclick="editStatus(this)" data-id="${row.cells[0].data}" class="btn activeBtn">
                        <i class="fa-solid fa-check"></i> ${cell}
                          </button>`
                        : 
                        `<button onclick="editStatus(this)" data-id="${row.cells[0].data}" class="btn desactiveBtn">
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
                        <button onclick="viewModalCustomer(this)" data-id="${row.cells[0].data}" class="btn editBtn">
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

function viewModalCustomer(params) {
    $('#modalDealers').css('display', 'flex');
    const id = $(params).attr('data-id');
    const cust = dealersData.find(customer => customer._id == id);
    $('#ID').html(cust._id);
    $('#nameroundsman').val(cust.name);
    $('#Telroundsman').val(cust.phoneNumber);
    $('#emailroundsman').val(cust.email);
}

function editStatus(data) {
    const ID = $(data).attr('data-id');
    
    const databody = {
        id: ID
    }
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/roundsmanStatus",
        "method": "PUT",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
         },
        "data": databody}
    
    $.ajax(settings).done(function (response) {
        const options = {method: 'GET'}
        fetch('http://localhost:3000/admin/allTheRoundsman', options)
        .then((response) => response.json())
        .then((data) => {
            dealersData = data
            renderTable()   
        });
        renderTable()
    });
}

function editRM() {
    const ID = $('#ID').html()
    const nameroundsman = $('#nameroundsman').val()
    const emailroundsman = $('#emailroundsman').val()
    const Telroundsman = $('#Telroundsman').val()
    const databody = {
        id: ID,
        name: nameroundsman,
        email: emailroundsman,
        phoneNumber: Telroundsman
    }
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/updateDealer",
        "method": "PUT",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
         },
        "data": databody}
    
    $.ajax(settings).done(function (response) {
        const options = {method: 'GET'}
        fetch('http://localhost:3000/admin/allTheRoundsman', options)
        .then((response) => response.json())
        .then((data) => {
            $('#modalDealers').css('display', 'none');
            dealersData = data
            renderTable()   
        });
        renderTable()
    });
}

function deleteRM() {
    const ID = $('#ID').html()
    const databody = {
        id: ID
    }
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/deleteRoundsman",
        "method": "DELETE",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
         },
        "data": databody}
    
    $.ajax(settings).done(function (response) {
        const options = {method: 'GET'}
        fetch('http://localhost:3000/admin/allTheRoundsman', options)
        .then((response) => response.json())
        .then((data) => {
            $('#modalDealers').css('display', 'none');
            dealersData = data
            renderTable()   
        });
        renderTable()
    });
}