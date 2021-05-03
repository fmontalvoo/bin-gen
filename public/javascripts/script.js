$("button").on("click", function () {
    let number = $("#number").val();
    let valid = '01/23';
    let cvv = '223';
    $('#dataTable tr').remove();
    $.ajax({
        type: 'GET',
        url: '/generate',
        data: {
            number,
            valid,
            cvv
        },
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<tr>', { html: formatItem(data[i]) }).appendTo($("#dataTable"));
            }

        }
    });
});


function formatItem(item) {
    return '<td>' + item.number + '</td> <td> ' + item.valid + ' </td><td>' + item.cvv + '</td>';
}
