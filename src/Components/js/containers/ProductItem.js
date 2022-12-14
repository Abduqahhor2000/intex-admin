import { useState, useEffect } from "react"
import DelProductMadal from "../madals/DelProductMadal"
import ProductMadal from "../madals/ProductMadal"
import { numberConvert } from "../function/nuberConvert"
import { scrollOf } from "../function/scrollOf"

export default function ProductItem({item}) {
    const [madal, setMadal] = useState(false)
    const [productID, setProductID] = useState("")
    useEffect(() => {
        scrollOf(madal)
       
    }, [madal])
    useEffect(() => {
        scrollOf(productID)
    }, [productID])

     return (
        <>
            <tr className="bg-white">
                <td className="rounded-l-3xl min-w-pradaja" >
                   <img src={item.image} crossOrigin="anonymous" className="h-16 w-auto ml-10" alt="img"></img>
                </td>
                <td className="py-2 min-w-razmer">
                    <div className="flex flex-col">
                        <span className="text-gray-777 after:bg-red-500 after:w-full after:block after:pt-0.5 text-xs after:content-[''] after:rotate-6 after:top-2 after:absolute relative w-fit">{numberConvert(item.price)} сум</span>
                        <span className="text-base font-bold">{numberConvert(item.sale_price)} сум</span>
                    </div> 
                </td>
                <td className="py-1.5 min-w-razmer">{numberConvert(item.quantity)}</td>
                <td className="py-1.5 min-w-pradaja">{item.frame_ru}</td>
                <td className="py-1.5 min-w-sena">{item.size}</td>
                <td className="py-1.5 min-w-sena">{item.depth}</td>
                <td className="py-1.5 w-36 min-w-sena rounded-r-3xl">
                    <div className="flex">
                        <span onClick={()=>{setMadal(true); }} data-testid={`product_edit_${item.id}`} className="p-2 cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.750122 13.8125V17.2499H4.18752L14.3255 7.11191L10.8881 3.67234L0.750122 13.8125ZM16.9847 4.45268C17.0697 4.36793 17.1372 4.26722 17.1832 4.15635C17.2292 4.04547 17.2529 3.9266 17.2529 3.80655C17.2529 3.6865 17.2292 3.56763 17.1832 3.45675C17.1372 3.34588 17.0697 3.24517 16.9847 3.16041L14.8396 1.01529C14.7548 0.930268 14.6541 0.862814 14.5432 0.816788C14.4323 0.770762 14.3135 0.74707 14.1934 0.74707C14.0734 0.74707 13.9545 0.770762 13.8436 0.816788C13.7328 0.862814 13.632 0.930268 13.5473 1.01529L11.8697 2.69827L15.3071 6.13026L16.9847 4.45268Z" fill="#3F8C8E"/>
                            </svg>
                        </span>
                        <span onClick={()=>{setProductID(item.id)}} data-testid={`product_del_${item.id}`} className="p-2 ml-2 cursor-pointer">
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00003 0.571289C8.80636 0.571288 9.58185 0.881202 10.1661 1.43693C10.7503 1.99266 11.0986 2.75168 11.139 3.557L11.1429 3.71415H15.0715C15.2717 3.71437 15.4643 3.79105 15.61 3.92853C15.7556 4.066 15.8432 4.25389 15.8549 4.45381C15.8667 4.65373 15.8016 4.85059 15.6731 5.00416C15.5446 5.15773 15.3622 5.25642 15.1634 5.28007L15.0715 5.28557H14.4044L13.4772 16.7201C13.4174 17.4579 13.0821 18.1462 12.5379 18.648C11.9937 19.1499 11.2805 19.4285 10.5402 19.4284H5.45981C4.71955 19.4285 4.00639 19.1499 3.46219 18.648C2.91799 18.1462 2.58263 17.4579 2.52281 16.7201L1.59488 5.28557H0.928598C0.73615 5.28555 0.550404 5.21489 0.406591 5.08701C0.262778 4.95913 0.1709 4.78291 0.148383 4.59179L0.142883 4.49986C0.142909 4.30741 0.213563 4.12167 0.341445 3.97785C0.469327 3.83404 0.645543 3.74216 0.836669 3.71965L0.928598 3.71415H4.85717C4.85717 2.88061 5.18829 2.08121 5.77769 1.49181C6.36709 0.902411 7.16649 0.571289 8.00003 0.571289ZM6.23217 7.83915C6.08977 7.83915 5.95219 7.89072 5.84487 7.98432C5.73755 8.07792 5.66775 8.20721 5.64838 8.34829L5.64288 8.42843V14.7141L5.64838 14.7943C5.66779 14.9353 5.7376 15.0646 5.84492 15.1581C5.95224 15.2517 6.0898 15.3032 6.23217 15.3032C6.37454 15.3032 6.5121 15.2517 6.61942 15.1581C6.72673 15.0646 6.79655 14.9353 6.81595 14.7943L6.82145 14.7141V8.42843L6.81595 8.34829C6.79659 8.20721 6.72679 8.07792 6.61947 7.98432C6.51215 7.89072 6.37457 7.83915 6.23217 7.83915ZM9.76788 7.83915C9.62548 7.83915 9.4879 7.89072 9.38058 7.98432C9.27326 8.07792 9.20346 8.20721 9.1841 8.34829L9.1786 8.42843V14.7141L9.1841 14.7943C9.2035 14.9353 9.27332 15.0646 9.38063 15.1581C9.48795 15.2517 9.62551 15.3032 9.76788 15.3032C9.91026 15.3032 10.0478 15.2517 10.1551 15.1581C10.2624 15.0646 10.3323 14.9353 10.3517 14.7943L10.3572 14.7141V8.42843L10.3517 8.34829C10.3323 8.20721 10.2625 8.07792 10.1552 7.98432C10.0479 7.89072 9.91028 7.83915 9.76788 7.83915ZM8.00003 2.14272C7.60357 2.14259 7.22172 2.29232 6.93102 2.56189C6.64032 2.83146 6.46226 3.20095 6.43253 3.59629L6.4286 3.71415H9.57146L9.56753 3.59629C9.53779 3.20095 9.35973 2.83146 9.06903 2.56189C8.77833 2.29232 8.39648 2.14259 8.00003 2.14272Z" fill="#FF0202"/>
                            </svg>
                        </span>
                    </div>
                </td>
            </tr>
            {madal ? <ProductMadal setMadal={setMadal} item={item} /> : null}
            {productID ? <DelProductMadal setProductID={setProductID} productID={productID} /> : null}
        </>
        
    )
}