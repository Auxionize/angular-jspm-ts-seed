import template from './app.component.html!text';

/**
 * @ngInject
 */
export class AppComponent {
    // Define our AppComponent's name
    static componentName: string = "app";

    // Define our AppComponent's config
    static componentConfig: ng.IComponentOptions = {
        bindings: {},
        controller: AppComponent,
        template
    };

    // Define our constructor and inject the necessary services
    constructor() {
        // Store all of our injectables
    }
}
