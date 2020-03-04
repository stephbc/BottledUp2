'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const users = [
  {
    firstName: 'Jane',
    lastName: 'An',
    email: 'janeAn@gmail.com',
    password: 'janean',
    address: 'new york',
    accountType: 'Admin'
  },
  {
    firstName: 'Jennifer',
    lastName: 'N',
    email: 'jenniferN@gmail.com',
    password: 'jenniferN',
    address: 'new york',
    accountType: 'Admin'
  },
  {
    firstName: 'Rachel',
    lastName: 'Burrous',
    email: 'rachelBurrous@gmail.com',
    password: 'rachelburrous',
    address: 'new york',
    accountType: 'Admin'
  },
  {
    firstName: 'Stephanie',
    lastName: 'Chiang',
    email: 'stephaniebchiang@gmail.com',
    password: 'stephaniec',
    address: 'new york',
    accountType: 'Admin'
  }
]

const bottles = [
  {
    name: 'The Sarah',
    type: 'bottle',
    material: 'Glass',
    price: 3000,
    color: 'Iridescent',
    imgUrl:
      'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_017_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    description:
      'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz'
  },
  {
    name: 'The Sarah',
    type: 'bottle',
    material: 'Glass',
    price: 3000,
    color: 'Fresh Herbs',
    imgUrl:
      'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_030_f?$xlarge$&hei=900&qlt=80&fit=constrain',
    description:
      'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz'
  },
  {
    name: 'The Sarah',
    type: 'bottle',
    material: 'Glass',
    price: 3000,
    color: 'Pressed Florals',
    imgUrl:
      'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_095_d?$xlarge$&hei=900&qlt=80&fit=constrain',
    description:
      'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz'
  },
  {
    name: 'The David',
    type: 'bottle',
    material: 'Aluminum',
    price: 2000,
    color: 'Noir',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71RGWazGppL._SL1500_.jpg',
    description:
      'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a starry night finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz'
  },
  {
    name: 'The David',
    type: 'bottle',
    material: 'Aluminum',
    price: 2000,
    color: 'Bleu',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61JYlm2sVcL._SL1350_.jpg',
    description:
      'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a deep navy finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz'
  },
  {
    name: 'The David',
    type: 'bottle',
    material: 'Aluminum',
    price: 2000,
    color: 'Turquoiss',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/31DNRXHQOkL._SL1000_.jpg',
    description:
      'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a bright, turquoise finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz'
  },
  {
    name: 'The David',
    type: 'bottle',
    material: 'Aluminum',
    price: 2000,
    color: 'Vert',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51t%2BnZsOw8L._SL1259_.jpg',
    description:
      'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a forest green finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz'
  },
  {
    name: 'The Bienvenido',
    type: 'bottle',
    material: 'Double-walled Stainless Steel',
    price: 4500,
    color: 'Sunny Disposition',
    imgUrl:
      'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-sunflower.jpg',
    description:
      'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz'
  },
  {
    name: 'The Bienvenido',
    type: 'bottle',
    material: 'Double-walled Stainless Steel',
    price: 4500,
    color: 'Seaside',
    imgUrl:
      'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-pacific_1.jpg',
    description:
      'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz'
  },
  {
    name: 'The Bienvenido',
    type: 'bottle',
    material: 'Double-walled Stainless Steel',
    price: 4500,
    color: 'Central Park',
    imgUrl:
      'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-olive.jpg',
    description:
      'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz'
  },
  {
    name: 'The Bienvenido',
    type: 'bottle',
    material: 'Double-walled Stainless Steel',
    price: 4500,
    color: 'Bismol',
    imgUrl:
      'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-watermelon.jpg',
    description:
      'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz'
  },
  {
    name: 'The Bienvenido',
    type: 'bottle',
    material: 'Double-walled Stainless Steel',
    price: 4500,
    color: 'Business Attire',
    imgUrl:
      'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-black.jpg',
    description:
      'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz'
  }
]

const lids = [
  {
    name: 'Straw Cap',
    type: 'lid',
    material: 'plastic',
    price: 1300,
    color: 'black',
    imgUrl:
      'https://www.williams-sonoma.com/wsimgs/ab/images/dp/wcm/201938/0246/yeti-rambler-bottle-straw-cap-o.jpg',
    description:
      'The smartly desgined cap is durable and leak-resistant-and has a wide straw opening so you can enjoy more of your drink with every sip.'
  },
  {
    name: 'Rambler Bottle Chug Lid',
    type: 'lid',
    material: 'plastic',
    price: 1300,
    color: 'black',
    imgUrl:
      'https://www.williams-sonoma.com/wsimgs/ab/images/dp/wcm/201938/1432/img38o.jpg',
    description:
      'To open your bottle, just give the cap handles a quick half twist and youre good to go!'
  },
  {
    name: 'Flip Top Lid',
    type: 'lid',
    material: 'plastic',
    price: 1000,
    color: 'pink',
    imgUrl:
      'https://www.williams-sonoma.com/wsimgs/ab/images/dp/wcm/201938/1432/img38o.jpg',
    description: 'BPA Free lid for 34oz Sports Water Bottles'
  },
  {
    name: 'Tumbler Straw Lid',
    type: 'lid',
    material: 'metal',
    price: 1000,
    color: 'black',
    imgUrl:
      'https://s7d5.scene7.com/is/image/UrbanOutfitters/54190129_001_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    description:
      'Flexible straw presses into the lid with a precise fit. Free of BPA'
  },
  {
    name: 'Hydro Flask Wide Mouth Flex Lid',
    type: 'lid',
    material: 'plastic',
    price: 1000,
    color: 'green',
    imgUrl:
      'https://s7d5.scene7.com/is/image/UrbanOutfitters/55753792_030_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    description:
      'Screw-top cap features a handle loop. Fits wide mouth Hydro Flask bottles'
  }
]

