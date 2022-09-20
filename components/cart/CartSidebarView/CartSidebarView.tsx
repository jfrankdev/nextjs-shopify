/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx, Text } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { Bag } from '@components/icons'
import { useCart, useCheckoutUrl } from '@lib/shopify/storefront-data-hooks'
import CartItem from '../CartItem'
import { BuilderComponent, builder } from '@builder.io/react'
import env from '@config/env'
import Link from 'next/link'


const CartSidebarView: FC = () => {
  const checkoutUrl = useCheckoutUrl()
  const cart = useCart()
  const subTotal: string | undefined = cart?.subtotalPrice
  const total = ' - '

  const items = cart?.lineItems ?? []
  const isEmpty = items.length === 0
  const [cartUpsell, setCartUpsell] = useState()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const cartUpsellContent = await builder
        .get('cart-upsell-sidebar', {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setCartUpsell(cartUpsellContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  return (
    <div className=" cart_sidebar flex flex-col items-center justify-center px-2 overflow-auto pb-2 text-white">
      {isEmpty ? (
        <>
          <Bag />
          <div className="empty_cart_text font-openSans text-xl mt-4 tracking-wider">
            Your Cart Is Empty
          </div>
          <button className="emptyCartBtn">
            <a
              className="emptyCartAnchor"
              href="https://ridge.com/collections/all-wallets"
            >
              SHOP WALLETS
            </a>
          </button>

          <button className="emptyCartBtn">
            <a
              className="emptyCartAnchor"
              href="https://ridge.com/collections/bags"
            >
              SHOP BAGS
            </a>
          </button>
          <button className="emptyCartBtn">
            <a
              className="emptyCartAnchor"
              href="https://ridge.com/collections/phone-cases"
            >
              SHOP CARD CASES
            </a>
          </button>

          <button className="emptyCartBtn">
            <a
              className="emptyCartAnchor"
              href="https://ridge.com/collections/gear"
            >
              SHOP MULTI-GEAR
            </a>
          </button>
          <button className="emptyCartBtn">
            <a
              className="emptyCartAnchor"
              href="https://ridge.com/collections/accessories"
            >
              SHOP ACCESSORIES
            </a>
          </button>
        </>
      ) : (
        <>
          <div className="checkmark flex justify-center items-center mb-4">
            <img className="w-8 h-8" src="./checkmark.png" alt='Cart Checkmark'></img>
            <div className="item_added_text font-tradegothicbold text-2xl ml-2">
              JUST ADDED TO CART
            </div>
          </div>
          {items.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              // todo update types
              currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
            />
          ))}
          <div className="cart_subtotal flex flex-row items-center justify-between my-5 h-6 w-10/12 tracking-wider">
            <div className="subtotal_text text-xl ">Subtotal</div>
            <div className="subtotal_number text-2xl font-tradegothicbold">
              {'$'}{Number(subTotal)} USD
            </div>
          </div>

          {/* <BuilderComponent
              content={cartUpsell}
              model="cart-upsell-sidebar"
            /> */}

          {checkoutUrl && (
            <Link href={checkoutUrl!}>
              <button className="checkoutBtn">CHECKOUT</button>
            </Link>
          )}
        </>
      )}
    </div>
  )
}

export default CartSidebarView
