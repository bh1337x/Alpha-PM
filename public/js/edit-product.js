$(() => {
    if (sessionStorage.getItem("edit-product-id") == null)
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
    const editModal = $("#editModal");
    const deleteModal = $("#deleteModal");
    const editBtn = $("#editBtn");
    const deleteBtn = $("#deleteBtn");
    const toast = $("#toast");
    const toastMsg = $(".toast-body");

    idField.val(sessionStorage.getItem("edit-product-id"));
    fullnameField.val(sessionStorage.getItem("edit-product-fullname"));
    nameField.val(sessionStorage.getItem("edit-product-name"));
    genericField.val(sessionStorage.getItem("edit-product-generic"));
    sizeField.val(sessionStorage.getItem("edit-product-size"));
    priceField.val(sessionStorage.getItem("edit-product-price"));

    $.get("http://localhost:3000/api/list/types")
    .then((data) => {
        data.forEach((d) => {
            typeField.append(`<option value="${d.name}">${d.name}</option>'`);
        });
        typeField.val(sessionStorage.getItem("edit-product-type"));
    }).catch((err) => {
        console.error(err);
    });

    $.get("http://localhost:3000/api/list/companies")
    .then((data) => {
        data.forEach((d) => {
            companyField.append(`<option value="${d.name}">${d.name}</option>'`);
        });
        companyField.val(sessionStorage.getItem("edit-product-company"));
    }).catch((err) => {
        console.error(err);
    });

    editBtn.on("click", () => {
        editModal.modal('hide');
        $.post(`http://localhost:3000/api/list/products/id/${idField.val()}`, {
            fullname: fullnameField.val(),
            name: nameField.val(),
            type:typeField.val(),
            generic: genericField.val(),
            size: sizeField.val(),
            company: companyField.val(),
            price: priceField.val()
        }).then(() => {
            toastMsg.html("<p class=\"text-success\">Edited Product Successfully!</p>");
            toast.toast('show');
            setInterval(() => {
                window.history.back();
            }, 2000);
        }).catch((err) => {
            toastMsg.html("<p class=\"text-danger\">Error Editing Product!</p>")
            toast.toast('show');
            console.error(err);
        });
    });

    deleteBtn.on("click", () => {
        deleteModal.modal('hide');
        $.ajax(`http://localhost:3000/api/list/products/id/${idField.val()}`, { type: "DELETE" })
        .then(() => {
            toastMsg.html("<p class=\"text-success\">Deleted Product Successfully!</p>");
            toast.toast('show');
            setInterval(() => {
                window.history.back();
            }, 2000);
        }).catch((err) => {
            toastMsg.html("<p class=\"text-danger\">Error Deleting Product!</p>")
            toast.toast('show');
            console.error(err);
        });
    });
});