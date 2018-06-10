$( () => {
    // Pole do wyboru opcji

    var chart = $("#canvas");

    // var laptimeOptions = ['TimestampS','DistanceM', 'SpeedKph'];
    var laptimeOptions = [];
    // var select = $('<select>', {label: 'X-axis'});
    var selectX = $('#X-axis')

    // chart.before(select);

    var lapDataUrl = 'http://localhost:3000/test-lap/';

    selectX.on('change', function() {
        showData(lapDataUrl, this.value);
    });

    function renderData(givenLapData, selectedData) {

        // Label

        var labels = givenLapData.map(function(e) {
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

        var inputData = givenLapData.map(function(e) {
            return e[selectedData];
        });

        var ctx = canvas.getContext('2d');
        var config = {
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

        var chart = new Chart(ctx, config);
    }

    function showData(givenUrl, selectedLapData='SpeedKph') {
        $.ajax({
            url: givenUrl
        }).done(function(response) {
            // console.log(Object.keys(response[0]));
            laptimeOptions = Object.keys(response[0]);
            laptimeOptions.map(function(element) {
                selectX.append($('<option>'+element+'</option>'))
            });
            renderData(response, selectedLapData);
        }).fail(function(error) {
            console.log(error);
        })
    }


    showData(lapDataUrl);

})

