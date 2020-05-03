$(() => {
    if (sessionStorage.getItem("edit-product-data") == null)
    {
        location.href = "list-product.html"
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

    const editData = JSON.parse(sessionStorage.getItem("edit-product-data"));

    idField.val(editData.id);
    fullnameField.val(editData.fullname);
    nameField.val(editData.name);
    genericField.val(editData.generic);
    sizeField.val(editData.size);
    priceField.val(editData.price);

    $.get(`http://${location.host}/api/list/types`)
        .then((data) => {
            data.forEach((d) => {
                typeField.append(`<option value="${d.name}">${d.name}</option>`);
            });
            typeField.val(editData.type);
        }).catch((err) => {
            console.error(err);
        });

    $.get(`http://${location.host}/api/list/companies`)
        .then((data) => {
            data.forEach((d) => {
                companyField.append(`<option value="${d.name}">${d.name}</option>`);
            });
            companyField.val(editData.company);
        }).catch((err) => {
            console.error(err);
        });

    editBtn.on("click", () => {
        editModal.modal('hide');
        $.post(`http://${location.host}/api/list/products/id/${idField.val()}`, {
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
            sessionStorage.removeItem("edit-product-data");
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
        $.ajax(`http://${location.host}/api/list/products/id/${idField.val()}`, { type: "DELETE" })
            .then(() => {
                toastMsg.html("<p class=\"text-success\">Deleted Product Successfully!</p>");
                toast.toast('show');
                sessionStorage.removeItem("edit-product-data");
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