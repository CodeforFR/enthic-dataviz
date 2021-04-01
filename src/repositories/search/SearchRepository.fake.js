const stubResponse = {
  "@context": "http://www.w3.org/ns/hydra/context.jsonld",
  "@id":
    "https://api.enthic.fr/company/search/page?page=1&per_page=30&probe=apple",
  "@type": "Collection",
  totalItems: 2,
  view: {
    "@id": "/company/search/page?page=1&per_page=30&probe=apple",
    "@type": "PartialCollectionView",
    first: "/company/search/page?page=1&per_page=30&probe=apple",
    last: "/company/search/page?page=2&per_page=30&probe=apple",
    previous: "",
    next: "/company/search/page?page=2&per_page=30&probe=apple",
  },
  member: [
    {
      siren: {
        value: "302640008",
        description: "SIREN",
      },
      denomination: {
        value: "RAUTUREAU - APPLE SHOES",
        description: "Dénomination",
      },
      ape: {
        value: "Fabrication de chaussures",
        description: "Code Activité Principale Exercée (NAF)",
      },
      postal_code: {
        value: "85130",
        description: "Code Postal",
      },
      town: {
        value: "LA GAUBRETIERE",
        description: "Commune",
      },
      devise: {
        value: "Euro",
        description: "Devise",
      },
    },
    {
      siren: {
        value: "322120916",
        description: "SIREN",
      },
      denomination: {
        value: "APPLE FRANCE",
        description: "Dénomination",
      },
      ape: {
        value: "Activités des agences de publicité",
        description: "Code Activité Principale Exercée (NAF)",
      },
      postal_code: {
        value: "75116",
        description: "Code Postal",
      },
      town: {
        value: "PARIS",
        description: "Commune",
      },
      devise: {
        value: "Euro",
        description: "Devise",
      },
    },
  ],
};

const returnStubAfterFewSeconds = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(stubResponse);
    }, 2000)
  );
};

export default {
  searchCompaniesFromText: () => returnStubAfterFewSeconds(),
  searchCompaniesFromUrl: () => returnStubAfterFewSeconds(),
};
