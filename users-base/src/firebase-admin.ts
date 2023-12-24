// "use server";

import { cert, getApp, initializeApp } from "firebase-admin/app";
// import serviceAccount from "../src/assets/key/key.json" assert { type: "json" };

const getAppAdmin = () => {
  try {
    return getApp();
  } catch {
    return initializeApp({
      credential: cert({
        projectId: "users-base-e4174",
        clientEmail:
          "firebase-adminsdk-7t8ui@users-base-e4174.iam.gserviceaccount.com",
        privateKey:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGDctcQdynorOa\n6+MibVREduWeN8IPMppYFohuFGbngqQthSNs6eXiclTVB9a+hs8215F9tGX6m1/c\nMoOA1q7f80b85rrsNNzZLSrSIOTPUMxYcFNiDUeOnqXQf5YXjbgOkHDjiAZhdFUC\nMpfaanI3lDvoav3KRedi40bpBUAC62lX7J0KwOJHNvbOVyDPZx1Y9FyUs1q4m97/\n6glBQovszrFvvadoQvfgFp5k8ZtTf0DtwMwnCl4AC4zLS+bA1y1vGwAKIRgT3UGa\n3MujRELsWbAuesKrzLF6GqvSSkr8rBW9jN15nMB40p39Xye4vDPY9GlkIIajKawt\ngCdQ/WpxAgMBAAECggEAAdskPOeYb/ERj3ycGCOqe//ElBsqqZDMVdH+56Uvolty\nOsOk0C2loV3NQg0nlokrN5+FNgaIRB/LogPOgVkXB3M/XDm0pmeyas3xDkoPoDUT\nd9Ve+qwW2mp4hv/YbL0VF1HZilBT2vryRv8pYXseOeYc5PHdEgBeCZUJV5Vcgwp5\n1ZvHHzTAS04aoe3rPRMJGGC5TybTJ0nyzQImPCkWJPqLif4zXf0sRIXyTi1eqZuP\nroZpvAR39uHPAV/x0qoAqtbd2ylnvONYTuADfUj9T+jVzB1bxpJ9IwKQimuUjA8Q\ncEO9JO4QSicRUiBXkjeMruPlZ/2magC8gSHznucBHwKBgQDxximU9xr/xEH0pT/i\nuvxEijkpfRyy2dTY/vIbtgBsEWtCRx0lKHax7l9a7W6Z7CI+s/RglWhY4+bkYdeT\nhwP2zxu6HdS6JaZGUiodYJF2fDDu2XkXyn5fd2f2u+fryIXOFLPOecXIqArlqpyi\nwPHXAdSfck33dyfpu1aCoRoJxwKBgQDRtRNh+o1uVTfdiRP6EhR+UrtUfXJDyOvO\nPJhfn/ctYGpfuGayqSsiA/eGqbxQ9Q9bzqKPYBXEE/iFdgypZNSsThOvgcKUImwd\nTW1EMWizv6RTul507h4FPuoxhBkGORrjRq5fPL+akKYJqYfNv61dj2WxHwZJAxhn\nbJ+Rku+qBwKBgQCffer2YyCDcxNTcSO4zUMXb9uPnAIvlfWMhHpwf1q976vDGCiI\n162daTOsRw78KULZ/FqM0GL6qLUrGcRdhOa/jRasa3tmpOmQYCl6Ibcz429gUURJ\nxoIhNiL2KDUxXKGwNgX7gmdQHFK7+RXFY+TlwkZiPMRkKE3DKZtDJ0WHBwKBgCXA\naUrcJhXUtYfmI3iDRLkw/5RIOQfG5dxswCmGzKKYls3AjoxfM+qduDO/3qzcUPWA\nD3esHn778WNlSwY7pqWWMKkJvROZ1si3pZH/KxAg0d5Y0KRQMYtUNijP1Qlvwk1j\n7gQrFXsnyxw2LsJ1XSpYpD/si98c9Ym43kkAoLCFAoGAKkBJRGptJvbbG98SL0LB\nmCW8Cy/YAkMhMoq1xl+QdMPuRDl90RjKJEaky6Bl7oRTofNfgYjHzJofM1+nVxQ9\nlOMUkLTXzMB6mZpgprzdcKBFdCzPaHon/6fDUzOj+940XUlBV9re/gbWJmBMA3pZ\nquAHGfQ3Wj/BNae7z0tJ9CA=\n-----END PRIVATE KEY-----\n",
      }),
      databaseURL:
        "https://users-base-e4174-default-rtdb.europe-west1.firebasedatabase.app",
    });
  }
};

export const app = getAppAdmin();