Feature: Order in Rahul Shetty Academy Ecommerce

  Scenario: As a user, i can order 1 any item
    Given user login to the web using "andrazain.project@gmail.com" and "Asdf1234"
    When add "IPHONE 13 PRO" to the cart
    Then verify "IPHONE 13 PRO" is diplayed in the cart
    When user input valid detail and checkout the order
    Then verify order is present in order history