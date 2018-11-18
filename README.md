# Fly Skeleton

*Fly Skeleton* is a skeleton Angular 6+ application, with basic authentication set in place. 

### Contents
- [Installing](#installing)
- [Components](#components)
- [Authentication](#authentication)
- [Guards](#guards)
- [Interceptors](#interceptors)
- [Remove Default Styling](#remove-default-styling)

### Installing
Just make a clone of the project and in the project root directory run:

```
npm install
```

to install all Angular related packages.

### Components

Application comes with standard login and register components, home, profile and header components. You should change this components to fit your requirements.

### Authentication

If you need to use the user's information in some components:

```js
user: User = null;

ngOnInit() {
    this.auth.$userUpdate.subscribe((u: User) => {
        this.user = u;
    });
}
```

Don't forget to unsubscribe after destroying the component.

When user logs in the application token is saved in *local storage* after which is made one more request to retrieve the user's information.

Application have auto authentication, if there is token in *local storage* on app bootstrap, application will try to retrieve user's information. If the user access restricted route on first load (user hit refresh on a page that have restricted access) the *AuthGuard* will wait for the auto authentication to finish before deciding to let user access that route.

So if you change/remove/update the *profile()* (used for getting user's information) method in *CoreService*, you should also update *AppBootstrap* in *core/services/app-bootstrap.service.ts* and also update *Login* and *Profile* components (since they use this method).

### Guards

Application uses the *AuthGuard* for guarding routes that require user to be logged in.

### Interceptors

Application uses two interceptors *TokenInterceptor* and *ErrorsInterceptor* for adding the token in the request header and catching errors.

If there is token in local storage when the request is made the *TokenInterceptor* adds header:

```js
Authorization: 'Bearer ' + token
```

If you use different header, feel free to change the *TokenInterceptor* in *core/interceptors/token.interceptor.ts*

*ErrorsInterceptor* catches any response error and forwards it to the *AppErrorHandler* and checks if the error is Unauthorized in which case redirects the user to the login route. *AppErrorHandler* comes with handful types of errors handling, but if you need to add more update the *AppErrorHandler* in *core/services/app-error-handler.service.ts*.

### Remove Default Styling

Application uses spectre.css as default styling, to remove just delete the paths of the css files in the angular.json, under the section styles.
