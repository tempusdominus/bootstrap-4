<div class="alert alert-warning">
    This guide still needs a lot of work
</div>

# Minimal Requirements

1. jQuery
2. Moment.js
3. Locales: Moment's locale files are [here](https://github.com/moment/moment/tree/master/locale)

# Installation Guides
* [CDN](#cdn)
* [Bower](#bower-)
* [Nuget](#nuget)
* [Rails](#rails-)
* [Angular](#angular-wrapper)
* [Meteor.js](#meteorjs)
* [Manual](#manual)

## CDN
```html
<head>
  <script type="text/javascript" src="https://cdnjs.com/libraries/[fill-in].js"></script>
</head>
```

## Package Managers

### [bower](http://bower.io) ![Bower version](https://badge.fury.io/bo/tempusdominus-core.png)

Run the following command:
```
bower install tempusdominus-core#latest --save
```

Include necessary scripts and styles:
```html
<head>
  <!-- ... -->
  <script type="text/javascript" src="/bower_components/jquery/jquery.min.js"></script>
  <script type="text/javascript" src="/bower_components/moment/min/moment.min.js"></script>
  <script type="text/javascript" src="/bower_components/tempusdominus-core/build/js/core.min.js"></script>
</head>
```
### Nuget

### [Tempus.Dominus.Bootstrap.4](https://www.nuget.org/packages/Tempus.Dominus.Bootstrap.4/): ![NuGet version](https://badge.fury.io/nu/Tempus.Dominus.Bootstrap.4.png)

    PM> Install-Package Tempus.Dominus.Bootstrap.4


```html
<head>
  <script type="text/javascript" src="/scripts/jquery.min.js"></script>
  <script type="text/javascript" src="/scripts/moment.min.js"></script>
  <script type="text/javascript" src="/scripts/tempusdominus/tempusdominus-bootstrap-4.js"></script>
</head>
```

### Rails

Need new wrapper for this version.

### Angular Wrapper
Need new wrapper for this version.

### Meteor.js

Need new wrapper for this version.

### Composer

    $ composer require tempusdominus/bootstrap-4:5.0.0-alpha.6

## Manual

1. Acquire [jQuery](http://jquery.com)
2. Acquire [Moment.js](https://github.com/moment/moment)
3. Acquire 
```html
<script type="text/javascript" src="/path/to/jquery.js"></script>
<script type="text/javascript" src="/path/to/moment.js"></script>
<script type="text/javascript" src="/path/to/core.min.js"></script>
```

## Knockout

Need new wrapper for this version.
