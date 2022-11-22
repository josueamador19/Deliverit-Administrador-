var stores = [];
var catSelect = "Show all";
let categories = [];

(async ()=>{
    renderCategories();
    renderStores();
})();

async function renderCategories() {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/categories",
        "method": "GET",
        "headers": {}
    };
    
    await $.ajax(settings).done(function (response) {
        categories = response
    });
    
    $('#categoriesContainer').html('<button class="btn activeCat SA" onclick="filterSelection(this)"> Show all</button>');

    categories.forEach(category => {
        $('#categoriesContainer').append(
            '<button class="btn" id="'+category._id+'" onclick="filterSelection(this)">'+category.name+'</button>'
        );
    });

    $('#categoriesContainer').append(
        '<button class="btn addCat" onclick="openCatModal()"><i class="fa-solid fa-plus"></i></button>'
    );
}

async function renderStores() {
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/stores",
        "method": "GET",
        "headers": {}
      };
      
    await $.ajax(settings).done(function (response) {
        stores = response
    });


    $('#tableStoresBody').html('');

    stores.forEach((store, ind) => {
        $('#tableStoresBody').append(
            `<tr>
            <td>${store['name']}</td>
            <td>${store['category'].name}</td>
            <td>${store.products.length}</td>
            <td class="row center-xy"><button onclick="viewModalPro(this)" data-store="${ind}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        </tr>`
        )
    });
}

function searchStore() {
    const textInput = $('#searchStore').val();
    if (textInput == '') {
        return
    }
    $('#tableStoresBody').html('');
    stores.forEach((store, ind) => {
        if ((store['name'].toLowerCase().includes(textInput.toLowerCase()))) {
            $('#tableStoresBody').append(
                `<tr>
                <td>${store['name']}</td>
                <td>${store['category'].name}</td>
                <td>${store.products.length}</td>
                <td class="row center-xy"><button onclick="viewModalPro(this)" data-store="${ind}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></td>
            </tr>`
            )
        }
    });
}

let indexStore=0;
let indexProduct=0;
let idStore = '';

function viewModalPr(product) {
    $('#modalPr').css('display', 'flex');
    indexProduct = null;
    if (product !== null) {
        const ind = $(product).attr('data-product');
        indexProduct = ind
        $('#namePrt').val(stores[indexStore]['products'][ind]['name']);
        $('#pricePr').val(stores[indexStore]['products'][ind]['price']);
        $('#descriptionPr').val(stores[indexStore]['products'][ind]['description']);
        $('#imgPr').val(stores[indexStore]['products'][ind]['img']);
        $('#previewPr').attr("src",stores[indexStore]['products'][ind]['img']);
    }
}

function viewModalPro(store) {
    $('#modalStore').css('display', 'flex');
    $('.AP').css('display', 'none');
    $('#categoriesStore').html('')
    $('#products').html('')
    categories.forEach(cat =>{
        $('#categoriesStore').append(`<option value="${cat._id}">${cat.name}</option>`)
    })
    indexStore=null
    if (store != null) {
        $('.AP').css('display', 'block');
        const ind = $(store).attr('data-store');
        indexStore = ind;
        idStore = stores[ind]._id;
        $('#namePr').val(stores[ind]['name']);
        $("#categoriesStore").val(stores[ind]['category'].id);
        $('#logoPr').val(stores[ind]['logo'])
        $('#previewLogo').attr("src",stores[ind]['logo'])
        $('#bannerPr').val(stores[ind]['banner'])
        $('#previewBanner').attr("src",stores[ind]['banner'])
        const productsData = []
        stores[ind]['products'].forEach((products, index) => {
            productsData.push([products.name, products.price, index])
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
                    formatter: (_, row) => gridjs.html(`<div class="btnAct"><button onclick="viewModalPr(this)" data-product="${row.cells[2].data}" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button></div>`)
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
    stores.forEach((store, ind) => {
        if (store['category'].name === $(filter).html() || $(filter).html().trim() === "Show all".trim()) {
            $('#tableStoresBody').append(
                `<tr>
                <td>${store['name']}</td>
                <td>${store['category'].name}</td>
                <td>${store.products.length}</td>
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
    const nameCat = $('#nameCatAddName').val();
    const colorCat = $('#nameCatAddColor').val();
    const iconCat = $('#nameCatAddIcon').val();
    if (nameCat == '' || colorCat == '' || iconCat == '') {
        return
    }
    $.post("http://localhost:3000/admin/newCategory", {
        name: nameCat,
        color: colorCat,
        icon: iconCat, }).done(function (response) {
            $('.addCat').remove();
            renderCategories()
        }).fail(function(xhr, status, res) {

            })
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
    const category = categories.find(element => element.name === $('.activeCat').html());
    const data = {
        "idCategory": category._id }
const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/deleteCategory",
        "method": "DELETE",
        data: data}
      
$.ajax(settings).done(function (response) {
    renderCategories();
    $('.activeCat').remove();
    $('.SA').addClass('activeCat');
    filterSelection($('.SA'))
    $('#modalDeleteCat').css('display', 'none');
});
   
}

function saveEditStore() {
    if (indexStore == null) {
          $.post("http://localhost:3000/admin/newStore", {
            name: $('#namePr').val(),
            logo: $('#logoPr').val(),
            banner: $('#bannerPr').val(),
            category: $('#categoriesStore').val(), }).done(function (response) {
                renderStores()
            }).fail(function(xhr, status, res) {

            })
    }else{
        const data = {
                "idStore": idStore,
                "name": $('#namePr').val(),
                "logo": $('#logoPr').val(),
                "banner": $('#bannerPr').val(),
                "category": $('#categoriesStore').val(), }
        const settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/admin/updateStore",
                "method": "PUT",
                data: data}
              
        $.ajax(settings).done(function (response) {
                renderStores()
        });
    }
    $('#modalStore').css('display', 'none');
    filterSelection($('.activeCat'))
}

async function saveProduct() {
    if (indexProduct == null) {
        await $.post("http://localhost:3000/admin/newProduct", {
            "img": $('#imgPr').val(),
            "price": $('#pricePr').val(),
            "description": $('#descriptionPr').val(), 
            "idStore": idStore, 
            "name": $('#namePr').val(),}).done(function (response) {
              renderStores()
          }).fail(function(xhr, status, res) {

          })
  }else{
    const idProductCS = stores[indexStore]['products'][indexProduct];
      const data = {
          "img": $('#imgPr').val(),
          "price": $('#pricePr').val(),
          "description": $('#descriptionPr').val(), 
          "idProduct": idProductCS._id, 
          "name": $('#namePrt').val(),}
      const settings = {
              "async": true,
              "crossDomain": true,
              "url": "http://localhost:3000/admin/updateProduct",
              "method": "PUT",
              data: data}
            
      await $.ajax(settings).done(function (response) {
            renderStores()
      });
  }
    const productsData = []
        stores[indexStore]['products'].forEach((products, index) => {
            productsData.push([products.name, products.price, index])
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

function deleteStore() {
    const store = stores[indexStore];
    const data = {
        "idStore": store._id }
const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/deleteStore",
        "method": "DELETE",
        data: data}
      
$.ajax(settings).done(function (response) {
    renderCategories();
    $('#modalStore').css('display', 'none');
});
}

function deleteProduct() {
    const product = stores[indexStore]['products'][indexProduct];
    const data = {
        "idProduct": product._id }
const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/admin/deleteProduct",
        "method": "DELETE",
        data: data}
      
$.ajax(settings).done(function (response) {
    renderStores();
    $('#modalPr').css('display', 'none');
    $('#modalStore').css('display', 'none');
});
}