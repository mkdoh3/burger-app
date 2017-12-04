$(function () {
    $(".eat-it").on('click', function (e) {
        let id = $(this).data("id");

        let eaten = {
            devoured: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eaten
        }).then(function () {
            location.reload();
        });
    });

    $(".submit-burger").on('click', function (e) {
        let newBurger = {
            name: $("#burgerText").val()
        };

        $.ajax("api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("burger added");

        });

    });

    $(".forget-it").on('click', function (e) {
        let id = $(this).data("id");
        console.log("clicked: ", id)
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(function () {
            location.reload();
        });
    })

});
