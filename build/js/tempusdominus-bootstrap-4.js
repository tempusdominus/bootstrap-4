const DateTimePicker = ($ => {
    const NAME = 'datetimepicker',
        VERSION = '5.0.0-alpha.4',
        DATA_KEY = `${NAME}`,
        EVENT_KEY = `.${DATA_KEY}`,
        EMIT_EVENT_KEY = `${DATA_KEY}.`,
        DATA_API_KEY = '.data-api',
        Selector = {
            DATA_TOGGLE: `[data-toggle="${DATA_KEY}"]`
        },
        ClassName = {
            INPUT: `${NAME}-input`
        },
        Event = {
            CHANGE: `change${EVENT_KEY}`,
            BLUR: `blur${EVENT_KEY}`,
            KEYUP: `keyup${EVENT_KEY}`,
            KEYDOWN: `keydown${EVENT_KEY}`,
            FOCUS: `focus${EVENT_KEY}`,
            CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
            //emitted
            UPDATE: `${EMIT_EVENT_KEY}update`,
            ERROR: `${EMIT_EVENT_KEY}error`,
            HIDE: `${EMIT_EVENT_KEY}hide`,
            SHOW: `${EMIT_EVENT_KEY}show`
        },
        Default = {
            timeZone: '',
            format: false,
            dayViewHeaderFormat: 'MMMM YYYY',
            extraFormats: false,
            stepping: 1,
            minDate: false,
            maxDate: false,
            useCurrent: true,
            collapse: true,
            locale: window.moment.locale(),
            defaultDate: false,
            disabledDates: false,
            enabledDates: false,
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-calendar-check-o',
                clear: 'fa fa-delete',
                close: 'fa fa-times'
            },
            tooltips: {
                today: 'Go to today',
                clear: 'Clear selection',
                close: 'Close the picker',
                selectMonth: 'Select Month',
                prevMonth: 'Previous Month',
                nextMonth: 'Next Month',
                selectYear: 'Select Year',
                prevYear: 'Previous Year',
                nextYear: 'Next Year',
                selectDecade: 'Select Decade',
                prevDecade: 'Previous Decade',
                nextDecade: 'Next Decade',
                prevCentury: 'Previous Century',
                nextCentury: 'Next Century',
                pickHour: 'Pick Hour',
                incrementHour: 'Increment Hour',
                decrementHour: 'Decrement Hour',
                pickMinute: 'Pick Minute',
                incrementMinute: 'Increment Minute',
                decrementMinute: 'Decrement Minute',
                pickSecond: 'Pick Second',
                incrementSecond: 'Increment Second',
                decrementSecond: 'Decrement Second',
                togglePeriod: 'Toggle Period',
                selectTime: 'Select Time',
                selectDate: 'Select Date'
            },
            useStrict: false,
            sideBySide: false,
            daysOfWeekDisabled: false,
            calendarWeeks: false,
            viewMode: 'days',
            toolbarPlacement: 'default',
            buttons: {
                showToday: false,
                showClear: false,
                showClose: false
            },
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'auto'
            },
            widgetParent: null,
            ignoreReadonly: false,
            keepOpen: false,
            focusOnShow: true,
            inline: false,
            keepInvalid: false,
            keyBinds: {
                up: function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().subtract(7, 'd'));
                    } else {
                        this.date(d.clone().add(this.stepping(), 'm'));
                    }
                    return true;
                },
                down: function () {
                    if (!this.widget) {
                        this.show();
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().add(7, 'd'));
                    } else {
                        this.date(d.clone().subtract(this.stepping(), 'm'));
                    }
                    return true;
                },
                'control up': function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().subtract(1, 'y'));
                    } else {
                        this.date(d.clone().add(1, 'h'));
                    }
                    return true;
                },
                'control down': function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().add(1, 'y'));
                    } else {
                        this.date(d.clone().subtract(1, 'h'));
                    }
                    return true;
                },
                left: function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().subtract(1, 'd'));
                    }
                    return true;
                },
                right: function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().add(1, 'd'));
                    }
                    return true;
                },
                pageUp: function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().subtract(1, 'M'));
                    }
                    return true;
                },
                pageDown: function () {
                    if (!this.widget) {
                        return false;
                    }
                    const d = this._date || this.getMoment();
                    if (this.widget.find('.datepicker').is(':visible')) {
                        this.date(d.clone().add(1, 'M'));
                    }
                    return true;
                },
                enter: function () {
                    this.hide();
                    return true;
                },
                escape: function () {
                    if (!this.widget) {
                        return false;
                    }
                    this.hide();
                    return true;
                },
                'control space': function () {
                    if (!this.widget) {
                        return false;
                    }
                    if (this.widget.find('.timepicker').is(':visible')) {
                        this.widget.find('.btn[data-action="togglePeriod"]').click();
                    }
                    return true;
                },
                t: function () {
                    this.date(this.getMoment());
                    return true;
                },
                'delete': function () {
                    if (!this.widget) {
                        return false;
                    }
                    this.clear();
                    return true;
                }
            },
            debug: false,
            allowInputToggle: false,
            disabledTimeIntervals: false,
            disabledHours: false,
            enabledHours: false,
            viewDate: false
        },
        DatePickerModes = [{
            CLASS_NAME: 'days',
            NAV_FUNCTION: 'M',
            NAV_STEP: 1
        }, {
            CLASS_NAME: 'months',
            NAV_FUNCTION: 'y',
            NAV_STEP: 1
        }, {
            CLASS_NAME: 'years',
            NAV_FUNCTION: 'y',
            NAV_STEP: 10
        }, {
            CLASS_NAME: 'decades',
            NAV_FUNCTION: 'y',
            NAV_STEP: 100
        }],
        KeyMap = {
            'up': 38,
            38: 'up',
            'down': 40,
            40: 'down',
            'left': 37,
            37: 'left',
            'right': 39,
            39: 'right',
            'tab': 9,
            9: 'tab',
            'escape': 27,
            27: 'escape',
            'enter': 13,
            13: 'enter',
            'pageUp': 33,
            33: 'pageUp',
            'pageDown': 34,
            34: 'pageDown',
            'shift': 16,
            16: 'shift',
            'control': 17,
            17: 'control',
            'space': 32,
            32: 'space',
            't': 84,
            84: 't',
            'delete': 46,
            46: 'delete'
        },
        ViewModes = ['times', 'days', 'months', 'years', 'decades'];

    let MinViewModeNumber = 0,
        keyState = {},
        keyPressHandled = {};

    class DateTimePicker {
        /** @namespace eData.dateOptions */
        /** @namespace moment.tz */

        constructor(element, options) {
            this._options = this._getOptions(options);
            this._element = element;
            this._date = null;
            this._viewDate = null;
            this.unset = true;
            this.component = false;
            this.widget = false;
            this.use24Hours = null;
            this.actualFormat = null;
            this.parseFormats = null;
            this.currentViewMode = null;

            this._int();
        }

        /**
         * @return {string}
         */
        static get NAME() {
            return NAME;
        }

        /**
         * @return {string}
         */
        static get VERSION() {
            return VERSION;
        }

        /**
         * @return {string}
         */
        static get DATA_KEY() {
            return DATA_KEY;
        }

        /**
         * @return {string}
         */
        static get EVENT_KEY() {
            return EVENT_KEY;
        }

        /**
         * @return {string}
         */
        static get DATA_API_KEY() {
            return DATA_API_KEY;
        }

        static get DatePickerModes() {
            return DatePickerModes;
        }

        static get ViewModes() {
            return ViewModes;
        }

        /**
         * @return {number}
         */
        static get MinViewModeNumber() {
            return MinViewModeNumber;
        }

        static get Event() {
            return Event;
        }

        static get Selector() {
            return Selector;
        }

        static get Default() {
            return Default;
        }

        static get ClassName() {
            return ClassName;
        }

        //private

        _int() {
            const targetInput = this._element.data('target-input');
            if (this._element.is('input')) {
                this.input = this._element;
            } else if (targetInput !== undefined) {
                if (targetInput === 'nearest') {
                    this.input = this._element.find('input');
                } else {
                    this.input = $(targetInput);
                }
            }

            this._date = this.getMoment();
            this._viewDate = this._date.clone();

            $.extend(true, this._options, this._dataToOptions());

            this.options(this._options);

            this._initFormatting();

            if (this.input !== undefined && this.input.is('input') && this.input.val().trim().length !== 0) {
                this._setValue(this._parseInputDate(this.input.val().trim()));
            } else if (this._options.defaultDate && this.input !== undefined && this.input.attr('placeholder') === undefined) {
                this._setValue(this._options.defaultDate);
            }
            if (this._options.inline) {
                this.show();
            }
        }

        _update() {
            if (!this.widget) {
                return;
            }
            this._fillDate();
            this._fillTime();
        }

        _setValue(targetMoment) {
            const oldDate = this.unset ? null : this._date;

            // case of calling setValue(null or false)
            if (!targetMoment) {
                this.unset = true;
                if (this.input !== undefined) {
                    this.input.val('');
                    this.input.trigger('input');
                }
                this._element.data('date', '');
                this._notifyEvent({
                    type: DateTimePicker.Event.CHANGE,
                    date: false,
                    oldDate: oldDate
                });
                this._update();
                return;
            }

            targetMoment = targetMoment.clone().locale(this._options.locale);

            if (this._hasTimeZone()) {
                targetMoment.tz(this._options.timeZone);
            }

            if (this._options.stepping !== 1) {
                targetMoment.minutes(Math.round(targetMoment.minutes() / this._options.stepping) * this._options.stepping).seconds(0);
            }

            if (this._isValid(targetMoment)) {
                this._date = targetMoment;
                this._viewDate = targetMoment.clone();
                if (this.input !== undefined) {
                    this.input.val(this._date.format(this.actualFormat));
                    this.input.trigger('input');
                }
                this._element.data('date', this._date.format(this.actualFormat));
                this.unset = false;
                this._update();
                this._notifyEvent({
                    type: DateTimePicker.Event.CHANGE,
                    date: this._date.clone(),
                    oldDate: oldDate
                });
            } else {
                if (!this._options.keepInvalid) {
                    if (this.input !== undefined) {
                        this.input.val(`${this.unset ? '' : this._date.format(this.actualFormat)}`);
                        this.input.trigger('input');
                    }
                } else {
                    this._notifyEvent({
                        type: DateTimePicker.Event.CHANGE,
                        date: targetMoment,
                        oldDate: oldDate
                    });
                }
                this._notifyEvent({
                    type: DateTimePicker.Event.ERROR,
                    date: targetMoment,
                    oldDate: oldDate
                });
            }
        }

        _change(e) {
            let val = $(e.target).val().trim(),
                parsedDate = val ? this._parseInputDate(val) : null;
            this._setValue(parsedDate);
            e.stopImmediatePropagation();
            return false;
        }

        //noinspection JSMethodCanBeStatic
        _getOptions(options) {
            options = $.extend(true, {}, Default, options);
            return options;
        }

        _hasTimeZone() {
            return window.moment.tz !== undefined && this._options.timeZone !== undefined && this._options.timeZone !== null && this._options.timeZone !== '';
        }

        _isEnabled(granularity) {
            if (typeof granularity !== 'string' || granularity.length > 1) {
                throw new TypeError('isEnabled expects a single character string parameter');
            }
            switch (granularity) {
                case 'y':
                    return this.actualFormat.indexOf('Y') !== -1;
                case 'M':
                    return this.actualFormat.indexOf('M') !== -1;
                case 'd':
                    return this.actualFormat.toLowerCase().indexOf('d') !== -1;
                case 'h':
                case 'H':
                    return this.actualFormat.toLowerCase().indexOf('h') !== -1;
                case 'm':
                    return this.actualFormat.indexOf('m') !== -1;
                case 's':
                    return this.actualFormat.indexOf('s') !== -1;
                default:
                    return false;
            }
        }

        _hasTime() {
            return this._isEnabled('h') || this._isEnabled('m') || this._isEnabled('s');
        }

        _hasDate() {
            return this._isEnabled('y') || this._isEnabled('M') || this._isEnabled('d');
        }

        _dataToOptions() {
            let eData = this._element.data(),
                dataOptions = {};

            if (eData.dateOptions && eData.dateOptions instanceof Object) {
                dataOptions = $.extend(true, dataOptions, eData.dateOptions);
            }

            $.each(this._options, function (key) {
                let attributeName = `date${key.charAt(0).toUpperCase()}${key.slice(1)}`; //todo data api key
                if (eData[attributeName] !== undefined) {
                    dataOptions[key] = eData[attributeName];
                } else {
                    delete dataOptions[key];
                }
            });
            return dataOptions;
        }

        _notifyEvent(e) {
            if ((e.type === DateTimePicker.Event.CHANGE && e.date && e.date.isSame(e.oldDate)) || !e.date && !e.oldDate) {
                return;
            }
            this._element.trigger(e);
        }

        _viewUpdate(e) {
            if (e === 'y') {
                e = 'YYYY';
            }
            this._notifyEvent({
                type: DateTimePicker.Event.UPDATE,
                change: e,
                viewDate: this._viewDate.clone()
            });
        }

        _showMode(dir) {
            if (!this.widget) {
                return;
            }
            if (dir) {
                this.currentViewMode = Math.max(MinViewModeNumber, Math.min(3, this.currentViewMode + dir));
            }
            this.widget.find('.datepicker > div').hide().filter(`.datepicker-${DatePickerModes[this.currentViewMode].CLASS_NAME}`).show();
        }

        _isInDisabledDates(testDate) {
            return this._options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
        }

        _isInEnabledDates(testDate) {
            return this._options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
        }

        _isInDisabledHours(testDate) {
            return this._options.disabledHours[testDate.format('H')] === true;
        }

        _isInEnabledHours(testDate) {
            return this._options.enabledHours[testDate.format('H')] === true;
        }

        _isValid(targetMoment, granularity) {
            if (!targetMoment.isValid()) {
                return false;
            }
            if (this._options.disabledDates && granularity === 'd' && this._isInDisabledDates(targetMoment)) {
                return false;
            }
            if (this._options.enabledDates && granularity === 'd' && !this._isInEnabledDates(targetMoment)) {
                return false;
            }
            if (this._options.minDate && targetMoment.isBefore(this._options.minDate, granularity)) {
                return false;
            }
            if (this._options.maxDate && targetMoment.isAfter(this._options.maxDate, granularity)) {
                return false;
            }
            if (this._options.daysOfWeekDisabled && granularity === 'd' && this._options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
                return false;
            }
            if (this._options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && this._isInDisabledHours(targetMoment)) {
                return false;
            }
            if (this._options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !this._isInEnabledHours(targetMoment)) {
                return false;
            }
            if (this._options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
                let found = false;
                $.each(this._options.disabledTimeIntervals, function () {
                    if (targetMoment.isBetween(this[0], this[1])) {
                        found = true;
                        return false;
                    }
                });
                if (found) {
                    return false;
                }
            }
            return true;
        }

        _parseInputDate(inputDate) {
            if (this._options.parseInputDate === undefined) {
                if (!window.moment.isMoment(inputDate)) {
                    inputDate = this.getMoment(inputDate);
                }
            } else {
                inputDate = this._options.parseInputDate(inputDate);
            }
            //inputDate.locale(this.options.locale);
            return inputDate;
        }

        _keydown(e) {
            let handler = null,
                index,
                index2,
                keyBindKeys,
                allModifiersPressed;
            const pressedKeys = [],
                pressedModifiers = {},
                currentKey = e.which,
                pressed = 'p';

            keyState[currentKey] = pressed;

            for (index in keyState) {
                if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                    pressedKeys.push(index);
                    if (parseInt(index, 10) !== currentKey) {
                        pressedModifiers[index] = true;
                    }
                }
            }

            for (index in this._options.keyBinds) {
                if (this._options.keyBinds.hasOwnProperty(index) && typeof this._options.keyBinds[index] === 'function') {
                    keyBindKeys = index.split(' ');
                    if (keyBindKeys.length === pressedKeys.length && KeyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                        allModifiersPressed = true;
                        for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                            if (!(KeyMap[keyBindKeys[index2]] in pressedModifiers)) {
                                allModifiersPressed = false;
                                break;
                            }
                        }
                        if (allModifiersPressed) {
                            handler = this._options.keyBinds[index];
                            break;
                        }
                    }
                }
            }

            if (handler) {
                if (handler.call(this.widget)) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        }

        //noinspection JSMethodCanBeStatic,SpellCheckingInspection
        _keyup(e) {
            keyState[e.which] = 'r';
            if (keyPressHandled[e.which]) {
                keyPressHandled[e.which] = false;
                e.stopPropagation();
                e.preventDefault();
            }
        }

        _indexGivenDates(givenDatesArray) {
            // Store given enabledDates and disabledDates as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: options.enabledDates['2014-02-27'] === true)
            const givenDatesIndexed = {},
                self = this;
            $.each(givenDatesArray, function () {
                const dDate = self._parseInputDate(this);
                if (dDate.isValid()) {
                    givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                }
            });
            return Object.keys(givenDatesIndexed).length ? givenDatesIndexed : false;
        }

        _indexGivenHours(givenHoursArray) {
            // Store given enabledHours and disabledHours as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: options.enabledHours['2014-02-27'] === true)
            const givenHoursIndexed = {};
            $.each(givenHoursArray, function () {
                givenHoursIndexed[this] = true;
            });
            return Object.keys(givenHoursIndexed).length ? givenHoursIndexed : false;
        }

        _initFormatting() {
            const format = this._options.format || 'L LT';

            let self = this;
            this.actualFormat = format.replace(/(\[[^\[]*])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                return self._date.localeData().longDateFormat(formatInput) || formatInput;
            });

            this.parseFormats = this._options.extraFormats ? this._options.extraFormats.slice() : [];
            if (this.parseFormats.indexOf(format) < 0 && this.parseFormats.indexOf(this.actualFormat) < 0) {
                this.parseFormats.push(this.actualFormat);
            }

            this.use24Hours = this.actualFormat.toLowerCase().indexOf('a') < 1 && this.actualFormat.replace(/\[.*?]/g, '').indexOf('h') < 1;

            if (this._isEnabled('y')) {
                MinViewModeNumber = 2;
            }
            if (this._isEnabled('M')) {
                MinViewModeNumber = 1;
            }
            if (this._isEnabled('d')) {
                MinViewModeNumber = 0;
            }

            this.currentViewMode = Math.max(MinViewModeNumber, this.currentViewMode);

            if (!this.unset) {
                this._setValue(this._date);
            }
        }

        //public
        getMoment(d) {
            let returnMoment;

            if (d === undefined || d === null) {
                returnMoment = window.moment(); //TODO should this use format? and locale?
            } else if (this._hasTimeZone()) {
                // There is a string to parse and a default time zone
                // parse with the tz function which takes a default time zone if it is not in the format string
                returnMoment = window.moment.tz(d, this.parseFormats, this._options.useStrict, this._options.timeZone);
            } else {
                returnMoment = window.moment(d, this.parseFormats, this._options.useStrict);
            }

            if (this._hasTimeZone()) {
                returnMoment.tz(this._options.timeZone);
            }

            return returnMoment;
        }

        toggle() {
            return this.widget ? this.hide() : this.show();
        }

        ignoreReadonly(ignoreReadonly) {
            if (arguments.length === 0) {
                return this._options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== 'boolean') {
                throw new TypeError('ignoreReadonly () expects a boolean parameter');
            }
            this._options.ignoreReadonly = ignoreReadonly;
        }

        options(newOptions) {
            if (arguments.length === 0) {
                return $.extend(true, {}, this._options);
            }

            if (!(newOptions instanceof Object)) {
                throw new TypeError('options() this.options parameter should be an object');
            }
            $.extend(true, this._options, newOptions);
            let self = this;
            $.each(this._options, function (key, value) {
                if (self[key] !== undefined) {
                    self[key](value);
                }
            });
        }

        date(newDate) {
            if (arguments.length === 0) {
                if (this.unset) {
                    return null;
                }
                return this._date.clone();
            }

            if (newDate !== null && typeof newDate !== 'string' && !window.moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
            }

            this._setValue(newDate === null ? null : this._parseInputDate(newDate));
        }

        format(newFormat) {
            ///<summary>test su</summary>
            ///<param name="newFormat">info about para</param>
            ///<returns type="string|boolean">returns foo</returns>
            if (arguments.length === 0) {
                return this._options.format;
            }

            if (typeof newFormat !== 'string' && (typeof newFormat !== 'boolean' || newFormat !== false)) {
                throw new TypeError(`format() expects a string or boolean:false parameter ${newFormat}`);
            }

            this._options.format = newFormat;
            if (this.actualFormat) {
                this._initFormatting(); // reinitialize formatting
            }
        }

        timeZone(newZone) {
            if (arguments.length === 0) {
                return this._options.timeZone;
            }

            if (typeof newZone !== 'string') {
                throw new TypeError('newZone() expects a string parameter');
            }

            this._options.timeZone = newZone;
        }

        dayViewHeaderFormat(newFormat) {
            if (arguments.length === 0) {
                return this._options.dayViewHeaderFormat;
            }

            if (typeof newFormat !== 'string') {
                throw new TypeError('dayViewHeaderFormat() expects a string parameter');
            }

            this._options.dayViewHeaderFormat = newFormat;
        }

        extraFormats(formats) {
            if (arguments.length === 0) {
                return this._options.extraFormats;
            }

            if (formats !== false && !(formats instanceof Array)) {
                throw new TypeError('extraFormats() expects an array or false parameter');
            }

            this._options.extraFormats = formats;
            if (this.parseFormats) {
                this._initFormatting(); // reinit formatting
            }
        }

        disabledDates(dates) {
            if (arguments.length === 0) {
                return this._options.disabledDates ? $.extend({}, this._options.disabledDates) : this._options.disabledDates;
            }

            if (!dates) {
                this._options.disabledDates = false;
                this._update();
                return;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('disabledDates() expects an array parameter');
            }
            this._options.disabledDates = this._indexGivenDates(dates);
            this._options.enabledDates = false;
            this._update();
        }

        enabledDates(dates) {
            if (arguments.length === 0) {
                return this._options.enabledDates ? $.extend({}, this._options.enabledDates) : this._options.enabledDates;
            }

            if (!dates) {
                this._options.enabledDates = false;
                this._update();
                return;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('enabledDates() expects an array parameter');
            }
            this._options.enabledDates = this._indexGivenDates(dates);
            this._options.disabledDates = false;
            this._update();
        }

        daysOfWeekDisabled(daysOfWeekDisabled) {
            if (arguments.length === 0) {
                return this._options.daysOfWeekDisabled.splice(0);
            }

            if (typeof daysOfWeekDisabled === 'boolean' && !daysOfWeekDisabled) {
                this._options.daysOfWeekDisabled = false;
                this._update();
                return;
            }

            if (!(daysOfWeekDisabled instanceof Array)) {
                throw new TypeError('daysOfWeekDisabled() expects an array parameter');
            }
            this._options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                currentValue = parseInt(currentValue, 10);
                if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                    return previousValue;
                }
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []).sort();
            if (this._options.useCurrent && !this._options.keepInvalid) {
                let tries = 0;
                while (!this._isValid(this._date, 'd')) {
                    this._date.add(1, 'd');
                    if (tries === 31) {
                        throw 'Tried 31 times to find a valid date';
                    }
                    tries++;
                }
                this._setValue(this._date);
            }
            this._update();
        }

        maxDate(maxDate) {
            if (arguments.length === 0) {
                return this._options.maxDate ? this._options.maxDate.clone() : this._options.maxDate;
            }

            if (typeof maxDate === 'boolean' && maxDate === false) {
                this._options.maxDate = false;
                this._update();
                return;
            }

            if (typeof maxDate === 'string') {
                if (maxDate === 'now' || maxDate === 'moment') {
                    maxDate = this.getMoment();
                }
            }

            const parsedDate = this._parseInputDate(maxDate);

            if (!parsedDate.isValid()) {
                throw new TypeError(`maxDate() Could not parse date parameter: ${maxDate}`);
            }
            if (this._options.minDate && parsedDate.isBefore(this._options.minDate)) {
                throw new TypeError(`maxDate() date parameter is before this.options.minDate: ${parsedDate.format(this.actualFormat)}`);
            }
            this._options.maxDate = parsedDate;
            if (this._options.useCurrent && !this._options.keepInvalid && this._date.isAfter(maxDate)) {
                this._setValue(this._options.maxDate);
            }
            if (this._viewDate.isAfter(parsedDate)) {
                this._viewDate = parsedDate.clone().subtract(this._options.stepping, 'm');
            }
            this._update();
        }

        minDate(minDate) {
            if (arguments.length === 0) {
                return this._options.minDate ? this._options.minDate.clone() : this._options.minDate;
            }

            if (typeof minDate === 'boolean' && minDate === false) {
                this._options.minDate = false;
                this._update();
                return;
            }

            if (typeof minDate === 'string') {
                if (minDate === 'now' || minDate === 'moment') {
                    minDate = this.getMoment();
                }
            }

            const parsedDate = this._parseInputDate(minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError(`minDate() Could not parse date parameter: ${minDate}`);
            }
            if (this._options.maxDate && parsedDate.isAfter(this._options.maxDate)) {
                throw new TypeError(`minDate() date parameter is after this.options.maxDate: ${parsedDate.format(this.actualFormat)}`);
            }
            this._options.minDate = parsedDate;
            if (this._options.useCurrent && !this._options.keepInvalid && this._date.isBefore(minDate)) {
                this._setValue(this._options.minDate);
            }
            if (this._viewDate.isBefore(parsedDate)) {
                this._viewDate = parsedDate.clone().add(this._options.stepping, 'm');
            }
            this._update();
        }

        defaultDate(defaultDate) {
            if (arguments.length === 0) {
                return this._options.defaultDate ? this._options.defaultDate.clone() : this._options.defaultDate;
            }
            if (!defaultDate) {
                this._options.defaultDate = false;
                return;
            }

            if (typeof defaultDate === 'string') {
                if (defaultDate === 'now' || defaultDate === 'moment') {
                    defaultDate = this.getMoment();
                } else {
                    defaultDate = this.getMoment(defaultDate);
                }
            }

            const parsedDate = this._parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError(`defaultDate() Could not parse date parameter: ${defaultDate}`);
            }
            if (!this._isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            this._options.defaultDate = parsedDate;

            if (this._options.defaultDate && this._options.inline || this.input !== undefined && this.input.val().trim() === '') {
                this._setValue(this._options.defaultDate);
            }
        }

        locale(locale) {
            if (arguments.length === 0) {
                return this._options.locale;
            }

            if (!window.moment.localeData(locale)) {
                throw new TypeError(`locale() locale ${locale} is not loaded from moment locales!`);
            }

            this._options.locale = locale;
            this._date.locale(this._options.locale);
            this._viewDate.locale(this._options.locale);

            if (this.actualFormat) {
                this._initFormatting(); // reinitialize formatting
            }
            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        stepping(stepping) {
            if (arguments.length === 0) {
                return this._options.stepping;
            }

            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
                stepping = 1;
            }
            this._options.stepping = stepping;
        }

        useCurrent(useCurrent) {
            const useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return this._options.useCurrent;
            }

            if (typeof useCurrent !== 'boolean' && typeof useCurrent !== 'string') {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
                throw new TypeError(`useCurrent() expects a string parameter of ${useCurrentOptions.join(', ')}`);
            }
            this._options.useCurrent = useCurrent;
        }

        collapse(collapse) {
            if (arguments.length === 0) {
                return this._options.collapse;
            }

            if (typeof collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (this._options.collapse === collapse) {
                return;
            }
            this._options.collapse = collapse;
            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        icons(icons) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.icons);
            }

            if (!(icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }

            $.extend(this._options.icons, icons);

            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        tooltips(tooltips) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.tooltips);
            }

            if (!(tooltips instanceof Object)) {
                throw new TypeError('tooltips() expects parameter to be an Object');
            }
            $.extend(this._options.tooltips, tooltips);
            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        useStrict(useStrict) {
            if (arguments.length === 0) {
                return this._options.useStrict;
            }

            if (typeof useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            this._options.useStrict = useStrict;
        }

        sideBySide(sideBySide) {
            if (arguments.length === 0) {
                return this._options.sideBySide;
            }

            if (typeof sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            this._options.sideBySide = sideBySide;
            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        viewMode(viewMode) {
            if (arguments.length === 0) {
                return this._options.viewMode;
            }

            if (typeof viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (DateTimePicker.ViewModes.indexOf(viewMode) === -1) {
                throw new TypeError(`viewMode() parameter must be one of (${DateTimePicker.ViewModes.join(', ')}) value`);
            }

            this._options.viewMode = viewMode;
            this.currentViewMode = Math.max(DateTimePicker.ViewModes.indexOf(viewMode) - 1, DateTimePicker.MinViewModeNumber);

            this._showMode();
        }

        calendarWeeks(calendarWeeks) {
            if (arguments.length === 0) {
                return this._options.calendarWeeks;
            }

            if (typeof calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            this._options.calendarWeeks = calendarWeeks;
            this._update();
        }

        buttons(buttons) {
            if (arguments.length === 0) {
                return $.extend({}, this._options.buttons);
            }

            if (!(buttons instanceof Object)) {
                throw new TypeError('buttons() expects parameter to be an Object');
            }

            $.extend(this._options.buttons, buttons);

            if (typeof this._options.buttons.showToday !== 'boolean') {
                throw new TypeError('buttons.showToday expects a boolean parameter');
            }
            if (typeof this._options.buttons.showClear !== 'boolean') {
                throw new TypeError('buttons.showClear expects a boolean parameter');
            }
            if (typeof this._options.buttons.showClose !== 'boolean') {
                throw new TypeError('buttons.showClose expects a boolean parameter');
            }

            if (this.widget) {
                this.hide();
                this.show();
            }
        }

        keepOpen(keepOpen) {
            if (arguments.length === 0) {
                return this._options.keepOpen;
            }

            if (typeof keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            this._options.keepOpen = keepOpen;
        }

        focusOnShow(focusOnShow) {
            if (arguments.length === 0) {
                return this._options.focusOnShow;
            }

            if (typeof focusOnShow !== 'boolean') {
                throw new TypeError('focusOnShow() expects a boolean parameter');
            }

            this._options.focusOnShow = focusOnShow;
        }

        inline(inline) {
            if (arguments.length === 0) {
                return this._options.inline;
            }

            if (typeof inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            this._options.inline = inline;
        }

        clear() {
            this._setValue(null);
        }

        keyBinds(keyBinds) {
            if (arguments.length === 0) {
                return this._options.keyBinds;
            }

            this._options.keyBinds = keyBinds;
        }

        debug(debug) {
            if (typeof debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            this._options.debug = debug;
        }

        allowInputToggle(allowInputToggle) {
            if (arguments.length === 0) {
                return this._options.allowInputToggle;
            }

            if (typeof allowInputToggle !== 'boolean') {
                throw new TypeError('allowInputToggle() expects a boolean parameter');
            }

            this._options.allowInputToggle = allowInputToggle;
        }

        keepInvalid(keepInvalid) {
            if (arguments.length === 0) {
                return this._options.keepInvalid;
            }

            if (typeof keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            this._options.keepInvalid = keepInvalid;
        }

        datepickerInput(datepickerInput) {
            if (arguments.length === 0) {
                return this._options.datepickerInput;
            }

            if (typeof datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            this._options.datepickerInput = datepickerInput;
        }

        parseInputDate(parseInputDate) {
            if (arguments.length === 0) {
                return this._options.parseInputDate;
            }

            if (typeof parseInputDate !== 'function') {
                throw new TypeError('parseInputDate() should be as function');
            }

            this._options.parseInputDate = parseInputDate;
        }

        disabledTimeIntervals(disabledTimeIntervals) {
            if (arguments.length === 0) {
                return this._options.disabledTimeIntervals ? $.extend({}, this._options.disabledTimeIntervals) : this._options.disabledTimeIntervals;
            }

            if (!disabledTimeIntervals) {
                this._options.disabledTimeIntervals = false;
                this._update();
                return;
            }
            if (!(disabledTimeIntervals instanceof Array)) {
                throw new TypeError('disabledTimeIntervals() expects an array parameter');
            }
            this._options.disabledTimeIntervals = disabledTimeIntervals;
            this._update();
        }

        disabledHours(hours) {
            if (arguments.length === 0) {
                return this._options.disabledHours ? $.extend({}, this._options.disabledHours) : this._options.disabledHours;
            }

            if (!hours) {
                this._options.disabledHours = false;
                this._update();
                return;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('disabledHours() expects an array parameter');
            }
            this._options.disabledHours = this._indexGivenHours(hours);
            this._options.enabledHours = false;
            if (this._options.useCurrent && !this._options.keepInvalid) {
                let tries = 0;
                while (!this._isValid(this._date, 'h')) {
                    this._date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                this._setValue(this._date);
            }
            this._update();
        }

        enabledHours(hours) {
            if (arguments.length === 0) {
                return this._options.enabledHours ? $.extend({}, this._options.enabledHours) : this._options.enabledHours;
            }

            if (!hours) {
                this._options.enabledHours = false;
                this._update();
                return;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('enabledHours() expects an array parameter');
            }
            this._options.enabledHours = this._indexGivenHours(hours);
            this._options.disabledHours = false;
            if (this._options.useCurrent && !this._options.keepInvalid) {
                let tries = 0;
                while (!this._isValid(this._date, 'h')) {
                    this._date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                this._setValue(this._date);
            }
            this._update();
        }

        viewDate(newDate) {
            if (arguments.length === 0) {
                return this._viewDate.clone();
            }

            if (!newDate) {
                this._viewDate = this._date.clone();
                return;
            }

            if (typeof newDate !== 'string' && !window.moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
            }

            this._viewDate = this._parseInputDate(newDate);
            this._viewUpdate();
        }
    }

    return DateTimePicker;
})(jQuery);



//noinspection JSUnusedGlobalSymbols
/* global DateTimePicker */
const TempusDominusBootstrap4 = ($ => { // eslint-disable-line no-unused-vars
    // ReSharper disable once InconsistentNaming
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

    // ReSharper disable once InconsistentNaming
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

        _place(e) {
            let self = (e && e.data && e.data.picker), vertical = self._options.widgetPositioning.vertical,
                horizontal = self._options.widgetPositioning.horizontal,
                parent;
            const position = (self.component || self._element).position(),
                offset = (self.component || self._element).offset();
            
            if (self._options.widgetParent) {
                parent = self._options.widgetParent.append(self.widget);
            } else if (self._element.is('input')) {
                parent = self._element.after(self.widget).parent();
            } else if (self._options.inline) {
                parent = self._element.append(self.widget);
                return;
            } else {
                parent = self._element;
                self._element.children().first().after(self.widget);
            }

            // Top and bottom logic
            if (vertical === 'auto') {
                //noinspection JSValidateTypes
                if (offset.top + self.widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && self.widget.height() + self._element.outerHeight() < offset.top) {
                    vertical = 'top';
                } else {
                    vertical = 'bottom';
                }
            }

            // Left and right logic
            if (horizontal === 'auto') {
                if (parent.width() < offset.left + self.widget.outerWidth() / 2 && offset.left + self.widget.outerWidth() > $(window).width()) {
                    horizontal = 'right';
                } else {
                    horizontal = 'left';
                }
            }

            if (vertical === 'top') {
                self.widget.addClass('top').removeClass('bottom');
            } else {
                self.widget.addClass('bottom').removeClass('top');
            }

            if (horizontal === 'right') {
                self.widget.addClass('float-right');
            } else {
                self.widget.removeClass('float-right');
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

            self.widget.css({
                top: vertical === 'top' ? 'auto' : position.top + self._element.outerHeight() + 'px',
                bottom: vertical === 'top' ? parent.outerHeight() - (parent === self._element ? 0 : position.top) + 'px' : 'auto',
                left: horizontal === 'left' ? (parent === self._element ? 0 : position.left) + 'px' : 'auto',
                right: horizontal === 'left' ? 'auto' : parent.outerWidth() - self._element.outerWidth() - (parent === self._element ? 0 : position.left) + 'px'
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
                months = monthsView.find('tbody').find('span'), self = this;

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

            months.each(function (index) {
                if (!self._isValid(self._viewDate.clone().month(index), 'M')) {
                    $(this).addClass('disabled');
                }
            });
        }

        _getStartEndYear(factor, year) {
            const step = factor / 10,
                startYear = Math.floor(year / factor) * factor,
                endYear = startYear + step * 9,
                focusValue = Math.floor(year / step) * step;
            return [startYear, endYear, focusValue];
        }

        _updateYears() {
            const yearsView = this.widget.find('.datepicker-years'),
                yearsViewHeader = yearsView.find('th'),
                yearCaps = this._getStartEndYear(10, this._viewDate.year()),
                startYear = this._viewDate.clone().year(yearCaps[0]),
                endYear = this._viewDate.clone().year(yearCaps[1]);
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

            html += `<span data-action="selectYear" class="year old">${startYear.year() - 1}</span>`;
            while (!startYear.isAfter(endYear, 'y')) {
                html += `<span data-action="selectYear" class="year${startYear.isSame(this._date, 'y') && !this.unset ? ' active' : ''}${!this._isValid(startYear, 'y') ? ' disabled' : ''}">${startYear.year()}</span>`;
                startYear.add(1, 'y');
            }
            html += `<span data-action="selectYear" class="year old">${startYear.year()}</span>`;

            yearsView.find('td').html(html);
        }

        _updateDecades() {
            const decadesView = this.widget.find('.datepicker-decades'),
                decadesViewHeader = decadesView.find('th'),
                yearCaps = this._getStartEndYear(100, this._viewDate.year()),
                startDecade = this._viewDate.clone().year(yearCaps[0]),
                endDecade = this._viewDate.clone().year(yearCaps[1]);
            let minDateDecade = false,
                maxDateDecade = false,
                endDecadeYear,
                html = '';

            decadesViewHeader.eq(0).find('span').attr('title', this._options.tooltips.prevCentury);
            decadesViewHeader.eq(2).find('span').attr('title', this._options.tooltips.nextCentury);

            decadesView.find('.disabled').removeClass('disabled');

            if (startDecade.year() === 0 || this._options.minDate && this._options.minDate.isAfter(startDecade, 'y')) {
                decadesViewHeader.eq(0).addClass('disabled');
            }

            decadesViewHeader.eq(1).text(`${startDecade.year()}-${endDecade.year()}`);

            if (this._options.maxDate && this._options.maxDate.isBefore(endDecade, 'y')) {
                decadesViewHeader.eq(2).addClass('disabled');
            }

            if (startDecade.year() - 10 < 0) {
                html += '<span>&nbsp;</span>';
            } else {
                html += `<span data-action="selectDecade" class="decade old" data-selection="${startDecade.year() + 6}">${startDecade.year() - 10}</span>`;
            }

            while (!startDecade.isAfter(endDecade, 'y')) {
                endDecadeYear = startDecade.year() + 11;
                minDateDecade = this._options.minDate && this._options.minDate.isAfter(startDecade, 'y') && this._options.minDate.year() <= endDecadeYear;
                maxDateDecade = this._options.maxDate && this._options.maxDate.isAfter(startDecade, 'y') && this._options.maxDate.year() <= endDecadeYear;
                html += `<span data-action="selectDecade" class="decade${this._date.isAfter(startDecade) && this._date.year() <= endDecadeYear ? ' active' : ''}${!this._isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : ''}" data-selection="${startDecade.year() + 6}">${startDecade.year()}</span>`;
                startDecade.add(10, 'y');
            }
            html += `<span data-action="selectDecade" class="decade old" data-selection="${startDecade.year() + 6}">${startDecade.year()}</span>`;

            decadesView.find('td').html(html);
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
                    {
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
                    }
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
                                return true;
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
                    {
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
                    }
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

            $(window).off('resize', this._place());
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

            $(window).on('resize', {picker: this}, this._place);
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
        const $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'toggle');
    }).on(DateTimePicker.Event.CHANGE, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        const $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_change', event);
    }).on(DateTimePicker.Event.BLUR, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        const $target = getSelectorFromElement($(this)), config = $target.data(DateTimePicker.DATA_KEY);
        if ($target.length === 0) {
            return;
        }
        if (config._options.debug || window.debug) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, 'hide', event);
    }).on(DateTimePicker.Event.KEYDOWN, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        const $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_keydown', event);
    }).on(DateTimePicker.Event.KEYUP, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        const $target = getSelectorFromElement($(this));
        if ($target.length === 0) {
            return;
        }
        TempusDominusBootstrap4._jQueryInterface.call($target, '_keyup', event);
    }).on(DateTimePicker.Event.FOCUS, `.${DateTimePicker.ClassName.INPUT}`, function (event) {
        const $target = getSelectorFromElement($(this)), config = $target.data(DateTimePicker.DATA_KEY);
        if ($target.length === 0) {
            return;
        }
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
