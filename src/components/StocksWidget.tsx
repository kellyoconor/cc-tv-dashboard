import React, { useState, useEffect } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StocksWidget: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 185.25,
      change: 2.15,
      changePercent: 1.17
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.80,
      change: -1.25,
      changePercent: -0.87
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: 5.30,
      changePercent: 2.18
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 378.90,
      change: 1.45,
      changePercent: 0.38
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate real-time stock updates
  useEffect(() => {
    const updateStocks = () => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2; // -1 to 1
          const newPrice = Math.max(stock.price + randomChange, 0.01);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2))
          };
        })
      );
    };

    // Update every 5 seconds (simulated)
    const stockTimer = setInterval(updateStocks, 5000);
    
    return () => clearInterval(stockTimer);
  }, []);

  // Cycle through stocks every 8 seconds
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stocks.length);
    }, 8000);

    return () => clearInterval(cycleTimer);
  }, [stocks.length]);

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const formatChange = (change: number, changePercent: number): { text: string; color: string; icon: string } => {
    const isPositive = change >= 0;
    return {
      text: `${isPositive ? '+' : ''}${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`,
      color: isPositive ? 'var(--success)' : 'var(--error)',
      icon: isPositive ? '📈' : '📉'
    };
  };

  const currentStock = stocks[currentIndex];

  return (
    <div className="widget stocks-widget">
      <div className="widget-title">Market Watch</div>
      
      {currentStock && (
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: '300',
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--primary-text)'
          }}>
            {currentStock.symbol}
          </div>
          
          <div style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: '100',
            marginBottom: 'var(--spacing-lg)'
          }}>
            {formatPrice(currentStock.price)}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)',
            fontSize: 'var(--font-size-md)',
            color: formatChange(currentStock.change, currentStock.changePercent).color,
            fontWeight: '300'
          }}>
            <span>{formatChange(currentStock.change, currentStock.changePercent).icon}</span>
            <span>{currentStock.changePercent.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksWidget;