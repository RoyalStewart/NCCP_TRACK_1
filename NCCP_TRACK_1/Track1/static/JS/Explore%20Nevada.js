var defaultSiteConditions = {
    AirTemperature24HourHighFarenheit: 'Updating',
    AirTemperature24HourHighCelsius: 'Updating',
    AirTemperature24HourLowFarenheit: 'Updating',
    AirTemperature24HourLowCelsius: 'Updating',
    AirTemperatureAverageFarenheit: 'Updating',
    AirTemperatureAverageCelsius: 'Updating',
    BarometricPressure6HourNetChangeMillibars: 'Updating',
    BarometricPressure6HourNetChangeInchesMercury: 'Updating',
    RelativeHumidityAveragePercent: 'Updating',
    TimeStamp: 'In progress...',
    WindDirection6HourAverageDegreesNorth: 'Updating',
    WindDirectionAverageDegreesNorth: 'Updating',
    WindSpeed24HourMaximumGustMetersPerSecond: 'Updating',
    WindSpeed24HourMaximumGustMilesPerHour: 'Updating',
    WindSpeedAverageMetersPerSecond: 'Updating',
    WindSpeedAverageMilesPerHour: 'Updating',
    Precipitation24HourAccumulationInches: 'Updating',
    Precipitation24HourAccumulationMillimeters: 'Updating'
};

