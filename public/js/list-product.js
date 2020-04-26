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
    const modal = $("#productModal");
    let currentPage = 1;
    let totalPage = 0;

    modal.on("show.bs.modal", (event) => {
        const link = $(event.relatedTarget);
        $("#id").val(link.data("id"));
        $("#fullname").val(link.data("fullname"));
        $("#name").val(link.data("name"));
        $("#type").val(link.data("type"));
        $("#generic").val(link.data("generic"));
        $("#size").val(link.data("size"));
        $("#company").val(link.data("company"));
        $("#price").val(link.data("price"));
        sessionStorage.setItem("edit-product-id", link.data("id"));
        sessionStorage.setItem("edit-product-fullname", link.data("fullname"));
        sessionStorage.setItem("edit-product-name", link.data("name"));
        sessionStorage.setItem("edit-product-type", link.data("type"));
        sessionStorage.setItem("edit-product-generic", link.data("generic"));
        sessionStorage.setItem("edit-product-size", link.data("size"));
        sessionStorage.setItem("edit-product-company", link.data("company"));
        sessionStorage.setItem("edit-product-price", link.data("price"));

    });

    modal.on("hide.bs.modal", function () {
        sessionStorage.clear();
    });

    const renderProducts = (data, pageNo) =>{
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
            data.results.forEach((d) => {
                resHolder.append(`<tr>
                                <th scope="row">${((pageNo - 1) * 20) + i + 1}</th>
                                <td>
                                    <a data-toggle="modal" href="#productModal" 
                                    class="button text-decoration-none"
                                    data-id="${d._id}"
                                    data-fullname="${d.fullname}"
                                    data-name="${d.name}"
                                    data-type="${d.type}"
                                    data-generic="${d.generic}"
                                    data-size="${d.size}"
                                    data-company="${d.company}"
                                    data-price="${d.price}">
                                        ${d.fullname}
                                    </a>
                                </td>
                                <td>
                                    <img style="width: 35px" src="img/${iconFor(data.results[i].type)}.png" 
                                        alt="${data.results[i].type} Icon">
                                    ${data.results[i].type}
                                </td>
                                <td>${data.results[i].company}</td>
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

    const getAllProducts = (pageNo) => {
        $.get(`http://localhost:3000/api/list/products?page=${pageNo}`)
            .then(data => {
                renderProducts(data, pageNo);
            }).catch(err => {
                console.error(err);
            });
    }

    const getProducts = (pageNo) => {
        $.get(`http://localhost:3000/api/list/products/name/${searchBox.val()}?page=${pageNo}`)
            .then(data => {
                searchBoxText.text(`Total ${data.len} results`);
                renderProducts(data, pageNo);
            }).catch(err => {
                console.error(err);
            });
    }

    searchBox.on("input", () => {
        currentPage = 1;
        totalPage = 0;
        if (searchBox.val() === "")
        {
            getAllProducts(currentPage);
            searchBoxText.text("Enter A Product Name.");
        }
        if (searchBox.val() !== "" && searchBox.val().trim() !== "")
        {
            getProducts(currentPage);
        }
    });
    backBtn.on("click", () => {
        if (currentPage > 1) {
            currentPage -= 1;
            if (searchBox.val() !== "" && searchBox.val().trim() !== "")
            {
                getProducts(currentPage);
            } else {
                getAllProducts(currentPage);
            }
        }
    });
    frontBtn.on("click", () => {
        if (currentPage < totalPage + 1) {
            currentPage += 1;
            if (searchBox.val() !== "" && searchBox.val().trim() !== "")
            {
                getProducts(currentPage);
            } else {
                getAllProducts(currentPage);
            }
        }
    });
    resetBtn.on("click", () => {
        searchBoxText.text("Enter A Product Name.");
        if (fbBox.hasClass("d-none")) {
            fbBox.removeClass("d-none");
        }
        if (resultBox.hasClass("d-none")) {
            resultBox.removeClass("d-none");
        }
        currentPage = 1;
        totalPage = 0;
        getAllProducts(currentPage);
    });

    getAllProducts(currentPage);
});