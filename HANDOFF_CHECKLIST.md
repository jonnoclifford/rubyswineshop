# Website Handoff Checklist

This checklist covers everything needed to hand off Ruby's Wine Bar website to the business owner.

## 🎯 What You're Handing Over

✅ **Live Website:** https://rubyswineshop.vercel.app/  
✅ **Production Domain:** rubyswineshop.com.au (when DNS is pointed)  
✅ **Easy Content Editing:** Via GitHub web interface (no coding required)  
✅ **Automatic Deployments:** Changes go live in 2-4 minutes  
✅ **Zero Ongoing Costs:** Vercel free tier (forever)

---

## 📋 Pre-Handoff Tasks

### 1. GitHub Repository Access

**Current Owner:** jonnoclifford  
**Needs:** Business owner GitHub account

**Steps:**
- [ ] Business owner creates GitHub account (free)
- [ ] Add them as collaborator: Repository Settings → Collaborators → Add people
- [ ] Give them "Write" access (allows editing, not deleting)
- [ ] They accept invitation via email

**Alternative:** Transfer repo ownership entirely (Settings → Danger Zone → Transfer ownership)

### 2. Vercel Account Transfer

**Current Owner:** Your Vercel account  
**Options:**

**A. Add them as team member (keeps your account):**
- [ ] Vercel dashboard → Project → Settings → Members
- [ ] Add their email
- [ ] Give "Member" role

**B. Transfer project entirely (cleanest handoff):**
- [ ] Vercel dashboard → Project → Settings → General
- [ ] Scroll to "Transfer Project"
- [ ] Enter their Vercel account email
- [ ] They accept transfer

### 3. Domain Management

**Current Status:** rubyswineshop.com.au  
**Where is it registered?** _[Fill in registrar name]_

**Steps:**
- [ ] Either transfer domain to business owner OR
- [ ] Give them registrar login to manage DNS
- [ ] Document current DNS settings (Vercel nameservers)

---

## 📚 Documentation to Share

Share these files from the repo (all located in project root):

### Essential (MUST share):
1. **`CONTENT_EDITING_GUIDE.md`** - How to edit website content
   - Step-by-step GitHub editing instructions
   - Common tasks with examples
   - Non-technical language

2. **`README.md`** - Technical overview
   - What the site is built with
   - How deployments work
   - Where to get help

### Helpful (NICE to share):
3. **`DEPLOYMENT.md`** - How deployments work
4. **`SETUP.md`** - Original setup documentation

---

## 👤 Business Owner Training Session (30 min)

Schedule a quick call/screen share to walk through:

### Part 1: Editing Content (15 min)
- [ ] Show them GitHub.com and how to log in
- [ ] Navigate to site-config.json together
- [ ] Make a test edit (update opening hours)
- [ ] Commit the change
- [ ] Watch it deploy and go live
- [ ] **Confidence builder:** Let THEM make a second edit while you watch

### Part 2: Understanding the System (10 min)
- [ ] Explain what GitHub does (version control = safety net)
- [ ] Explain what Vercel does (hosting + auto-deployment)
- [ ] Show them the Vercel dashboard (optional)
- [ ] Review the editing guide together

### Part 3: Support & Emergency Contacts (5 min)
- [ ] Who to contact if something breaks: _[Your contact or leave blank if no ongoing support]_
- [ ] Vercel support (if they transfer project): support.vercel.com
- [ ] GitHub support: support.github.com
- [ ] Reassure them: "You can't permanently break anything. GitHub keeps history of all changes."

---

## ✅ Final Handoff Checklist

### Access Transferred:
- [ ] GitHub repository access (collaborator or transferred)
- [ ] Vercel project access (team member or transferred)
- [ ] Domain management access (if applicable)

### Documentation Shared:
- [ ] CONTENT_EDITING_GUIDE.md sent or linked
- [ ] README.md reviewed together
- [ ] Emergency contact information provided

### Training Complete:
- [ ] Walkthrough completed
- [ ] Business owner successfully made a test edit
- [ ] Business owner understands deployment process (2-4 min wait)
- [ ] Business owner has GitHub + Vercel login credentials saved

### Cleanup (Optional):
- [ ] Remove your access from GitHub (if full transfer)
- [ ] Remove your access from Vercel (if full transfer)
- [ ] Update DNS if needed
- [ ] Archive local development folder

---

## 🎁 Ongoing Support Options

**Option 1: Zero Support (Clean Break)**
- You've done your favor, you're done
- They contact Vercel/GitHub support if needed
- Document this clearly in handoff

**Option 2: Emergency Contact Only**
- You'll help if site completely breaks
- Set boundaries: "Only for emergencies, not content edits"
- Give them your contact method

**Option 3: Paid Retainer (If They Want)**
- $X/month for content updates + support
- Clearly define scope
- Written agreement

**Recommendation:** Option 1 (clean break) since you've built a system they can manage themselves.

---

## 📞 Sample Handoff Email

```
Subject: Ruby's Wine Bar Website - Handoff Complete

Hi [Business Owner Name],

Your website is now live and ready to hand over to you!

🌐 Live Site: https://rubyswineshop.vercel.app/
📝 Edit Content: https://github.com/jonnoclifford/rubyswineshop

I've added you as a collaborator on GitHub so you can edit the website content yourself. 
I've attached a guide (CONTENT_EDITING_GUIDE.md) that walks you through exactly how to 
make changes.

Quick Summary:
✅ Website is live and working
✅ You can edit content via GitHub (it's easier than it sounds - see the guide!)
✅ Changes take 2-4 minutes to go live automatically
✅ No monthly costs - everything is on free plans
✅ Your website is fast, secure, and professional

I've scheduled [DATE/TIME] for a 30-minute walkthrough where I'll show you how to 
make edits. We'll practice together so you feel confident.

What You Need Before Our Call:
- GitHub login credentials (you should have received an invitation email)
- The CONTENT_EDITING_GUIDE.md I've sent

Looking forward to showing you how simple it is!

Best,
[Your Name]
```

---

## 🎉 You're Done!

Once all checkboxes are complete, you've successfully handed off a:
- ✅ Professional website
- ✅ Self-manageable content system
- ✅ Zero-cost hosting solution
- ✅ Fast, modern, secure site
- ✅ Complete independence for the business owner

**Nice work!** You've built something they can actually use and maintain. 🍷

---

## Emergency Rollback (If Something Goes Wrong)

If the business owner makes a change that breaks the site:

1. **GitHub has the history:** Go to the file, click "History", click "..." on any previous version, click "Revert"
2. **Vercel has deployment history:** Dashboard → Deployments → Find working deployment → "Promote to Production"

Both methods take 30 seconds and restore the working site.

