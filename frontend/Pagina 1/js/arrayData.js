const products = [
  { id: 1, orderId: "GGST001", platform: "PC", price: 39.99, type: "Digital", edition: "Standard", name: "Season Pass 1", stock: 10 },
  { id: 6, orderId: "GGST006", platform: "PC", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 2", stock: 10 },
  { id: 9, orderId: "GGST009", platform: "PC", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 3", stock: 10 },
  { id: 12, orderId: "GGST012", platform: "PC", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 4", stock: 10 },
  { id: 15, orderId: "GGST015", platform: "PC", price: 14.99, type: "Digital", edition: "Add-on", name: "GGST Guilty Gear 25th Anniversary Colors", stock: 15 },
  { id: 18, orderId: "GGST018", platform: "PC", price: 59.99, type: "Physical", edition: "Deluxe", name: "Guilty Gear -Strive-", stock: 10 },
  { id: 22, orderId: "GGST022", platform: "PC", price: 9.99, type: "Digital", edition: "Add-on", name: "Unika", stock: -1 },
  { id: 23, orderId: "GGST023", platform: "PC", price: 9.99, type: "Digital", edition: "Add-on", name: "Bridget", stock: -1 },
  { id: 24, orderId: "GGST024", platform: "PC", price: 9.99, type: "Digital", edition: "Add-on", name: "Jacko", stock: -1 },
  { id: 25, orderId: "GGST025", platform: "PC", price: 9.99, type: "Digital", edition: "Add-on", name: "Elphelt", stock: -1 },
  { id: 26, orderId: "GGST026", platform: "PC", price: 9.99, type: "Digital", edition: "Add-on", name: "Slayer", stock: -1 },

  { id: 27, orderId: "GGST027", platform: "PS5", price: 9.99, type: "Digital", edition: "Add-on", name: "Unika", stock: -1 },
  { id: 28, orderId: "GGST028", platform: "PS5", price: 9.99, type: "Digital", edition: "Add-on", name: "Bridget", stock: -1 },
  { id: 29, orderId: "GGST029", platform: "PS5", price: 9.99, type: "Digital", edition: "Add-on", name: "Jacko", stock: -1 },
  { id: 30, orderId: "GGST030", platform: "PS5", price: 9.99, type: "Digital", edition: "Add-on", name: "Elphelt", stock: -1 },
  { id: 31, orderId: "GGST031", platform: "PS5", price: 9.99, type: "Digital", edition: "Add-on", name: "Slayer", stock: -1 },

  { id: 5, orderId: "GGST005", platform: "PS5", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 1", stock: -1 },
  { id: 21, orderId: "GGST021", platform: "PS5", price: 39.99, type: "Physical", edition: "Standard", name: "Guilty Gear -Strive-", stock: 10 },
  { id: 16, orderId: "GGST016", platform: "PS5", price: 14.99, type: "Digital", edition: "Add-on", name: "GGST Guilty Gear 25th Anniversary Colors", stock: 15 },
  { id: 13, orderId: "GGST013", platform: "PS5", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 4", stock: 10 },
  { id: 10, orderId: "GGST010", platform: "PS5", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 3", stock: 10 },
  { id: 7, orderId: "GGST007", platform: "PS5", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 2", stock: 10 },
  { id: 2, orderId: "GGST002", platform: "PS5", price: 59.99, type: "Physical", edition: "Deluxe", name: "Guilty Gear -Strive-", stock: 10 },

  { id: 4, orderId: "GGST004", platform: "XBOX", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 1", stock: -1 },
  { id: 8, orderId: "GGST008", platform: "XBOX", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 2", stock: 10 },
  { id: 11, orderId: "GGST011", platform: "XBOX", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 3", stock: 10 },
  { id: 14, orderId: "GGST014", platform: "XBOX", price: 39.99, type: "Digital", edition: "Add-on", name: "Season Pass 4", stock: 10 },
  { id: 17, orderId: "GGST017", platform: "XBOX", price: 14.99, type: "Digital", edition: "Add-on", name: "GGST Guilty Gear 25th Anniversary Colors", stock: 15 },
  { id: 19, orderId: "GGST019", platform: "XBOX", price: 39.99, type: "Physical", edition: "Standard", name: "Guilty Gear -Strive-", stock: 10 },
  { id: 20, orderId: "GGST020", platform: "XBOX", price: 39.99, type: "Physical", edition: "Deluxe", name: "Guilty Gear -Strive-", stock: 10 },

  { id: 32, orderId: "GGST032", platform: "XBOX", price: 9.99, type: "Digital", edition: "Add-on", name: "Unika", stock: -1 },
  { id: 33, orderId: "GGST033", platform: "XBOX", price: 9.99, type: "Digital", edition: "Add-on", name: "Bridget", stock: -1 },
  { id: 34, orderId: "GGST034", platform: "XBOX", price: 9.99, type: "Digital", edition: "Add-on", name: "Jacko", stock: -1 },
  { id: 35, orderId: "GGST035", platform: "XBOX", price: 9.99, type: "Digital", edition: "Add-on", name: "Elphelt", stock: -1 },
  { id: 36, orderId: "GGST036", platform: "XBOX", price: 9.99, type: "Digital", edition: "Add-on", name: "Slayer", stock: -1 },

      // Johnny (corrected IDs and price)
  { id: 46, orderId: "GGST037", platform: "XBOX", price: 49.99, type: "Digital", edition: "Base", name: "Johnny", stock: 20 },
  { id: 47, orderId: "GGST038", platform: "PS5", price: 49.99, type: "Digital", edition: "Base", name: "Johnny", stock: 20 },
  { id: 48, orderId: "GGST039", platform: "PC", price: 49.99, type: "Digital", edition: "Base", name: "Johnny", stock: 20 },

  // Aba (corrected IDs and price)
  { id: 49, orderId: "GGST040", platform: "XBOX", price: 49.99, type: "Digital", edition: "Base", name: "Aba", stock: 20 },
  { id: 50, orderId: "GGST041", platform: "PS5", price: 49.99, type: "Digital", edition: "Base", name: "Aba", stock: 20 },
  { id: 51, orderId: "GGST042", platform: "PC", price: 49.99, type: "Digital", edition: "Base", name: "Aba", stock: 20 },

  // Queen Dizzy (corrected IDs and price)
  { id: 52, orderId: "GGST043", platform: "XBOX", price: 49.99, type: "Digital", edition: "Base", name: "Queen Dizzy", stock: 20 },
  { id: 53, orderId: "GGST044", platform: "PS5", price: 49.99, type: "Digital", edition: "Base", name: "Queen Dizzy", stock: 20 },
  { id: 54, orderId: "GGST045", platform: "PC", price: 49.99, type: "Digital", edition: "Base", name: "Queen Dizzy", stock: 20 },

    // Bedman?
    { id: 46, orderId: "GGST046", platform: "PC", price: 9.99, type: "Digital", edition: "Add-on", name: "Bedman?", stock: -1 },
    { id: 47, orderId: "GGST047", platform: "PS5", price: 9.99, type: "Digital", edition: "Add-on", name: "Bedman?", stock: -1 },
    { id: 48, orderId: "GGST048", platform: "XBOX", price: 9.99, type: "Digital", edition: "Add-on", name: "Bedman?", stock: -1 },
];


const dataDisplayHot = [
    {
        type: "hot",
        title: "LLego la temporada 4!",
        price: 39.99,
        description: [
            "※Fecha de lanzamiento: 22 de Julio del 2024.",
            "※Incluye 4 personajes adicionales.",
            "※Ver en la página de compras para más información."
        ],
        img: "img/seasonpass4.png"
    },
    {
        type: "hot",
        title: "Contenido descargable - Unika",
        price: 9.99,
        description: [
            "※Unika ya está disponible como contenido adicional!",
            "※Disponible como compra única o también en el pase de batalla.",
            "※Ver en la página de compras para más información."
        ],
        img: "img/Unika.png"
    },
    {
        type: "hot",
        title: "Contenido descargable - Bridget",
        price: 9.99,
        description: [
            "※Bridget ya está disponible como contenido adicional!",
            "※Disponible como compra única o también en el pase de batalla.",
            "※Ver en la página de compras para más información."
        ],
        img: "img/Bridget.png"
    },
]

const dataDisplayCommon = [
    {
        type: "shop",
        title: "Jack-o",
        description: "La mariscal hyper energética ya está disponible en el campo de batalla. Controla a sus esbirros a tu voluntad!",
        img: "img/Jacko3.png",
        platforms: [
            { platform: "PC", id: 34 },
            { platform: "PS5", id: 29 },
            { platform: "XBOX", id: 40 }
        ]
    },
   {
        type: "shop",
        title: "Pase de temporada 2",
        description: "Disfruta de contenido exclusivo y personajes adicionales con el Pase de temporada 2.",
        img: "img/season2Thumbnail.png",
        platforms: [
            { platform: "PC", id: 6 },
            { platform: "PS5", id: 7 },
            { platform: "XBOX", id: 8 }
        ]
    },
    {
        type: "shop",
        title: "Pase de temporada 3",
        description: "Disfruta de contenido exclusivo y personajes adicionales con el Pase de temporada 3.",
        img: "img/season3Thumbnail.png",
        platforms: [
            { platform: "PC", id: 9 },
            { platform: "PS5", id: 10 },
            { platform: "XBOX", id: 11 }
        ],
    },
    {
        type: "shop",
        title: "Slayer",
        description: "El vampiro que no conoce la derrota finalmente llegó a Guilty Gear Strive.",
        platforms: [
            { platform: "PC", id: 26 },
            { platform: "PS5", id: 31 },
            { platform: "XBOX", id: 36 }
        ],
        img: "img/Slayer.png"
    },
    {
        type: "shop",
        title: "Elphelt",
        description: "La pistolera con corazón de novia regresa con todo su arsenal y carisma explosivo.",
        img: "img/Elphelt2.png",
        platforms: [
            { platform: "PC", id: 25 },
            { platform: "PS5", id: 30 },
            { platform: "XBOX", id: 35 }
        ]
    },
    {
        type: "shop",
        title: "Bridget",
        description: "La estrella del yoyó y la libertad vuelve más fuerte que nunca. ¡Let’s rock!",
        img: "img/Brisket.png",
        platforms: [
            { platform: "PC", id: 23 },
            { platform: "PS5", id: 28 },
            { platform: "XBOX", id: 33 }
        ]
    }
]



const guiltyGearShopCarousel = [
    {
        thumbnail: "https://img.youtube.com/vi/Yhr9WpjaDzw/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=Yhr9WpjaDzw"
    },
    {
        thumbnail: "https://img.youtube.com/vi/eIVRfn0bjtk/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=eIVRfn0bjtk"
    },
    {
        thumbnail: "https://img.youtube.com/vi/7yNc24LSFcM/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=7yNc24LSFcM"
    },
    {
        thumbnail: "https://img.youtube.com/vi/rQkOfw5XWeo/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=rQkOfw5XWeo"
    },
    {
        thumbnail: "https://img.youtube.com/vi/-W2xedNY4Xg/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=-W2xedNY4Xg"
    }
];







const siteDisplay = [
  {
    type: ["hot", "DLC"],
    title: "LLego la temporada 4!",
    price: 39.99,
    description: [
      "※Fecha de lanzamiento: 22 de Julio del 2024.",
      "※Incluye 4 personajes adicionales.",
      "※Ver en la página de compras para más información."
    ],
    img: "img/Season4Thumbnail.png",
    smallThumbnail: "",
    platforms: [
      { platform: "PC", id: 12, stock: 10 },
      { platform: "PS5", id: 13, stock: 10 },
      { platform: "XBOX", id: 14, stock: 10 }
    ]
  },
  {
    type: ["hot", "DLC", "Character"],
    title: "Unika",
    price: 9.99,
    description: [
      "※Unika ya está disponible como contenido adicional!",
      "※Disponible como compra única o también en el pase de batalla.",
      "※Ver en la página de compras para más información."
    ],
    img: "img/UnikaThumbnail.png",
    smallThumbnail: "img/UnikaThumbnail2.png",
    platforms: [
      { platform: "PC", id: 22, stock: -1 },
      { platform: "PS5", id: 27, stock: -1 },
      { platform: "XBOX", id: 32, stock: -1 }
    ]
  },
  {
    type: ["hot", "DLC", "Character"],
    title: "Bridget",
    price: 9.99,
    description: [
      "※Bridget ya está disponible como contenido adicional!",
      "※Disponible como compra única o también en el pase de batalla.",
      "※Ver en la página de compras para más información."
    ],
    img: "img/BridgetThumbnail2.png",
    smallThumbnail: "",
    platforms: [
      { platform: "PC", id: 23, stock: -1 },
      { platform: "PS5", id: 28, stock: -1 },
      { platform: "XBOX", id: 33, stock: -1 }
    ]
  },
  {
    type: ["hot", "baseGame"],
    title: "Guilty Gear -Strive- ",
    price: 59.99,
    description: [
      "※Incluye todos los modos básicos: historia, arcade, entrenamiento y en línea.",
      "※Requerido para todos los contenidos descargables adicionales.",
      "※Conéctate y desafía a jugadores de todo el mundo con rollback netcode."
    ],
    img: "img/solThumbnail.png",
    smallThumbnail: "",
    platforms: [
      { platform: "PC", id: 18, stock: 10 },
      { platform: "PS5", id: 21, stock: 10 },
      { platform: "XBOX", id: 19, stock: 10 }
    ]
  },
  {
    type: ["hot", "DLC", "Character"],
    title: "Jack-O'",
    price: 9.99,
    description: [
      "※Requiere el juego base y conexión a internet.",
      "※Disponible como compra única o parte del Pase de Temporada 1.",
      "※La mariscal hiperenergética que invoca esbirros y caos en cada pelea."
    ],
    img: "img/JackoThumbnail.png",
    smallThumbnail: "img/JackoThumbnail2.png",
    platforms: [
      { platform: "PC", id: 24, stock: -1 },
      { platform: "PS5", id: 29, stock: -1 },
      { platform: "XBOX", id: 34, stock: -1 }
    ]
  },
  {
    type: ["hot", "DLC"],
    title: "Pase de Temporada 2",
    price: 39.99,
    description: [
      "※Incluye 4 personajes jugables y escenarios adicionales.",
      "※Permite acceso anticipado al contenido futuro de la temporada.",
      "※Requiere el juego base de Guilty Gear -Strive-."
    ],
    img: "img/season2Thumbnail.png",
    smallThumbnail: "",
    platforms: [
    { platform: "PC", id: 6, stock: 10 },
    { platform: "PS5", id: 7, stock: 10 },
    { platform: "XBOX", id: 8, stock: 10 }] 
  },
  {
    type: ["DLC", "Character"],
    title: "Elphelt",
    price: 9.99,
    description: [
      "※Regresa la novia más caótica con su escopeta letal y estilo floral.",
      "※Incluida en el Pase de Temporada 2 o disponible por separado.",
      "※Perfecta para jugadores agresivos con opciones a distancia."
    ],
    img: "img/ElpheltThumbnail.png",
    smallThumbnail: "img/ElpheltThumbnail2.png",
    platforms: [
      { platform: "PC", id: 25, stock: -1 },
      { platform: "PS5", id: 30, stock: -1 },
      { platform: "XBOX", id: 35, stock: -1 }
    ]
  },
  {
    type: ["DLC", "Character"],
    title: "Slayer",
    price: 9.99,
    description: [
      "※El vampiro elegante ha vuelto con golpes devastadores y estilo inigualable.",
      "※Ideal para quienes dominan el tempo del combate.",
      "※Incluido en el Pase de Temporada o como compra única."
    ],
    img: "img/SlayerThumbnail.png",
    smallThumbnail: "img/SlayerThumbnail2.png",
    platforms: [
      { platform: "PC", id: 26, stock: -1 },
      { platform: "PS5", id: 31, stock: -1 },
      { platform: "XBOX", id: 36, stock: -1 }
    ]
  },
  {
  type: ["DLC", "Character"],
  title: "Johnny",
  price: 9.99,
  description: [
    "※El espadachín carismático regresa con su monedero mortal.",
    "※Usa precisión y cálculo para dominar el campo de batalla.",
    "※Compra individual o parte del Pase de Temporada 3.",
    "※No conocía la perfección hasta que vi a Johnny de GuiltyGear"
  ],
  img: "img/JhonnyThumbnail.png",
  smallThumbnail: "img/JhonnyThumbnail2.png",
  platforms: [
    { platform: "PC", id: 48, stock: 20 },
    { platform: "PS5", id: 47, stock: 20 },
    { platform: "XBOX", id: 46, stock: 20 }
  ]
},
{
  type: ["DLC", "Character"],
  title: "Aba",
  price: 9.99,
  description: [
    "※Portando su hacha demoníaca Paracelsus, Aba trae caos al combate.",
    "※Estilo de juego arriesgado pero de alto poder.",
    "※Disponible por separado o en el Pase de Temporada."
  ],
  img: "img/AbaThumbnail.png",
  smallThumbnail: "img/AbaThumbnail2.png",
  platforms: [
    { platform: "PC", id: 51, stock: 20 },
    { platform: "PS5", id: 50, stock: 20 },
    { platform: "XBOX", id: 49, stock: 20 }
  ]
},
{
  type: ["DLC", "Character"],
  title: "Queen Dizzy",
  price: 9.99,
  description: [
    "※Reina de alas oscuras y luz, Dizzy regresa con control zonal brutal.",
    "※Perfecta para jugadores estratégicos que dominan el espacio.",
    "※Incluida en el Pase o disponible por separado."
  ],
  img: "img/QueenDizzyThumbnail.png",
  smallThumbnail: "img/QueenDizzyThumbnail2.png",
  platforms: [
    { platform: "PC", id: 54, stock: 20 },
    { platform: "PS5", id: 53, stock: 20 },
    { platform: "XBOX", id: 52, stock: 20 }
  ]
},
  {
    type: ["DLC", "Character"],
    title: "Bedman?",
    price: 9.99,
    description: [
      "※Una entidad extraña que lucha mientras duerme... o algo así.",
      "※Domina ataques impredecibles y mecánicas temporales únicas.",
      "※Disponible como compra individual o parte del Pase de Temporada."
    ],
    img: "img/BedmanThumbnail.png",
    smallThumbnail: "img/img/BedmanThumbnail2.png",
    platforms: [
      { platform: "PC", id: 46, stock: -1 },
      { platform: "PS5", id: 47, stock: -1 },
      { platform: "XBOX", id: 48, stock: -1 }
    ]
  }
];


