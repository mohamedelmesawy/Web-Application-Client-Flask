var baseUrl = "http://127.0.0.1:8000/";


window.onload = function() {
    //  Buttons --------------------------------
    $.ajax({
        url: baseUrl,
        contentType: 'application/json',
        type: 'GET',
        success: function(result) {
            console.log('result' + result)
        }
    });

    $("#btn-hi").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: baseUrl + "/",
            success: function(result) {
                console.log(result)
            },
            error: function(result) {
                alert('error');
            }
        });
    });


    // $("#btn-predict-seg").on("click", function(e) {
    //     e.preventDefault();
    //     $.ajax({type: "POST",
    //         url: baseUrl,
    //         success:function(result) {
    //          console.log(result)
    //         },
    //         error:function(result) {
    //           alert('error');
    //         }
    //     });
    // });


    // $('#form-predict-seg').on('submit',function(e){
    //     e.preventDefault();
    //     $.ajax({
    //         type     : "POST",
    //         contentType: 'multipart/form-data',
    //         cache    : false,
    //         url      : baseUrl + 'upload',
    //         data     : $(this).serialize(),
    //         success  : function(data) {
    //             console.log(data)
    //         }
    //     });
    // });


    $('#upload-file-btn').click(function() {
        var form_data = new FormData($('#upload-file')[0]);
        var model_type = $('#dropdownmodel')[0].selectedOptions[0].value

        $.ajax({
            type: 'POST',
            url: baseUrl + 'upload/' + model_type,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                Swal.fire({
                    // title: model_type,
                    customClass: { 'header': model_type },
                    imageUrl: "data:image/png;base64," + data,
                    imageSize: '1280x2560',
                    // imageHeight: 320,
                    // imageWidth: 800,
                    imageAlt: 'Custom image'
                })
                $('.swal2-confirm, .swal2-styled')[0].style.width = "80px"
                $('.swal2-confirm, .swal2-styled')[0].setAttribute("class", "btn btn-primary")
                    // console.log('Hiiiiiiiiiiiiiii')
                    // $('#img-predicted').attr("src", "data:image/png;base64," + data);
                    // console.log('Finished')
            },
            error: function(result) {
                alert('error');
            }
        });
    });

    $('#btn-upload-two-files').click(function() {
        var form_data = new FormData($('#upload-two-files')[0]);
        var model_type = $('#dropdownmodel-miou')[0].selectedOptions[0].value

        $.ajax({
            type: 'POST',
            url: baseUrl + 'uploadfiles/' + model_type,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                Swal.fire({
                    // title: model_type,
                    customClass: { 'header': model_type },
                    imageUrl: "data:image/png;base64," + data,
                    imageSize: '1280x2560',
                    // imageHeight: 320,
                    // imageWidth: 800,
                    imageAlt: 'Custom image'
                })
                $('.swal2-confirm, .swal2-styled')[0].style.width = "80px"
                $('.swal2-confirm, .swal2-styled')[0].setAttribute("class", "btn btn-primary")
            },
            error: function(result) {
                alert('error');
            }
        });
    });

    console.log('Developers');
}