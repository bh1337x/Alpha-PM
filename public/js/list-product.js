$(() => {
    const searchBox = $("#search-box");
    const searchBoxText = $("#search-box-text");
    const resultBox = $("#result-box");
    const fbBox = $("#fb-box");
    const piText = $("#page-indicator");
    const backBtn = $("#backward-btn");
    const frontBtn = $("#forward-btn");
    const resetBtn = $("#reset-btn");
    const modal = $("#productModal");
    let currentPage = 1;
    let totalPage = 0;

    modal.on("show.bs.modal", (event) => {
        const link = $(event.relatedTarget);
        const modal = $(event.currentTarget);
        modal.find(".modal-body #id").val(link.data("id"));
        modal.find(".modal-body #fullname").val(link.data("fullname"));
        modal.find(".modal-body #name").val(link.data("name"));
        modal.find(".modal-body #type").val(link.data("type"));
        modal.find(".modal-body #generic").val(link.data("generic"));
        modal.find(".modal-body #size").val(link.data("size"));
        modal.find(".modal-body #company").val(link.data("company"));
        modal.find(".modal-body #price").val(link.data("price"));
        sessionStorage.setItem("id", link.data("id"));
        sessionStorage.setItem("fullname", link.data("fullname"));
        sessionStorage.setItem("name", link.data("name"));
        sessionStorage.setItem("type", link.data("type"));
        sessionStorage.setItem("generic", link.data("generic"));
        sessionStorage.setItem("size", link.data("size"));
        sessionStorage.setItem("company", link.data("company"));
        sessionStorage.setItem("price", link.data("price"));
    });
    modal.on("hide.bs.modal", function () {
        sessionStorage.clear();
        console.log("close");
    });

    const getProducts = (pageNo) => {
        $.get(`http://localhost:3000/api/list/products/name/${searchBox.val()}/?page=${pageNo}`)
            .then(data => {
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
                    if (fbBox.hasClass("d-none")) {
                        fbBox.removeClass("d-none");
                    }
                    resultBox.html(`<table class="table table-hover">
                                    <thead class="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Company</th>
                                    </tr>
                                    </thead>
                                    <tbody id="result-holder">
                                    </tbody>
                                </table>`);
                    const resHolder = $("#result-holder");
                    searchBoxText.text(`Total ${data.len} results`);
                    for (i = 0; i < data.results.length; i++){
                        resHolder.append(`<tr>
                                            <th scope="row">${i + 1}</th>
                                            <td>
                                                <a data-toggle="modal" href="#productModal" 
                                                class="button text-decoration-none"
                                                data-id="${data.results[i]._id}"
                                                data-fullname="${data.results[i].fullname}"
                                                data-name="${data.results[i].name}"
                                                data-type="${data.results[i].type}"
                                                data-generic="${data.results[i].generic}"
                                                data-size="${data.results[i].size}"
                                                data-company="${data.results[i].company}"
                                                data-price="${data.results[i].price}">
                                                    ${data.results[i].fullname}
                                                </a>
                                            </td>
                                            <td>
                                                <img style="width: 35px" src="img/${iconFor(data.results[i].type)}.png" 
                                                    alt="${data.results[i].type} Icon">
                                                ${data.results[i].type}
                                            </td>
                                            <td>${data.results[i].company}</td>
                                        </tr>`);
                    }
                } else {
                    if (!fbBox.hasClass("d-none")) {
                        fbBox.addClass("d-none");
                    }
                    resultBox.html("");
                    searchBoxText.text(`Total ${data.len} results`);
                }
            }).catch(err => {
                console.error(err);
            });
    }

    searchBox.on("input", () => {
        currentPage = 1;
        totalPage = 0;
        if (searchBox.val() !== "" && searchBox.val().trim() !== "")
        {
            getProducts(currentPage);
        } else {
            if (!fbBox.hasClass("d-none")) {
                fbBox.addClass("d-none");
            }
            resultBox.html("");
            searchBoxText.text("Enter Valid Name!");
        }
    });
    backBtn.on("click", () => {
        if (currentPage > 1) {
            currentPage -= 1;
            if (searchBox.val() !== "" && searchBox.val().trim() !== "")
            {
                getProducts(currentPage);
            }
        }
    });
    frontBtn.on("click", () => {
        if (currentPage < totalPage + 1) {
            currentPage += 1;
            if (searchBox.val() !== "" && searchBox.val().trim() !== "")
            {
                getProducts(currentPage);
            }
        }
    });
    resetBtn.on("click", () => {
        if (!fbBox.hasClass("d-none")) {
            fbBox.addClass("d-none");
        }
        resultBox.html("");
        searchBoxText.text("Enter A Product Name.");
    });
});