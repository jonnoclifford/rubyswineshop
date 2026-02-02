# Ruby's Wine Bar - Admin Interface Documentation

## Overview

The admin interface provides a user-friendly content management system for Ruby's Wine Bar. It's designed for non-technical users to easily update website content without touching code.

## Features

### Authentication
- Secure GitHub OAuth authentication
- Protected admin routes
- Session management with 7-day expiry

### Content Management

#### 1. Business Information
- **Business details**: Name, tagline
- **Address**: Street, suburb, state, postcode
- **Contact**: Phone, email, Instagram handle
- **Opening hours**: Per-day schedule with custom formatting

#### 2. Hero Section
- Main headline and subheadline
- Primary and secondary call-to-action buttons
- Desktop and mobile hero images
- Image alt text for accessibility

#### 3. Wine Menu
- **By the Glass**: Individual wines with name, producer, region, price, and tasting notes
- **By the Bottle**: Organized by categories (Sparkling, White & Orange, Red, etc.)
- Add/edit/delete wines and categories
- Flexible structure for seasonal changes

#### 4. Events
- Event title, date/frequency, and time
- Detailed descriptions
- Recurring event indicator
- Add/remove events as needed

#### 5. FAQ
- Question and answer pairs
- Drag-and-drop reordering (coming soon)
- Add/remove FAQ items

## Using the Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Click "Sign in with GitHub"
3. Authorize the application
4. You'll be redirected to the admin dashboard

### Editing Content

1. Click on the relevant tab (Business Info, Hero, Menu, Events, FAQ)
2. Make your changes in the form fields
3. Click "Save Changes" at the bottom of each form
4. Changes are automatically committed to GitHub and will be live within a few minutes

### Form Validation

All forms include validation to ensure:
- Required fields are filled
- Email addresses are properly formatted
- Phone numbers are provided
- Consistent data structure

Error messages will appear in red below fields that need attention.

### Preview Changes

- Click the "Preview Site" button in the header to open your live site in a new tab
- Note: Changes may take 1-2 minutes to appear due to GitHub and deployment processing

### Tips for Non-Technical Users

#### Business Hours
Format examples:
- `9:00 AM - 5:00 PM`
- `4:00 PM - 11:00 PM`
- `Closed`
- `By Appointment`

#### Wine Descriptions
Keep tasting notes concise:
- Good: "Crisp citrus with floral aromatics"
- Too long: "This wine features a complex bouquet of citrus fruits including lemon, lime, and grapefruit, with subtle undertones of jasmine and honeysuckle..."

#### Event Dates
Use natural language:
- "Every Sunday"
- "First Thursday of the month"
- "March 15, 2026"
- "Weekly on Fridays"

#### Image Paths
Images should be placed in the `public/images/` folder:
- Correct: `/images/hero-desktop.jpg`
- Incorrect: `images/hero-desktop.jpg` or `hero-desktop.jpg`

## Technical Details

### Architecture

```
/src/app/admin/
├── page.tsx              # Admin entry point with auth check
└── login/
    └── page.tsx          # Login page

/src/components/admin/
├── AdminDashboard.tsx    # Main admin UI with tabs
├── BusinessInfoForm.tsx  # Business details form
├── HeroForm.tsx          # Hero section form
├── WineForm.tsx          # Wine menu management
├── EventForm.tsx         # Events management
└── FAQForm.tsx           # FAQ management

/src/app/api/admin/
└── config/
    └── route.ts          # Protected config API endpoint
```

### Data Flow

1. **Load**: Admin dashboard fetches config from `/api/admin/config`
2. **Edit**: User modifies form data in React state
3. **Save**: Form submission POSTs updated config to `/api/admin/config`
4. **Commit**: API commits changes to GitHub via GitHub API
5. **Deploy**: Vercel/Netlify automatically detects commit and redeploys
6. **Live**: Changes appear on live site within 1-2 minutes

### Authentication Flow

1. User clicks "Sign in with GitHub"
2. Redirected to GitHub OAuth
3. GitHub redirects back with authorization code
4. Backend exchanges code for access token
5. User session created with 7-day cookie
6. Protected routes check for valid session

## Customization

### Adding New Form Sections

1. Create new form component in `/src/components/admin/`
2. Add corresponding types to `/src/types/content.ts`
3. Update `site-config.json` structure
4. Add new tab to `AdminDashboard.tsx`
5. Add handler for the new section in `handleSectionSave`

### Modifying Form Fields

Each form component:
- Uses shadcn/ui components (Input, Textarea, Label, etc.)
- Includes form validation
- Provides helpful placeholder text
- Shows error messages for invalid input

Example of adding a field:

```tsx
<div className="space-y-2">
  <Label htmlFor="field-name">Field Label *</Label>
  <Input
    id="field-name"
    value={formData.fieldName}
    onChange={(e) => updateField('fieldName', e.target.value)}
    placeholder="Example value"
    className={errors.fieldName ? 'border-red-500' : ''}
  />
  {errors.fieldName && (
    <p className="text-sm text-red-500">{errors.fieldName}</p>
  )}
</div>
```

## Security Considerations

- All admin routes are protected by authentication middleware
- API routes verify user session before allowing changes
- GitHub OAuth provides secure, industry-standard authentication
- Commits include author information for audit trail
- Session cookies are HTTP-only and secure

## Troubleshooting

### "Unauthorized" Error
- Your session may have expired. Log out and log back in.
- Check that you're added as a collaborator on the GitHub repository.

### Changes Not Appearing
- Wait 1-2 minutes for deployment
- Check the GitHub repository for the commit
- Verify the site is properly connected to your hosting platform

### Save Failed
- Check your internet connection
- Verify GitHub API access token is valid
- Check browser console for detailed error messages

## Support

For technical issues or feature requests, contact your developer or create an issue in the GitHub repository.

## Future Enhancements

Planned features:
- [ ] Image upload interface
- [ ] Drag-and-drop reordering for wines and FAQs
- [ ] Preview mode before saving
- [ ] Revision history and rollback
- [ ] Bulk import/export
- [ ] Multi-user roles and permissions
