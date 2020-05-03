$(() => {
    const searchBox = $("#search-box");
    const searchBoxText = $("#search-box-text");
    const resultBox = $("#result-box");
    const resHolder = $("#result-holder");
    const fbBox = $("#fb-box");
    const piText = $("#page-indicator");
    const backBtn = $("#backward-btn");
    const frontBtn = $("#forward-btn");
    const resetBtn = $("#reset-btn");
    const modal = $("#genericModal");

    let currentPage = 1;
    let totalPage = 0;

    modal.on("show.bs.modal", (event) => {
        const link = $(event.relatedTarget);
        const data = {
            id: link.data("id"),
            name: link.data("name"),
            count: 0
        }

        $.get(`http://${location.host}/api/list/generics/id/${link.data("id")}`)
            .then(d => {
                data.count = d.count;
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#count").val(data.count);
                sessionStorage.setItem("edit-generic-data", JSON.stringify(data));
            }).catch(err => {
                console.error(err);
            });
    });

    modal.on("hide.bs.modal", () => {
        sessionStorage.removeItem("edit-generic-data");
    });

    const renderGenerics  = (data, pageNo) => {
        if (data.len > 0) {
            totalPage = Math.round(data.len / 20);
            if (totalPage * 20 < data.len) {
                totalPage += 1;
            }
            if (currentPage === 1) {
                backBtn.attr("disabled", "disabled");
            } else {
                backBtn.removeAttr("disabled");
            }
            if (currentPage === totalPage) {
                frontBtn.attr("disabled", "disabled");
            } else {
                frontBtn.removeAttr("disabled");
            }
            piText.text(`Page ${pageNo} of ${totalPage}`);
            resHolder.html('');
            let i = 0;
            data.results.forEach(d => {
                resHolder.append(`<tr>
                                    <th scope="row">${i + 1}</th>
                                    <td>
                                        <a data-toggle="modal" href="#genericModal" 
                                        class="button text-decoration-none"
                                        data-id="${d._id}"
                                        data-name="${d.name}">
                                            ${d.name}
                                        </a>
                                    </td>
                                </tr>`);
                if (fbBox.hasClass("d-none")) {
                    fbBox.removeClass("d-none");
                }
                if (resultBox.hasClass("d-none")) {
                    resultBox.removeClass("d-none");
                }
                i = i + 1;
            });
        } else {
            if (!fbBox.hasClass("d-none")) {
                fbBox.addClass("d-none");
            }
            if (!resultBox.hasClass("d-none")) {
                resultBox.addClass("d-none");
            }
        }
    }

    const getAllGenerics = pageNo => {
        $.get(`http://${location.host}/api/list/generics?page=${pageNo}`)
            .then(data => {
                searchBoxText.text(`Total ${data.len} generics`);
                renderGenerics(data, pageNo);
            }).catch(err => {
                console.error(err);
            });
    }

    const getGenerics = pageNo => {
        $.get(`http://${location.host}/api/list/generics/name/${searchBox.val()}?page=${pageNo}`)
            .then(data => {
                searchBoxText.text(`Total ${data.len} results`);
                renderGenerics(data, pageNo);
            }).catch(err => {
                console.error(err);
            });
    }

    searchBox.on("input", () => {
        currentPage = 1;
        totalPage = 0;
        if (searchBox.val() !== "" && searchBox.val().trim() !== "")
        {
            getGenerics(currentPage);
        } else {
            getAllGenerics(currentPage);
        }
    });
    backBtn.on("click", () => {
        if (currentPage > 1) {
            currentPage -= 1;
            if (searchBox.val() !== "" && searchBox.val().trim() !== "")
            {
                getGenerics(currentPage);
            } else {
                getAllGenerics(currentPage);
            }
        }
    });
    frontBtn.on("click", () => {
        if (currentPage < totalPage + 1) {
            currentPage += 1;
            if (searchBox.val() !== "" && searchBox.val().trim() !== "")
            {
                getGenerics(currentPage);
            } else {
                getAllGenerics(currentPage);
            }
        }
    });
    resetBtn.on("click", () => {
        if (fbBox.hasClass("d-none")) {
            fbBox.removeClass("d-none");
        }
        if (resultBox.hasClass("d-none")) {
            resultBox.removeClass("d-none");
        }
        currentPage = 1;
        totalPage = 0;
        getAllGenerics(currentPage);
    });

    getAllGenerics(currentPage);
});