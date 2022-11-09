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
let indexProduct=0;

function viewModalPr(product) {
    $('#modalPr').css('display', 'flex');
    const ind = $(product).attr('data-product');
    indexProduct = ind
    $('#namePrt').val(dataStore[indexStore]['products'][ind]['name']);
    $('#pricePr').val(dataStore[indexStore]['products'][ind]['price']);
}

function viewModalPro(store) {
    $('#modalStore').css('display', 'flex');
    $('.AP').css('display', 'none');
    $('#categoriesStore').html('')
    $('#products').html('')
    categories.forEach(cat =>{
        $('#categoriesStore').append(`<option value="${cat}">${cat}</option>`)
    })
    indexStore=null
    if (store != null) {
        $('.AP').css('display', 'block');
        const ind = $(store).attr('data-store');
        indexStore = ind;
        $('#namePr').val(dataStore[ind]['name']);
        $("#categoriesStore").val(dataStore[ind]['category']);
        const productsData = []
        dataStore[ind]['products'].forEach((products, index) => {
            productsData.push([products.name, products.price, products.sales, index])
        })
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

function viewDeleteCatModal() {
    if ($('.activeCat').html().trim() === 'Show all'.trim()) {
        return;
    }
    $('#nameCatDelete').html($('.activeCat').html())
    $('#modalDeleteCat').css('display', 'flex');
}

function deleteCategory() {
    dataStore.forEach((store, i) => {
        if(store.category === $('.activeCat').html()){
            dataStore.splice(i, 1);
        }
    })
    const index = categories.indexOf($('.activeCat').html());
    categories.splice(index, 1);
    $('.activeCat').remove();
    $('.SA').addClass('activeCat');
    filterSelection($('.SA'))
    $('#modalDeleteCat').css('display', 'none');
}

function saveEditStore() {
    if (indexStore == null) {
        dataStore.push({
            name:$('#namePr').val(),
            category:$("#categoriesStore").val(),
            sales: 0,
            products: []
        })
    }else{
        dataStore[indexStore]['name'] = $('#namePr').val();
        dataStore[indexStore]['category'] = $('#categoriesStore').val();
    }
    $('#modalStore').css('display', 'none');
    filterSelection($('.activeCat'))
}

function saveProduct() {
    dataStore[indexStore]['products'][indexProduct]['name'] =  $('#namePrt').val();
    dataStore[indexStore]['products'][indexProduct]['price'] =  $('#pricePr').val();
    const productsData = []
        dataStore[indexStore]['products'].forEach((products, index) => {
            productsData.push([products.name, products.price, products.sales, index])
        })
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
        $('#products').html('')
        grid.render(document.getElementById("products"));
        grid.forceRender();
        $('#modalPr').css('display', 'none');
}