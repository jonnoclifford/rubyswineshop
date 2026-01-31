import { SiteConfig } from '@/types/content';

export const siteConfig: SiteConfig = {
  business: {
    name: "Ruby's Wine Shop",
    tagline: "Natural wines & good vibes in Albion",
    address: {
      street: "3/297 Sandgate Road",
      suburb: "Albion",
      state: "QLD",
      postcode: "4010",
      country: "Australia",
    },
    contact: {
      phone: "+61 7 1234 5678",
      email: "hello@rubyswineshop.com.au",
      instagram: "@rubyswineshop",
    },
    hours: {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "4:00 PM - 9:00 PM",
      Thursday: "4:00 PM - 10:00 PM",
      Friday: "4:00 PM - 11:00 PM",
      Saturday: "2:00 PM - 11:00 PM",
      Sunday: "2:00 PM - 9:00 PM",
    },
    coordinates: {
      lat: -27.4305,
      lng: 153.0435,
    },
  },

  hero: {
    headline: "Natural wines meet neighbourhood charm",
    subheadline: "A cosy wine bar in the heart of Albion celebrating low-intervention wines, local snacks, and spontaneous evenings",
    ctas: {
      primary: {
        text: "Visit Us",
        action: "modal",
      },
      secondary: {
        text: "Explore Menu",
        action: "scroll",
        target: "#menu",
      },
    },
    images: {
      desktop: "/images/hero-desktop.jpg",
      mobile: "/images/hero-mobile.jpg",
      alt: "Ruby's Wine Bar interior with warm lighting and wine bottles",
    },
  },

  about: {
    heading: "Meet Ruby",
    story: [
      "Ruby's is a sliver of Swiss wine culture in Albion. We are an intimate neighborhood bar and shop focused on natural and low-intervention wines. We're here for spontaneous visits, good conversations, and letting the evening unfold however it wants to.",
      "The bar is named after our founder's border collie, Ruby. She is a perpetually optimistic pup who greets every visitor like an old friend and firmly believes the world revolves around her. She is usually right. We try to match her warm, welcoming energy.",
      "With over 100 bottles on the shelf and 6 to 8 rotating daily pours, including our own house-made Pet Nat, there is always something new to try. We keep things simple with 20 seats and a walk-ins only policy. Bring your own snacks or scan a QR code to have modern Turkish meze from our neighbors at Olive Thyme delivered straight to your stool.",
    ],
    image: {
      src: "/images/ruby-portrait.jpg",
      alt: "Portrait of Ruby, founder of Ruby's Wine Bar",
    },
  },

  menu: {
    heading: "What We're Pouring",
    byTheGlass: {
      heading: "By the Glass",
      items: [
        {
          name: "Skin Contact Pinot Gris",
          producer: "Lucy Margaux",
          region: "Adelaide Hills, SA",
          price: "$16",
          description: "Cloudy amber with dried apricot and chamomile notes",
        },
        {
          name: "Pét-Nat Chardonnay",
          producer: "Commune of Buttons",
          region: "Basket Range, SA",
          price: "$14",
          description: "Lightly sparkling, crisp green apple and lemon zest",
        },
        {
          name: "Gamay Noir",
          producer: "Gentle Folk",
          region: "Adelaide Hills, SA",
          price: "$15",
          description: "Juicy cherry, light body, minimal tannins",
        },
        {
          name: "Sangiovese",
          producer: "Koltz",
          region: "Adelaide Hills, SA",
          price: "$17",
          description: "Bright red fruit with subtle earth and spice",
        },
      ],
    },
    byTheBottle: {
      heading: "By the Bottle",
      categories: [
        {
          name: "Sparkling & Pét-Nat",
          items: [
            {
              name: "Pét-Nat Rosé",
              producer: "BK Wines",
              region: "Adelaide Hills, SA",
              price: "$65",
              description: "Wild strawberry, delicate bubbles, bone dry",
            },
            {
              name: "Ancestral Blanc",
              producer: "Minimum Wines",
              region: "Basket Range, SA",
              price: "$70",
              description: "Cloudy, funky, alive-perfect for adventurous palates",
            },
          ],
        },
        {
          name: "White & Orange",
          items: [
            {
              name: "Skin Contact Savagnin",
              producer: "Momento Mori",
              region: "Adelaide Hills, SA",
              price: "$75",
              description: "Textural, nutty, with grip and length",
            },
            {
              name: "Fiano",
              producer: "Gentle Folk",
              region: "Adelaide Hills, SA",
              price: "$68",
              description: "Bright citrus with floral aromatics",
            },
          ],
        },
        {
          name: "Red",
          items: [
            {
              name: "Pinot Noir",
              producer: "Jauma",
              region: "McLaren Vale, SA",
              price: "$80",
              description: "Elegant, savoury, whole-bunch fermentation",
            },
            {
              name: "Syrah",
              producer: "Ochota Barrels",
              region: "Adelaide Hills, SA",
              price: "$95",
              description: "Peppery, floral, medium-bodied with finesse",
            },
          ],
        },
      ],
    },
    snacks: {
      heading: "Snacks",
      items: [
        {
          name: "House Marinated Olives",
          price: "$8",
          description: "Local olives with citrus and herbs",
        },
        {
          name: "Sourdough & Cultured Butter",
          price: "$10",
          description: "Fresh daily from The Bread Social",
        },
        {
          name: "Charcuterie Board",
          price: "$28",
          description: "Rotating selection of cured meats and pickles",
        },
        {
          name: "Cheese Board",
          price: "$32",
          description: "Three Australian cheeses with house-made quince paste",
        },
      ],
    },
  },

  hungry: {
    heading: "Feeling Hungry?",
    description: [
      "We've partnered with Olive Thyme next door to bring you seriously good food without leaving your seat.",
      "Browse their menu of share plates, wood-fired pizzas, and Mediterranean-inspired dishes—all designed to pair beautifully with natural wine.",
      "Order at the bar and we'll coordinate delivery to your table. Easy.",
    ],
    partnerName: "Olive Thyme",
    partnerLink: "https://www.olivethyme.com.au",
  },

  whatsOn: {
    heading: "What's On",
    events: [
      {
        title: "Sunday Sessions",
        date: "Every Sunday",
        time: "2:00 PM - 9:00 PM",
        description: "Live acoustic sets from local musicians. No cover charge, just good tunes and great wine.",
        recurring: true,
      },
      {
        title: "Winemaker Tastings",
        date: "First Thursday of the month",
        time: "6:00 PM - 8:00 PM",
        description: "Meet the makers behind your favourite bottles. Guided tastings with natural winemakers from around Australia.",
        recurring: true,
      },
      {
        title: "Natural Wine 101",
        date: "Last Saturday of the month",
        time: "3:00 PM - 5:00 PM",
        description: "New to natural wine? Join us for a relaxed introduction to low-intervention winemaking, funky fermentation, and what makes these wines special.",
        recurring: true,
      },
    ],
  },

  faq: {
    heading: "Good to Know",
    items: [
      {
        question: "Do you take bookings?",
        answer: "Nope! We're walk-in only. We believe the best nights are unplanned, and we love the energy of a spontaneous visit. Come as you are-we'll find you a spot.",
      },
      {
        question: "What if it's busy?",
        answer: "If we're full, grab a drink and we'll text you when a table opens up. There's a great beer garden next door at The Boundary, or you can wander Albion's excellent coffee and retail strip.",
      },
      {
        question: "Are you dog-friendly?",
        answer: "Absolutely! Well-behaved pups are welcome in our outdoor area. We'll even bring them a water bowl.",
      },
      {
        question: "Can I buy wine to take home?",
        answer: "Yes! Most bottles on our list are available for takeaway at a small discount. Ask your bartender for details.",
      },
      {
        question: "Do you do events or private hire?",
        answer: "We can accommodate small groups (up to 20) with advance notice. For private hire enquiries, email us at hello@rubyswinebar.com.au.",
      },
      {
        question: "Where can I park?",
        answer: "There's street parking on Sandgate Road and surrounding streets. It's free after 7 PM on weekdays and all day on weekends. Albion train station is a 5-minute walk.",
      },
    ],
  },

  walkInModal: {
    heading: "No Bookings, Just Good Vibes",
    message: [
      "We're proudly walk-in only. Why? Because we believe the best evenings are spontaneous, and the best conversations happen when you let the night unfold naturally.",
      "Just show up and we'll take care of the rest. If we're full, we'll text you when a spot opens up-grab a drink nearby and we'll see you soon.",
    ],
    hoursHeading: "When to Find Us",
    ctaText: "Got it!",
  },

  findUs: {
    heading: "Find Us",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.123!2d153.0435!3d-27.4305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI1JzQ5LjgiUyAxNTPCsDAyJzM2LjYiRQ!5e0!3m2!1sen!2sau!4v1234567890",
    contactHeading: "Get in Touch",
  },

  seo: {
    title: "Ruby's Wine Bar & Shop | Albion, Brisbane",
    description: "A cosy Albion wine bar celebrating natural wines, local snacks, and spontaneous evenings. Walk-in only, dog-friendly, and proudly independent.",
    keywords: [
      "wine bar Brisbane",
      "natural wine Albion",
      "wine bar Albion",
      "natural wine Brisbane",
      "dog-friendly wine bar Brisbane",
      "walk-in wine bar",
      "low intervention wine",
      "Australian natural wine",
      "wine tasting Brisbane",
      "Sandgate Road wine bar",
      "Albion wine bar",
    ],
    ogImage: "/images/og-image.jpg",
  },
};
