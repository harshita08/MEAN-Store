var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {

   $routeProvider
      .when("/", {
         templateUrl: "./../assets/partials/homePage.html"
      })
      
      .when("/login", {
         templateUrl: "./../assets/partials/loginReg.html"
      })

      .when("/newProduct", {
         templateUrl: "./../assets/partials/addNewProduct.html"
      })

      .when("/show/:id", {
         templateUrl: "./../assets/partials/showProduct.html"
      })

      .when("/cart", {
         templateUrl: "./../assets/partials/cart.html"
      })

      .when("/listings", {
         templateUrl: "./../assets/partials/myListings.html"
      })

      .when("/checkout", {
         templateUrl: "./../assets/partials/checkOut.html"
      })

      .when("/orderPlaced", {
         templateUrl: "./../assets/partials/finalPage.html"
      })

      .when("/edit/:id", {
         templateUrl: "./../assets/partials/editProduct.html"
      })

      .otherwise({
         redirectTo: "/"
      });
})
