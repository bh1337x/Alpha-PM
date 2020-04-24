$(() => {
    if (sessionStorage.getItem("id") == null)
    {
        location.href = "list-products.html"
    }
    const idField = $("#id");
    const fullnameField = $("#fullname");
    const nameField = $("#name");
    const typeField = $("#type");
    const genericField = $("#generic");
    const sizeField = $("#size");
    const companyField = $("#company");
    const priceField = $("#price");
    idField.val(sessionStorage.getItem("id"));
    $.get("http://localhost:3000/api/list/types")
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            typeField.append(`<option value="${data[i].name}">${data[i].name}</option>'`);
        }
    }).catch((err) => {
        console.error(err);
    });
    $.get("http://localhost:3000/api/list/companies")
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                companyField.append(`<option value="${data[i].name}">${data[i].name}</option>'`);
            }
        }).catch((err) => {
        console.error(err);
    });
    $.get(`http://localhost:3000/api/list/products/id/${sessionStorage.getItem("id")}`)
        .then((data) => {
            fullnameField.val(data.fullname);
            nameField.val(data.name);
            typeField.val(data.type);
            genericField.val(data.generic);
            sizeField.val(data.size);
            companyField.val(data.company);
            priceField.val(data.price);
        }).catch((err) => {
        console.error(err);
    });
});