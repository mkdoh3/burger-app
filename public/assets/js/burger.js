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

        })

    })


})
