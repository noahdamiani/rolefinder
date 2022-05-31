# rolefinder

Configure the tool by editing the config located at app/config:

```
integrations: [
  Integration.Indeed,
  Integration.LinkedIn,
  Integration.ZipRecruiter,
],
keywords: ["Lead UI Engineer", "Staff UI Engineer", "Engineering Manager"],
locations: ["remote", "Chicago"],
pay: 200000,
output: {
  name: "dump",
  formats: {
    csv: true,
    json: true,
  },
}
```

Run `yarn start` or `yarn build && node build/main`:

Reports will be generated in the root in csv/json format depending on configuration.

```

    {
        "source": "indeed",
        "role": "Engineering Manager, Infrastructure (Healthcare Startup)",
        "salary": "$200,000 - $250,000 a year",
        "description": "You will partner with Engineering Management and your stakeholder engineering teams to improve engineering ergonomics and to raise our technical quality bar in…",
        "url": "https://www.indeed.com/rc/clk?jk=b69ed861fa78e414&fccid=09e02654c2f26bbd&vjs=3",
        "company": "Recruiting From Scratch",
        "location": "Remote in Chicago, IL 60601+2 locations"
    },
    {
        "source": "indeed",
        "role": "Senior Engineering Manager at Rent-to-Own Startup",
        "salary": "$180,000 - $220,000 a year",
        "description": "Partnering with peer engineering managers and CTO to maintain a collaborative engineering and product organization.\n You will report to the co-founder/CTO.",
        "url": "https://www.indeed.com/rc/clk?jk=7305ded4c8045e17&fccid=09e02654c2f26bbd&vjs=3",
        "company": "Recruiting From Scratch",
        "location": "Remote in Evanston, IL 60208+2 locations"
    },
    {
        "source": "indeed",
        "role": "Manager, Security Software Engineering - Application Securit...",
        "salary": "$164,000 - $237,000 a year",
        "description": "Ability to manage key customer relationships, including with senior managers and Directors.\n You understand that the best managers serve their teams, removing…",
        "url": "https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0CiRNM7CVr8YueLFKlzwbFWI0o7IjV438l4sVrvKZ0flpURU_mqoI8E88RAJZx1_nSfzWqP-fNI7NNfgg__0OfIWMZPdkR-sd4GidQgA8CBbJubKdClsyN3yyU8Spq6F5sM2a4K3JOKfVzs4f2YS-OL8RFLN50cxUjMXoe4B5sVG1ZJK34dEQG_VP-frojvQ9fTH1eS6EpfzgXFtz8LVdgKdiE-YHAvVJhgTJN85oKie4Yxs7OXgWmmCjStOP1wT7pcctYdVjavDvdQP3R4_LKFV7K1SBvKFZvwDyoLZ1enx4ImeepK6s1yknJacg36k_5Lk24ReGHLCYCN5s6H5SCD5MWB_O1sFBjFBKmOohH8T23tXBJ06MTQOXb4_5QkTKj_YNiT4eruz-wirHfA-2NWv4fqy0N5uEu8KWVzECDgEPSTLsQPWe7ozmi46jY38JCf2ninrY91FoQKHkuBgnX30R5VXQjmajtGEaQR-SotPXAAS9I7z-CzhYGYz1CIk0-JeSGeXVKSzilFreZ0bzfgaey-_lOTSFU=&p=5&fvj=0&vjs=3",
        "company": "Indeed",
        "location": "Remote in United States"
    },
    {
        "source": "linkedin",
        "role": "Software Engineer",
        "salary": "$200,000 - $250,000",
        "url": "https://www.linkedin.com",
        "company": "Outerbounds",
        "location": "San Francisco, CA"
    },

```
