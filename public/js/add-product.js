$(() => {
    const fullnameField = $("#fullname");
    const nameField = $("#name");
    const typeField = $("#type");
    const genericField = $("#generic");
    const sizeField = $("#size");
    const companyField = $("#company");
    const priceField = $("#price");
    const confirmModal = $("#confirmModal");
    const confirmBtn = $("#confirmBtn");
    const toastSuccess = $("#toastSuccess");
    const toastError = $("#toastError");

    $.get("http://localhost:3000/api/list/types")
    .then((data) => {
        data.forEach((d) => {
            typeField.append(`<option value="${d.name}">${d.name}</option>'`);
        });
        typeField.val("NULL");
    }).catch((err) => {
        console.error(err);
    });
    $.get("http://localhost:3000/api/list/companies")
    .then((data) => {
        data.forEach((d) => {
            companyField.append(`<option value="${d.name}">${d.name}</option>'`);
        });
        companyField.val("NULL");
    }).catch((err) => {
        console.error(err);
    });

    confirmBtn.on("click", () => {
        confirmModal.modal('hide');
        $.post("http://localhost:3000/api/list/products", {
            fullname: fullnameField.val(),
            name: nameField.val(),
            type:typeField.val(),
            generic: genericField.val(),
            size: sizeField.val(),
            company: companyField.val(),
            price: priceField.val()
        }).then(() => {
            toastSuccess.toast('show');
            $("#addForm").trigger("reset");
        }).catch((err) => {
            toastError.toast('show');
            console.error(err);
        });
    });
});