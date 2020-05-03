$(() => {
    if (sessionStorage.getItem("edit-type-data") == null)
    {
        location.href = "list-type.html"
    }

    const idField = $("#id");
    const nameField = $("#name");
    const editModal = $("#editModal");
    const deleteModal = $("#deleteModal");
    const editBtn = $("#editBtn");
    const deleteBtn = $("#deleteBtn");
    const toast = $("#toast");
    const toastMsg = $(".toast-body");

    const editData = JSON.parse(sessionStorage.getItem("edit-type-data"));

    idField.val(editData.id);
    nameField.val(editData.name);

    if (editData.count > 0) {
        $(".btn-danger").attr("disabled", "disabled");
    }

    editBtn.on("click", () => {
        editModal.modal('hide');
        $.post(`http://${location.host}/api/list/types/id/${idField.val()}`, {
            name: nameField.val(),
        }).then(() => {
            toastMsg.html("<p class=\"text-success\">Edited Type Successfully!</p>");
            toast.toast('show');
            sessionStorage.removeItem("edit-type-data");
            setInterval(() => {
                window.history.back();
            }, 2000);
        }).catch((err) => {
            toastMsg.html("<p class=\"text-danger\">Error Editing Type!</p>")
            toast.toast('show');
            console.error(err);
        });
    });

    deleteBtn.on("click", () => {
        deleteModal.modal('hide');
        $.ajax(`http://${location.host}/api/list/types/id/${idField.val()}`, { type: "DELETE" })
            .then(() => {
                toastMsg.html("<p class=\"text-success\">Deleted Type Successfully!</p>");
                toast.toast('show');
                sessionStorage.removeItem("edit-type-data");
                setInterval(() => {
                    window.history.back();
                }, 2000);
            }).catch((err) => {
                toastMsg.html("<p class=\"text-danger\">Error Deleting Type!</p>")
                toast.toast('show');
                console.error(err);
            });
    });
});