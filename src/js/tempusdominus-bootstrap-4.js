//noinspection JSUnusedGlobalSymbols
/* global DateTimePicker */
const TempusDominusBootstrap4 = ($ => { // eslint-disable-line no-unused-vars
    const JQUERY_NO_CONFLICT = $.fn[DateTimePicker.NAME],
        verticalModes = ['top', 'bottom', 'auto'],
        horizontalModes = ['left', 'right', 'auto'],
        toolbarPlacements = ['default', 'top', 'bottom'],
        getSelectorFromElement = function ($element) {
            let selector = $element.data('target'),
                $selector;

            if (!selector) {
                selector = $element.attr('href') || '';
                selector = /^#[a-z]/i.test(selector) ? selector : null;
            }
            $selector = $(selector);
            if ($selector.length === 0) {
                return $selector;
            }

            if (!$selector.data(DateTimePicker.DATA_KEY)) {
                $.extend({}, $selector.data(), $(this).data());
            }

            return $selector;
        };

    class TempusDominusBootstrap4 extends DateTimePicker {
        constructor(element, options) {
            super(element, options);
            this._init();
        }

        _init() {
            if (this._element.hasClass('input-group')) {
                // in case there is more then one 'input-group-addon' Issue #48
                const datepickerButton = this._element.find('.datepickerbutton');
                if (datepickerButton.length === 0) {
                    this.component = this._element.find('.input-group-addon');
                } else {
                    this.component = datepickerButton;
                }
            }
        }

        _getDatePickerTemplate() {
            const headTemplate = $('<thead>').append($('<tr>').append($('<th>').addClass('prev').attr('data-action', 'previous').append($('<span>').addClass(this._options.icons.previous))).append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', `${this._options.calendarWeeks ? '6' : '5'}`)).append($('<th>').addClass('next').attr('data-action', 'next').append($('<span>').addClass(this._options.icons.next)))),
                contTemplate = $('<tbody>').append($('<tr>').append($('<td>').attr('colspan', `${this._options.calendarWeeks ? '8' : '7'}`)));

            return [$('<div>').addClass('datepicker-days').append($('<table>').addClass('table table-sm').append(headTemplate).append($('<tbody>'))), $('<div>').addClass('datepicker-months').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-years').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-decades').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone()))];
        }

        _getTimePickerMainTemplate() {
            const topRow = $('<tr>'),
                middleRow = $('<tr>'),
                bottomRow = $('<tr>');

            if (this._isEnabled('h')) {
                topRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.incrementHour
                }).addClass('btn').attr('data-action', 'incrementHours').append($('<span>').addClass(this._options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-hour').attr({
                    'data-time-component': 'hours',
                    'title': this._options.tooltips.pickHour
                }).attr('data-action', 'showHours')));
                bottomRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.decrementHour
                }).addClass('btn').attr('data-action', 'decrementHours').append($('<span>').addClass(this._options.icons.down))));
            }
            if (this._isEnabled('m')) {
                if (this._isEnabled('h')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.incrementMinute
                }).addClass('btn').attr('data-action', 'incrementMinutes').append($('<span>').addClass(this._options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-minute').attr({
                    'data-time-component': 'minutes',
                    'title': this._options.tooltips.pickMinute
                }).attr('data-action', 'showMinutes')));
                bottomRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.decrementMinute
                }).addClass('btn').attr('data-action', 'decrementMinutes').append($('<span>').addClass(this._options.icons.down))));
            }
            if (this._isEnabled('s')) {
                if (this._isEnabled('m')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.incrementSecond
                }).addClass('btn').attr('data-action', 'incrementSeconds').append($('<span>').addClass(this._options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-second').attr({
                    'data-time-component': 'seconds',
                    'title': this._options.tooltips.pickSecond
                }).attr('data-action', 'showSeconds')));
                bottomRow.append($('<td>').append($('<a>').attr({
                    href: '#',
                    tabindex: '-1',
                    'title': this._options.tooltips.decrementSecond
                }).addClass('btn').attr('data-action', 'decrementSeconds').append($('<span>').addClass(this._options.icons.down))));
            }

            if (!this.use24Hours) {
                topRow.append($('<td>').addClass('separator'));
                middleRow.append($('<td>').append($('<button>').addClass('btn btn-primary').attr({
                    'data-action': 'togglePeriod',
                    tabindex: '-1',
                    'title': this._options.tooltips.togglePeriod
                })));
                bottomRow.append($('<td>').addClass('separator'));
            }

            return $('<div>').addClass('timepicker-picker').append($('<table>').addClass('table-condensed').append([topRow, middleRow, bottomRow]));
        }

        _getTimePickerTemplate() {
            const hoursView = $('<div>').addClass('timepicker-hours').append($('<table>').addClass('table-condensed')),
                minutesView = $('<div>').addClass('timepicker-minutes').append($('<table>').addClass('table-condensed')),
                secondsView = $('<div>').addClass('timepicker-seconds').append($('<table>').addClass('table-condensed')),
                ret = [this._getTimePickerMainTemplate()];

            if (this._isEnabled('h')) {
                ret.push(hoursView);
            }
            if (this._isEnabled('m')) {
                ret.push(minutesView);
            }
            if (this._isEnabled('s')) {
                ret.push(secondsView);
            }

            return ret;
        }

        _getToolbar() {
            const row = [];
            if (this._options.buttons.showToday) {
                row.push($('<td>').append($('<a>').attr({
                    'data-action': 'today',
                    'title': this._options.tooltips.today
                }).append($('<span>').addClass(this._options.icons.today))));
            }
            if (!this._options.sideBySide && this._hasDate() && this._hasTime()) {
                row.push($('<td>').append($('<a>').attr({
                    'data-action': 'togglePicker',
                    'title': this._options.tooltips.selectTime
                }).append($('<span>').addClass(this._options.icons.time))));
            }
            if (this._options.buttons.showClear) {
                row.push($('<td>').append($('<a>').attr({
                    'data-action': 'clear',
                    'title': this._options.tooltips.clear
                }).append($('<span>').addClass(this._options.icons.clear))));
            }
            if (this._options.buttons.showClose) {
                row.push($('<td>').append($('<a>').attr({
                    'data-action': 'close',
                    'title': this._options.tooltips.close
                }).append($('<span>').addClass(this._options.icons.close))));
            }
            return row.length === 0 ? '' : $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
        }

        _getTemplate() {
            const template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
                dateView = $('<div>').addClass('datepicker').append(this._getDatePickerTemplate()),
                timeView = $('<div>').addClass('timepicker').append(this._getTimePickerTemplate()),
                content = $('<ul>').addClass('list-unstyled'),
                toolbar = $('<li>').addClass(`picker-switch${this._options.collapse ? ' accordion-toggle' : ''}`).append(this._getToolbar());

            if (this._options.inline) {
                template.removeClass('dropdown-menu');
            }

            if (this.use24Hours) {
                template.addClass('usetwentyfour');
            }
            if (this._isEnabled('s') && !this.use24Hours) {
                template.addClass('wider');
            }

            if (this._options.sideBySide && this._hasDate() && this._hasTime()) {
                template.addClass('timepicker-sbs');
                if (this._options.toolbarPlacement === 'top') {
                    template.append(toolbar);
                }
                template.append($('<div>').addClass('row').append(dateView.addClass('col-md-6')).append(timeView.addClass('col-md-6')));
                if (this._options.toolbarPlacement === 'bottom' || this._options.toolbarPlacement === 'default') {
                    template.append(toolbar);
                }
                return template;
            }

            if (this._options.toolbarPlacement === 'top') {
                content.append(toolbar);
            }
            if (this._hasDate()) {
                content.append($('<li>').addClass(this._options.collapse && this._hasTime() ? 'collapse' : '')
                    .addClass((this._options.collapse && this._hasTime() && this._options.viewMode === 'time' ? '' : 'show'))
                    .append(dateView));
            }
            if (this._options.toolbarPlacement === 'default') {
                content.append(toolbar);
            }
            if (this._hasTime()) {
                content.append($('<li>').addClass(this._options.collapse && this._hasDate() ? 'collapse' : '')
                    .addClass((this._options.collapse && this._hasDate() && this._options.viewMode === 'time' ? 'show' : ''))
                    .append(timeView));
            }
            if (this._options.toolbarPlacement === 'bottom') {
                content.append(toolbar);
            }
            return template.append(content);
        }

        _place() {
            const position = (this.component || this._element).position(),
                offset = (this.component || this._element).offset();
            let vertical = this._options.widgetPositioning.vertical,
                horizontal = this._options.widgetPositioning.horizontal,
                parent;

            if (this._options.widgetParent) {
                parent = this._options.widgetParent.append(this.widget);
            } else if (this._element.is('input')) {
                parent = this._element.after(this.widget).parent();
            } else if (this._options.inline) {
                parent = this._element.append(this.widget);
                return;
            } else {
                parent = this._element;
                this._element.children().first().after(this.widget);
            }

            // Top and bottom logic
            if (vertical === 'auto') {
                //noinspection JSValidateTypes
                if (offset.top + this.widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && this.widget.height() + this._element.outerHeight() < offset.top) {
                    vertical = 'top';
                } else {
                    vertical = 'bottom';
                }
            }

            // Left and right logic
            if (horizontal === 'auto') {
                if (parent.width() < offset.left + this.widget.outerWidth() / 2 && offset.left + this.widget.outerWidth() > $(window).width()) {
                    horizontal = 'right';
                } else {
                    horizontal = 'left';
                }
            }

            if (vertical === 'top') {
                this.widget.addClass('top').removeClass('bottom');
            } else {
                this.widget.addClass('bottom').removeClass('top');
            }

            if (horizontal === 'right') {
                this.widget.addClass('float-right');
            } else {
                this.widget.removeClass('float-right');
            }

            // find the first parent element that has a static css positioning
            if (parent.css('position') !== 'static') {
                parent = parent.parents().filter(function () {
                    return $(this).css('position') === 'static';
                }).first();
            }

            if (parent.length === 0) {
                throw new Error('datetimepicker component should be placed within a static positioned container');
            }

            this.widget.css({
                top: `${vertical === 'top' ? 'auto' : position.top + this._element.outerHeight()}`,
                bottom: `${vertical === 'top' ? parent.outerHeight() - (parent === this._element ? 0 : position.top) : 'auto'}`,
                left: `${horizontal === 'left' ? parent === this._element ? 0 : position.left : 'auto'}`,
                right: `${horizontal === 'left' ? 'auto' : parent.outerWidth() - this._element.outerWidth() - (parent === this._element ? 0 : position.left)}`
            });
        }

        _fillDow() {
            const row = $('<tr>'),
                currentDate = this._viewDate.clone().startOf('w').startOf('d');

            if (this._options.calendarWeeks === true) {
                row.append($('<th>').addClass('cw').text('#'));
            }

            while (currentDate.isBefore(this._viewDate.clone().endOf('w'))) {
                row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                currentDate.add(1, 'd');
            }
            this.widget.find('.datepicker-days thead').append(row);
        }

        _fillMonths() {
            const spans = [],
                monthsShort = this._viewDate.clone().startOf('y').startOf('d');
            while (monthsShort.isSame(this._viewDate, 'y')) {
                spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                monthsShort.add(1, 'M');
            }
            this.widget.find('.datepicker-months td').empty().append(spans);
        }

        _updateMonths() {
            const monthsView = this.widget.find('.datepicker-months'),
                monthsViewHeader = monthsView.find('th'),
                months = monthsView.find('tbody').find('span');

            monthsViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevYear);
            monthsViewHeader.eq(1).attr('title', this._options.tooltips.selectYear);
            monthsViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextYear);

            monthsView.find('.disabled').removeClass('disabled');

            if (!this._isValid(this._viewDate.clone().subtract(1, 'y'), 'y')) {
                monthsViewHeader.eq(0).addClass('disabled');
            }

            monthsViewHeader.eq(1).text(this._viewDate.year());

            if (!this._isValid(this._viewDate.clone().add(1, 'y'), 'y')) {
                monthsViewHeader.eq(2).addClass('disabled');
            }

            months.removeClass('active');
            if (this._date.isSame(this._viewDate, 'y') && !this.unset) {
                months.eq(this._date.month()).addClass('active');
            }
            let self = this;
            months.each(function (index) {
                if (!self._isValid(self._viewDate.clone().month(index), 'M')) {
                    $(this).addClass('disabled');
                }
            });
        }

        _updateYears() {
            const yearsView = this.widget.find('.datepicker-years'),
                yearsViewHeader = yearsView.find('th'),
                startYear = this._viewDate.clone().subtract(5, 'y'),
                endYear = this._viewDate.clone().add(6, 'y');
            let html = '';

            yearsViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevDecade);
            yearsViewHeader.eq(1).attr('title', this._options.tooltips.selectDecade);
            yearsViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextDecade);

            yearsView.find('.disabled').removeClass('disabled');

            if (this._options.minDate && this._options.minDate.isAfter(startYear, 'y')) {
                yearsViewHeader.eq(0).addClass('disabled');
            }

            yearsViewHeader.eq(1).text(`${startYear.year()}-${endYear.year()}`);

            if (this._options.maxDate && this._options.maxDate.isBefore(endYear, 'y')) {
                yearsViewHeader.eq(2).addClass('disabled');
            }

            while (!startYear.isAfter(endYear, 'y')) {
                html += `<span data-action="selectYear" class="year${startYear.isSame(this._date, 'y') && !this.unset ? ' active' : ''}${!this._isValid(startYear, 'y') ? ' disabled' : ''}">${startYear.year()}</span>`;
                startYear.add(1, 'y');
            }

            yearsView.find('td').html(html);
        }

        _updateDecades() {
            const decadesView = this.widget.find('.datepicker-decades'),
                decadesViewHeader = decadesView.find('th'),
                startDecade = moment({ y: this._viewDate.year() - this._viewDate.year() % 100 - 1 }),
                endDecade = startDecade.clone().add(100, 'y'),
                startedAt = startDecade.clone();
            let minDateDecade = false,
                maxDateDecade = false,
                endDecadeYear,
                html = '';

            decadesViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevCentury);
            decadesViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextCentury);

            decadesView.find('.disabled').removeClass('disabled');

            if (startDecade.isSame(moment({ y: 1900 })) || this._options.minDate && this._options.minDate.isAfter(startDecade, 'y')) {
                decadesViewHeader.eq(0).addClass('disabled');
            }

            decadesViewHeader.eq(1).text(`${startDecade.year()}-${endDecade.year()}`);

            if (startDecade.isSame(moment({ y: 2000 })) || this._options.maxDate && this._options.maxDate.isBefore(endDecade, 'y')) {
                decadesViewHeader.eq(2).addClass('disabled');
            }

            while (!startDecade.isAfter(endDecade, 'y')) {
                endDecadeYear = startDecade.year() + 12;
                minDateDecade = this._options.minDate && this._options.minDate.isAfter(startDecade, 'y') && this._options.minDate.year() <= endDecadeYear;
                maxDateDecade = this._options.maxDate && this._options.maxDate.isAfter(startDecade, 'y') && this._options.maxDate.year() <= endDecadeYear;
                html += `<span data-action="selectDecade" class="decade${this._date.isAfter(startDecade) && this._date.year() <= endDecadeYear ? ' active' : ''}${!this._isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : ''}" data-selection="${startDecade.year()}6">${startDecade.year()}1 - ${startDecade.year()}12</span>`;
                startDecade.add(12, 'y');
            }
            html += '<span></span><span></span><span></span>'; //push the dangling block over, at least this way it's even

            decadesView.find('td').html(html);
            decadesViewHeader.eq(1).text(`${startedAt.year()}1-${startDecade.year()}`);
        }

        _fillDate() {
            const daysView = this.widget.find('.datepicker-days'),
                daysViewHeader = daysView.find('th'),
                html = [];
            let currentDate, row, clsName, i;

            if (!this._hasDate()) {
                return;
            }

            daysViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevMonth);
            daysViewHeader.eq(1).attr('title', this._options.tooltips.selectMonth);
            daysViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextMonth);

            daysView.find('.disabled').removeClass('disabled');
            daysViewHeader.eq(1).text(this._viewDate.format(this._options.dayViewHeaderFormat));

            if (!this._isValid(this._viewDate.clone().subtract(1, 'M'), 'M')) {
                daysViewHeader.eq(0).addClass('disabled');
            }
            if (!this._isValid(this._viewDate.clone().add(1, 'M'), 'M')) {
                daysViewHeader.eq(2).addClass('disabled');
            }

            currentDate = this._viewDate.clone().startOf('M').startOf('w').startOf('d');

            for (i = 0; i < 42; i++) {
                //always display 42 days (should show 6 weeks)
                if (currentDate.weekday() === 0) {
                    row = $('<tr>');
                    if (this._options.calendarWeeks) {
                        row.append(`<td class="cw">${currentDate.week()}</td>`);
                    }
                    html.push(row);
                }
                clsName = '';
                if (currentDate.isBefore(this._viewDate, 'M')) {
                    clsName += ' old';
                }
                if (currentDate.isAfter(this._viewDate, 'M')) {
                    clsName += ' new';
                }
                if (currentDate.isSame(this._date, 'd') && !this.unset) {
                    clsName += ' active';
                }
                if (!this._isValid(currentDate, 'd')) {
                    clsName += ' disabled';
                }
                if (currentDate.isSame(this.getMoment(), 'd')) {
                    clsName += ' today';
                }
                if (currentDate.day() === 0 || currentDate.day() === 6) {
                    clsName += ' weekend';
                }
                row.append(`<td data-action="selectDay" data-day="${currentDate.format('L')}" class="day${clsName}">${currentDate.date()}</td>`);
                currentDate.add(1, 'd');
            }

            daysView.find('tbody').empty().append(html);

            this._updateMonths();

            this._updateYears();

            this._updateDecades();
        }

        _fillHours() {
            const table = this.widget.find('.timepicker-hours table'),
                currentHour = this._viewDate.clone().startOf('d'),
                html = [];
            let row = $('<tr>');

            if (this._viewDate.hour() > 11 && !this.use24Hours) {
                currentHour.hour(12);
            }
            while (currentHour.isSame(this._viewDate, 'd') && (this.use24Hours || this._viewDate.hour() < 12 && currentHour.hour() < 12 || this._viewDate.hour() > 11)) {
                if (currentHour.hour() % 4 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append(`<td data-action="selectHour" class="hour${!this._isValid(currentHour, 'h') ? ' disabled' : ''}">${currentHour.format(this.use24Hours ? 'HH' : 'hh')}</td>`);
                currentHour.add(1, 'h');
            }
            table.empty().append(html);
        }

        _fillMinutes() {
            const table = this.widget.find('.timepicker-minutes table'),
                currentMinute = this._viewDate.clone().startOf('h'),
                html = [],
                step = this._options.stepping === 1 ? 5 : this._options.stepping;
            let row = $('<tr>');

            while (this._viewDate.isSame(currentMinute, 'h')) {
                if (currentMinute.minute() % (step * 4) === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append(`<td data-action="selectMinute" class="minute${!this._isValid(currentMinute, 'm') ? ' disabled' : ''}">${currentMinute.format('mm')}</td>`);
                currentMinute.add(step, 'm');
            }
            table.empty().append(html);
        }

        _fillSeconds() {
            const table = this.widget.find('.timepicker-seconds table'),
                currentSecond = this._viewDate.clone().startOf('m'),
                html = [];
            let row = $('<tr>');

            while (this._viewDate.isSame(currentSecond, 'm')) {
                if (currentSecond.second() % 20 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append(`<td data-action="selectSecond" class="second${!this._isValid(currentSecond, 's') ? ' disabled' : ''}">${currentSecond.format('ss')}</td>`);
                currentSecond.add(5, 's');
            }

            table.empty().append(html);
        }

        _fillTime() {
            let toggle, newDate;
            const timeComponents = this.widget.find('.timepicker span[data-time-component]');

            if (!this.use24Hours) {
                toggle = this.widget.find('.timepicker [data-action=togglePeriod]');
                newDate = this._date.clone().add(this._date.hours() >= 12 ? -12 : 12, 'h');

                toggle.text(this._date.format('A'));

                if (this._isValid(newDate, 'h')) {
                    toggle.removeClass('disabled');
                } else {
                    toggle.addClass('disabled');
                }
            }
            timeComponents.filter('[data-time-component=hours]').text(this._date.format(`${this.use24Hours ? 'HH' : 'hh'}`));
            timeComponents.filter('[data-time-component=minutes]').text(this._date.format('mm'));
            timeComponents.filter('[data-time-component=seconds]').text(this._date.format('ss'));

            this._fillHours();
            this._fillMinutes();
            this._fillSeconds();
        }

        _doAction(e, action) {
            if ($(e.currentTarget).is('.disabled')) {
                return false;
            }
            action = action || $(e.currentTarget).data('action');
            switch (action) {
                case 'next':
                    {
                        const navFnc = DateTimePicker.DatePickerModes[this.currentViewMode].NAV_FUNCTION;
                        this._viewDate.add(DateTimePicker.DatePickerModes[this.currentViewMode].NAV_STEP, navFnc);
                        this._fillDate();
                        this._viewUpdate(navFnc);
                        break;
                    }
                case 'previous':
                    {
                        const navFnc = DateTimePicker.DatePickerModes[this.currentViewMode].NAV_FUNCTION;
                        this._viewDate.subtract(DateTimePicker.DatePickerModes[this.currentViewMode].NAV_STEP, navFnc);
                        this._fillDate();
                        this._viewUpdate(navFnc);
                        break;
                    }
                case 'pickerSwitch':
                    this._showMode(1);
                    break;

                case 'selectMonth':
                    const month = $(e.target).closest('tbody').find('span').index($(e.target));
                    this._viewDate.month(month);
                    if (this.currentViewMode === DateTimePicker.MinViewModeNumber) {
                        this._setValue(this._date.clone().year(this._viewDate.year()).month(this._viewDate.month()));
                        if (!this._options.inline) {
                            this.hide();
                        }
                    } else {
                        this._showMode(-1);
                        this._fillDate();
                    }
                    this._viewUpdate('M');
                    break;

                case 'selectYear':
                    {
                        const year = parseInt($(e.target).text(), 10) || 0;
                        this._viewDate.year(year);
                        if (this.currentViewMode === DateTimePicker.MinViewModeNumber) {
                            this._setValue(this._date.clone().year(this._viewDate.year()));
                            if (!this._options.inline) {
                                this.hide();
                            }
                        } else {
                            this._showMode(-1);
                            this._fillDate();
                        }
                        this._viewUpdate('YYYY');
                        break;
                    }
                case 'selectDecade':
                    {
                        const year = parseInt($(e.target).data('selection'), 10) || 0;
                        this._viewDate.year(year);
                        if (this.currentViewMode === DateTimePicker.MinViewModeNumber) {
                            this._setValue(this._date.clone().year(this._viewDate.year()));
                            if (!this._options.inline) {
                                this.hide();
                            }
                        } else {
                            this._showMode(-1);
                            this._fillDate();
                        }
                        this._viewUpdate('YYYY');
                        break;
                    }
                case 'selectDay':
                    {
                        const day = this._viewDate.clone();
                        if ($(e.target).is('.old')) {
                            day.subtract(1, 'M');
                        }
                        if ($(e.target).is('.new')) {
                            day.add(1, 'M');
                        }
                        this._setValue(day.date(parseInt($(e.target).text(), 10)));
                        if (!this._hasTime() && !this._options.keepOpen && !this._options.inline) {
                            this.hide();
                        }
                        break;
                    }
                case 'incrementHours':
                    {
                        const newDate = this._date.clone().add(1, 'h');
                        if (this._isValid(newDate, 'h')) {
                            this._setValue(newDate);
                        }
                        break;
                    }
                case 'incrementMinutes':
                    {
                        const newDate = this._date.clone().add(this._options.stepping, 'm');
                        if (this._isValid(newDate, 'm')) {
                            this._setValue(newDate);
                        }
                        break;
                    }
                case 'incrementSeconds':
                    {
                        const newDate = this._date.clone().add(1, 's');
                        if (this._isValid(newDate, 's')) {
                            this._setValue(newDate);
                        }
                        break;
                    }
                case 'decrementHours':
                    {
                        const newDate = this._date.clone().subtract(1, 'h');
                        if (this._isValid(newDate, 'h')) {
                            this._setValue(newDate);
                        }
                        break;
                    }
                case 'decrementMinutes':
                    {
                        const newDate = this._date.clone().subtract(this._options.stepping, 'm');
                        if (this._isValid(newDate, 'm')) {
                            this._setValue(newDate);
                        }
                        break;
                    }
                case 'decrementSeconds':
                    {
                        const newDate = this._date.clone().subtract(1, 's');
                        if (this._isValid(newDate, 's')) {
                            this._setValue(newDate);
                        }
                        break;
                    }
                case 'togglePeriod':
                    {
                        this._setValue(this._date.clone().add(this._date.hours() >= 12 ? -12 : 12, 'h'));
                        break;
                    }
                case 'togglePicker':
                    {
                        const $this = $(e.target),
                            $link = $this.closest('a'),
                            $parent = $this.closest('ul'),
                            expanded = $parent.find('.show'),
                            closed = $parent.find('.collapse:not(.show)'),
                            $span = $this.is('span') ? $this : $this.find('span');
                        let collapseData;

                        if (expanded && expanded.length) {
                            collapseData = expanded.data('collapse');
                            if (collapseData && collapseData.transitioning) {
                                return;
                            }
                            if (expanded.collapse) {
                                // if collapse plugin is available through bootstrap.js then use it
                                expanded.collapse('hide');
                                closed.collapse('show');
                            } else {
                                // otherwise just toggle in class on the two views
                                expanded.removeClass('show');
                                closed.addClass('show');
                            }
                            $span.toggleClass(this._options.icons.time + ' ' + this._options.icons.date);

                            if ($span.hasClass(this._options.icons.date)) {
                                $link.attr('title', this._options.tooltips.selectDate);
                            } else {
                                $link.attr('title', this._options.tooltips.selectTime);
                            }
                        }
                    }
                    break;
                case 'showPicker':
                    this.widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                    this.widget.find('.timepicker .timepicker-picker').show();
                    break;
                case 'showHours':
                    this.widget.find('.timepicker .timepicker-picker').hide();
                    this.widget.find('.timepicker .timepicker-hours').show();
                    break;
                case 'showMinutes':
                    this.widget.find('.timepicker .timepicker-picker').hide();
                    this.widget.find('.timepicker .timepicker-minutes').show();
                    break;
                case 'showSeconds':
                    this.widget.find('.timepicker .timepicker-picker').hide();
                    this.widget.find('.timepicker .timepicker-seconds').show();
                    break;
                case 'selectHour':
                    let hour = parseInt($(e.target).text(), 10);

                    if (!this.use24Hours) {
                        if (this._date.hours() >= 12) {
                            if (hour !== 12) {
                                hour += 12;
                            }
                        } else {
                            if (hour === 12) {
                                hour = 0;
                            }
                        }
                    }
                    this._setValue(this._date.clone().hours(hour));
                    this._doAction(e, 'showPicker');
                    break;
                case 'selectMinute':
                    this._setValue(this._date.clone().minutes(parseInt($(e.target).text(), 10)));
                    this._doAction(e, 'showPicker');
                    break;
                case 'selectSecond':
                    this._setValue(this._date.clone().seconds(parseInt($(e.target).text(), 10)));
                    this._doAction(e, 'showPicker');
                    break;
                case 'clear':
                    this.clear();
                    break;
                case 'today':
                    {
                        const todaysDate = this.getMoment();
                        if (this._isValid(todaysDate, 'd')) {
                            this._setValue(todaysDate);
                        }
                        break;
                    }
            }
            return false;
        }

        //public
        hide() {
            let transitioning = false;
            if (!this.widget) {
                return;
            }
            // Ignore event if in the middle of a picker transition
            this.widget.find('.collapse').each(function () {
                const collapseData = $(this).data('collapse');
                if (collapseData && collapseData.transitioning) {
                    transitioning = true;
                    return false;
                }
                return true;
            });
            if (transitioning) {
                return;
            }
            if (this.component && this.component.hasClass('btn')) {
                this.component.toggleClass('active');
            }
            this.widget.hide();

            $(window).off('resize', this._place);
            this.widget.off('click', '[data-action]');
            this.widget.off('mousedown', false);

            this.widget.remove();
            this.widget = false;

            this._notifyEvent({
                type: DateTimePicker.Event.HIDE,
                date: this._date.clone()
            });

            if (this.input !== undefined) {
                this.input.blur();
            }

            this._viewDate = this._date.clone();
        }

        show() {
            let currentMoment;
            const useCurrentGranularity = {
                'year': function (m) {
                    return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                },
                'month': function (m) {
                    return m.date(1).hours(0).seconds(0).minutes(0);
                },
                'day': function (m) {
                    return m.hours(0).seconds(0).minutes(0);
                },
                'hour': function (m) {
                    return m.seconds(0).minutes(0);
                },
                'minute': function (m) {
                    return m.seconds(0);
                }
            };

            if (this.input !== undefined) {
                if (this.input.prop('disabled') || !this._options.ignoreReadonly && this.input.prop('readonly') || this.widget) {
                    return;
                }
                if (this.input.val() !== undefined && this.input.val().trim().length !== 0) {
                    this._setValue(this._parseInputDate(this.input.val().trim()));
                } else if (this.unset && this._options.useCurrent) {
                    currentMoment = this.getMoment();
                    if (typeof this._options.useCurrent === 'string') {
                        currentMoment = useCurrentGranularity[this._options.useCurrent](currentMoment);
                    }
                    this._setValue(currentMoment);
                }
            } else if (this.unset && this._options.useCurrent) {
                currentMoment = this.getMoment();
                if (typeof this._options.useCurrent === 'string') {
                    currentMoment = useCurrentGranularity[this._options.useCurrent](currentMoment);
                }
                this._setValue(currentMoment);
            }

            this.widget = this._getTemplate();

            this._fillDow();
            this._fillMonths();

            this.widget.find('.timepicker-hours').hide();
            this.widget.find('.timepicker-minutes').hide();
            this.widget.find('.timepicker-seconds').hide();

            this._update();
            this._showMode();

            $(window).on('resize', this._place);
            this.widget.on('click', '[data-action]', $.proxy(this._doAction, this)); // this handles clicks on the widget
            this.widget.on('mousedown', false);

            if (this.component && this.component.hasClass('btn')) {
                this.component.toggleClass('active');
            }
            this._place();
            this.widget.show();
            if (this.input !== undefined && this._options.focusOnShow && !this.input.is(':focus')) {
                this.input.focus();
            }

            this._notifyEvent({
                type: DateTimePicker.Event.SHOW
            });
        }

        destroy() {
            this.hide();
            //todo doc off?
            this._element.removeData(DateTimePicker.DATA_KEY);
            this._element.removeData('date');
        }

        disable() {
            this.hide();
            if (this.component && this.component.hasClass('btn')) {
                this.component.addClass('disabled');
            }
            if (this.input !== undefined) {
                this.input.prop('disabled', true); //todo disable this/comp if input is null
            }
        }

        enable() {
            if (this.component && this.component.hasClass('btn')) {
                this.component.removeClass('disabled');
            }
            if (this.input !== undefined) {
                this.input.prop('disabled', false); //todo enable comp/this if input is null
            }
        }

        toolbarPlacement(toolbarPlacement) {
            if (arguments.length === 0) {
                return this._options.toolbarPlacement;
            }

            if (typeof toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
                throw new TypeError(`toolbarPlacement() parameter must be one of (${toolbarPlacements.join(', ')}) value`);
            }
            this._options.toolbarPlacement = toolbarPlacement;

            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        widgetPositioning(widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.widgetPositioning);
            }

            if ({}.toString.call(widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (widgetPositioning.horizontal) {
                if (typeof widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                    throw new TypeError(`widgetPositioning() expects horizontal parameter to be one of (${horizontalModes.join(', ')})`);
                }
                this._options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
                if (typeof widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                    throw new TypeError(`widgetPositioning() expects vertical parameter to be one of (${verticalModes.join(', ')})`);
                }
                this._options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            this._update();
        }

        widgetParent(widgetParent) {
            if (arguments.length === 0) {
                return this._options.widgetParent;
            }

            if (typeof widgetParent === 'string') {
                widgetParent = $(widgetParent);
            }

            if (widgetParent !== null && typeof widgetParent !== 'string' && !(widgetParent instanceof $)) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            this._options.widgetParent = widgetParent;
            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        //static
        static _jQueryInterface(option, argument) {
            return this.each(function () {
                let data = $(this).data(DateTimePicker.DATA_KEY);
                if (typeof option === 'object') {
                    $.extend({}, DateTimePicker.Default, option);
                }

                if (!data) {
                    data = new TempusDominusBootstrap4($(this), option);
                    $(this).data(DateTimePicker.DATA_KEY, data);
                }

                if (typeof option === 'string') {
                    if (data[option] === undefined) {
                        throw new Error(`No method named "${option}"`);
                    }
                    data[option](argument);
                }
            });
        }
    }

    /**
    * ------------------------------------------------------------------------
    * jQuery
    * ------------------------------------------------------------------------
    */
    $(document).on(DateTimePicker.Event.CLICK_DATA_API, DateTimePicker.Selector.DATA_TOGGLE, function () {
        let $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'toggle');
    }).on(DateTimePicker.Event.CHANGE, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        let $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_change', event);
    }).on(DateTimePicker.Event.BLUR, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        let $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        const config = $target.data(DateTimePicker.DATA_KEY);
        if (config._options.debug) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'hide', event);
    }).on(DateTimePicker.Event.KEYDOWN, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        let $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_keydown', event);
    }).on(DateTimePicker.Event.KEYUP, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        let $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_keyup', event);
    }).on(DateTimePicker.Event.FOCUS, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        let $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        const config = $target.data(DateTimePicker.DATA_KEY);
        if (!config._options.allowInputToggle) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, config, event);
    });

    $.fn[DateTimePicker.NAME] = TempusDominusBootstrap4._jQueryInterface;
    $.fn[DateTimePicker.NAME].Constructor = TempusDominusBootstrap4;
    $.fn[DateTimePicker.NAME].noConflict = function () {
        $.fn[DateTimePicker.NAME] = JQUERY_NO_CONFLICT;
        return TempusDominusBootstrap4._jQueryInterface;
    };

    return TempusDominusBootstrap4;
})(jQuery);
