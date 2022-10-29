var dataStore = [];
var catSelect = "Show all";

let categories = ['Restaurants', 'Supermarket', 'Drinks', 'Health', 'Tech'];

(async ()=>{
    categories.forEach(category => {
        $('#categoriesContainer').append(
            '<button class="btn" onclick="filterSelection(this)">'+category+'</button>'
        );
    });

    for (let i = 0; i < 10; i++) {
        const prts = []
        for (let j = 0; j < Math.floor(Math.random() * 10)+1; j++) {
            prts.push({
                name: 'Product '+ (j+1),
                price: Math.random() * 100,
                sales: Math.random() * 1000
            })
        }
        dataStore.push({
            name:'Store '+i,
            category:categories[Math.floor(Math.random() * 5)],
            sales: Math.floor(Math.random() * 1000),
            products: prts
        })
    }

    $('#tableStoresBody').html('');

    dataStore.forEach((store, ind) => {
        $('#tableStoresBody').append(
            `<tr>
            <td>${store['name']}</td>
            <td>${store['category']}</td>
            <td>${store['sales']}</td>
            <td>${store['products'].length}</td>
            <td class="row center-xy"><button onclick="viewModalPro(this)" data-store="${ind}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        </tr>`
        )
    });


})();

function searchStore() {
    const textInput = $('#searchStore').val();
    $('#tableStoresBody').html('');
    dataStore.forEach((store, ind) => {
        if (
            (store['category'] === catSelect || catSelect === "Show all".trim()) && 
            (store['name'].toLowerCase().includes(textInput.toLowerCase()))) {
            $('#tableStoresBody').append(
                `<tr>
                <td>${store['name']}</td>
                <td>${store['category']}</td>
                <td>${store['sales']}</td>
                <td>${store['products'].length}</td>
                <td class="row center-xy"><button onclick="viewModalPro(this)" data-store="${ind}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></td>
            </tr>`
            )
        }
    });
}

let indexStore=0;

function viewModalPr(product) {
    console.log('index ',$(product).attr('data-product'));
    $('#modalPr').css('display', 'flex');
    const ind = $(product).attr('data-product');
    $('#namePrt').val(dataStore[indexStore]['products'][ind]['name']);
    $('#pricePr').val(dataStore[indexStore]['products'][ind]['price']);
}

function viewModalPro(store) {
    $('#modalStore').css('display', 'flex');
    const ind = $(store).attr('data-store');
    indexStore = ind;
    $('#namePr').val(dataStore[ind]['name']);
    $('#catPr').val(dataStore[ind]['category']);
    $('#products').html('');
    const productsData = []
    dataStore[ind]['products'].forEach((products, index) => {
        productsData.push([products.name, products.price, products.sales, index])
    })
    console.log(productsData);
    const grid = new gridjs.Grid({
        columns: [
            {
                name: 'Name',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Price',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Sales',
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">${cell}</span>`)
            },
            {
                name: 'Actions',
                formatter: (_, row) => gridjs.html(`<div class="btnAct"><button onclick="viewModalPr(this)" data-product="${row.cells[3].data}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></div>`)
            },
        ],
        search: true,
        pagination: {
            enabled: true,
            limit: 4,
            summary: false
        },
        data: productsData,
        style: {
            td: {
              border: '1px solid #ccc'
            },
            table: {
              'width': '100%'
            }
          }
      });
    grid.render(document.getElementById("products"));
    grid.forceRender();
}


function filterSelection(filter) {
    $('.activeCat').removeClass('activeCat');
    $(filter).addClass('activeCat');
    catSelect = $(filter).html();

    $('#tableStoresBody').html('');
    dataStore.forEach((store, ind) => {
        if (store['category'] === $(filter).html() || $(filter).html().trim() === "Show all".trim()) {
            $('#tableStoresBody').append(
                `<tr>
                <td>${store['name']}</td>
                <td>${store['category']}</td>
                <td>${store['sales']}</td>
                <td>${store['products'].length}</td>
                <td class="row center-xy"><button onclick="viewModalPro(this)" data-store="${ind}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></td>
            </tr>`
            )
        }
    });

}