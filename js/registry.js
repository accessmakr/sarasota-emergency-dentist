window.SITE_REGISTRY = {
    version: "2026.04.11-Fixed",
    folders: {
  "Root": {
    "icon": "🦷",
    "files": [
      {
        "name": "404.html",
        "label": "404 • Page Not Found | Sarasota Emergency Dentist"
      },
      {
        "name": "about.html",
        "label": "About Us • Sarasota Emergency Dentist"
      },
      {
        "name": "accessibility.html",
        "label": "Accessibility • Sarasota Emergency Dentist"
      },
      {
        "name": "cod.html",
        "label": "Cosmetic Dentistry in Sarasota, FL • Same-Day Veneers, Whitening & Smile Makeovers with Emergency Aesthetic Repairs"
      },
      {
        "name": "contact.html",
        "label": "Contact Us • Sarasota Emergency Dentist"
      },
      {
        "name": "cookies-policy.html",
        "label": "Cookies Policy • Sarasota Emergency Dentist"
      },
      {
        "name": "disclaimer.html",
        "label": "Disclaimer • Sarasota Emergency Dentist"
      },
      {
        "name": "dmca.html",
        "label": "DMCA / Copyright Policy • Sarasota Emergency Dentist"
      },
      {
        "name": "do-not-sell-my-data.html",
        "label": "Do Not Sell My Data • Sarasota Emergency Dentist"
      },
      {
        "name": "emd.html",
        "label": "Emergency Dentistry in Sarasota, FL • 24/7 Urgent Care with Verified Local Experts"
      },
      {
        "name": "emergency-dental-checklist.html",
        "label": "Comprehensive Dental Checklist by Specialty • Sarasota Emergency Dentist • ADA-Aligned"
      },
      {
        "name": "end.html",
        "label": "Endodontics in Sarasota, FL • Root Canal Specialists &amp; Same-Day Pain Relief with Trusted Local Experts"
      },
      {
        "name": "ged.html",
        "label": "Geriatric Dentistry in Sarasota, FL • Senior &amp; Medically Complex Dental Care"
      },
      {
        "name": "imd.html",
        "label": "Implant Dentistry in Sarasota, FL • Surgical Placement, All-on-4® &amp; Rescue by Verified Specialists"
      },
      {
        "name": "index.html",
        "label": "Emergency Dental Care in Sarasota, FL • Same-Day Relief with Trusted Local Experts"
      },
      {
        "name": "lad.html",
        "label": "Laser Dentistry in Sarasota, FL • Minimally Invasive Procedures with Trusted Local Experts"
      },
      {
        "name": "odo.html",
        "label": "Orthodontics & Dentofacial Orthopedics in Sarasota, FL • Braces, Invisalign & Jaw Alignment Experts"
      },
      {
        "name": "oms.html",
        "label": "Oral & Maxillofacial Surgery in Sarasota, FL • Wisdom Teeth, Trauma & Implant Specialists"
      },
      {
        "name": "pd.html",
        "label": "Pediatric Dentistry in Sarasota, FL • Child-Friendly Emergency &amp; Specialty Care • Same-Day Relief"
      },
      {
        "name": "per.html",
        "label": "Periodontics in Sarasota, FL • Gum Disease Treatment &amp; Periodontal Surgery with Trusted Local Experts"
      },
      {
        "name": "privacy-policy.html",
        "label": "Privacy Policy • Sarasota Emergency Dentist"
      },
      {
        "name": "pro.html",
        "label": "Prosthodontics in Sarasota, FL • Crowns, Bridges, Dentures &amp; Full-Mouth Reconstruction Specialists"
      },
      {
        "name": "pwd.html",
        "label": "Preventive &amp; Wellness Dentistry in Sarasota, FL • Hygiene, Sealants, Fluoride &amp; Education with Trusted Local Experts"
      },
      {
        "name": "red.html",
        "label": "Restorative Dentistry in Sarasota, FL • Crowns, Bridges, Inlays & Full-Mouth Reconstruction with Verified Experts"
      },
      {
        "name": "sda.html",
        "label": "Sedation Dentistry &amp; Anesthesia in Sarasota, FL • Anxiety-Free Care with Trusted Experts"
      },
      {
        "name": "sdssa.html",
        "label": "Sleep Dentistry &amp; Oral Appliance Therapy in Sarasota, FL • Snoring &amp; Sleep Apnea Relief"
      },
      {
        "name": "sitemap.html",
        "label": "HTML Sitemap | Sarasota Emergency Dentist"
      },
      {
        "name": "snd.html",
        "label": "Special Needs Dentistry in Sarasota, FL • Inclusive Care for All Abilities with Verified Local Experts"
      },
      {
        "name": "terms-of-use.html",
        "label": "Terms of Use • Sarasota Emergency Dentist"
      },
      {
        "name": "ttop.html",
        "label": "TMJ / TMD &amp; Orofacial Pain in Sarasota, FL • Jaw Disorders, Headaches &amp; Facial Pain Relief with Trusted Local Experts"
      }
    ]
  },
  "guide": {
    "icon": "📁",
    "files": [
      {
        "name": "guide/emergency-dentist.html",
        "label": "Emergency Dentist Sarasota | 24/7 Walk-In Dental Care Near You"
      },
      {
        "name": "guide/how-long-does-a-dentist-appointment-take.html",
        "label": "How Long Does a Dentist Appointment Take? | Sarasota Emergency Dentist"
      },
      {
        "name": "guide/how-to-get-rid-of-numbness-after-the-dentist-fast.html",
        "label": "How to Get Rid of Numbness After the Dentist Fast | Sarasota Emergency Dentist"
      }
    ]
  },
  "location": {
    "icon": "📁",
    "files": [
      {
        "name": "location/miami-emergency-dentist.html",
        "label": "Emergency Dentist in Miami FL | Same-Day Urgent Dental Care"
      },
      {
        "name": "location/sarasota-emergency-dentist.html",
        "label": "Emergency Dentist in Sarasota FL | Same-Day Urgent Dental Care"
      },
      {
        "name": "location/tampa-emergency-dentist.html",
        "label": "Emergency Dentist in Tampa FL | Same-Day Urgent Dental Care"
      }
    ]
  }
},
    dentists: [],
    getAllPages: function() {
        let all = [];
        Object.keys(this.folders).forEach(f => {
            this.folders[f].files.forEach(file => all.push(file));
        });
        return all;
    }
};

