# Grocery Shop

![Grocery Shop](images/shop.ico?raw=true "Grocery Shop")

This is the source code for my article on [how to securing a Angular frontend and a Quarkus backend using Keycloak](https://www.linkedin.com/pulse/securing-java-rest-services-keycloak-part-5-jannie-louwrens/).

## Requirements

  - Keycloak 11.0.3
  - Java 11
  - Quarkus 1.8.1.Final
  - Angular 10.0.6
  - Node.js 12.19.0
  - Yarn 1.22.5

### Changelog
  - 6 Dec 2022
    - Keycloak 17.0.0
    - Angular 14.2.10
    - Node.js 16.18.1
    - Yarn 1.22.19

## Installing and Configuring Keycloak
Download the standalone server distribution from the [Keycloak website](https://www.keycloak.org/), unpack it and start the server. Follow the [Getting Started](https://www.keycloak.org/docs/latest/getting_started/index.html#creating-the-admin-account) instructions to setup the administrator account.

There are two ways to configure the Keycloak realm for this application:
1. Import the [demo-realm.json](keycloak/demo-realm.json)
2. Follow the **Create Realm, Client and Users** guide

### How to import [demo-realm.json](keycloak/demo-realm.json)
Open a terminal and change directory to where Keycloak was installed and start the server with `bin/standalone.sh`.

In a browser navigate to http://localhost:8080 and login as the admin user (create it if it does not already exist).

While in Keycloak click on `Add realm` then click the `Select file` button and find [demo-realm.json](keycloak/demo-realm.json) then finally click the `Create` button.

### Create Realm, Client and Users
>This section is only for those who wish to manually configure the Keycloak server.

#### 1. Create a realm
Follow the [create a realm](https://www.keycloak.org/docs/latest/getting_started/index.html#_create-realm) instructions and create a realm called: `demo`
#### 2. Create a client
Follow steps 1- 3 of the [creating and registering](https://www.keycloak.org/docs/latest/getting_started/index.html#creating-and-registering-the-client) guide and create a new client called: `my-app`

In the **Valid Redirect URIs** field enter the two URLs: `http://localhost:8081/*` and `http://localhost:4200/*`
> Note the asterisk (*) after the urls!

And in the **Web Origins** fields simply add a `*` (asterisk)
#### 3. Create roles and assign permissions
In the Keycloak administration console create two new roles, named: `user` and `admin`
Edit the `admin` role and enable the **Composite Roles** flag and choose `realm-management` from the **Client Roles** droplist.
Highlight the `view-users` option in the **Available Roles** block and then click on the "Add selected" button.
#### 4. Create the following users:
| Username | Password | First Name | Last Name | Email | Roles |
| ------ | ------ | ------ | ------ | ------ | ------ |
| metalgear | password | Bob | Knight | `bob.knight@example.com` | ADMIN, USER |
| grilldad | password | Jim | Long | `jim.long@example.com` | USER |
| mythbuster | password | Kate | Wilson | `kate.wilson@example.com` | USER |
| spacehunter | password | Victor | Brown | `victor.brown@example.com` | USER |
> It is most important that you enter the username as provided in the table, because they are used in the Quarkus backend to link the customer orders with the user.

## Start the Quarkus Application
Open a terminal and change to the directory where the code was checked out.
Next change to the `quarkus-shop-backend` directory and execure the following maven command:
```
mvn clean compile quarkus:dev
```
## Build and Run the Angular Frontend Application
Open another terminal and change to the directory where the code was checked out.
Next change to the `angular-shop-frontend` directory abd execute the following commands:
```
yarn install
yarn start -o
```
## View the Application
Open an internet browser and navigate to the url: `http://localhost:4200`

You will be presented with the Keycloak login screen:

![Keycloak Login](images/keycloak_login.png?raw=true "Keycloak Login")

Enter one of the username and password combination created earlier to sign in.

After a successful login you will see the product catalog page:
![Landing Page](images/shopapp.png?raw=true "Landing Page")
