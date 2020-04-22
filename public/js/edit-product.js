$(document).ready(() => {
    if (sessionStorage.getItem("id") == null)
    {
        location.href = "products.html"
    }
    const idField = $("#id");
    const fullnameField = $("#fullname");
    const nameField = $("#name");
    const typeField = $("#type");
    const genericField = $("#generic");
    const sizeField = $("#size");
    const companyField = $("#company");
    const priceField = $("#price");
    $.get(`http://localhost:3000/api/list/types/`)
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            typeField.append(`<option value="${data[i].name}">${data[i].name}</option>'`);
        }
        typeField.val(sessionStorage.getItem("type"));
    }).catch((err) => {
        console.error(err);
    });
    idField.val(sessionStorage.getItem("id"));
    fullnameField.val(sessionStorage.getItem("fullname"));
    nameField.val(sessionStorage.getItem("name"));
    genericField.val(sessionStorage.getItem("generic"));
    sizeField.val(sessionStorage.getItem("size"));
    companyField.val(sessionStorage.getItem("company"));
    priceField.val(sessionStorage.getItem("price"));
});