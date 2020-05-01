$(() => {
    const searchBox = $("#search-box");
    const searchBoxText = $("#search-box-text");
    const resultBox = $("#result-box");
    const resHolder = $("#result-holder");
    const resetBtn = $("#reset-btn");
    const modal = $("#companyModal");

    modal.on("show.bs.modal", (event) => {
        const link = $(event.relatedTarget);
        $("#id").val(link.data("id"));
        sessionStorage.setItem("edit-company-id", link.data("id"));
        $.get(`http://localhost:3000/api/list/companies/id/${link.data("id")}`)
            .then((d) => {
                $("#name").val(d.name);
                sessionStorage.setItem("edit-company-name", link.data("name"));
                $("#count").val(d.count);
            }).catch((err) => {
            console.error(err);
        });
    });

    modal.on("hide.bs.modal", function () {
        sessionStorage.clear();
    });

    const renderCompanies = (data) =>{
        if (data.length > 0) {
            resHolder.html('');
            let i = 0;
            data.forEach((d) => {
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
        $.get(`http://localhost:3000/api/list/companies`)
            .then(data => {
                searchBoxText.text(`Total ${data.length} companies`);
                renderCompanies(data);
            }).catch(err => {
            console.error(err);
        });
    }

    const getCompanies = () => {
        $.get(`http://localhost:3000/api/list/companies/name/${searchBox.val()}`)
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
            searchBoxText.text("Enter A Company Name.");
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
})