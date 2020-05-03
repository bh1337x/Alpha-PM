$(() => {
    const searchBox = $("#search-box");
    const searchBoxText = $("#search-box-text");
    const resultBox = $("#result-box");
    const resHolder = $("#result-holder");
    const resetBtn = $("#reset-btn");
    const modal = $("#typeModal");

    modal.on("show.bs.modal", event => {
        const link = $(event.relatedTarget);
        const data = {
            id: link.data("id"),
            name: link.data("name"),
            count: 0
        }

        $.get(`http://${location.host}/api/list/types/id/${link.data("id")}`)
            .then(d => {
                data.count = d.count;
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#count").val(data.count);
                sessionStorage.setItem("edit-type-data", JSON.stringify(data));
            }).catch(err => {
                console.error(err);
        });
    });

    modal.on("hide.bs.modal", () => {
        sessionStorage.removeItem("edit-type-data");
    });

    const renderTypes = data => {
        if (data.length > 0) {
            resHolder.html('');
            let i = 0;
            data.forEach((d) => {
                resHolder.append(`<tr>
                                    <th scope="row">${i + 1}</th>
                                    <td>
                                        <a data-toggle="modal" href="#typeModal" 
                                        class="button text-decoration-none"
                                        data-id="${d._id}"
                                        data-name="${d.name}">
                                            <img style="width: 35px" src="../img/${iconFor(d.name)}.png" 
                                            alt="${d.name} Icon"> ${d.name}
                                        </a>
                                    </td>
                                </tr>`);
                if (resultBox.hasClass("d-none")) {
                    resultBox.removeClass("d-none");
                }
                i = i + 1;
            });
        } else {
            if (!resultBox.hasClass("d-none")) {
                resultBox.addClass("d-none");
            }
        }
    }

    const getAllTypes = () => {
        $.get(`http://${location.host}/api/list/types`)
            .then(data => {
                searchBoxText.text(`Total ${data.length} types`);
                renderTypes(data);
            }).catch(err => {
                console.error(err);
            });
    }

    const getTypes = () => {
        $.get(`http://${location.host}/api/list/types/name/${searchBox.val()}`)
            .then(data => {
                searchBoxText.text(`Total ${data.length} results`);
                renderTypes(data);
            }).catch(err => {
                console.error(err);
            });
    }

    searchBox.on("input", () => {
        if (searchBox.val() === "")
        {
            getAllTypes();
        }
        if (searchBox.val() !== "" && searchBox.val().trim() !== "")
        {
            getTypes();
        }
    });

    resetBtn.on("click", () => {
        if (resultBox.hasClass("d-none")) {
            resultBox.removeClass("d-none");
        }
        getAllTypes();
    });

    getAllTypes();
});