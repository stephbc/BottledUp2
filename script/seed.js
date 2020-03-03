'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('db synced!')

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
        email: 'stephanieChiang@gmail.com',
        password: 'stephaniechaing',
        address: 'new york',
        accountType: 'Admin'
      },
    ]

    const bottles = [{
      name: 'The Sarah',
      type: 'bottles',
      material: 'Glass',
      price: 30.00,
      inventory: 100,
      color: 'Iridescent',
      imgUrl: 'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_017_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      description: 'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz',
     },
     {
      name: 'The Sarah',
      type: 'bottles',
      material: 'Glass',
      price: 30.00,
      inventory: 100,
      color: 'Fresh Herbs',
      imgUrl: 'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_030_f?$xlarge$&hei=900&qlt=80&fit=constrain',
      description: 'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz',
     },
     {
      name: 'The Sarah',
      type: 'bottles',
      material: 'Glass',
      price: 30.00,
      inventory: 100,
      color: 'Pressed Florals',
      imgUrl: 'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_095_d?$xlarge$&hei=900&qlt=80&fit=constrain',
      description: 'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz',
     },
     {
      name: 'The David',
      type: 'bottles',
      material: 'Aluminum',
      price: 20.00,
      inventory: 100,
      color: 'Noir',
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71RGWazGppL._SL1500_.jpg',
      description: 'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a starry night finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz',
     },
     {
      name: 'The David',
      type: 'bottles',
      material: 'Aluminum',
      price: 20.00,
      inventory: 100,
      color: 'Bleu',
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61JYlm2sVcL._SL1350_.jpg',
      description: 'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a deep navy finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz',
     },
     {
      name: 'The David',
      type: 'bottles',
      material: 'Aluminum',
      price: 20.00,
      inventory: 100,
      color: 'Turquoiss',
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/31DNRXHQOkL._SL1000_.jpg',
      description: 'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a bright, turquoise finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz',
     },
     {
      name: 'The David',
      type: 'bottles',
      material: 'Aluminum',
      price: 20.00,
      inventory: 100,
      color: 'Vert',
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51t%2BnZsOw8L._SL1259_.jpg',
      description: 'The David is an ideal way to start your new eco-friendly life. The bottle is designed to be lightweight with a forest green finish, an understated accompaniment for your weekend strolls or morning Equinox sessions./n Product Specifications: 24oz',
     },
     {
      name: 'The Bienvenido',
      type: 'bottles',
      material: 'Double-walled Stainless Steel',
      price: 45.00,
      inventory: 100,
      color: 'Sunny Disposition',
      imgUrl: 'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-sunflower.jpg',
      description: 'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz',
     },
     {
      name: 'The Bienvenido',
      type: 'bottles',
      material: 'Double-walled Stainless Steel',
      price: 45.00,
      inventory: 100,
      color: 'Seaside',
      imgUrl: 'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-pacific_1.jpg',
      description: 'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz',
     },
     {
      name: 'The Bienvenido',
      type: 'bottles',
      material: 'Double-walled Stainless Steel',
      price: 45.00,
      inventory: 100,
      color: 'Central Park',
      imgUrl: 'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-olive.jpg',
      description: 'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz',
     },
     {
      name: 'The Bienvenido',
      type: 'bottles',
      material: 'Double-walled Stainless Steel',
      price: 45.00,
      inventory: 100,
      color: 'Bismol',
      imgUrl: 'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-watermelon.jpg',
      description: 'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz',
     },
     {
      name: 'The Bienvenido',
      type: 'bottles',
      material: 'Double-walled Stainless Steel',
      price: 45.00,
      inventory: 100,
      color: 'Business Attire',
      imgUrl: 'https://www.hydroflask.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/2/w20ts2-black.jpg',
      description: 'The Bienvenido will keep you fresh on a Summer day and warm on a winter night. With double-walled stainless steel, your drinks will be kept cold for 24h ours or warm for 12 hours, allowing you to say Welcome to a new way of enjoying your favorite beverages./n Product Specifications: 20oz',
     }]
     
    await Promise.all(users.map((user) => {
      return User.create(user)
    }))

    await Promise.all(bottles.map((bottle) => {
      return Product.create(bottle)
    }))

  } catch (error) {
    console.log(red(error))
  }
}

console.log(`seeded ${users.length} users`)
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


// const lids = [
//   {
//     name: 'Flip Cap',
//     type: 'lids',
//     material: 'metals',
//     price: 5.00,
//     inventory: 1, 
//     color: 'stainless',
//     description: '',
//   },
//   {
//     firstName: 'Jennifer',
//     lastName: 'N',
//     email: 'jenniferN@gmail.com',
//     password: 'jenniferN',
//     address: 'new york',
//     accountType: 'Admin'
//   },
//   {
//     firstName: 'Rachel',
//     lastName: 'Burrous',
//     email: 'rachelBurrous@gmail.com',
//     password: 'rachelburrous',
//     address: 'new york',
//     accountType: 'Admin'
//   },
//   {
//     firstName: 'Stephanie',
//     lastName: 'Chiang',
//     email: 'stephanieChiang@gmail.com',
//     password: 'stephaniechaing',
//     address: 'new york',
//     accountType: 'Admin'
//   },
// ]