# Beyond the Dashboard

A beginner-friendly React + Vite interactive OER for exploring Big Data and learning analytics in education. The central question is: what can a dashboard tell us, and what does it leave out? The site includes an optional public, anonymous response wall powered by Supabase.

## Features
- Mobile-first responsive layout
- Explicit learning outcomes for the self-guided 10–15 minute activity
- Interactive exploration of the four Vs: volume, velocity, variety, and variability
- Clear distinction between Big Data, learning analytics, and educational decisions
- Interactive concept tabs and knowledge check
- Fictional learning analytics charts
- Scenario-based decision activity
- Data-governance checklist
- Anonymous reflection submissions
- Anonymous design-brief submissions
- Shared response lists loaded from Supabase so contributions remain available after refreshing or reopening the site
- Research-based references covering Big Data definitions, learning analytics, ethics, and limitations
- Reference links and suggested OER licensing note

## Important privacy note
The response wall is **public, not private**. Anyone who can access the published website can read the submitted responses, and the public website can accept submissions without a sign-in. Do not submit names, contact details, student records, health information, confidential workplace information, or anything else you would not want publicly visible. Responses are anonymous in the sense that this site does not ask for a name; they are not guaranteed to be untraceable. Because there is no sign-in or moderation dashboard, public submissions can also attract spam. For a course-only activity, use a sign-in/restricted-access setup instead of these public policies.

## Set up Supabase (one time)

### 1. Create a Supabase project
1. Go to https://supabase.com/ and sign in or create an account.
2. Create a new project. Give it a name such as `big-data-lab` and set a strong database password.
3. Wait until the project finishes provisioning.

### 2. Create the response table and public permissions
1. Open your Supabase project dashboard.
2. Select **SQL Editor** from the left menu and choose **New query**.
3. Open `supabase/setup.sql` in this project, copy all of its contents, and paste them into the SQL Editor.
4. Click **Run**. The script creates the `lab_responses` table and policies that let visitors read and submit responses.
5. In Supabase, open **Table Editor** and confirm that `lab_responses` exists.

### 3. Add the Supabase project keys to the local website
1. In Supabase, open **Project Settings** and find **API** (the exact menu wording may vary).
2. Copy the **Project URL** and the **publishable key** (or legacy `anon` public key).
3. In this project folder, make a copy of `.env.example` and name the copy `.env.local`.
4. Replace the example values in `.env.local` with your real Project URL and publishable/anon key. Keep the variable names exactly as shown:

```text
VITE_SUPABASE_URL=https://your-real-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-real-publishable-or-anon-key
```

5. Do **not** put a `service_role` key in the website. Anything beginning with `VITE_` is included in the browser build. The publishable/anon key is intended for browser use only when Row Level Security and policies are correctly configured.

### 4. Run and test the website locally
Install Node.js LTS from https://nodejs.org/ if needed. Open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

Test the connection:
1. Write a reflection and select **Share anonymously**.
2. Confirm it appears under **Shared reflections**.
3. Open the website in another browser or private window and check that the same response appears.
4. Submit a design brief and confirm it appears under **Shared design briefs**.
5. Refresh the page. Previously submitted responses should still appear.

If the page says sharing is not connected, check `.env.local`, then stop and restart the Vite server. If it cannot load responses, check that `supabase/setup.sql` ran successfully and that the table and policies exist.

### 5. Publish on Vercel
1. Upload the project files to a GitHub repository. **Do not upload `.env.local` or share its contents.**
2. Import the repository into https://vercel.com/.
3. In the Vercel project settings, open **Environment Variables** and add:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase publishable/anon key
4. Apply the variables to the environment you will deploy (usually **Production**; add Preview too if you want preview deployments to connect).
5. Deploy or redeploy the project so the variables are included in the build.
6. Open the live website and repeat the local testing steps.

## Build a production version

```bash
npm run build
npm run preview
```

## Security and moderation limitations
- The supplied SQL policies intentionally allow public reading and public insertion to match the requested open response wall.
- The table has length limits and only accepts the two expected response types, but this is not full spam protection.
- Anyone can potentially submit inappropriate content. Review the response wall regularly. If you need stronger control, add moderation, rate limiting, or require sign-in before accepting submissions.
- If you later change the site to private or class-only, update the database policies as well; hiding a link is not access control.
- Use fictional or non-sensitive examples only. Do not collect identifiable learner information for this class activity.

## Before publishing for a course
- Confirm each reference's exact bibliographic details and that each source supports the statements attributed to it.
- Check keyboard navigation, contrast, small-screen layout, and link destinations.
- Only apply CC BY 4.0 to original educational content you have the right to license. Third-party materials may have separate terms.
- The charts use fictional data, clearly labelled as illustrative. Do not replace it with identifiable student information.
  
## Creator and Reuse

**Created by:** Christina Nolan

**Live Interactive OER:** https://beyond-the-dashboard-oer.vercel.app/

**GitHub Repository:** https://github.com/sffw5f9wwf-dotcom/beyond-the-dashboard-oer

*Beyond the Dashboard* is an interactive Open Educational Resource designed to help educators explore Big Data, interpret learning analytics, and make responsible educational decisions.

Original educational content is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** licence. Educators may share and adapt this content with appropriate attribution.

Third-party materials remain subject to their respective licensing terms. The website's source code is publicly accessible, but a separate software licence is needed to explicitly permit its reuse and modification.
