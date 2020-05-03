$(() => {
    const searchBox = $("#search-box");
    const searchBoxText = $("#search-box-text");
    const resultBox = $("#result-box");
    const resHolder = $("#result-holder");
    const resetBtn = $("#reset-btn");
    const modal = $("#companyModal");

    modal.on("show.bs.modal", event => {
        const link = $(event.relatedTarget);
        const data = {
            id: link.data("id"),
            name: link.data("name"),
            count: 0
        }

        $.get(`http://${location.host}/api/list/companies/id/${link.data("id")}`)
            .then(d => {
                data.count = d.count;
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#count").val(data.count);
                sessionStorage.setItem("edit-company-data", JSON.stringify(data));
            }).catch(err => {
                console.error(err);
            });
    });

    modal.on("hide.bs.modal", () => {
        sessionStorage.removeItem("edit-company-data");
    });

    const renderCompanies = data => {
        if (data.length > 0) {
            resHolder.html('');
            let i = 0;
            data.forEach(d => {
                resHolder.append(`<tr>
                                    <th scope="row">${i + 1}</th>
                                    <td>
                                        <a data-toggle="modal" href="#companyModal" 
                                        class="button text-decoration-none"
                                        data-id="${d._id}"
                                        data-name="${d.name}">
                                            ${d.name}
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

    const getAllComapnies = () => {
        $.get(`http://${location.host}/api/list/companies`)
            .then(data => {
                searchBoxText.text(`Total ${data.length} companies`);
                renderCompanies(data);
            }).catch(err => {
                console.error(err);
            });
    }

    const getCompanies = () => {
        $.get(`http://${location.host}/api/list/companies/name/${searchBox.val()}`)
            .then(data => {
                searchBoxText.text(`Total ${data.length} results`);
                renderCompanies(data);
            }).catch(err => {
                console.error(err);
            });
    }

    searchBox.on("input", () => {
        if (searchBox.val() === "")
        {
            getAllComapnies();
        }
        if (searchBox.val() !== "" && searchBox.val().trim() !== "")
        {
            getCompanies();
        }
    });

    resetBtn.on("click", () => {
        if (resultBox.hasClass("d-none")) {
            resultBox.removeClass("d-none");
        }
        getAllComapnies();
    });

    getAllComapnies();
});