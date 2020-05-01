$(() => {
    const searchBox = $("#search-box");
    const searchBoxText = $("#search-box-text");
    const resultBox = $("#result-box");
    const resHolder = $("#result-holder");
    const resetBtn = $("#reset-btn");
    const modal = $("#typeModal");

    modal.on("show.bs.modal", (event) => {
        const link = $(event.relatedTarget);
        $("#id").val(link.data("id"));
        sessionStorage.setItem("edit-type-id", link.data("id"));
        $.get(`http://localhost:3000/api/list/types/id/${link.data("id")}`)
            .then((d) => {
                $("#name").val(d.name);
                sessionStorage.setItem("edit-type-name", link.data("name"));
                $("#count").val(d.count);
            }).catch((err) => {
                console.error(err);
        });
    });

    modal.on("hide.bs.modal", function () {
        sessionStorage.clear();
    });

    const renderTypes = (data) =>{
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
                                            <img style="width: 35px" src="img/${iconFor(d.name)}.png" 
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
        $.get(`http://localhost:3000/api/list/types`)
            .then(data => {
                searchBoxText.text(`Total ${data.length} types`);
                renderTypes(data);
            }).catch(err => {
                console.error(err);
            });
    }

    const getTypes = () => {
        $.get(`http://localhost:3000/api/list/types/name/${searchBox.val()}`)
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
            searchBoxText.text("Enter A Type Name.");
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
})