import { gql } from "@apollo/client";

export const HERO_QUERY = gql`
  query Hero {
    hero {
      data {
        attributes {
          titlu
          descriere
          backgroundVideo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

// query ProductsCards($name: String!) {
// produses(filters: { category: { NumeCategorie: { eq: $name } } }) {
export const PRODUCTS_CARDS_QUERY = gql`
  query ProductsCards(
    $pageIdx: Int
    $size: Int
    $catId: [ID]
    $sort: [String]
    $brandId: [ID]
    $putereId: [ID]
  ) {
    produses(
      pagination: { page: $pageIdx, pageSize: $size }
      filters: {
        category: { id: { in: $catId } }
        brand: { id: { in: $brandId } }
        putere: { id: { in: $putereId } }
      }

      sort: $sort
    ) {
      data {
        id
        attributes {
          createdAt
          slug
          Nume
          Pret

          category {
            data {
              attributes {
                NumeCategorie
              }
            }
          }
          PretVechi
          PozeProdus {
            data {
              attributes {
                url
              }
            }
          }
          review_produses {
            data {
              attributes {
                NumeUtilizator
                EmailUtilizator
                Rating
                Recenzie
                createdAt
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;
export const SIMILAR_PRODUCTS_CARDS_QUERY = gql`
  query ProductsCards($catId: [ID], $slug: String!) {
    produses(
      filters: { category: { id: { in: $catId } }, slug: { ne: $slug } }
    ) {
      data {
        id
        attributes {
          createdAt
          slug
          Nume
          Pret
          category {
            data {
              attributes {
                NumeCategorie
              }
            }
          }
          PretVechi
          PozeProdus {
            data {
              attributes {
                url
              }
            }
          }
          review_produses {
            data {
              attributes {
                NumeUtilizator
                EmailUtilizator
                Rating
                Recenzie
                createdAt
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const GET_ALL_SLUGS = gql`
  query {
    produses {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_NAME = gql`
  query ($slug: String) {
    produses(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          brand {
            data {
              attributes {
                Brand
              }
            }
          }
          seo {
            metaTitle
            metaDescription
            metaImage {
              data {
                attributes {
                  url
                }
              }
            }
            keywords
            metaRobots
            structuredData
            metaViewport
          }
          category {
            data {
              attributes {
                NumeCategorie
              }
            }
          }
          Nume
          Pret
          slug
          PretVechi
          ScurtaDescriere
          Descriere
          Specificatii
          CodProdus
          review_produses {
            data {
              attributes {
                NumeUtilizator
                EmailUtilizator
                Rating
                Recenzie
                createdAt
              }
            }
          }
          PozeProdus {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PROD_REVIEWS_QUERY = gql`
  query {
    reviewProduse {
      data {
        attributes {
          NumeUtilizator
          EmailUtilizator
          Review
          produs {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_REVIEWS = gql`
  query {
    reviewProduses {
      data {
        attributes {
          produs
          NumeUtilizator
          EmailUtilizator
          Rating
          Recenzie
          createdAt
        }
      }
    }
  }
`;

// Mutation
export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($data: ReviewProduseInput!) {
    createReviewProduse(data: $data) {
      data {
        attributes {
          produse {
            data {
              id
            }
          }
          NumeUtilizator
          EmailUtilizator
          Rating
          Recenzie
          publishedAt
        }
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: ComenziInput!) {
    createComenzi(data: $data) {
      data {
        attributes {
          produse
        }
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query {
    categories {
      data {
        id
        attributes {
          NumeCategorie
          produses {
            data {
              attributes {
                brand {
                  data {
                    attributes {
                      Brand
                      produses {
                        data {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_BRANDS = gql`
  query {
    brands {
      data {
        attributes {
          Brand
          produses {
            data {
              id
            }
          }
        }

        id
      }
    }
  }
`;

export const QUERY_POWERS = gql`
  query {
    puteres {
      data {
        id
        attributes {
          Putere
          produses {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const QUERY_HERO = gql`
  query {
    hero {
      data {
        attributes {
          titlu
          descriere
          backgroundVideo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_SIMPLE_SECTION_HP = gql`
  query {
    simpleSectionHome {
      data {
        attributes {
          titlu
          Descriere
          ImagineMare {
            data {
              attributes {
                url
              }
            }
          }
          ImagineMica {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PARTENERS = gql`
  query {
    parteneri {
      data {
        attributes {
          parteneri {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query {
    reviews {
      data {
        attributes {
          NumeClient
          DataRecenzie
          Rating
          DescriereRecenzie
          avatar {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_QA = gql`
  query {
    intrebaris {
      data {
        attributes {
          intrebare
          raspuns
        }
      }
    }
  }
`;

export const QUERY_QA_SECTION = gql`
  query {
    sectiuneIntrebari {
      data {
        attributes {
          textImagine
          Imagine {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ABOUT_S_ONE = gql`
  query {
    aboutSOne {
      data {
        attributes {
          title
          description
          panelsNumber
          projectsNumber
          ImageOne {
            data {
              attributes {
                url
              }
            }
          }
          ImageTwo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ABOUT_S_TWO = gql`
  query {
    aboutSTwo {
      data {
        attributes {
          title
          descriptionOne
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ABOUT_S_THREE = gql`
  query {
    aboutSThree {
      data {
        attributes {
          titlu
          descriptionOne
          descriptionTwo
        }
      }
    }
  }
`;

export const QUERY_ABOUT_S_FOUR = gql`
  query {
    aboutSFour {
      data {
        attributes {
          title
          description
          imageOne {
            data {
              attributes {
                url
              }
            }
          }
          imageTwo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_SERVICES_MENU = gql`
  query {
    serviciis {
      data {
        attributes {
          title
          slug
        }
      }
    }
  }
`;

export const QUERY_SERVICES = gql`
  query ($slug: String) {
    serviciis(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          title
          slug
          descriptionOne
          descriptionTwo
          descriptionThree
          ImageOne {
            data {
              attributes {
                url
              }
            }
          }
          ImageTwo {
            data {
              attributes {
                url
              }
            }
          }
          ImageThree {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_CONTACT = gql`
  query {
    contactInfo {
      data {
        attributes {
          Email
          PhoneNrOne
          PhoneNrTwo
          Location
        }
      }
    }
  }
`;

export const QUERY_TERMENI = gql`
  query {
    termeniSiConditii {
      data {
        attributes {
          Termeni
        }
      }
    }
  }
`;
export const QUERY_POLITICA = gql`
  query {
    politicaCookie {
      data {
        attributes {
          Politica
        }
      }
    }
  }
`;
export const QUERY_RETUR = gql`
  query {
    politicaRetur {
      data {
        attributes {
          Politica
        }
      }
    }
  }
`;
