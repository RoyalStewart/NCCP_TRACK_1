/*
    JavaScript functionality for "Site Conditions.aspx"

    Author:     Mike McMahon
    Updated:    March 21, 2013
*/

// The default data bound to current site conditions if no other data is available.
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

$script.ready('jQuery', function () {

    // Allow jQuery cross-site scripts to support debugging. This may be removed for release.
    jQuery.support.cors = true;
});

$script.ready(['jQuery', 'jCarousel', 'Cycle', 'jsRender', 'Spin'], function () {

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
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
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

    // Displays the images for a site.
    function ShowSiteImages(item, images, representative) {

        // Apply the image template to the images data source, placing them under the "SiteImage" div.
        // We first have to remove any existing images so that we don't add duplicates.
        var imageContainer = $('div.SiteImages', item);
        imageContainer.append($('#SiteImageTemplate').render(images));

        if (representative) {
            $('.SiteImageTimeStamp', imageContainer).hide();
        } else {
            $('.SiteImageTimeStamp', imageContainer).show();
        }

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

    // Displays the provided site conditions for an item.
    function ShowSiteConditions(item, conditions) {

        // Remove any existing entry.
        $('.news_text .CurrentConditions', item).remove();

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
        $('.news_text', item).append($('#SiteCurrentConditionsTemplate').render(conditions));
    }

    function siteConditionsVisible(carousel, item, idx, state) {

        // Get the camera for the site.
        var listItem = $(item);
        var camera = listItem.data('camera');

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
                ShowSiteImages(item, [camera.RepresentativeView], true);
            },
            success: function (images) {
                // Set the default image as the Representative image for the camera.
                var displayImages = [camera.RepresentativeView];
                var representative = true;

                // If there are images, use them.
                if (images.d.length > 0) {
                    displayImages = images.d;
                    representative = false;
                }

                // Build the image output.
                ShowSiteImages(item, displayImages, representative);
            }
        });

        // Retrieve the current site conditions.
        $.ajax({
            type: "POST",
            url: window.conditionsUri,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"siteId":"' + camera.SiteId + '"}',
            crossDomain: true,
            error: function (jqXHR, textStatus, errorThrown) {
                // Display the default values as a placeholder.
                ShowSiteConditions(item, defaultSiteConditions);
            },
            success: function (conditions) {
                // If we have data, use it.
                // If not, fallback to the default.
                if (conditions.d != null) {
                    ShowSiteConditions(item, conditions.d);
                }
                else {
                    ShowSiteConditions(item, defaultSiteConditions);
                }
            }
        });

    };

    // Handles a site that becomes invisible.
    function SiteConditionsInvisible(carousel, item, idx, state) {

        // Hide the images to prevent any strange displays.
        var imageContainer = $('div.SiteImages', item);

        // Destroy the cycle plugin and remove the images.
        imageContainer.cycle('destroy');
        imageContainer.empty();
    };

    // Handles the init callback for the carousel
    function siteCarousel_initCallback(carousel) {
        carousel.clip.hover(function () {
            carousel.stopAuto();
        }, function () {
            carousel.startAuto();
        });
    };

    // Initializes the camera carousel display.
    $(document).ready(function () {

        // Hide the site carousel immediately until the cameras have been retrieved.
        $('#Sites').hide();

        // Start a spinner to show life while we prepare the document and retrieve the initial content.
        $('#ConditionsContainer').spin(imageSpinnerOptions);

        $.ajax({
            type: "POST",
            url: window.camerasUri,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            error: function (jqXHR, textStatus, errorThrown) {
                // Stop the spinner.
                $('#ConditionsContainer').spin(false);

                // Show the error message, since something went awry that will stop all our other efforts.
                $('.module').css('visibility', 'visible').show('slow');
            },
            success: function (cameras) {

                // Bind the cameras to the template.
                jQuery.each(cameras.d, function (index, camera) {

                    // Render the individual camera item form the template and attach the camera data item.
                    var cameraEntry = $($('#SiteConditionsTemplate').render(camera));
                    cameraEntry.data('camera', camera);
                    $('#Sites').append(cameraEntry);
                });

                // Stop the spinner.
                $('#ConditionsContainer').spin(false);

                // Start the carousel
                $('#Sites').show();
                $('#Sites').jcarousel({
                    wrap: 'circular',
                    auto: 40,
                    itemVisibleInCallback: {
                        onAfterAnimation: siteConditionsVisible
                    },
                    itemVisibleOutCallback: {
                        onAfterAnimation: SiteConditionsInvisible
                    },
                    initCallback: siteCarousel_initCallback
                });
            }
        });

    });
});