# JEM Nexus closed-pilot runbook

## Current scope

JEM Nexus is currently a private, invitation-only educational pilot for the owner and a small number of named testers. It is not an official clinical deployment and must not be used to make patient-care decisions.

## Pilot safety rules

- Invite only known testers and remove access when participation ends.
- Use synthetic or de-identified test data only. Do not enter patient names, identifiers, records, images, or other protected health information.
- Treat all medical content as educational draft content unless its revision is explicitly marked clinically approved in the governance workflow.
- Keep the educational/non-clinical disclaimer visible and collect feedback through a controlled channel.
- Back up the database before migrations and periodically during the pilot; test restoration before official launch.
- Review authentication, application errors, verification-email delivery, and database availability during each pilot session.

## Account onboarding limitation

Email verification must remain enabled. While Resend is used without a verified sending domain, delivery is restricted by the provider and may not work for all invited addresses. Do not bypass verification globally. Before inviting external testers, either:

1. purchase and verify a sending domain in Resend; or
2. use a temporary, explicitly controlled administrator-assisted verification procedure for named pilot accounts and record each exception.

The verified-domain setup remains a required pre-launch task.

## Before each pilot session

1. Confirm MySQL and the application health endpoint are available.
2. Run `pnpm run ci`.
3. Apply pending database migrations and create a backup.
4. Verify login, registration, logout, protected-route redirection, and one approved content journey.
5. Confirm no real patient data will be used.

## Exit criteria for official use

- Verified sending domain and reliable email delivery.
- Invite/role administration and access revocation are operational.
- Clinical content has provenance, an approved revision, and recorded clinical review.
- Production hosting, TLS, monitoring, alerting, restore-tested backups, privacy terms, and an incident-response owner are in place.
- Security and accessibility checks pass in the deployment environment.
