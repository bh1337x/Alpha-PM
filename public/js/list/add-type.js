$(() => {
    const nameField = $("#name");
    const confirmModal = $("#confirmModal");
    const confirmBtn = $("#confirmBtn");
    const toastSuccess = $("#toastSuccess");
    const toastError = $("#toastError");

    confirmBtn.on("click", () => {
        confirmModal.modal('hide');
        $.post(`http://${location.host}/api/list/types`, {
            name: nameField.val(),
        }).then(() => {
            toastSuccess.toast('show');
            $("#addForm").trigger("reset");
        }).catch((err) => {
            toastError.toast('show');
            console.error(err);
        });
    });
});