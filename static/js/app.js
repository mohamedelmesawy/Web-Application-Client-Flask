var baseUrl = "http://127.0.0.1:8000/";


window.onload = function () {
    //  Buttons --------------------------------
    $.ajax(
        {
            url: baseUrl,
            contentType: 'application/json',
            type: 'GET',
            success: function(result){
                console.log('result' + result)
            }
        }
    );

    $("#btn-hi").on("click", function(e) {
        e.preventDefault();
        $.ajax({type: "GET",
            url: baseUrl + "/",
            success:function(result) {
             console.log(result)
            },
            error:function(result) {
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
                success: function (data) {
                    console.log('Hiiiiiiiiiiiiiii')
                    $('#img-predicted').attr("src", "data:image/png;base64," + data);
                    console.log('Finished')
                },
                error:function(result) {
                    alert('error');
                }
            });
        });
    
    console.log('Developers');
}

