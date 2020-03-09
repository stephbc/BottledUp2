/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import SingleProduct from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal(
      'Welcome to BottledUp, cody@email.com'
    )
  })
})
describe('SingleProduct', () => {
  let singleProduct
  let fakeProduct = {
    name: 'The Sarah',
    type: 'bottle',
    material: 'Glass',
    price: 3000,
    color: 'Iridescent',
    imgUrl:
      'https://s7d5.scene7.com/is/image/UrbanOutfitters/49328438_017_b?$xlarge$&hei=900&qlt=80&fit=constrain',
    description:
      'The Sarah is a refined bottle for the go-getter. This is a reusable bottle that is no longer relegated to hiking or yoga, the Sarah can be brought into work or can join you at corporate events and galas. With this bottle, your Perrier will stay fresh for the entirety of the ride to your weekend home in the Hamptons./n Product Specifications: 16oz'
  }

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct product={fakeProduct} />)
  })

  it('renders the name in an h4 by passing on props', () => {
    expect(singleProduct.find('h4').text()).to.be.equal('The Sarah')
  })
})
