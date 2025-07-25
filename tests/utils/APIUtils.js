class APIUtils {
  /**
   * create constructor
   */
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  /**
   * function login to get the token
   * this function will return the token
   */
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    const loginResponseJson = await loginResponse.json(); // conver response into json fomrat
    const token = loginResponseJson.token; // extract/get the token from response
    console.log(`~~~token:`, token);

    return token;
  }

  /**
   * function create order to get te orderId
   * this function will return the object
   * the object contain token and orderId
   */
  async createOrder(createOrderPayload) {
    let response = {}; // init empty object
    response.token = await this.getToken(); // get the token & store into object

    const createOrderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
        data: createOrderPayload,
      }
    );
    const createOrderResponseJson = await createOrderResponse.json();
    console.log(`~~~create order response:`, createOrderResponseJson);
    const orderId = createOrderResponseJson.orders[0]; // get orderId
    console.log(`~~~orderId:`, orderId);
    response.orderId = orderId; // get the orderId & store into object

    return response;
  }
}

module.exports = { APIUtils };
