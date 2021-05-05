// Da formato al input del numero de la tarjeta.
$('#number').on('keypress change', function () {
    $(this).val(function (index, value) {
        return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
});

// Escucha el evento click del boton para generar las tarjetas.
$("button").on("click", function () {
    let number = $("#number").val().trim().replace(/ /g, ""); // Recupera el valor del input.
    let valid = $('#valid').val().trim().replace('/', '|');
    let cvv = $('#cvv').val().trim();
    let range = $('#range').val();
    range = range > 9999 ? 9999 : range < 1 ? 1 : range;

    let randomG = $('#randomG').is(':checked');

    $.ajax({
        type: 'GET',
        url: '/generate',
        data: {
            number,
            valid,
            cvv,
            range,
            randomG
        },
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            let result = '';
            for (var i = 0; i < data.length; i++)
                result += data[i] + '\n';
            $('#result').val(result);
        }
    });
});

