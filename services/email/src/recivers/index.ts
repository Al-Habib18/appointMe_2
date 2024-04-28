/** @format */

import { receiveFromQueue } from "./auth";
import { receiveFromAppointmentQueue } from "./appointment";
import { receiveFromPaymentQueue } from "./payment";
export const callRecivers = async () => {
    receiveFromQueue("registration");
    receiveFromQueue("verification");
    receiveFromAppointmentQueue();
    receiveFromPaymentQueue();
};
