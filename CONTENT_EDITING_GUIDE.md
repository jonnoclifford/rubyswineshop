# How to Update Your Website Content

**A Simple Guide for Ruby's Wine Bar**

Welcome! This guide will show you how to update your website's content yourself—no technical experience needed. We'll walk through everything step by step, using plain language.

---

## What You'll Be Editing

Your website's content lives in a single file called `site-config.json`. Think of it like a digital menu board where all your business information, hours, wine lists, and events are stored. When you change something in this file, your website automatically updates to match.

**What can you update?**
- Opening hours
- Wine lists and prices
- Event information
- Business phone number and email
- Descriptions and text throughout the site
- FAQ answers

---

## Before You Start

### What You'll Need

1. **A GitHub account** - You already have one! This is where your website files are stored.
2. **Your website's GitHub page** - Bookmark this link:
   **https://github.com/jonnoclifford/rubyswineshop**
3. **5-10 minutes** - Most edits take just a few minutes

### Important Safety Note

Don't worry about breaking anything! GitHub keeps a complete history of every change, so we can always undo mistakes. Think of it like having unlimited "undo" buttons.

---

## Step-by-Step: Making Your First Edit

### Step 1: Get to the File

1. **Go to your GitHub page:**
   Open https://github.com/jonnoclifford/rubyswineshop in your web browser

2. **Find the content file:**
   - You'll see a list of folders and files
   - Click on the folder called **`src`**
   - Then click on the folder called **`content`**
   - Finally, click on **`site-config.json`**

   **Visual guide:** You're looking for: `src` → `content` → `site-config.json`

### Step 2: Start Editing

1. **Click the pencil icon** in the top-right corner of the file
   - It's next to "Raw" and "Blame" buttons
   - The pencil icon means "Edit this file"

2. **You're now in editing mode!**
   - You'll see all your website's content in a text editor
   - Don't be intimidated by all the text—we'll show you exactly where to make changes

### Step 3: Make Your Changes

Scroll through the file to find what you want to change. Here's what the different sections control:

**Finding Your Section:**
- Press `Ctrl+F` (Windows) or `Cmd+F` (Mac) to search
- Type what you're looking for (like "hours" or "wine")
- The page will jump to that section

**Making Changes:**
- Simply click where you want to change text
- Delete the old text and type the new text
- Be careful to keep the quotation marks (`"`) around your text

### Step 4: Save Your Changes (This is Called "Committing")

Once you've made your changes, you need to save them. In GitHub, saving is called "committing" (think of it as committing to the change).

1. **Scroll to the bottom of the page**
2. **You'll see a section called "Commit changes"**
3. **Add a description:**
   - In the first box, write a short note about what you changed
   - Example: "Updated Friday opening hours to 5 PM"
   - Example: "Added new Pinot Noir to menu"
   - This helps you remember what you changed later

4. **Click the big green button "Commit changes"**

**That's it!** Your changes are saved.

### Step 5: Wait for Your Website to Update

After you save (commit), your website doesn't update instantly. Here's what happens:

1. **Vercel** (the company that hosts your website) sees your changes
2. It rebuilds your website with the new content
3. This takes about **2-4 minutes**
4. Your changes will automatically appear on the live website

**How to check:**
- Wait 3-4 minutes
- Visit your website
- Refresh the page (press F5 or click the refresh button)
- Your changes should be visible!

---

## Common Tasks: Quick Reference

### ✏️ Update Opening Hours

**What to find:** Look for the section that starts with `"hours": {`

**Example:**
```
"hours": {
  "Monday": "Closed",
  "Tuesday": "Closed",
  "Wednesday": "4:00 PM - 9:00 PM",
  "Thursday": "4:00 PM - 10:00 PM",
  "Friday": "4:00 PM - 11:00 PM",
  "Saturday": "2:00 PM - 11:00 PM",
  "Sunday": "2:00 PM - 9:00 PM"
}
```

