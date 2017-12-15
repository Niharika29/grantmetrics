$(function () {
    // Only run on event pages.
    if (!$('body').hasClass('event')) {
        return;
    }

    // Setup the add/remove wiki fields when creating or editing a new event.
    if ($('body').hasClass('event-new') || $('body').hasClass('event-edit')) {
        setupAddRemove('event', 'wiki');
    }

    // Add/remove participants hooks for when viewing an event.
    if ($('body').hasClass('event-show')) {
        setupAddRemove('event', 'participant');
    }

    $('.event-action__delete').on('click', function () {
        return window.confirm(
            $.i18n('confirm-deletion', $(this).data('title'))
        );
    });

    var startDate = moment($('#form_start').val()),
        endDate = moment($('#form_end').val());

    // Set defaults if invalid or blank -- next week.
    startDate = startDate.isValid() ? startDate : moment().add(7, 'days').startOf('week');
    endDate = endDate.isValid() ? endDate : moment().add(7, 'days').endOf('week');

    $('#form_time').daterangepicker({
        timePicker: true,
        timePicker24Hour: is24HourFormat(),
        minDate: moment.min(startDate, moment().startOf('day')),
        startDate: startDate,
        endDate: endDate,
        locale: {
            format: getLocaleDatePattern() + ' ' + getLocaleTimePattern(),
            applyLabel: $.i18n('apply'),
            cancelLabel: $.i18n('cancel'),
            customRangeLabel: $.i18n('custom-range'),
            daysOfWeek: getWeekdayNames(),
            monthNames: getMonthNames()
        }
    }, function (start, end, label) {
        // Populate hidden fields with ISO-8601 format.
        $('#form_start').val(start.format('YYYY-MM-DDTHH:mm:00Z'));
        $('#form_end').val(end.format('YYYY-MM-DDTHH:mm:00Z'));
    });
});
