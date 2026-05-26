# Real data checklist and client booking fields

This project ships with **placeholder / sample content** in code and demo defaults in forms. Use this guide to plan what to replace with **real business data** and what **information to collect from customers** when you connect a backend (for example Supabase, matching `src/types/database.types.ts`).

---

## 1. What to update for real data

### 1.1 Site-wide configuration (`src/config/site.ts`)

| Item | Current / sample | Action |
|------|------------------|--------|
| `name` | LankaRide | Your operating / brand name |
| `description` | Marketing sentence | SEO + social meta description |
| `url` | `NEXT_PUBLIC_SITE_URL` or `https://lankaride.com` | Production site URL in env |
| `keywords` | Generic taxi keywords | Your SEO keywords |
| `whatsappPhone` | `NEXT_PUBLIC_WHATSAPP_PHONE` or `94771234567` | Real WhatsApp number (digits only, country code, no `+`) |
| `email` | hello@lankaride.com | Real support / bookings email |
| `phone` | +94 77 123 4567 | Display phone (match WhatsApp if same line) |
| `address` | Colombo / generic | Full structured address for schema / footer |

**Environment variables to set (recommended):**

- `NEXT_PUBLIC_SITE_URL` — canonical site URL  
- `NEXT_PUBLIC_WHATSAPP_PHONE` — WhatsApp in international format without `+` (e.g. `94771234567`)

---

### 1.2 Contact details duplicated outside `siteConfig`

Some pages **hardcode** phone, email, or links. After you finalize real numbers, update these so they stay consistent:

| Location | What to sync |
|----------|----------------|
| `src/app/contact/page.tsx` | WhatsApp number, `tel:` / `wa.me` links, email (`hello@lankaride.lk` vs `site.ts` — currently inconsistent), operating hours, FAQ answers |
| `src/app/booking/page.tsx` | Sidebar `tel:` link and displayed phone |
| `src/components/layout/whatsapp-button.tsx` | WhatsApp target (if not driven by `siteConfig`) |

Also replace **social links** in `src/components/layout/marketing-footer.tsx` (currently `#` placeholders).

---

### 1.3 Marketing numbers and claims (replace with truth or remove)

| Location | Sample content |
|----------|----------------|
| `src/components/sections/stats.tsx` | 4.98 rating, 1,284 customers, 98% on-time, 12k+ rides |
| `src/components/sections/hero.tsx` | “#1 Airport Taxi”, “2,500+ Happy Travelers”, stock avatars |
| `src/app/admin/page.tsx` | Dashboard KPIs: bookings, fleet count, revenue, ratings, recent transfer table |

Use **real metrics** from your analytics / database, or generic copy without specific numbers until you have data.

---

### 1.4 Fleet and pricing (hardcoded arrays)

| File | Content |
|------|---------|
| `src/app/fleet/page.tsx` | Full `vehicles` list: names, descriptions, category, **$ prices**, seats, luggage, Unsplash `image` URLs |
| `src/components/sections/cars-highlight.tsx` | `featuredCars`: names, types, seats, luggage, “From $…” prices, emoji placeholders |

For production you typically:

- Store vehicles in **`cars`** table (see database types: `name`, `description`, `seats`, `luggage`, `image_url`) and optionally extend schema for **category** and **price** if you need them on the site.  
- Use **your own photos** (CDN or storage URLs), not stock URLs only.

---

### 1.5 Reviews and testimonials (sample people and text)

| File | Content |
|------|---------|
| `src/components/sections/testimonials-section.tsx` | Names, locations, ratings, text, randomuser.me avatars |
| `src/app/reviews/page.tsx` | Larger `reviews` list with routes and dates |
| `src/app/booking/page.tsx` | Sidebar mini testimonial (Sarah Jenkins, UK) |

Your types support **`testimonials`** and **`reviews`** tables (`name`, `review`, `rating`, optional `country`; reviews also `approved`). Plan to **load from the database** and moderate `approved` for public display.

---

### 1.6 Images and map placeholder

| Location | Notes |
|----------|--------|
| Hero, fleet cards, contact “map” | Unsplash / generic images |
| Contact page address card | “No. 124/A, Airport Road, Katunayake” — replace with real address or embed real map |

---