**How to change:**
- Find the day you want to update
- Change the time between the quotation marks
- Keep the format the same: `"Day": "Time - Time"`

**Example change:**
- Change: `"Friday": "4:00 PM - 11:00 PM"`
- To: `"Friday": "5:00 PM - 11:00 PM"`

---

### 📝 Update Contact Information

**What to find:** Look for `"contact": {`

**Example:**
```
"contact": {
  "phone": "+61 7 1234 5678",
  "email": "hello@rubyswineshop.com.au",
  "instagram": "@rubyswineshop"
}
```

**How to change:**
- Simply update the text between the quotation marks
- Keep the same format

---

### 🍷 Update Wine Menu (By the Glass)

**What to find:** Look for `"byTheGlass": {`

**Example of one wine:**
```
{
  "name": "Skin Contact Pinot Gris",
  "producer": "Lucy Margaux",
  "region": "Adelaide Hills, SA",
  "price": "$16",
  "description": "Cloudy amber with dried apricot and chamomile notes"
}
```

**How to change:**
- Update the wine name, producer, region, or price
- Change the description to match the new wine
- Keep all the quotation marks and commas exactly as they are

**Adding a new wine:**
- Copy an existing wine entry (including all the curly brackets `{}`)
- Paste it below the last wine
- Make sure there's a comma after the previous wine's closing `}`
- Update all the details for your new wine

**Removing a wine:**
- Delete the entire wine entry (from the opening `{` to the closing `}`)
- Make sure you don't leave two commas next to each other

---

### 🎉 Update Events

**What to find:** Look for `"events": [`

**Example:**
```
{
  "title": "Sunday Sessions",
  "date": "Every Sunday",
  "time": "2:00 PM - 9:00 PM",
  "description": "Live acoustic sets from local musicians.",
  "recurring": true
}
```

**How to change:**
- Update the title, date, time, or description
- For one-time events, change `"recurring": true` to `"recurring": false`

---

### 💰 Update Prices

Prices appear in several places:
- Wine menu (both by-the-glass and by-the-bottle)
- Snacks menu

**How to change:**
- Find the item you want to update
- Change the price text: `"price": "$16"` to `"price": "$18"`
- Keep the dollar sign and quotation marks

---

### 📋 Update FAQ Answers

**What to find:** Look for `"faq": {`

**Example:**
```
{
  "question": "Do you take bookings?",
  "answer": "Walk-ins only. With an intimate 20-seat capacity..."
}
```

**How to change:**
- Update the answer text between the quotation marks
- You can also change the question if needed

---

## What NOT to Change

**⚠️ Keep these exactly as they are:**

1. **Curly brackets:** `{` and `}`
2. **Square brackets:** `[` and `]`
3. **Quotation marks:** `"`
4. **Colons:** `:`
5. **Commas:** `,`
6. **The labels (words before the colons):** Like `"name"`, `"price"`, `"hours"`

**Why?** These are part of the structure that tells the website how to read your content. Changing them can break your website.

**Think of it like a form:** You can fill in the blanks, but don't erase the labels or lines on the form.

---

## Troubleshooting: What If Something Goes Wrong?

### My website looks broken after my changes

**Don't panic!** This usually means there's a small formatting error.

**Common causes:**
- Missing a quotation mark
- Missing a comma between items
- Deleted a bracket accidentally

**How to fix:**
1. Go back to GitHub: https://github.com/jonnoclifford/rubyswineshop
2. Navigate to `src` → `content` → `site-config.json`
3. Click the "History" button (clock icon)
4. Click on your most recent change
5. Click the "..." menu and select "Revert changes"
6. This will undo your last change

### My changes aren't showing up on the website

**Wait a bit longer:**
- Changes can take 3-5 minutes to appear
- Try refreshing your browser (Ctrl+F5 or Cmd+Shift+R for a "hard refresh")

