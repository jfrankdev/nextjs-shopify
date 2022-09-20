/** @jsxRuntime classic */
/** @jsx jsx */
import { Minus, Plus } from '@components/icons'
import {
  useRemoveItemFromCart,
  useUpdateItemQuantity,
} from '@lib/shopify/storefront-data-hooks'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { IconButton, jsx } from 'theme-ui'

const CartItem = ({
  item,
  currencyCode,
}: {
  item: /*ShopifyBuy.LineItem todo: check if updated types*/ any
  currencyCode: string
}) => {
  const updateItem = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)

  const updateQuantity = async (quantity: number) => {
    await updateItem(item.variant.id, quantity)
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item.variant.id)
    } catch (error) {
      console.error(error)
      setRemoving(false)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <div className="item_container flex w-11/12 px-4 py-2 bg-gray-100 items-center mt-2">
      <div className="item_info flex-1 flex text-black">
        <div className="item_image relative">
          <Image
            height={90}
            width={90}
            unoptimized
            alt={item.variant.image.altText}
            src={item.variant.image.src}
          />
          <span className="quantity_badge text-white absolute right-0 top-2 rounded-full bg-ridgeGreen-100 h-6 w-6 flex items-center justify-center">
            {quantity}
          </span>
        </div>

        <div className="item_name flex flex-col justify-center ml-2 text-ridgebg-100">
          <div className="item_title font-bold font-HelveticaNeueRegular ">
            {item.title}
          </div>

          <ul className="item_variant">
            {item.variant.selectedOptions.map((option: any) => (
              <li key={option.value}>{option.value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="item_price_info flex flex-col justify-center text-gray-600 ">
        <div className="item_price flex-1 flex justify-center items-end font-HelveticaNeueMedium">
          {getPrice(
            item.variant.priceV2.amount,
            item.variant.priceV2.currencyCode || 'USD'
          )}{' '}
          {item.variant.priceV2.currencyCode}
        </div>

        <div className="item_quantity flex-1 flex flex-row justify-center items-center outline-none border-none">
          <div className="flex justify-center items-center">
            <IconButton onClick={() => increaseQuantity(-1)}>
              <Minus width={18} height={18} />
            </IconButton>

            <div className="input_quantity ">
              <input
                className="  outline-none w-10 rounded border-2 border-gray-300 text-center"
                type="text"
                value={quantity}
                max={99}
                min={0}
                onChange={handleQuantity}
                onBlur={handleBlur}
              />
            </div>

            <IconButton
              onClick={() => increaseQuantity(1)}
              sx={{ outline: 'none', border: 'none' }}
            >
              <Plus
                width={18}
                height={18}
                sx={{ outline: 'none', border: 'none' }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
