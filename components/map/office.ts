// Ofis joylashuvi (U-Enter, Shahrisabz ko'chasi 25) — avvalgi Yandex xaritasidagi belgi koordinatalari
export const OFFICE = {
  name: "Onlayn Hamshira",
  lat: 41.305705,
  lng: 69.28161,
};

export const directionsUrl = {
  yandex: `https://yandex.uz/maps/?rtext=~${OFFICE.lat},${OFFICE.lng}&rtt=auto`,
  google: `https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`,
};
