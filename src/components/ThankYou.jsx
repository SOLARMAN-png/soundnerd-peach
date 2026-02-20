
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('lastOrder');
        if (stored) {
            const parsed = JSON.parse(stored);
            setOrder(parsed);
            // fetch product DB to enrich item data if needed
            fetch('/data/db.json')
                .then(res => res.json())
                .then(data => setProducts(data.products || []))
                .catch(() => setProducts([]));
            // keep lastOrder for a short time or clear it now depending on desired UX
            // we'll remove it so refreshing doesn't re-show the same order
            localStorage.removeItem('lastOrder');
        }
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
    };

    if (!order) {
        return (
            <div className="thankYou-Container">
                <div className='thankYou-confirmationImageDiv'><img src="/icon-order-confirmation.svg" alt="" /></div>
                <h1>Thank You for your order</h1>
                <p>You will receive an email confirmation shortly.</p>
                <div className="thankYou-contentDiv">
                    <div className="thankYou-itemDetail-div">
                        <div  className="thankYou-itemDetail-div-containerOne">
                            <div className="thankYou-imageDiv"><img src="" alt="" /></div>
                            <div className='thankYou-infoDiv'>
                                <h2>Name of first item here</h2>
                                <h3>price here</h3>
                            </div>
                            <p>quantity here</p>
                        </div>
                        <div className="thankYou-itemDetail-div-containerTwo">Number of other item(s) will go here</div>
                    </div>
                    <div className="thankYou-grandTotalDiv">
                        <h2>GRAND TOTAL</h2>
                        <h3>Amount here</h3>
                    </div>
                </div>

                <div className='thankYou-backToHome-div'><Link to="/">BACK TO HOME</Link></div>

            </div>
        );
    }

    // enrich items with product DB if possible
    const enrichedItems = order.items.map(it => {
        const prod = products.find(p => String(p.id) === String(it.id));
        return {
            id: it.id,
            name: prod ? prod.name : it.name,
            image: prod ? (prod.image || prod.gallery?.first) : (it.image || ''),
            price: prod ? prod.price : it.price,
            quantity: it.quantity || 1
        };
    });

    const firstItem = enrichedItems.length ? enrichedItems[0] : null;
    const othersCount = Math.max(0, enrichedItems.length - 1);
    const grandTotal = order.total || enrichedItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

    return (
        <div className="thankYou-Container">
            <div className='thankYou-confirmationImageDiv'><img src="/icon-order-confirmation.svg" alt="" /></div>
            <h1>Thank You for your order</h1>
            <p>You will receive an email confirmation shortly.</p>
            <div className="thankYou-contentDiv">
                <div className="thankYou-itemDetail-div">
                    <div  className="thankYou-itemDetail-div-containerOne">
                        <div  className='thankYou-itemDetail-div-containerOne-mainDiv'>
                            <div className="thankYou-imageDiv"><img src={firstItem?.image || ''} alt={firstItem?.name || ''} /></div>
                            <div className='thankYou-infoDiv'>
                            <h2>{firstItem?.name || 'Item'}</h2>
                            <h3>{formatCurrency(firstItem?.price)}</h3>
                            </div>
                        </div>
                       
                        <p>{firstItem?.quantity || 1}x</p>
                    </div>

                    <div className="thankYou-itemDetail-div-containerTwo">
                        {othersCount > 0 ? `and ${othersCount} other item${othersCount > 1 ? 's' : ''}` : 'No other items'}
                    </div>
                </div>
                <div className="thankYou-grandTotalDiv">
                    <h2>GRAND TOTAL</h2>
                    <h3>{formatCurrency(grandTotal)}</h3>
                </div>
            </div>

            <div className='thankYou-backToHome-div'><Link to="/">BACK TO HOME</Link></div>

        </div>
    );
}

export default ThankYouPage;