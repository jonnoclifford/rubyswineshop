# Visual Testing Checklist

## Desktop Testing (Chrome/Firefox/Safari)

### Header (scroll down to see sticky header)
- [ ] Navigation links are uppercase with letter spacing
- [ ] Status pill appears between nav and button
  - Shows "Open now" with green dot OR "Closed" with gray dot
  - Updates message with next opening time
- [ ] "Visit Us" button has magnetic effect on hover
- [ ] Header background becomes semi-transparent on scroll

### Hero Section
- [ ] Logo has subtle parallax effect when scrolling
- [ ] Scroll indicator animates at bottom
- [ ] Film grain texture visible but very subtle

### About Section
- [ ] Content displays properly
- [ ] Updated copy about Ruby (the dog) appears

### Menu Section
- [ ] Section has terracotta background
- [ ] Menu content appears in cream-colored card
- [ ] Card has rounded corners and shadow
- [ ] Category headings are uppercase
- [ ] Wine cards display properly within the card

### Hungry Section
- [ ] Updated partnership copy displays

### Interactions
- [ ] All scroll animations work smoothly
- [ ] No layout shift or jumping
- [ ] Smooth scrolling between sections

---

## Mobile Testing (iPhone/Android)

### Header
- [ ] Mobile menu works properly
- [ ] Navigation links styled correctly
- [ ] Magnetic effect disabled (button works normally)

### Hero
- [ ] Logo centered on mobile
- [ ] Parallax disabled on mobile
- [ ] No performance issues

### Menu
- [ ] Paper card responsive on mobile
- [ ] Content readable and well-spaced
- [ ] Wine cards stack vertically

### General
- [ ] Film grain visible but not distracting
- [ ] Touch interactions work smoothly
- [ ] No horizontal scroll

---

## Accessibility Testing

### Reduced Motion
1. Enable "Reduce Motion" in system preferences
2. Reload page
3. Verify:
   - [ ] Film grain removed
   - [ ] Parallax disabled
   - [ ] Animations still functional but instant

### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Modal can be closed with Escape

### Screen Reader
- [ ] Status pill announces changes
- [ ] All images have alt text
- [ ] Headings in correct order

---

## Performance Testing

### Lighthouse Audit
Run: `npm run build && npm start` then audit in Chrome DevTools

Target scores:
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

### Network Throttling
Test on "Fast 3G" throttling:
- [ ] Page loads within 3 seconds
- [ ] Progressive loading works
- [ ] No blocking resources

---

## Business Logic Testing

### Status Pill Accuracy
Test at different times to verify:
- [ ] Shows "Open" during business hours
- [ ] Shows "Closed" outside business hours
- [ ] Correctly shows next opening time
- [ ] Updates every 60 seconds

Current hours (AEST/AEDT):
- Mon/Tue: Closed
- Wed: 4-9 PM
- Thu: 4-10 PM
- Fri: 4-11 PM
- Sat: 2-11 PM
- Sun: 2-9 PM

---

## Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Content Verification

- [ ] Address shows "3/297 Sandgate Road"
- [ ] Wednesday hours show 4-9 PM (not 10 PM)
- [ ] Hero mentions "in the heart of Albion"
- [ ] About section has enhanced Ruby description
- [ ] SEO title: "Ruby's Wine Bar & Shop | Albion, Brisbane"

---

## Notes

Document any issues found:

1. 
2. 
3. 