window.SITE_REGISTRY.dentists = [
            {
                id: 3,
                name: "Aspire Dental South Gate Ridge",
                rating: 4.8,
                address: "South Gate Ridge, Sarasota, FL 34233",
                phone: "(941) 555-9900",
                website: "https://www.aspiredentalsarasota.com",
                strengths: "Compassionate urgent care, sedation dentistry",
                summary: "Locals’ go-to for quick, caring emergency visits.",
                categories: []
            },
            {
                id: 4,
                name: "Bayview Dental",
                rating: 4.8,
                address: "3665 Bee Ridge Rd, Ste 108, Sarasota, FL 34233",
                phone: "(941) 953-4288",
                website: "https://bayviewdental.com",
                strengths: "Medicare & insurance accepted for emergencies",
                summary: "Accessible care for seniors and families.",
                categories: []
            },
            {
                id: 5,
                name: "Beneva Dental Care",
                rating: 4.8,
                address: "5917 South Beneva Road, Sarasota, FL 34238",
                phone: "(941) 924-2939",
                website: "https://www.dentistinsarasota.com",
                strengths: "General & emergency care",
                summary: "Full-service practice with same-day availability.",
                categories: []
            },
            {
                id: 6,
                name: "Champion Dental Group",
                rating: 4.7,
                address: "Sarasota, FL 34242",
                phone: "(941) 555-7788",
                website: "https://www.hewettdds.com",
                strengths: "High-volume emergency practice, insurance friendly",
                summary: "Large team ensures quick appointment availability.",
                categories: []
            },
            {
                id: 7,
                name: "Coast Dental Beneva",
                rating: 4.5,
                address: "3466 Clark Rd Suite 410, Sarasota, FL 34231",
                phone: "(941) 927-1705",
                website: "https://www.coastdental.com",
                strengths: "Same-day emergency appointments Monday–Friday",
                summary: "Convenient location with priority emergency scheduling.",
                categories: []
            },
            {
                id: 8,
                name: "Dentistry of Sarasota (Jaworski & Moricz)",
                rating: 4.8,
                address: "3990 Clark Road, Sarasota, FL 34233",
                phone: "(941) 955-7344",
                website: "https://www.dentistryofsarasota.com",
                strengths: "General, cosmetic, emergency",
                summary: "30+ years serving Sarasota with same-day care.",
                categories: []
            },
            {
                id: 9,
                name: "Dentistry on Fruitville",
                rating: 4.6,
                address: "7590 Fruitville Rd #100, Sarasota, FL 34240",
                phone: "(941) 529-0055",
                website: "https://www.dentistryonfruitville.com",
                strengths: "Immediate response, sedation for anxious patients",
                summary: "Expert team ready for any dental emergency.",
                categories: []
            },
            {
                id: 12,
                name: "Dynamic Dental Smiles",
                rating: 4.5,
                address: "Sarasota, FL 34235",
                phone: "(941) 555-6677",
                website: "https://dynamicdentalsmiles.com",
                strengths: "Weekend & evening emergency slots",
                summary: "Flexible hours for working professionals.",
                categories: ["24-hour"]
            },
            {
                id: 13,
                name: "Emergency Dentistry Sarasota",
                rating: 5.0,
                address: "5223 Avenida Navarra, Sarasota, FL 34242 (24/7)",
                phone: "(941) 375-4005",
                website: "https://emergencydentistry.com",
                strengths: "True 24/7 service, state-of-the-art facility",
                summary: "Open 24 hours – the only true round-the-clock option in the area.",
                categories: ["24-hour"]
            },
            {
                id: 14,
                name: "Give Me A Smile Dentistry (Dr. Jerry Chery)",
                rating: 5.0,
                address: "Sarasota, FL (pediatric focus)",
                phone: "(941) 529-0331",
                website: "https://www.givemeasmile.net",
                strengths: "Pediatric emergencies & trauma",
                summary: "Pediatric-focused practice with compassionate care.",
                categories: ["pediatric"]
            },
            {
                id: 16,
                name: "Gulf Gate Dental",
                rating: 4.9,
                address: "3212 Gulf Gate Dr, Sarasota, FL 34231",
                phone: "(941) 921-2122",
                website: "https://www.gulfgatedental.com",
                strengths: "Prompt pain relief, family-friendly emergency care",
                summary: "Fast, compassionate emergency treatment for all ages.",
                categories: ["pediatric"]
            },
            {
                id: 17,
                name: "Hillview Family Dental",
                rating: 4.7,
                address: "1865 Hillview St, Sarasota, FL 34239",
                phone: "(941) 365-4500",
                website: "https://hillviewfamilydental.com",
                strengths: "Emergency care, family & restorative",
                summary: "Full emergency dental services with same-day appointments.",
                categories: []
            },
            {
                id: 18,
                name: "HumbleBees Pediatric Dentistry (Dr. Debbie Grant)",
                rating: 4.9,
                address: "Sarasota, FL (pediatric)",
                phone: "Contact via site",
                website: "https://www.humblebeespediatricdentistry.com",
                strengths: "Pediatric emergencies, nitrous",
                summary: "Board-certified pediatric specialist.",
                categories: ["pediatric"]
            },
            {
                id: 21,
                name: "Lakewood Ranch Oral & Maxillofacial Surgery",
                rating: 4.9,
                address: "Lakewood Ranch / Sarasota, FL",
                phone: "Contact via site",
                website: "https://www.lakewoodranchofs.com",
                strengths: "Same-day emergency extractions & trauma",
                summary: "Oral surgeons offering immediate surgical care.",
                categories: ["oral-surgery"]
            },
            {
                id: 22,
                name: "Lefton Family Dentistry",
                rating: 4.6,
                address: "1515 N Lockwood Ridge Rd, Sarasota, FL 34237",
                phone: "(941) 365-3311",
                website: "http://www.leftondental.com",
                strengths: "Multi-generational care, emergency walk-ins",
                summary: "Long-standing Sarasota family practice.",
                categories: ["pediatric"]
            },
            {
                id: 23,
                name: "Meadows Dental Associates of Sarasota",
                rating: 4.8,
                address: "4987 Ringwood Meadow, Sarasota, FL 34235",
                phone: "(941) 377-3659",
                website: "https://www.meadowsdentalassociates.com",
                strengths: "After-hours emergencies, extractions, infections",
                summary: "Family-owned practice with 24/7 on-call support for Sarasota residents.",
                categories: ["24-hour"]
            },
            {
                id: 24,
                name: "Misch Implant & Aesthetic Dentistry",
                rating: 5.0,
                address: "120 S. Tuttle Ave, Sarasota, FL 34237",
                phone: "(941) 957-6444",
                website: "https://drmisch.com",
                strengths: "Implant emergencies, complex trauma, sedation options",
                summary: "Specialists in surgical emergencies and implant rescue.",
                categories: ["implant"]
            },
            {
                id: 25,
                name: "Modern Smile Design",
                rating: 4.9,
                address: "Sarasota, FL 34231",
                phone: "(941) 555-2211",
                website: "https://modernsmilesdesign.com",
                strengths: "Aesthetic emergency repairs, veneers in emergency",
                summary: "Blends beauty with urgent dental solutions.",
                categories: []
            },
            {
                id: 26,
                name: "Prestige Dental",
                rating: 4.9,
                address: "8520 South Tamiami Trail, Suite #2, Sarasota, FL 34238",
                phone: "(941) 918-1416",
                website: "https://prestigedentalsarasota.com",
                strengths: "Same-day appointments, tooth pain & trauma, cosmetic repair",
                summary: "Top-rated for urgent care and same-day crowns. Highly reviewed for compassion.",
                categories: []
            },
            {
                id: 27,
                name: "Sage Dental of Siesta Row",
                rating: 4.8,
                address: "3800 S. Tamiami Trail, Suite 19, Sarasota, FL 34239",
                phone: "(941) 883-3716",
                website: "https://mysagedental.com/siesta-row/",
                strengths: "General & emergency care",
                summary: "Convenient Siesta Row location with same-day options.",
                categories: []
            },
            {
                id: 28,
                name: "Sarasota Bay Dental",
                rating: 4.7,
                address: "2809 University Pkwy, Sarasota, FL 34243",
                phone: "Contact via Yelp",
                website: "https://www.sarasotabaydental.com/",
                strengths: "General emergency care",
                summary: "Highly reviewed local practice.",
                categories: []
            },
            {
                id: 29,
                name: "Sarasota Complete Dental",
                rating: 4.8,
                address: "1120 S Allendale Ave, Sarasota, FL 34237",
                phone: "Contact via site",
                website: "https://sarasotacompletedental.com/",
                strengths: "Complete emergency services",
                summary: "Full service dental emergency provider.",
                categories: []
            },
            {
                id: 30,
                name: "Sarasota Dental Arts",
                rating: 4.9,
                address: "7162 South Beneva Road, Sarasota, FL 34238",
                phone: "(941) 927-8287",
                website: "https://sarasotadentalarts.com",
                strengths: "Toothaches, abscesses, broken teeth",
                summary: "4.9 Google rating and 400+ reviews for fast pain relief.",
                categories: []
            },
            {
                id: 31,
                name: "Sarasota Family Dental – Dr. Michael Dorociak",
                rating: 4.8,
                address: "3900 Clark Road Suite J5, Sarasota, FL 34233",
                phone: "(941) 924-1100",
                website: "https://sarasotafamilydental.com",
                strengths: "After-hours accessibility, full emergency spectrum",
                summary: "Dedicated emergency dentist serving Sarasota since 2008.",
                categories: ["24-hour"]
            },
            {
                id: 32,
                name: "Sarasota Oral & Implant Surgery (Dr. Scott Middleton)",
                rating: 5.0,
                address: "Bee Ridge Office, Sarasota, FL 34233",
                phone: "(941) 923-0033",
                website: "https://www.sarasotaoms.com",
                strengths: "Oral surgery, wisdom teeth, trauma, implants",
                summary: "Board-certified oral surgeons, same-day emergency extractions.",
                categories: ["oral-surgery"]
            },
            {
                id: 33,
                name: "Sarasota Oral Surgery & Implant Center",
                rating: 4.9,
                address: "1985 Main Street Suite 300, Sarasota, FL 34236",
                phone: "(941) 555-7788",
                website: "https://sarasotaoralsurgery.com",
                strengths: "Oral surgery, implants",
                summary: "Specialized oral surgery and implant emergency care.",
                categories: ["oral-surgery"]
            },
            {
                id: 34,
                name: "Sarasota Pediatric Dentistry",
                rating: 5.0,
                address: "Sarasota, FL (pediatric)",
                phone: "(941) 529-0345",
                website: "https://sarasotakidsdentistry.com",
                strengths: "Pediatric emergencies, sedation",
                summary: "Board-certified pediatric care for infants to teens.",
                categories: ["pediatric"]
            },
            {
                id: 35,
                name: "Schroeter Dental",
                rating: 4.7,
                address: "Sarasota, FL",
                phone: "Contact via Yelp",
                website: "https://www.schroeterdental.com/",
                strengths: "Emergency general care",
                summary: "Highly reviewed emergency provider.",
                categories: []
            },
            {
                id: 36,
                name: "Si McAninch, DDS, PA",
                rating: 4.8,
                address: "2711 S Tamiami Trail, Sarasota, FL 34239 (pediatric)",
                phone: "Contact via site",
                website: "https://www.drmcaninch.com",
                strengths: "Pediatric & family emergency",
                summary: "Gentle pediatric care since 2008.",
                categories: ["pediatric"]
            },
            {
                id: 37,
                name: "Simply Smiles Sarasota",
                rating: 4.9,
                address: "2750 Stickney Point Rd, Ste 107, Sarasota, FL 34231",
                phone: "(941) 248-0754",
                website: "https://www.simplysmilessarasota.com/",
                strengths: "Emergency, wellness, family",
                summary: "Top-rated general & emergency practice.",
                categories: []
            },
            {
                id: 38,
                name: "Smile Sarasota (Adam N. Still, DMD)",
                rating: 4.8,
                address: "2389 Ringling Blvd., Suite C, Sarasota, FL 34237",
                phone: "(941) 957-3311",
                website: "https://smilesarasota.com",
                strengths: "General & cosmetic emergency",
                summary: "Trusted local practice for urgent care.",
                categories: []
            },
            {
                id: 39,
                name: "SmileWorks Kids Dentistry",
                rating: 5.0,
                address: "Sarasota, FL (pediatric)",
                phone: "(941) 953-2111",
                website: "https://www.smileworkskids.com",
                strengths: "Pediatric emergencies & sedation",
                summary: "Fun, board-certified pediatric team.",
                categories: ["pediatric"]
            },
            {
                id: 40,
                name: "SRQ Dental",
                rating: 4.9,
                address: "Sarasota, FL 34239",
                phone: "(941) 555-3344",
                website: "https://srqfamilydental.com",
                strengths: "Modern technology, same-day root canals",
                summary: "Newer practice with outstanding emergency feedback.",
                categories: []
            },
            {
                id: 41,
                name: "SRQ Smile (Bowles & Karow)",
                rating: 4.9,
                address: "5677 S Beneva Rd, Sarasota, FL 34233",
                phone: "(941) 923-3545",
                website: "https://srqsmile.com",
                strengths: "Family dentistry, emergency, implants",
                summary: "700+ five-star reviews, same-day emergency slots.",
                categories: ["pediatric"]
            },
            {
                id: 42,
                name: "Strickland Family Dentistry",
                rating: 4.7,
                address: "South Sarasota, FL",
                phone: "Contact via site",
                website: "https://www.stricklanddentalsarasota.com",
                strengths: "Family emergency care",
                summary: "South Sarasota family dentistry with emergency services.",
                categories: []
            },
            {
                id: 43,
                name: "University Parkway Dental",
                rating: 4.6,
                address: "3315 University Pkwy, Unit 103, Sarasota, FL 34243",
                phone: "(941) 822-8165",
                website: "https://universityparkwaydental.com",
                strengths: "Oral trauma & after-hours",
                summary: "Emergency oral trauma specialists.",
                categories: []
            },
            {
                id: 44,
                name: "Vital Dental Sarasota",
                rating: 4.8,
                address: "Sarasota, FL 34233",
                phone: "(941) 371-2022",
                website: "https://www.vitaldentalsarasota.com",
                strengths: "General emergency care",
                summary: "Modern practice with same-day availability.",
                categories: []
            },
            {
                id: 45,
                name: "Waterside Dental Sarasota",
                rating: 4.8,
                address: "1058 N Tamiami Trail, Sarasota, FL 34236",
                phone: "(941) 870-3322",
                website: "https://watersidedentalsarasota.com",
                strengths: "Same-day emergencies, cosmetic & implant rescue",
                summary: "$59 emergency exam, walk-ins welcome, 30+ years experience.",
                categories: ["24-hour"]
            },
            {
                id: 46,
                name: "Z Family Dental",
                rating: 5.0,
                address: "2171 Siesta Dr, Sarasota, FL 34239 (pediatric)",
                phone: "(941) 899-0260",
                website: "https://zfamilydental.com",
                strengths: "Family-focused emergency care, pediatric specialist on staff",
                summary: "5-star Yelp reviews for kindness and speed.",
                categories: ["pediatric"]
            },
            {
                id: 47,
                name: "941 Dental Studio",
                rating: 4.8,
                address: "Sarasota, FL",
                phone: "Phone via Yelp",
                website: "https://www.941dentalstudio.com/",
                strengths: "General & emergency dentistry",
                summary: "Verified local studio for urgent care.",
                categories: []
            },
            {
                id: 48,
                name: "Go2Dental Sarasota",
                rating: 4.7,
                address: "Sarasota, FL",
                phone: "Phone via Yelp",
                website: "https://www.go2dental.com/",
                strengths: "Emergency dental services",
                summary: "Quick access emergency provider.",
                categories: []
            },
            {
                id: 49,
                name: "Sarasota Endodontic Solutions (Mitchell R Edlund, DDS MS)",
                rating: 5.0,
                address: "Sarasota, FL",
                phone: "Contact via Yelp",
                website: "https://sarasotaendodonticsolutions.com/",
                strengths: "Emergency root canals",
                summary: "Top-rated endodontics for urgent pain relief.",
                categories: []
            },
            {
                id: 50,
                name: "Precious Dental",
                rating: 4.8,
                address: "Sarasota, FL",
                phone: "Phone via Yelp",
                website: "https://www.preciousdentalfl.com/",
                strengths: "Emergency focus",
                summary: "Emergency dental provider.",
                categories: ["24-hour"]
            },
            {
                id: 51,
                name: "Sage Dental additional location",
                rating: 4.8,
                address: "Sarasota, FL",
                phone: "(941) 444-5366",
                website: "https://mysagedental.com",
                strengths: "General & emergency care",
                summary: "Additional Sage Dental location for same-day service.",
                categories: []
            }
        ];