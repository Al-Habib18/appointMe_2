<!-- @format -->

### Auth_Service : http://localhost:4000

### Login_History_service : http://localhost:4001

---

### Patient_Service : http://localhost:4002

### Doctor_Service : http://localhost:4003

### Appointment_Service : http://localhost:4004

### Payment_Service : http://localhost:4005

### Email_Service : http://localhost:4006

### Review_service : http://localhost:4007

### The type is mandatory and determines the intent of the change. Here are possible values:

```sh
build: changes affecting build systems or external dependencies
ci: updating configuration files for continuous integration and deployment services
chore: updating grunt tasks etc.; no production code change
docs: documentation-only changes
feat: a new feature
fix: a bug fix
perf: a code change that improves performance
refactor: a code change that neither fixes a bug nor adds a feature
style: changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.)
test: adding missing tests or correcting existing tests

```

---

registration: This queue will receive messages for account registration notifications.
verification: This queue will receive messages for account verification notifications.

appointment.create: This queue will receive messages for appointment creation notifications.
appointment.update: This queue will receive messages for appointment update notifications.

payment.success: This queue will receive messages for payment success notifications.
payment.failed: This queue will receive messages for payment failed notifications.
