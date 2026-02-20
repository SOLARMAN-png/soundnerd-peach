import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { cart, getTotalItems, removeAll, updateQuantity, getTotalPrice } = useCart();
    const [navOpen, setNavOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const navigate = useNavigate();

    const total = getTotalPrice();
    const shipping = 50;
    const vat = total * 0.2;
    const grandTotal = total + shipping + vat;
    return ( 
        <div className="checkoutPage-container">
           <nav className='mobile-mainNav'>
                <img src="/icon-hamburger.svg" alt="" onClick={() => setNavOpen(!navOpen)} style={{cursor: 'pointer'}} />
                <h1><a href="/">Soundnerd</a></h1>
                <div className='cartIcon-container'>
                    <span>{getTotalItems()}</span>
                    <button onClick={() => setCartOpen(!cartOpen)}><img src="/icon-cart.svg" alt="" /></button>
                </div> 
              </nav>
              <nav  className='desktop-mainNav'>
                 <h1><a href="/">Soundnerd</a></h1>
                 <ul>
                    <li><a href="/">HOME</a></li>
                    <li><a href="/headphones">HEADPHONES</a></li>
                    <li><a href="/speakers">SPEAKERS</a></li>
                    <li><a href="/earphones">EARPHONES</a></li>
                 </ul>
                 <div className='cartIcon-container'>
                    <span>{getTotalItems()}</span>
                    <button onClick={() => setCartOpen(!cartOpen)}><img src="/icon-cart.svg" alt="" /></button>
                </div> 
              </nav>
             <div className={"navCategoriesCard-container" + (navOpen ? ' visible' : '')}>
                    <div className="navCategoriesCard">
                        <div  className="navCategoriesCard-imageContainer"><img src="/headphone.png" alt="" /></div>
                        <div className="navCategoriesCard-actionDiv">
                            <h3>HEADPHONES</h3>
                            <div><a href="">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="navCategoriesCard">
                        <div className="navCategoriesCard-imageContainer"><img src="/speaker.png" alt="" /></div>
                        <div className="navCategoriesCard-actionDiv">
                            <h3>SPEAKER</h3>
                            <div><a href="">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="navCategoriesCard">
                        <div className="navCategoriesCard-imageContainer"><img src="/earphones.png" alt="" /></div>
                        <div className="navCategoriesCard-actionDiv">
                            <h3>EARPHONES</h3>
                            <div><a href="">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                   </div>

                <div className='cartContainer' style={{display: cartOpen ? 'block' : 'none'}}>
                  {cart.length === 0 ? (
                    <div className='emptyCart-div'>
                      <div><img src="/public/cart-icon.png" alt="" /></div> 
                      <div className='emptyCart-noteDiv'><h3>The cart is empty</h3></div>
                      <div className='startShopping-buttonDiv'><Link to="/">START SHOPPING</Link></div>
                    </div>
                  ) : (
                    <div className="cartContent-div">
                      <div className='cartContent-headerDiv'>
                          <h3>Cart({getTotalItems()})</h3>
                          <button onClick={removeAll}>Remove All</button>
                      </div>
                      {cart.map(item => (
                        <div key={item.id} className='cartInfo-editDiv'>
                          <div className='cartInfo-editDivOne'>
                              <div  className='cartInfo-editDivOne-imageContainer'><img src={item.image} alt="" /></div>
                              <div className='cartInfo-div'>
                                  <h3>{item.name}</h3>
                                  <h4>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}</h4>
                              </div>
                          </div>
                          
                          <div className='cartInfo-editDivTwo'>
                              <div className='cartQuantity-editDiv'>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                              </div>
                          </div>
                        </div>
                      ))}
                      <div className="cartContent-footerDiv">
                          <h3>Total</h3>
                          <h4>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(getTotalPrice())}</h4>
                      </div>
                      <div className='cartContent-checkoutDiv'><a href="/checkout">CHECKOUT</a></div>
                    </div>
                  )}
                </div>

          
          <button className='checkoutPage-backBTN' onClick={() => window.history.back()}>Go Back</button>
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            if (e.target.checkValidity()) {
                const orderId = Date.now().toString(36).toUpperCase();
                const order = {
                    id: orderId,
                    items: cart,
                    total: grandTotal
                };
                localStorage.setItem('lastOrder', JSON.stringify(order));
                removeAll();
                navigate('/thankyou');
            }
        }}>
                <div  className='checkoutDetails-contentContainer'>
                    <div className="checkoutDetails-Div">
                    <h2>CHECKOUT</h2>
                    <div className="checkoutDetails-formDiv">
                        <h3>BILLING DETAILS</h3>
                        <div className="checkoutDetails-formDiv-contentDiv">
                            <div className='checkoutDetails-nameDiv'>
                                <label htmlFor="">Name</label>
                                <input placeholder="Alexei Ward" type="text" required />
                            </div>
                            <div className='checkoutDetails-emailDiv'>
                                <label htmlFor="">Email</label>
                                <input placeholder="alexei@gmail.com"  type="text" required />
                            </div>
                            <div className='checkoutDetails-phoneDiv'>
                                <label htmlFor="">Phone Number</label>
                                <input  placeholder="+1 202-555-0136"  type="number" required />
                            </div>
                        </div>
                    </div>
                    <div className="checkoutDetails-formDiv">
                        <h3>SHIPPING INFO</h3>
                        <div  className="checkoutDetails-formDiv-contentDiv">
                            <div className='checkoutDetails-addressDiv'>
                                <label htmlFor="">Your Address</label>
                                <input placeholder="1137 William Avenue" type="text" required />
                            </div>
                            <div className='checkoutDetails-zipDiv'>
                                <label htmlFor="">Zip Code</label>
                                <input placeholder="1001"  type="number" required />
                            </div>
                            <div  className='checkoutDetails-cityDiv'>
                                <label htmlFor="">City</label>
                                <input  placeholder="New York"  type="text" required />
                            </div>
                             <div  className='checkoutDetails-countryDiv'>
                                <label htmlFor="">Country</label>
                                <input  placeholder="United States"  type="text" required />
                            </div>
                        </div>
                    </div>
                    <div className="checkoutDetails-formDiv">
                        <h3>PAYMENT DETAILS</h3>
                        <div className='checkoutDetails-paymentDiv'>
                          <h4>Payment Method</h4>
                          <div className="checkoutDetails-formDiv-contentDiv">
                           <div id='checkoutDetails-radioDiv'>
                              <input  id='myradio' type="radio" name="paymentMethod" value="e-money" onChange={(e) => setSelectedPayment(e.target.value)} />
                              <label htmlFor="">E-Money</label>
                           </div>
                           <div id='checkoutDetails-radioDiv'>
                              <input id='myradio' type="radio" name="paymentMethod" value="cash" onChange={(e) => setSelectedPayment(e.target.value)} />
                              <label htmlFor="">Cash on Delivery</label>
                           </div>
                        </div>
                        </div>
                       
                        <div className='cashOnDelivery-noteContainer' style={{display: selectedPayment === 'cash' ? 'block' : 'none'}}>
                            <div className='cashOnDelivery-imageDiv'><img src="/public/icon-cash-on-delivery.svg" alt="" /></div>
                            <div className='cashOnDelivery-noteDiv'>
                                <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                            </div>
                        </div>
                        <div id='paymentDetails-contentContainer' className="checkoutDetails-formDiv-contentDiv" style={{display: selectedPayment === 'e-money' ? 'block' : 'none'}}>
                            <div  className='checkoutPage-paymentDetails-optionDiv'>
                                <label htmlFor="">e-money Number</label>
                                <input placeholder="1234567" type="text"  />
                            </div>
                            <div  className='checkoutPage-paymentDetails-optionDiv'>
                                <label htmlFor="">e-money PIN</label>
                                <input placeholder="6679" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkoutSummary-Div">
                    <h2>SUMMARY</h2>
                    <div  className="checkoutSummary-contentDiv">
                        {cart.map(item => (
                            <div key={item.id} className="checkoutSummary-contentDiv-mainDiv">
                                 <div className='checkoutSummary-contentDiv-mainDiv-innerDiv'>
                                    <div className='checkoutSummary-imageDiv'><img src={item.image} alt="" /></div>
                                    <div className='checkoutSummary-detailDiv'>
                                       <h2>{item.name}</h2>
                                       <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}</p>
                                    </div>
                                 </div>

                                 <p className='checkoutSummary-quantity'>{item.quantity}x</p>
                            </div>
                        ))}
                    </div>
                    <div  className="orderCost-container">
                        <div className='orderCost-itemDiv'>
                            <h3 className='orderCost-itemDiv-key'>Total</h3>
                            <h3 className='orderCost-itemDiv-value'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(total)}</h3>
                        </div>
                        <div  className='orderCost-itemDiv'>
                            <h3 className='orderCost-itemDiv-key'>SHIPPING</h3>
                            <h3 className='orderCost-itemDiv-value'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(shipping)}</h3>
                        </div>
                        <div  className='orderCost-itemDiv'>
                            <h3 className='orderCost-itemDiv-key'>VAT (INCLUDED) </h3>
                            <h3 className='orderCost-itemDiv-value'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(vat)}</h3>
                        </div>
                        <div  className='orderCost-itemDiv'>
                            <h3 className='orderCost-itemDiv-key'>GRAND TOTAL</h3>
                            <h3 className='orderCost-itemDiv-value-grand'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(grandTotal)}</h3>
                        </div>
                    </div>
                    <div className="checkoutSummary-continueButtonDiv"><button type="submit">CONTINUE & PAY</button></div>
                </div>
                </div>
                
            </form>
            <footer>
                        <div className="footer-nullDiv"></div>
                        <div className="footerWebsite-titleDiv"><a href="">Soundnerd</a></div>
                            <ul>
                            <li><a href="">HOME</a></li>
                            <li><a href="">HEADPHONES</a></li>
                            <li><a href="">SPEAKERS</a></li>
                            <li><a href="">EARBUDS</a></li>
                        </ul>
                       <div className="footerNote-Socials">
                        <div>
                            <p className="footer-note">Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
                            <p className="footer-copyRight">Copyright 2021. All Rights Reserved</p>
                        </div>
                            <div className="footer-socials">
                                <div><img src="/icon-facebook.svg" alt="" /></div>
                                <div><img src="/icon-twitter.svg" alt="" /></div>
                                <div><img src="/icon-instagram.svg" alt="" /></div>
                            </div>
                       </div>
                    </footer>
                    <footer  id='desktopFooter-container'>
                          <div  className='desktopFooter-leftContent-container'>
                            <div className="footer-nullDiv"></div>
                            <div  className='desktopFooter-leftContent-textContainer'>
                                <div className='desktopFooter-projectName-container'><a href="">soundnerd</a></div>
                                <p className='desktop-footerNote'>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
                                <p className='desktop-footerCopyright'>Copyright 2021. All Rights Reserved.</p>
                            </div>
                          </div>
                          <div className='desktopFooter-rightContent-container'>
                            <ul>
                            <li><a href="/">HOME</a></li>
                            <li><a href="/headphones">HEADPHONES</a></li>
                            <li><a href="/speakers">SPEAKERS</a></li>
                            <li><a href="/earphones">EARPHONES</a></li>
                           </ul>
                              <div className="footer-socials">
                                <div><img src="/icon-facebook.svg" alt="" /></div>
                                <div><img src="/icon-twitter.svg" alt="" /></div>
                                <div><img src="/icon-instagram.svg" alt="" /></div>
                            </div>
                          </div>
                    </footer>
        </div>
     );
}
 
export default CheckoutPage;