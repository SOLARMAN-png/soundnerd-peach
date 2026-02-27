import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HomePage = () => {
        const [navOpen, setNavOpen] = useState(false);
        const [cartOpen, setCartOpen] = useState(false);
        const { cart, getTotalItems, removeAll, updateQuantity, getTotalPrice } = useCart();
    return (  
        <div className="homePage-container">
              <section id="introductionSection-container">
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
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                              </div>
                          </div>
                        </div>
                      ))}
                      <div className="cartContent-footerDiv">
                          <h3>Total</h3>
                          <h4>${getTotalPrice()}</h4>
                      </div>
                      <div className='cartContent-checkoutDiv'><a href="/checkout">CHECKOUT</a></div>
                    </div>
                  )}
                </div>
       
              <div className="introductionBanner-container">
                    <div className="introductionBanner-textDiv">
                      <h3>NEW PRODUCT</h3>
                      <h2>XX99 MARK II HEADPHONES</h2>
                       <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast</p>
                       <div><a href="/productDetails/1">SEE PRODUCT</a></div>  
                    </div>
                    <div className="introductionBanner-imageDiv"><img src=" " alt="" /></div>
              </div>
              </section>
              <section id="categories">
                <div className="categoriesCard-container">
                    <div className="categoriesCard">
                        <div  className="categoriesCard-imageContainer"><img src="/headphone.png" alt="" /></div>
                        <div className="categoriesCard-actionDiv">
                            <h3>HEADPHONES</h3>
                            <div><a href="/headphones">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="categoriesCard">
                        <div className="categoriesCard-imageContainer"><img src="/speaker.png" alt="" /></div>
                        <div className="categoriesCard-actionDiv">
                            <h3>SPEAKERS</h3>
                            <div><a href="/speakers">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="categoriesCard">
                        <div className="categoriesCard-imageContainer"><img src="/earphones.png" alt="" /></div>
                        <div className="categoriesCard-actionDiv">
                            <h3>EARPHONES</h3>
                            <div><a href="/earphones">SHOP</a>
                            <img className="categoriesCard-arrowIcon" src="/icon-arrow-right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
              </section>
                     
                     <section id="featuredItems-sectionContainer">
                      <div className="featuredItem-sectionOne grid">
                        <div className='featuredItem-sectionOne-imageDiv'>
                             <div className="featuredItem-imageDiv"><img src="/featured-speakerZX9.png" alt="" /></div>
                        </div>
                    
                        <div className='featuredItem-sectionOne-textDiv'>
                           <h2>ZX9 SPEAKER</h2>
                           <p>Upgrade to premium speakers that are phenominally built to deliver truly remarkable sounds</p>
                           <div  className="featuredItem-linkDiv"><a href="/productDetails/5">SEE PRODUCT</a></div>
                        </div>
                      </div>

                      <div className="featuredItem-sectionTwo grid">
                        <div className="featuredItem-sectionTwoTextDiv">
                            <h2>ZX7 SPEAKER</h2>
                            <div><a href="/productDetails/4">SEE PRODUCT</a></div>
                        </div>
                        <div className='featuredItem-sectionTwo-imageDiv'>
                            {/* <img src="/speakerZX7.jpg" alt="" /> */}
                        </div> 
                      </div>

                      <div className='featuredItem-sectionThreeXfour-container'>
                         <div className="featuredItem-sectionThree">
                           <img src="/featured-earbud.jpg" alt="" />
                         </div>

                        <div className="featuredItem-sectionFour">
                           <div className="featuredItem-sectionFourTextDiv">
                              <h2>YX1 EARPHONES</h2>
                              <div><a href="/productDetails/6">SEE PRODUCT</a></div>
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
                    <footer id="footer-container">
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
                                <div className='desktopFooter-projectName-container'><a href="/">soundnerd</a></div>
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
 
export default HomePage;