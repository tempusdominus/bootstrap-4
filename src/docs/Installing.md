# Minimal Requirements

1. jQuery
2. Moment.js
3. Locales: Moment's locale files are [here](https://github.com/moment/moment/tree/master/locale)

# Installation Guides
* [CDN](#cdn)
* [Rails](#rails)
* [Django](#django)
* [Angular](#angular-wrapper)
* [Manual](#manual)

## CDN
```html
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.1.2/js/tempusdominus-bootstrap-4.min.js" integrity="sha512-2JBCbWoMJPH+Uj7Wq5OLub8E5edWHlTM4ar/YJkZh3plwB2INhhOC3eDoqHm1Za/ZOSksrLlURLoyXVdfQXqwg==" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.1.2/css/tempusdominus-bootstrap-4.min.css" integrity="sha512-PMjWzHVtwxdq7m7GIxBot5vdxUY+5aKP9wpKtvnNBZrVv1srI8tU6xvFMzG8crLNcMj/8Xl/WWmo/oAP/40p1g==" crossorigin="anonymous" />
</head>
```

## Package Managers

### Rails

Rails 5.1 Support - [Bootstrap 4 Datetime Picker Rails](https://github.com/Bialogs/bootstrap4-datetime-picker-rails)

1. Add `gem 'bootstrap4-datetime-picker-rails'` to your `Gemfile`
2. Execute `bundle`
3. Add `//= require tempusdominus-bootstrap-4.js` to your `application.js`
4. Add `@import "tempusdominus-bootstrap-4.css"` to your `application.scss`

### Django

Python package for Django: [Django Tempus Dominus](https://pypi.org/project/django-tempus-dominus/)

1. Install via pip: `pip install django-tempus-dominus`
2. Widgets are provided for Date, DateTime, and Time.
3. [Full examples are available with Django Forms, Widgets, and Templates](https://pypi.org/project/django-tempus-dominus/).

### Angular Wrapper

Follow instructions at [ngx-tempusdominus-bootstrap](https://github.com/fetrarij/ngx-tempusdominus-bootstrap) 

## Manual

1. Acquire [jQuery](http://jquery.com)
2. Acquire [Moment.js](https://github.com/moment/moment)
3. Acquire
```html
<script type="text/javascript" src="/path/to/jquery.js"></script>
<script type="text/javascript" src="/path/to/moment.js"></script>
<script type="text/javascript" src="/path/to/tempusdominus-bootstrap-4.min.js"></script>
<link rel="stylesheet" href="/path/to/tempusdominus-bootstrap-4.min.css"/>
```