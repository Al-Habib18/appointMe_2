/**
 * const app = express();
 *
 * app.post('/sslcommerz/success', (req, res) => {
 *   console.log('Payment Successful!', req.body);
 *   // Process successful payment and order (e.g., update order status, send confirmation email)
 *   res.send('Payment Successful!');
 * });
 *
 * app.post('/sslcommerz/fail', (req, res) => {
 *   console.log('Payment Failed!', req.body);
 *   // Handle failed payment (e.g., notify user, update order status)
 *   res.send('Payment Failed!');
 * });
 *
 * app.post("/create-payment", async (req, res) => {
 *     try {
 *         const {
 *             product_name,
 *             product_category,
 *             product_profile,
 *             total_amount,
 *             currency,
 *             cus_name,
 *             cus_email,
 *             cus_phone,
 *             cus_add1,
 *             shipping_method,
 *         } = req.body;
 *
 *         const paymentData = {
 *             total_amount,
 *             currency,
 *             tran_id: "your_unique_transaction_id", // Replace with a unique transaction ID generation logic
 *             product_name,
 *             product_category,
 *             product_profile,
 *             cus_name,
 *             cus_email,
 *             cus_phone,
 *             cus_add1,
 *             shipping_method,
 *             success_url: "http://your-domain.com/sslcommerz/success", // Replace with your success route URL
 *             fail_url: "http://your-domain.com/sslcommerz/fail", // Replace with your fail route URL
 *             cancel_url: "http://your-domain.com/payment-cancelled", // Optional cancellation URL
 *         };
 *
 *         const sslcommerzResponse = await sslcommerz.init(
 *             store_id,
 *             store_password,
 *             paymentData
 *         );
 *
 *         if (sslcommerzResponse.status === "success") {
 *             res.send({ payment_url: sslcommerzResponse.data.GatewayPageURL });
 *         } else {
 *             console.error(
 *                 "SSLcommerz initialization failed:",
 *                 sslcommerzResponse.message
 *             );
 *             res.status(500).send("Payment initialization failed!");
 *         }
 *     } catch (error) {
 *         console.error("Error creating payment:", error);
 *         res.status(500).send("Error creating payment!");
 *     }
 * });
 *
 * @format
 */
