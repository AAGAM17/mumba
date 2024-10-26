import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, LineChart, Line,
  PieChart, Pie, ScatterChart, Scatter, ComposedChart, 
  PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, 
  ResponsiveContainer, Tooltip, Legend, Cell
} from 'recharts';
import { Button } from '@/components/ui/button';

const Chart = () => {
  // Sample vehicle data
  const vehicleData = [
    { year: 2020, make: 'Toyota', model: 'Camry', trim: 'LE', body: 'Sedan', transmission: 'Automatic', vin: '1HGBH41JXMN109186', state: 'NY', condition: 'New', odometer: 1000, color: 'Blue', interior: 'Black', seller: 'Dealer', mmr: 22000, sellingPrice: 21000, saleDate: '2021-08-01' },
    { year: 2019, make: 'Honda', model: 'Civic', trim: 'EX', body: 'Sedan', transmission: 'Manual', vin: '2HGBH41JXMN109186', state: 'CA', condition: 'Used', odometer: 20000, color: 'Red', interior: 'Gray', seller: 'Private', mmr: 18000, sellingPrice: 17500, saleDate: '2021-06-15' },
    { year: 2021, make: 'Ford', model: 'F-150', trim: 'XLT', body: 'Truck', transmission: 'Automatic', vin: '3HGBH41JXMN109186', state: 'TX', condition: 'Used', odometer: 15000, color: 'Black', interior: 'Beige', seller: 'Dealer', mmr: 30000, sellingPrice: 29500, saleDate: '2021-07-20' },
    { year: 2018, make: 'Chevrolet', model: 'Malibu', trim: 'LT', body: 'Sedan', transmission: 'Automatic', vin: '4HGBH41JXMN109186', state: 'FL', condition: 'Used', odometer: 25000, color: 'Silver', interior: 'Black', seller: 'Dealer', mmr: 16000, sellingPrice: 15500, saleDate: '2021-05-10' },
    { year: 2022, make: 'Tesla', model: 'Model 3', trim: 'Standard Range Plus', body: 'Sedan', transmission: 'Automatic', vin: '5HGBH41JXMN109186', state: 'IL', condition: 'New', odometer: 500, color: 'White', interior: 'Black', seller: 'Dealer', mmr: 35000, sellingPrice: 34000, saleDate: '2021-09-15' },
    { year: 2017, make: 'Nissan', model: 'Altima', trim: 'SV', body: 'Sedan', transmission: 'Automatic', vin: '6HGBH41JXMN109186', state: 'NV', condition: 'Used', odometer: 30000, color: 'Gray', interior: 'Tan', seller: 'Private', mmr: 15000, sellingPrice: 14000, saleDate: '2021-10-20' },
  ];

  const monthlyData = vehicleData.reduce((acc, curr) => {
    const month = new Date(curr.saleDate).toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.name === month);
    if (existing) {
      existing.sales += 1;
      existing.revenue += curr.sellingPrice;
      existing.profit += curr.mmr - curr.sellingPrice;
    } else {
      acc.push({ name: month, sales: 1, revenue: curr.sellingPrice, profit: curr.mmr - curr.sellingPrice });
    }
    return acc;
  }, []);

  // Sample data for vehicle conditions
  const conditionData = vehicleData.reduce((acc, curr) => {
    const existing = acc.find(item => item.condition === curr.condition);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ condition: curr.condition, value: 1 });
    }
    return acc;
  }, []);

  // Sample data for vehicle makes
  const makeData = vehicleData.reduce((acc, curr) => {
    const existing = acc.find(item => item.make === curr.make);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ make: curr.make, value: 1 });
    }
    return acc;
  }, []);

  // Sample data for selling prices
  const priceData = vehicleData.map(vehicle => ({ name: vehicle.make, price: vehicle.sellingPrice }));

  // Sample data for body types
  const bodyData = vehicleData.reduce((acc, curr) => {
    const existing = acc.find(item => item.body === curr.body);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ body: curr.body, value: 1 });
    }
    return acc;
  }, []);

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="space-y-8 p-4 bg-gray-50">
      {/* Monthly Trends */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Monthly Trends</h2>
              <p className="text-gray-600 leading-relaxed">
                This chart displays the number of vehicles sold, revenue generated, and profit over the months, showcasing sales performance throughout the year.
              </p>
            </div>
            <div className="order-1 md:order-2 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#1E40AF" />
                  <Line type="monotone" dataKey="revenue" stroke="#5B21B6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Condition Distribution */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conditionData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {conditionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#1E40AF', '#5B21B6'][index % 2]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Condition Distribution</h2>
              <p className="text-gray-600 leading-relaxed">
                This pie chart shows the distribution of vehicle conditions (New vs. Used) in our inventory, highlighting the proportion of each condition category.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Make Distribution */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={makeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="make" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1E40AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Make Distribution</h2>
              <p className="text-gray-600 leading-relaxed">
                This bar chart illustrates the distribution of vehicles by make, providing insights into our most popular brands in the inventory.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selling Price Distribution */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis dataKey="name" name="Make" />
                  <YAxis dataKey="price" name="Selling Price" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Selling Price" data={priceData} fill="#1E40AF" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Selling Price Distribution</h2>
              <p className="text-gray-600 leading-relaxed">
                This scatter plot shows the selling prices of vehicles by make, providing a visual representation of price trends among different brands.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Body Type Distribution */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bodyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="body" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#5B21B6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Body Type Distribution</h2>
              <p className="text-gray-600 leading-relaxed">
                This bar chart displays the distribution of vehicles by body type (Sedan, Truck, etc.), highlighting the diversity of our inventory.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Dashboard Button */}
      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleBackToDashboard}
          className="bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Chart;