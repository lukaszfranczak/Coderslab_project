// Do zrobienia wykresu, który będzie się zmieniał dynamicznie skorzystać z chartjs-plugin-streaming

$( () => {
    // Pole do wyboru opcji

    let chart = $("#canvas");

    let laptimeOptions = [];
    let selectY1 = $('#Y-axis-1')

    let lapDataUrl = 'http://localhost:3000/test-lap/';

    selectY1.on('change', function() {
        showData(lapDataUrl, this.value);
    });


    function renderData(givenLapData, selectedData) {

        // Label

        let labels = givenLapData.map(function(e) {
            return e.DistanceM;
        });

        // Dodatkowe linie

        // var dataSpeed = givenLapData.map(function(e) {
        //     return e.SpeedKph;
        // });
        // var dataAcceleration = givenLapData.map(function(e) {
        //     return e.LongitudinalAccelerationG;
        // });

        // Input data
        let inputData = givenLapData.map(function(e) {
            return e[selectedData];
        });

        let ctx = canvas.getContext('2d');
        let config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: selectedData,
                    data: inputData,
                    backgroundColor: 'rgba(0, 119, 204, 0.3)'
                }]

                // Wyswietlanie dodatkowych linii

                // ,
                //     {
                //         label: 'Acceleration',
                //         data: dataAcceleration,
                //         backgroundColor: 'rgba(249, 14, 14, 0.3)'
                //     }]
            }
        };

        let chart = new Chart(ctx, config);
    }

    function showData(givenUrl, selectedLapData='SpeedKph') {
        $.ajax({
            url: givenUrl
        }).done(function(response) {
            // console.log(Object.keys(response[0]));
            laptimeOptions = Object.keys(response[0]);
            laptimeOptions.map(function(element) {
                selectY1.append($('<option>'+element+'</option>'));
            });
            renderData(response, selectedLapData);
        }).fail(function(error) {
            console.log(error);
        })
    }


    showData(lapDataUrl);


    // ROZKMINIĆ JAK TO DZIAŁA
    // File upload

    var Upload = function (file) {
        this.file = file;
    };

    Upload.prototype.getType = function() {
        return this.file.type;
    };
    Upload.prototype.getSize = function() {
        return this.file.size;
    };
    Upload.prototype.getName = function() {
        return this.file.name;
    };
    Upload.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);

        $.ajax({
            type: "POST",
            url: "script",
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                // tutaj powinienem wrzucony plik wrzucić do src #video-file a pozniej odpalic load()
                // $("#video-file").attr('src', Upload.getName);
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };

    Upload.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#progress-wrp";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    //Change id to your id
    $("#video-file-upload").on("change", function (e) {
        var file = $(this)[0].files[0];
        var upload = new Upload(file);

        // maby check size or type here with upload.getSize() and upload.getType()

        // execute upload
        upload.doUpload();
    });

})

