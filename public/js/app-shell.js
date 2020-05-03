$(() => {

    const ddLink = $(".dd-link");
    const ddGroup = $(".dd-group");
    const ddList = $(".dd-list");
    const navItem = $(".nav-item");
    const frame = $("#app-frame");
    ddLink.on("click", (event) => {
        event.preventDefault();
    });
    ddGroup.on("click", (event) => {
        const target = $(event.currentTarget);
        const list = target.find(".dd-list");
        if (!list.hasClass('dd-list-open')) {
            ddList.removeClass('dd-list-open');
            list.addClass("dd-list-open");
        } else {
            list.removeClass('dd-list-open');
        }
    });

    navItem.on("click", (event) => {
        event.preventDefault();
        const target = $(event.currentTarget);
        const link = target.data("target");
        frame.attr("src", link);
    });
    
    frame.on('load',function() {
        document.title = frame.contents().find("title").text();
    });

});