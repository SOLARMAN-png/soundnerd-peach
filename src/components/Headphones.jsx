import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HeadphonesPage = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { cart, getTotalItems, removeAll, updateQuantity, getTotalPrice } = useCart();
    return (
        <div  className="headphonesPage-container">
            <div className="headphones-hero-section">
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
                                  <h4>${item.price}</h4>
                              </div>
                          </div>
                          
                          <div className='cartInfo-editDivTwo'>
                              <div className='cartQuantity-editDiv'>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => setQty(q => q + 1)}>+</button>
                              </div>
                          </div>
                        </div>
                      ))}
                      <div className="cartContent-footerDiv">
                          <h3>Total</h3>
                          <h4>${getTotalPrice()}</h4>
                      </div>
                      <div className='cartContent-checkoutDiv'><Link to="/checkout">CHECKOUT</Link></div>
                    </div>
                  )}
                </div>
                <div className="heroSection-textDiv">
                    <h2>HEADPHONES</h2>
                </div>
            </div>
            <div className="headphones-products-section">
                <div  className='headphones-products-section-cardContainer'>
                    <div className='headphones-product-imageDiv'><img src="/XX99-mark-two-headphones.jpg" alt="" /></div>
                    <div className="headphones-product-textDiv">
                       <h2>NEW PRODUCT</h2> 
                       <h3>XX99 MARK II HEADPHONES</h3>
                       <p>The new XX99 Mark II headphones are engineered for optimal sound quality and comfort. Featuring a revolutionary new design, the XX99 Mark II delivers exceptional sound quality and a sleek aesthetic that complements any room.</p>
                    <div><a href="/productDetails/1">SEE PRODUCT</a></div>
                    </div>
                </div>
              
                <div  className='headphones-products-section-cardContainer'>
                    <div className='headphones-product-imageDiv'><img src="/XX99-mark-one-headphones.jpg" alt="" /></div>
                    <div className="headphones-product-textDiv">
                       <h3>XX99 MARK I HEADPHONES</h3>
                       <p>As the gold standards for headphones, the classic XX99 MARK I offers detailed and accurate audio reproduction of audiophile, mixing engineers and music afficionados alike in studios and on the go.</p>
                      <div><a href="/productDetails/2">SEE PRODUCT</a></div>
                    </div>
                </div>

                <div  className='headphones-products-section-cardContainer'>
                    <div className='headphones-product-imageDiv'><img src="/XX59-headphones.jpg" alt="" /></div>
                    <div className="headphones-product-textDiv">
                       <h3>XX 59 HEADPHONES</h3>
                       <p>Enjoy your audio almost everywhere and customize it to your specific taste with the XX59 headphones. The stylish yet durable wireless XX59 headphones is a brilliant companion at home or on the move.</p>
                       <div><a href="/productDetails/3">SEE PRODUCT</a></div>
                    </div>
                </div>
            </div>
            <section id="categories">
                <div className="categoriesCard-container">
                    <div className="categoriesCard">
                        <div  className="categoriesCard-imageContainer"><img src="/headphone.png" alt="" /></div>
                        <div className="categoriesCard-actionDiv">
                            <h3>HEADPHONES</h3>
                            <div><a href="">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="categoriesCard">
                        <div className="categoriesCard-imageContainer"><img src="/speaker.png" alt="" /></div>
                        <div className="categoriesCard-actionDiv">
                            <h3>SPEAKER</h3>
                            <div><a href="">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="categoriesCard">
                        <div className="categoriesCard-imageContainer"><img src="/earphones.png" alt="" /></div>
                        <div className="categoriesCard-actionDiv">
                            <h3>EARPHONES</h3>
                            <div><a href="">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
              </section>

              <section  id="About-us">
                        <div className="AboutUs-imageDiv"><img src="/About-Us.jpg" alt="" /></div>
                        <div className="About-us-text">
                            <h2>Bringing you the <span>best</span> audio gear</h2>
                            <p>Located at the heart of New York City, Soundnerd is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Soundnerd the best place to buy your portable audio equipment.</p>
                        </div>
                    </section>
                    <footer>
                        <div className="footer-nullDiv"></div>
                        <div className="footerWebsite-titleDiv"><a href="/">Soundnerd</a></div>
                            <ul>
                            <li><a href="/">HOME</a></li>
                            <li><a href="/headphones">HEADPHONES</a></li>
                            <li><a href="/speakers">SPEAKERS</a></li>
                            <li><a href="/earphones">EARPHONES</a></li>
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
 
export default HeadphonesPage;