import React, { useState, useEffect } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  shares: number;
  totalValue: number;
  logoUrl: string;
  sector: string;
}

const StocksWidget: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 185.25,
      change: 2.15,
      changePercent: 1.17,
      shares: 15,
      totalValue: 2778.75,
      logoUrl: 'https://logo.clearbit.com/apple.com',
      sector: 'Technology'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: 5.30,
      changePercent: 2.18,
      shares: 8,
      totalValue: 1988.00,
      logoUrl: 'https://logo.clearbit.com/tesla.com',
      sector: 'Automotive'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 875.30,
      change: 12.45,
      changePercent: 1.44,
      shares: 3,
      totalValue: 2625.90,
      logoUrl: 'https://logo.clearbit.com/nvidia.com',
      sector: 'Technology'
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
  
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatChange = (change: number, changePercent: number): { text: string; color: string; icon: string } => {
    const isPositive = change >= 0;
    return {
      text: `${isPositive ? '+' : ''}${changePercent.toFixed(1)}%`,
      color: isPositive ? '#00C851' : '#FF4444',
      icon: isPositive ? '▲' : '▼'
    };
  };
  
  const getTotalPortfolioValue = (): number => {
    return stocks.reduce((total, stock) => total + stock.totalValue, 0);
  };
  
  const getTotalPortfolioChange = (): number => {
    const totalValue = getTotalPortfolioValue();
    const totalChange = stocks.reduce((total, stock) => {
      const dailyChange = (stock.change * stock.shares);
      return total + dailyChange;
    }, 0);
    return (totalChange / (totalValue - totalChange)) * 100;
  };

  const currentStock = stocks[currentIndex];

  const totalPortfolioValue = getTotalPortfolioValue();
  const totalPortfolioChange = getTotalPortfolioChange();
  const changeColorClass = totalPortfolioChange >= 0 ? 'text-green' : 'text-red';
  
  return (
    <div className="widget stocks-widget">
      {/* Label */}
      <div className="label mb-xs">Portfolio</div>
      
      {/* Total value */}
      <div className="heading-md mb-xs">
        {formatValue(totalPortfolioValue)}
      </div>
      
      {/* Change */}
      <div className={`body-lg mb-md flex items-center gap-xs ${changeColorClass}`}>
        <span>{totalPortfolioChange >= 0 ? '↑' : '↓'}</span>
        <span>{totalPortfolioChange >= 0 ? '+' : ''}{totalPortfolioChange.toFixed(1)}%</span>
      </div>
      
      {/* Current stock */}
      {currentStock && (
        <div>
          <div className="body-base mb-xs">
            {currentStock.symbol} • {currentStock.shares} shares
          </div>
          <div className="body-sm">
            {formatPrice(currentStock.price)} • {formatChange(currentStock.change, currentStock.changePercent).text}
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksWidget;