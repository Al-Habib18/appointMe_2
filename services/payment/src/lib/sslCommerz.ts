/** @format */

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "holys6628bf5748a3b";
const store_passwd = "holys6628bf5748a3b@ssl";
const is_live = false;

export const getGatewayPageURL = async (tran_id: string, amount: number) => {
    try {
        const data = {
            total_amount: amount,
            currency: "BDT",
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `http://localhost:4005/payments/success/${tran_id}`,
            fail_url: `http://localhost:4005/payments/fail/${tran_id}`,
            cancel_url: `http://localhost:4005/payments/cancel/${tran_id}`,
            ipn_url: "http://localhost:4005/ipn",
            shipping_method: "Courier",
            product_name: "Computer.",
            product_category: "Electronic",
            product_profile: "general",
            cus_name: "Customer Name",
            cus_email: "customer@example.com",
            cus_add1: "Dhaka",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: "01711111111",
            cus_fax: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_add2: "Dhaka",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);
        console.log("Api Response :: ", apiResponse);
        const GatewayPageURL = apiResponse.GatewayPageURL;
        return GatewayPageURL;
    } catch (err) {
        console.log("Error occured in sslcommerz init", err);
        return err;
    }
};
