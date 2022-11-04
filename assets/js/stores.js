var dataStore = [];
var catSelect = "Show all";

let categories = ['Restaurants', 'Supermarket', 'Drinks', 'Health', 'Tech'];

(async ()=>{
    categories.forEach((category, indexCat) => {
        $('#categoriesContainer').append(
            '<button class="btn" id="indexCat'+indexCat+'" onclick="filterSelection(this)">'+category+'</button>'
        );
    });
    $('#categoriesContainer').append(
        '<button class="btn addCat" onclick="openCatModal()"><i class="fa-solid fa-plus"></i></button>'
    );

    for (let i = 0; i < 10; i++) {
        const prts = []
        let sumSales = 0;

        for (let j = 0; j < Math.floor(Math.random() * 10)+1; j++) {
            let sales = Math.floor(Math.random() * 1000);
            prts.push({
                name: 'Product '+ (j+1),
                price: Number(Math.random() * 100).toFixed(2),
                sales: sales
            });
            sumSales+=sales;
        }
        dataStore.push({
            name:'Store '+i,
            category:categories[Math.floor(Math.random() * 5)],
            sales: sumSales,
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
    if (textInput == '') {
        return
    }
    $('#tableStoresBody').html('');
    dataStore.forEach((store, ind) => {
        if ((store['name'].toLowerCase().includes(textInput.toLowerCase()))) {
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
                formatter: (cell) => gridjs.html(`<span class="dataTableCS">$${cell}</span>`)
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
        data: productsData,
        style: {
            td: {
              border: '1px solid #ccc'
            },
            table: {
              'width': '99%'
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

function openCatModal() {
    $('#modalAddCat').css('display', 'flex');
}
function closeCatModal() {
    $('#modalAddCat').css('display', 'none');
}

function addCat() {
    const nameCat = $('#nameCatAdd').val();
    if (nameCat == '') {
        return
    }
    categories.push(nameCat);
    $('.addCat').remove();
    $('#categoriesContainer').append(
        '<button class="btn" onclick="filterSelection(this)">'+nameCat+'</button>'
    );
    $('#categoriesContainer').append(
        '<button class="btn addCat" onclick="openCatModal()"><i class="fa-solid fa-plus"></i></button>'
    );
    closeCatModal();
}