$script.ready(['jQuery', 'Cycle', 'jsRender', 'Spin', 'jQueryUI'], function () {
    //declares the variables here
    var map;

    var renoLabel = "Reno";
    var lasVegasLabel = "Las Vegas";

    //Nevada location 
    var nevada = new google.maps.LatLng(38.704265, -115.907357);

    //Go Back button
    var goBack = $('<button class="goback-btn">Go Back</button>');

    //location to go when zoom
    var snakeRangeLocation = new google.maps.LatLng(38.968930, -114.279513);
    var sheepRangeLocation = new google.maps.LatLng(36.592865, -115.194986);

    //location of the labels
    var labelLocation1 = new google.maps.LatLng(39.400000, -114.329513);
    var labelLocation2 = new google.maps.LatLng(37.268930, -115.279513);

    var ibLabel1;
    var ibLabel2;

    var snakeRangeMarker = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(38.820444, -114.497166),
          new google.maps.LatLng(39.115137, -114.063206))
    });

    var sheepRangeMarker = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(36.414644, -115.362339),
          new google.maps.LatLng(36.686034, -115.038242))
    });

    var siteInfo = new Array();
    var siteCameras = new Array();

    // Options that configure the spinner that shows when each site image is loading.
    var imageSpinnerOptions = {
        lines: 13, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        rotate: 0, // The rotation offset
        color: '#FFFFFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'center', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
    };

    // Define the helper function used on this page for jsRender.
    $.views.converters({

        /// <summary>
        /// A date and time formatter for the numeric dates that are returned via JSON structures.
        /// </summary>
        /// <param name="jsonDate">A JSON Date string representing a UTC date and time.</param>
        /// <returns>
        /// The date and time represented by <paramref name="jsonDate" /> using the current locale settings and the current time zone.
        /// </returns>
        jsonDateTime: function (jsonDate) {
            if (jsonDate == null) { return jsonDate; }

            var dateObject = new Date(parseInt(jsonDate.substr(6)));
            if (dateObject != 'Invalid Date') {

                return dateObject.toLocaleString();
            }
            else {
                return jsonDate;
            }
        },

        /// <summary>
        /// A date formatter for the numeric dates that are returned via JSON structures.
        /// </summary>
        /// <param name="jsonDate">A JSON Date string representing a UTC date and time.</param>
        /// <returns>
        /// The date component of the Date represented by <paramref name="jsonDate" /> using the current locale settings and the current time zone.
        /// </returns>
        jsonDate: function (jsonDate) {
            if (jsonDate == null) { return jsonDate; }

            var dateObject = new Date(parseInt(jsonDate.substr(6)));
            if (dateObject != 'Invalid Date') {

                return dateObject.toLocaleDateString();
            }
            else {
                return jsonDate;
            }
        },

        /// <summary>
        /// A date and time formatter for the numeric dates that are returned via JSON structures.
        /// </summary>
        /// <param name="jsonDate">A JSON Date string representing a UTC date and time.</param>
        /// <returns>
        /// The time component of the Date represented by <paramref name="jsonDate" /> using the current locale settings and the current time zone.
        /// </returns>
        jsonTime: function (jsonDate) {
            if (jsonDate == null) { return jsonDate; }

            var dateObject = new Date(parseInt(jsonDate.substr(6)));
            if (dateObject != 'Invalid Date') {

                return dateObject.toLocaleTimeString();
            }
            else {
                return jsonDate;
            }
        },

        ///
        number: function formatNumber(number) {

            // If the number is actually a number, format it.
            // Otherwise, return the original value.
            if (parseFloat(number) == number) {
                return number.toFixed(1);
            }
            else {
                return number;
            }
        },

        /// <summary>
        /// Formats an image title for display.
        /// </summary>
        imageTitle: function formatImageTitle(title) {
            return title.replace('Preset:', 'Latest Webcam Image:');
        },

        /// <summary>
        /// Formats a barometric pressure.
        /// </summary>
        barometricPressure: function formatBarometricPressure(pressure) {

            // If the number is actually a number, format it.
            // Otherwise, return the original value.
            var pressureValue = parseFloat(pressure);
            if (pressureValue == pressure) {

                // If the pressure is positive, add a '+' sign.
                if (pressureValue > 0) {
                    pressureValue = '+' + pressureValue.toFixed(2);
                }
                else {
                    pressureValue = pressureValue.toFixed(2);
                }
                return pressureValue;
            }
            else {
                return pressure;
            }
        }

    });

    //FUNCTIONS
    function ZoomChanged() {
        if (map.getZoom() >= 7) {
            snakeRangeMarker.setVisible(false);
            sheepRangeMarker.setVisible(false);

            $.each(siteInfo, function (index, s) {
                s.marker.setVisible(true);
            });
        }
        else {
            snakeRangeMarker.setVisible(true);
            sheepRangeMarker.setVisible(true);

            $.each(siteInfo, function (index, s) {
                s.marker.setVisible(false);
            });
        }
    }

    // Displays the images for a site.
    function ShowSiteImages(images) {

        // Apply the image template to the images data source, placing them under the "SiteImage" div.
        // We first have to remove any existing images so that we don't add duplicates.
        var imageContainer = $('div.SiteImages');

        imageContainer.empty();

        if (images) {
            imageContainer.append($('#SiteImageTemplate').render(images));

            // Add a loading spinner to each image that is disabled when the image is done loading.
            $('.SiteImage', imageContainer).each(function (i, e) {
                // Start the spinner.
                var spinner = $(e);
                spinner.spin(imageSpinnerOptions);

                // When the image loads, disable the spinner.
                $('img', spinner).load(function () {
                    spinner.spin(false);
                })
            });

            // Start cycling images, if there were multiple.
            // Even if there was only one, we start the process to preserve formatting.
            imageContainer.cycle({
                fx: 'fade',
                next: '.SiteImages',
                timeout: 8000,
                pause: 1
            });
        }
    }

    // Displays the provided site conditions for an item.
    function ShowSiteConditions(conditions) {
        // Remove any existing entry.
        $('.news_text .CurrentConditions').remove();

        if (conditions.AirTemperature24HourHighCelsius < -270) {
            conditions.AirTemperature24HourHighCelsius = "----";
        }
        if (conditions.AirTemperature24HourLowCelsius < -270) {
            conditions.AirTemperature24HourLowCelsius = "----";
        }
        if (conditions.AirTemperature24HourHighFarenheit < -459) {
            conditions.AirTemperature24HourHighFarenheit = "----";
        }
        if (conditions.AirTemperature24HourLowFarenheit < -459) {
            conditions.AirTemperature24HourLowFarenheit = "----";
        }

        // Render the template adn the data.
        $('.news_text').append($('#SiteCurrentConditionsTemplate').render(conditions));
    }

    function GetAndDisplaySiteConditions(siteId) {

        // Get the camera for the site.
        var camera = siteCameras[siteId];

        if (camera) {
            ShowSiteImages([camera.RepresentativeView]);

            // Retrieve and process the images for the camera.
            $.ajax({
                type: "POST",
                url: window.imagesUri,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"cameraId":"' + camera.Id + '", "number":"15"}',
                crossDomain: true,
                error: function (jqXHR, textStatus, errorThrown) {
                    // Use the default camera image, since the image list is unavailable.
                    ShowSiteImages([camera.RepresentativeView]);
                },
                success: function (images) {

                    // Set the default image as the Representative image for the camera.
                    var displayImages = [camera.RepresentativeView];

                    // If there are images, use them.
                    if (images.d.length > 0) {
                        displayImages = images.d;
                    }

                    // Build the image output.
                    ShowSiteImages(displayImages);
                }
            });
        } else {
            ShowSiteImages(null);
        }

        ShowSiteConditions(defaultSiteConditions);

        // Retrieve the current site conditions.
        $.ajax({
            type: "POST",
            url: window.conditionsUri,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"siteId":"' + siteId + '"}',
            crossDomain: true,
            error: function (jqXHR, textStatus, errorThrown) {
                // Display the default values as a placeholder.
                ShowSiteConditions(defaultSiteConditions);
            },
            success: function (conditions) {
                // If we have data, use it.
                // If not, fallback to the default.
                if (conditions.d != null) {
                    ShowSiteConditions(conditions.d);
                }
                else {
                    ShowSiteConditions(defaultSiteConditions);
                }
            }
        });

    };

    function openInfo(id, name) {
        $(".ui-dialog-title").text(name);

        $("#dialog").dialog("open");
        
        GetAndDisplaySiteConditions(id);
    }

    // Initializes the camera carousel display.
    $(document).ready(function () {
        $("#dialog").dialog({
            autoOpen: false,
            height: "auto",
            width: "auto",
            modal: true
        });

        $("#exploreNevadaCtl").spin(imageSpinnerOptions);

        //Setup the map
        var mapProp = {
            center: new google.maps.LatLng(38.704265, -115.907357),
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoomControl: false,
            panControl: false,
            streetViewControl: false, //yellow guy
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        //Listen to the click event of the go back button
        goBack.click(function () {
            map.setCenter(nevada);
            map.setZoom(6);

            return false;
        });

        //put the button 'go back' in the map
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(goBack[0]);

        // listener to when you change the zoom
        google.maps.event.addListener(map, 'zoom_changed', ZoomChanged);

        //Get the site locations
        PageMethods.GetSiteLocations(function (result) {
            //Success
            $.each(result, function (index, s) {
                //Put the sites as markers on the map
                var siteMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(s.Latitude, s.Longitude),
                    title: s.Name
                });

                s.marker = siteMarker;

                siteMarker.setMap(map);
                siteMarker.setVisible(false);

                //Hook up the click events to the map markers
                google.maps.event.addListener(siteMarker, 'click', function () {
                    openInfo(s.ID, s.Name);
                });

                siteInfo.push(s);
            });

            //Now add the two other markers to the map
            snakeRangeMarker.setMap(map);
            snakeRangeMarker.setVisible(true);
            google.maps.event.addListener(snakeRangeMarker, 'click', function () {
                map.setZoom(10);
                map.setCenter(snakeRangeLocation);
            });

            sheepRangeMarker.setMap(map);
            sheepRangeMarker.setVisible(true);
            google.maps.event.addListener(sheepRangeMarker, 'click', function () {
                map.setZoom(10);
                map.setCenter(sheepRangeLocation);
            });

            $("#exploreNevadaCtl").spin(false);
        }, function (result) {
            //Error
            $("#exploreNevadaCtl").spin(false);
        });

        //Get the camera information
        $.ajax({
            type: "POST",
            url: window.camerasUri,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            error: function (jqXHR, textStatus, errorThrown) {

            },
            success: function (cameras) {
                // Bind the cameras to the template.
                jQuery.each(cameras.d, function (index, camera) {
                    siteCameras[camera.SiteId] = camera;
                });
            }
        });
    });
});