### 1.7 Homepage search bar (`src/components/sections/search-bar.tsx`)

The bar is **visual only** (inputs are not wired to routing or booking). For real use, either connect it to `/booking` with query params or remove misleading “Find My Ride” behavior until implemented.

---

### 1.8 Booking page UI-only pieces

| Item | Notes |
|------|--------|
| Default form values | `John Doe`, `john@example.com`, etc. — should be **empty** for production |
| Price estimate | “$45 - $60” — tie to real pricing rules or quote-after-contact |
| Pickup dropdown | Only three options — expand or load from config / API |
| Vehicle choice | “Standard Sedan” / “Luxury Van” — align with real fleet IDs or DB `cars` rows |
| `handleSubmit` | Only `alert(...)` — replace with API + validation (see below) |

---

## 2. Fields to collect from the client (customer booking)

### 2.1 What the public booking form already asks for (`src/app/booking/page.tsx`)

| Field (UI) | Purpose |
|------------|--------|
| Full name | Identify the passenger / lead booker |
| Phone (WhatsApp preferred) | Confirm pickup, delays, driver contact |
| Email | Written confirmation, receipts |
| Pickup location | Where the driver meets them |
| Destination address | Drop-off |
| Date | Service date |
| Preferred time | Pickup time |
| Vehicle type | Sedan vs van (or later: specific vehicle) |

**Production polish:** remove prefilled demo values; use placeholders instead of fake defaults.

---

### 2.2 What your database booking row expects (`bookingSchema` in `src/lib/validations.ts` / `bookings` table)

The validated shape aligned with the DB is:

| Field | Required | Notes |
|-------|----------|--------|
| `name` | Yes | Maps from UI “full name” |
| `email` | Yes | Valid email |
| `phone` | Yes | Min length validation in schema |
| `pickup_location` | Yes | Maps from pickup |
| `destination` | Yes | Free text address / hotel |
| `date_time` | Yes | **Single** timestamp string — combine booking page `date` + `time` when saving |
| `passenger_count` | Yes | Positive integer — **not on current booking UI**; add a field |
| `message` | Optional | Special requests, flight number, child seat, luggage notes — **not on current UI**; add textarea if you want |

Server-side: default `status` to `pending` unless your workflow differs.

---

### 2.3 Recommended extra fields (optional but common for airport taxis)

Collect only what you will actually use (privacy and form length).

| Field | Why |
|-------|-----|
| Flight number | Airport pickup coordination |
| Airline | Context for terminal / delays |
| Number of large bags | Vehicle sizing |
| Child / baby seat needed | Yes / no / count |
| Return trip date (optional) | Second booking or round-trip quote |

If you add these, extend **`bookings`** table (or a related table) and `bookingSchema` accordingly.

---

### 2.4 Alignment gaps to fix before “real” bookings

1. **Passenger count** — required by DB/schema, missing on booking page.  
2. **Message / special requests** — optional in schema, missing on booking page.  
3. **Naming** — UI uses `fullName`, `pickup`; API should send `name`, `pickup_location`.  
4. **Date/time** — UI splits `date` and `time`; persist as one `date_time` (ISO string or your DB convention).  
5. **Vehicle** — UI `vehicleType` is not in `bookings` row today; add a column (e.g. `vehicle_type` or `car_id`) if you need it in reports.

---

## 3. Quick reference: other admin / content entities

When moving off sample admin screens, back these with real data:

| Area | Database tables (from types) | Typical fields |
|------|------------------------------|----------------|
| Fleet admin | `cars` | name, description, seats, luggage, image_url |
| Public testimonials | `testimonials` | name, country?, review, rating |
| Moderated reviews | `reviews` | name, review, rating, approved |
| Bookings list | `bookings` | full row + status workflow |
| Staff login | `profiles` | email, role |

---

## 4. Summary

- **Replace:** brand, URLs, phones, emails, addresses, social links, stats, fleet copy/prices/images, testimonials, map/address, and admin demo numbers.  
- **Collect from clients:** at minimum name, email, phone, pickup, destination, date/time, passenger count; strongly consider optional message (special requests / flight info).  
- **Wire:** booking submit to your API using `bookingSchema` field names and combine date + time into `date_time`.

This keeps marketing honest, contact details consistent, and bookings ready for a real database.
