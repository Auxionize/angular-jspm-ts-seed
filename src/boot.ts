/// <reference path="../typings/index.d.ts" />

// Import our Angular dependencies
import * as angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';

import { AppComponent } from "./components/app/app.component";

module MaterialStart {
    "use strict";

    // Register our module and it's dependencies
    angular.module('app', ['ngMaterial', 'ngSanitize'])
        .config(function ($mdThemingProvider: angular.material.IThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('brown')
                .accentPalette('red');
        })

        // Register all of our components
        .component(AppComponent.componentName, AppComponent.componentConfig)
        ;
}
