// Da formato al input del numero de la tarjeta.
$('#number').on('keypress change', function () {
    $(this).val(function (index, value) {
        return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
});

// Escucha el evento click del boton para generar las tarjetas.
$("button").on("click", function () {
    let number = $("#number").val().trim().replace(' ', ''); // Recupera el valor del input.
    let valid = $('#valid').val().trim();
    let cvv = $('#cvv').val().trim();
    let range = $('#range').val();
    range = range > 100 ? 100 : range < 1 ? 1 : range;

    let randomV = $('#randomV').is(':checked');
    let randomC = $('#randomC').is(':checked');

    console.log(randomV, randomC);
    $.ajax({
        type: 'GET',
        url: '/generate',
        data: {
            number,
            valid,
            randomV,
            cvv,
            randomC,
            range
        },
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            let result = '';
            for (var i = 0; i < data.length; i++)
                result += formatItem(data[i]);
            $('#result').val(result);
        }
    });
});


function formatItem(item) {
    return item.number + '|' + item.valid + '|' + item.cvv + '\n';
}