**Check if your commit worked:**
1. Go to https://github.com/jonnoclifford/rubyswineshop
2. You should see your commit message on the main page
3. If you see it, your changes saved successfully

**Check the deployment:**
1. Go to https://vercel.com (you'll need to log in)
2. Find your Ruby's Wine Bar project
3. Check if the deployment shows "Ready" (it should be green)
4. If it shows "Error", contact your developer

### I accidentally deleted something important

**No worries!** Everything can be restored.

**Quick fix:**
1. Go to https://github.com/jonnoclifford/rubyswineshop
2. Navigate to `src` → `content` → `site-config.json`
3. Click "History" (clock icon)
4. Find the version before your change
5. Click it, then copy the text you need
6. Edit the current file and paste it back in

**Or ask for help:**
- Contact your developer and they can restore it in seconds
- All your previous versions are permanently saved

---

## Tips for Success

### ✅ Best Practices

1. **Make small changes at a time**
   - Update one section, save it, check the website
   - Then make your next change
   - This makes it easier to spot if something goes wrong

2. **Use descriptive commit messages**
   - Good: "Updated Sunday hours to close at 8 PM"
   - Not helpful: "Changes"
   - Your future self will thank you!

3. **Double-check quotation marks**
   - Make sure every opening `"` has a closing `"`
   - This is the most common mistake

4. **Keep your formatting consistent**
   - If times are written as "4:00 PM", keep them all that way
   - Don't mix "4pm" and "4:00 PM"

5. **Test on mobile**
   - After making changes, check your website on your phone
   - Most customers will see it on mobile

### 📱 Keep a Checklist

Before you commit changes:
- [ ] Did I spell everything correctly?
- [ ] Are all my quotation marks paired up?
- [ ] Did I keep all the commas in place?
- [ ] Did I write a clear commit message?
- [ ] Are my prices formatted consistently?

---

## Getting Help

### When to Ask Your Developer

You can handle most content updates yourself, but ask for help if you want to:
- Add completely new sections to the website
- Change the layout or design
- Add new features or functionality
- Fix technical errors you can't undo

### When You Can Do It Yourself

You're good to update:
- Any text content (descriptions, stories, taglines)
- Hours of operation
- Contact information
- Menu items and prices
- Event details
- FAQ answers
- Business information

---

## Quick Start Checklist

Your first time editing? Follow these steps:

1. [ ] Bookmark https://github.com/jonnoclifford/rubyswineshop
2. [ ] Navigate to `src` → `content` → `site-config.json`
3. [ ] Click the pencil icon to edit
4. [ ] Make a small test change (like updating a wine description)
5. [ ] Write a commit message: "Testing my first edit"
6. [ ] Click "Commit changes"
7. [ ] Wait 3-4 minutes
8. [ ] Visit your website and refresh to see the change
9. [ ] Celebrate! You just updated your website yourself!

---

## Remember

- You can't permanently break anything
- All changes are reversible
- Take it slow and make small changes
- Your website will update automatically within minutes
- You're doing great!

---

## Visual Roadmap

Here's what you'll see when editing:

**Step 1: Find the file**
```
GitHub.com → rubyswineshop → src → content → site-config.json
```

**Step 2: Click the pencil icon**
```
📄 site-config.json     [<> Raw]  [Blame]  [✏️ Edit]  <-- Click this!
```

**Step 3: Make your changes**
```
Find your section using Ctrl+F (or Cmd+F)
Change the text between quotation marks
Keep all punctuation intact
```

**Step 4: Commit**
```
Scroll to bottom → Write description → "Commit changes" button
```

**Step 5: Wait & Check**
```
Wait 3-4 minutes → Visit website → Refresh page → See your changes!
```

---

**Questions?** Keep this guide handy and refer back to it whenever you need to make updates. You've got this!

**Last Updated:** February 2026
**Your Website:** https://github.com/jonnoclifford/rubyswineshop
**Live Site:** Check your Vercel dashboard for your live URL
