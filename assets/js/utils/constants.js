const DEV = true;

const hostname = DEV ? `http://${"localhost"}` : "https://visa.giitafrica.com";

const client_domain = DEV ? `${hostname}:3000` : `https://visa.giitafrica.com`;

const domain = DEV ? `${hostname}:1450` : `https://visapi.giitafrica.com`;

const month_index = new Object({
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
});

const dow_index = new Object({
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday",
});

const dow_index_inverse = new Object({
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
});

const organisation_name = "Calculator Master";

export {
  domain,
  hostname,
  client_domain,
  month_index,
  organisation_name,
  DEV,
  dow_index,
  dow_index_inverse,
};
