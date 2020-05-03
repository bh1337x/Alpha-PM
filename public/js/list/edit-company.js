$(() => {
    if (sessionStorage.getItem("edit-company-data") == null)
    {
        location.href = "list-company.html"
    }

    const idField = $("#id");
    const nameField = $("#name");
    const editModal = $("#editModal");
    const deleteModal = $("#deleteModal");
    const editBtn = $("#editBtn");
    const deleteBtn = $("#deleteBtn");
    const toast = $("#toast");
    const toastMsg = $(".toast-body");

    const editData = JSON.parse(sessionStorage.getItem("edit-company-data"));

    idField.val(editData.id);
    nameField.val(editData.name);

    if (editData.count > 0) {
        $(".btn-danger").attr("disabled", "disabled");
    }

    editBtn.on("click", () => {
        editModal.modal('hide');
        $.post(`http://${location.host}/api/list/companies/id/${idField.val()}`, {
            name: nameField.val(),
        }).then(() => {
            toastMsg.html("<p class=\"text-success\">Edited Company Successfully!</p>");
            toast.toast('show');
            sessionStorage.removeItem("edit-company-data");
            setInterval(() => {
                window.history.back();
            }, 2000);
        }).catch((err) => {
            toastMsg.html("<p class=\"text-danger\">Error Editing Company!</p>")
            toast.toast('show');
            console.error(err);
        });
    });

    deleteBtn.on("click", () => {
        deleteModal.modal('hide');
        $.ajax(`http://${location.host}/api/list/companies/id/${idField.val()}`, { type: "DELETE" })
            .then(() => {
                toastMsg.html("<p class=\"text-success\">Deleted Company Successfully!</p>");
                toast.toast('show');
                sessionStorage.removeItem("edit-company-data");
                setInterval(() => {
                    window.history.back();
                }, 2000);
            }).catch((err) => {
                toastMsg.html("<p class=\"text-danger\">Error Deleting Company!</p>")
                toast.toast('show');
                console.error(err);
            });
    });
});