/** @format */

export const auth_service_url = process.env.AUTH_SERVICE_URL;
export const login_history_service_url = process.env.LOGIN_SERVICE_URL;

export const patient_service_url = process.env.PATIENT_SERVICE_URL;
export const doctor_service_url = process.env.DOCTOR_SERVICE_URL;

export const appointment_service_url = process.env.APPOINTMENT_SERVICE_URL;
export const payment_service_url = process.env.PAYMENT_SERVICE_URL;
export const email_service_url = process.env.EMAIL_SERVICE_URL;

export const service_urls = {
    auth: auth_service_url || "http://auth:4000",
    login_history: login_history_service_url || "http://login_history:4001",
    patient: patient_service_url || "http://patient:4002",
    doctor: doctor_service_url || "http://doctor:4003",
    appointment: appointment_service_url || "http://appointment:4004",
    payment: payment_service_url || "http://payment:4005",
    email: email_service_url || "http://email:4006",
};
