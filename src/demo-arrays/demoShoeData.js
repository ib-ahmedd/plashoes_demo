const demoShoeData = [
  {
    id: 1,
    shoename: "Men’s Black Running",
    image: "./images/demo-shoes-images/men/men black running.jpg",
    price: 79.9,
    free_shipping: false,
    categories: "Running",
    sold: 70,
    sale: true,
    rating: 4,
    date_arrived: "2016-10-07",
    gender: "Men",
    color: "black",
  },
  {
    id: 2,
    shoename: "Men’s Navy Running",
    image: "./images/demo-shoes-images/men/men navy running.jpg",
    price: 79.9,
    free_shipping: false,
    categories: "Running",
    sold: 24,
    sale: false,
    rating: 4,
    date_arrived: "2017-20-07",
    gender: "Men",
    color: "blue",
  },
  {
    id: 3,
    shoename: "Men’s Green Running",
    image: "./images/demo-shoes-images/men/men green running.jpg",
    price: 79.9,
    free_shipping: true,
    categories: "Running",
    sold: 72,
    sale: false,
    rating: 5,
    date_arrived: "2020-04-09",
    gender: "Men",
    color: "green",
  },
  {
    id: 4,
    shoename: "Men’s Red Running",
    image: "./images/demo-shoes-images/men/men red running.jpg",
    price: 79.9,
    free_shipping: false,
    categories: "Running",
    sold: 86,
    sale: false,
    rating: 3,
    date_arrived: "2019-10-07",
    gender: "Men",
    color: "red",
  },
  {
    id: 5,
    shoename: "Men’s Classic Mint",
    image: "./images/demo-shoes-images/men/men classic mint.jpg",
    price: 96.4,
    free_shipping: true,
    categories: "Classic",
    sold: 23,
    sale: true,
    rating: 4,
    date_arrived: "2022-10-07",
    gender: "Men",
    color: "mint",
  },
  {
    id: 6,
    shoename: "Men’s Classic Blue",
    image: "./images/demo-shoes-images/men/men classic blue.jpg",
    price: 96.4,
    free_shipping: false,
    categories: "Classic",
    sold: 109,
    sale: false,
    rating: 5,
    date_arrived: "2019-07-07",
    gender: "Men",
    color: "blue",
  },
  {
    id: 7,
    shoename: "Men’s Moonstone Sneaker",
    image: "./images/demo-shoes-images/men/men moonstone sneaker.jpg",
    price: 104.6,
    free_shipping: false,
    categories: "Sneaker",
    sold: 89,
    sale: false,
    rating: 5,
    date_arrived: "2022-10-22",
    gender: "Men",
    color: "grey",
  },
  {
    id: 8,
    shoename: "Men’s Earth-tone Sneaker",
    image: "./images/demo-shoes-images/men/men earth-tone sneaker.jpg",
    price: 104.6,
    free_shipping: true,
    categories: "Sneaker",
    sold: 67,
    sale: false,
    rating: 5,
    date_arrived: "2021-10-22",
    gender: "Men",
    color: "brown",
  },
  {
    id: 9,
    shoename: "Women’s Tosca City Run",
    image: "./images/demo-shoes-images/women/women tosca city run.jpg",
    price: 64.8,
    free_shipping: false,
    categories: "Sneaker",
    sold: 109,
    sale: true,
    rating: 4,
    date_arrived: "2020-10-07",
    gender: "Women",
    color: "green",
  },
  {
    id: 10,
    shoename: "Women’s Candy City Run",
    image: "./images/demo-shoes-images/women/women candy city run.jpg",
    price: 64.8,
    free_shipping: true,
    categories: "Sneaker",
    sold: 67,
    sale: false,
    rating: 3,
    date_arrived: "2017-08-07",
    gender: "Women",
    color: "blue",
  },
  {
    id: 11,
    shoename: "Women’s choco City Run",
    image: "./images/demo-shoes-images/women/women choco city run.jpg",
    price: 64.8,
    free_shipping: false,
    categories: "Sneaker",
    sold: 89,
    sale: false,
    rating: 4,
    date_arrived: "2019-10-28",
    gender: "Women",
    color: "chocolate",
  },
  {
    id: 12,
    shoename: "Women’s Pink Training",
    image: "./images/demo-shoes-images/women/women pink training.jpg",
    price: 96.2,
    free_shipping: false,
    categories: "Training",
    sold: 34,
    sale: false,
    rating: 2,
    date_arrived: "2020-10-17",
    gender: "Women",
    color: "pink",
  },
  {
    id: 13,
    shoename: "Women’s Peach Training",
    image: "./images/demo-shoes-images/women/women peach training.jpg",
    price: 96.2,
    free_shipping: false,
    categories: "Training",
    sold: 53,
    sale: true,
    rating: 3,
    date_arrived: "2018-10-17",
    gender: "Women",
    color: "peach",
  },
  {
    id: 14,
    shoename: "Women’s Green Training",
    image: "./images/demo-shoes-images/women/women green training.jpg",
    price: 96.2,
    free_shipping: true,
    categories: "Training",
    sold: 97,
    sale: false,
    rating: 4,
    date_arrived: "2021-05-20",
    gender: "Women",
    color: "green",
  },
  {
    id: 15,
    shoename: "Women’s Blue Training",
    image: "./images/demo-shoes-images/women/women blue training.jpg",
    price: 96.2,
    free_shipping: false,
    categories: "Training",
    sold: 65,
    sale: false,
    rating: 4,
    date_arrived: "2023-01-17",
    gender: "Women",
    color: "blue",
  },
  {
    id: 16,
    shoename: "Women’s Cream Suede",
    image: "./images/demo-shoes-images/women/women cream suede.jpg",
    price: 78.8,
    free_shipping: true,
    categories: "Suede",
    sold: 98,
    sale: false,
    rating: 4,
    date_arrived: "2021-02-19",
    gender: "Women",
    color: "cream",
  },
  {
    id: 17,
    shoename: "Women’s Pink Suede",
    image: "./images/demo-shoes-images/women/women pink suede.jpg",
    price: 78.8,
    free_shipping: false,
    categories: "Suede",
    sold: 153,
    sale: false,
    rating: 5,
    date_arrived: "2023-02-19",
    gender: "Women",
    color: "pink",
  },
  {
    id: 18,
    shoename: "Women’s Orange Sneaker",
    image: "./images/demo-shoes-images/women/women orange sneaker.jpg",
    price: 110.7,
    free_shipping: false,
    categories: "Sneaker",
    sold: 46,
    sale: false,
    rating: 4,
    date_arrived: "2020-11-19",
    gender: "Women",
    color: "orange",
  },
  {
    id: 19,
    shoename: "Women’s Mint Sneaker",
    image: "./images/demo-shoes-images/women/women mint sneaker.jpg",
    price: 110.7,
    free_shipping: false,
    categories: "Sneaker",
    sold: 76,
    sale: true,
    rating: 5,
    date_arrived: "2017-08-19",
    gender: "Women",
    color: "mint",
  },
  {
    id: 20,
    shoename: "Women’s Tan Sneaker",
    image: "./images/demo-shoes-images/women/women tan sneaker.jpg",
    price: 110.7,
    free_shipping: true,
    categories: "Sneaker",
    sold: 67,
    sale: true,
    rating: 5,
    date_arrived: "2022-11-19",
    gender: "Women",
    color: "pink",
  },
];

export default demoShoeData;
