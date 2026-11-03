# MU Norn Nai Dee

**English** | [ภาษาไทย](README.th.md)

A website that helps students at Mahidol University's Salaya campus find and compare dormitories using information with cited sources. Visitors can browse without an account. Signed-in users can save dormitories they are interested in.

## Problem and scope

Dormitory information is spread across multiple sources. Some prices and terms have no effective date or use different billing periods. This website presents ratings, utility charges, rent, and contact information alongside their sources, while distinguishing verified information from details that still need confirmation.

- Search 33 dormitories by name and area, and filter by electricity rate and safety rating.
- Compare two dormitories while preserving the units and billing periods used by each source.
- View each dormitory's details, verification status, and source links.
- Sign up with an email address and password, and confirm the email address before signing in.
- Save dormitories to an account using Supabase Auth after signing in.

Ratings and utility charges are based on pages 7–9 of the *MU Norn Nai Dee* academic year 2025 project report, which surveyed 103 respondents in total. The report does not give a respondent count for each dormitory. Rent and contact details come from the sources linked on each dormitory's detail page. A source check date is not necessarily the date a price took effect.

## Technology and data

The project uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Supabase Auth manages accounts, while Postgres with Row Level Security stores favorites. Dormitory information and its source evidence are kept in the project. The `public.favorites` table links users to dormitory IDs.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`, then add your Supabase Project URL and publishable key.
3. Configure Supabase using the [authentication setup guide](docs/supabase-setup.md).
4. Start the website with `npm run dev`.

Set `NEXT_PUBLIC_ENABLE_REGISTRATION=true` in `.env.local` to try the registration button and form locally. It defaults to `false` until Custom SMTP is configured in Supabase to send confirmation emails to the public. Supabase's default email service is only suitable for testing with members of the Organization.

## Checks before deployment

Run `npm run build`, `npm run lint`, and `node --test tests/*.test.mjs`, then follow the [Vercel deployment checklist](docs/deploy-vercel.md).

## Limitations

Prices and contact details may change after they are checked. Confirm the latest details with the dormitory before making a decision. The website shows the evidence and uncertainty behind each item to help readers assess the information. It does not confirm room availability or accept bookings.