const straws = [
  {
    name: 'Through the Drinking Glass',
    type: 'straw',
    material: 'Glass',
    price: 2499,
    color: 'Clear',
    imgUrl:
      'https://cb2.scene7.com/is/image/CB2/GlassStrawROF16/?$web_zoom$&190905021622&wid=450&hei=450',
    description:
      'These handblown glass straws will make you feel like you have entered a wonderland of beverage options. With their ergonomic shape, making an eco-friendly choice becomes easy, even elegant! The double-walled glass and crystal-clear finish makes drinking colorful smoothies a treat, without sacrificing durability./n Product Specifications: Set of 5 bent, 8 inch glass straws with cleaning brush'
  },
  {
    name: 'Highly Polished',
    type: 'straw',
    material: 'Stainless Steel',
    price: 2499,
    color: 'Rose Gold',
    imgUrl:
      'https://i.etsystatic.com/17722707/r/il/c4e514/1655935591/il_1588xN.1655935591_j0l8.jpg',
    description:
      'These stainless steel straws are the perfect accessory to any glassware! Each set is an ever-lasting stainless steel with your choice of colored metal finish. Unlike the one-tone stainless steel of old, no longer will you need to sacrifice a uniforn metail look in your home in service of your commitment to sustainability. Guests will know immediately that you are a polished individual who has a carefully curated cupboard that leaves no detail overlooked./n Product Specifications: Set of 5 bent, 8 inch straws with cleaning brush'
  },
  {
    name: 'Highly Polished',
    type: 'straw',
    material: 'Stainless Steel',
    price: 2499,
    color: 'Gold',
    imgUrl:
      'https://i.etsystatic.com/17722707/r/il/70c151/1655923555/il_1588xN.1655923555_fh3l.jpg',
    description:
      'These stainless steel straws are the perfect accessory to any glassware! Each set is an ever-lasting stainless steel with your choice of colored metal finish. Unlike the one-tone stainless steel of old, no longer will you need to sacrifice a uniforn metail look in your home in service of your commitment to sustainability. Guests will know immediately that you are a polished individual who has a carefully curated cupboard that leaves no detail overlooked./n Product Specifications: Set of 5 bent, 8 inch straws with cleaning brush'
  },
  {
    name: 'Highly Polished',
    type: 'straw',
    material: 'Stainless Steel',
    price: 2499,
    color: 'Platinum',
    imgUrl:
      'https://i.etsystatic.com/17722707/r/il/1519f6/1931565309/il_1588xN.1931565309_2jjc.jpg',
    description:
      'These stainless steel straws are the perfect accessory to any glassware! Each set is an ever-lasting stainless steel with your choice of colored metal finish. Unlike the one-tone stainless steel of old, no longer will you need to sacrifice a uniforn metail look in your home in service of your commitment to sustainability. Guests will know immediately that you are a polished individual who has a carefully curated cupboard that leaves no detail overlooked./n Product Specifications: Set of 5 bent, 8 inch straws with cleaning brush'
  },
  {
    name: 'Highly Polished',
    type: 'straw',
    material: 'Stainless Steel',
    price: 2499,
    color: 'Pitch Black',
    imgUrl:
      'https://i.etsystatic.com/17722707/r/il/85707b/1931560701/il_1588xN.1931560701_s494.jpg',
    description:
      'These stainless steel straws are the perfect accessory to any glassware! Each set is an ever-lasting stainless steel with your choice of colored metal finish. Unlike the one-tone stainless steel of old, no longer will you need to sacrifice a uniforn metail look in your home in service of your commitment to sustainability. Guests will know immediately that you are a polished individual who has a carefully curated cupboard that leaves no detail overlooked./n Product Specifications: Set of 5 bent, 8 inch straws with cleaning brush'
  },
  {
    name: 'Dàxióngmāo',
    type: 'straw',
    material: 'Bamboo',
    price: 2499,
    color: 'Natural Wood',
    imgUrl:
      'https://reusablesuperstore.com/wp-content/uploads/2019/03/Reusable-bamboo-straws-UK.jpg',
    description:
      'These bamboo straws have a calming, natural look and their shape makes them perfect to use at home or tuck into a bag to take with you anywhere! Bamboo grows quickly while consuming fewer resources than any other type of wood, so these straws pack an even greater environmental punch! This product is made even more special because it is named after the endangered giant panda. With each sale, BottledUp will donate $1.00 to the World Wildlife Fund. Make a purchase and a difference with the click of a button. /n Product Specifications: Set of 5 straight, 8 inch straws with cleaning brush'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    await Promise.all(
      bottles.map(bottle => {
        return Product.create(bottle)
      })
    )

    await Promise.all(
      lids.map(lid => {
        return Product.create(lid)
      })
    )

    await Promise.all(
      straws.map(straw => {
        return Product.create(straw)
      })
    )
  } catch (error) {
    console.log(error)
  }
}

// console.log(`seeded ${users.length} users`)
console.log(`seeded successfully`)

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...!')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
