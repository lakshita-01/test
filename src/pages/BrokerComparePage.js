import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts";
import { StarIcon } from "@heroicons/react/24/solid";
import { Container, Typography, Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

// Mock Data
const activeClients = [
  { name: "Jan", Angel: 120, Zerodha: 100 },
  { name: "Feb", Angel: 140, Zerodha: 130 },
  { name: "Mar", Angel: 160, Zerodha: 145 },
  { name: "Apr", Angel: 175, Zerodha: 150 },
  { name: "May", Angel: 155, Zerodha: 170 },
  { name: "Jun", Angel: 180, Zerodha: 160 }
];

const complaintsData = [
  { name: "Angel One", Complaints: 10 },
  { name: "Zerodha", Complaints: 6 }
];

const shareHolding = [
  { name: "Promoters", value: 55 },
  { name: "FIIs", value: 25 },
  { name: "DIIs", value: 10 },
  { name: "Public", value: 10 }
];

const shareDistribution = [
  { category: "HNI", value: 22 },
  { category: "Retail", value: 50 },
  { category: "Corporate", value: 28 }
];

const ratings = [
  { label: "App", value: 4.7 },
  { label: "Broker", value: 4.5 },
  { label: "Website", value: 4.6 },
  { label: "Support", value: 4.4 }
];

const financials = [
  { year: "2020", Angel: 120, Zerodha: 100 },
  { year: "2021", Angel: 145, Zerodha: 120 },
  { year: "2022", Angel: 180, Zerodha: 150 },
  { year: "2023", Angel: 210, Zerodha: 200 }
];

const brokerages = [
  { title: "Equity Delivery", angel: "₹0", zerodha: "₹0" },
  { title: "Equity Intraday", angel: "₹20/trade", zerodha: "₹20/trade" },
  { title: "Equity Futures", angel: "₹20/trade", zerodha: "₹20/trade" },
  { title: "Options", angel: "₹20/trade", zerodha: "₹20/trade" },
  { title: "Currency Futures/Options", angel: "₹20/trade", zerodha: "₹20/trade" }
];

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f7f8ff 0%, #e8f2ff 50%, #f0f8ff 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
    marginBottom: theme.spacing(2.5),
  },
}));

function Star({ filled }) {
  return (
    <StarIcon className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`} />
  );
}

function ComparisonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-tr from-blue-50 to-blue-100 p-6 rounded-2xl shadow flex flex-col items-center">
        <span className="text-5xl font-extrabold text-blue-700">4.7</span>
        <div className="mt-2 text-gray-700 font-semibold">Angel One</div>
        <button className="mt-5 px-8 py-2 text-sm font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
          Open Account
        </button>
      </div>
      <div className="bg-gradient-to-tr from-orange-50 to-orange-100 p-6 rounded-2xl shadow flex flex-col items-center">
        <span className="text-5xl font-extrabold text-orange-600">4.6</span>
        <div className="mt-2 text-gray-700 font-semibold">Zerodha</div>
        <button className="mt-5 px-8 py-2 text-sm font-bold rounded-full bg-orange-500 text-white hover:bg-orange-700 transition">
          Open Account
        </button>
      </div>
    </div>
  );
}

function ActiveClientsChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="font-semibold text-lg mb-3">Active Clients (in thousands)</h3>
      <ResponsiveContainer height={230}>
        <LineChart data={activeClients}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Angel" stroke="#2563eb" strokeWidth={3} />
          <Line type="monotone" dataKey="Zerodha" stroke="#f59e42" strokeWidth={3} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChargesTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="font-semibold text-lg mb-4">Account Opening & Maintenance Charges</h3>
      <table className="min-w-full text-center">
        <thead>
          <tr className="text-gray-600 bg-gray-100">
            <th className="p-3">Charges</th>
            <th className="p-3">Angel One</th>
            <th className="p-3">Zerodha</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          <tr>
            <td className="border-t py-2">Account Opening</td>
            <td className="border-t py-2">₹0</td>
            <td className="border-t py-2">₹200</td>
          </tr>
          <tr>
            <td className="border-t py-2">AMC (Yearly)</td>
            <td className="border-t py-2">₹240</td>
            <td className="border-t py-2">₹300</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BrokerageChargesCards() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="font-semibold text-lg mb-4">Brokerage Charges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokerages.map((item, idx) => (
          <div key={item.title} className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
            <div className="text-md font-medium mb-2">{item.title}</div>
            <div className="flex gap-6 mb-1">
              <div>
                <div className="text-xs text-gray-400">Angel</div>
                <div className="text-blue-600 font-bold">{item.angel}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Zerodha</div>
                <div className="text-orange-500 font-bold">{item.zerodha}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplaintsChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
      <h3 className="font-semibold text-lg mb-4">SEBI Registered Complaints</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={complaintsData}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="Complaints" fill="#E11D48" radius={8}>
            <Cell key="bar-0" fill="#2563eb" />
            <Cell key="bar-1" fill="#f59e42" />
          </Bar>
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ShareHoldingChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
      <h3 className="font-semibold text-lg mb-4">Shareholding Pattern (%)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie 
            data={shareHolding} 
            cx="50%" 
            cy="50%" 
            innerRadius={50} 
            outerRadius={80} 
            dataKey="value" 
            label={d => d.name}
          >
            <Cell fill="#2563eb" />
            <Cell fill="#22c55e" />
            <Cell fill="#f59e42" />
            <Cell fill="#6366f1" />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ShareDistributionChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
      <h3 className="font-semibold text-lg mb-4">Share Distribution</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={shareDistribution}>
          <XAxis dataKey="category" />
          <YAxis />
          <Bar dataKey="value" fill="#f59e42" radius={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProsAndCons() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="font-semibold text-lg mb-3">Pros & Cons</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-green-600 mb-2">Pros</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Zero delivery brokerage</li>
            <li>Robust mobile app</li>
            <li>Wide research support</li>
            <li>Fast account opening</li>
          </ul>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-red-600 mb-2">Cons</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>AMC applicable</li>
            <li>Extra charges for certain segments</li>
            <li>High call & trade charge</li>
            <li>No free call support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function RatingsCards() {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {ratings.map((item, idx) => (
        <div key={item.label} className="flex flex-col items-center flex-1 min-w-[140px] bg-white shadow rounded-xl p-4">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => <Star key={n} filled={item.value >= n-0.5} />)}
          </div>
          <span className="text-2xl font-bold mt-2">{item.value}</span>
          <span className="text-xs text-gray-500 mt-1 capitalize">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function FinancialsChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="font-semibold text-lg mb-4">Company Financials (₹Cr Revenue)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={financials}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="year" />
          <YAxis />
          <Legend />
          <Bar dataKey="Angel" fill="#2563eb" radius={8} />
          <Bar dataKey="Zerodha" fill="#f59e42" radius={8} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function BrokerComparePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageContainer>
      <SectionContainer maxWidth="xl">
        <PageTitle variant="h2" component="h1">
          Angel One vs Zerodha
        </PageTitle>
        
        <div className="font-sans bg-transparent">
          <ComparisonCards />
          <ActiveClientsChart />
          <ChargesTable />
          <BrokerageChargesCards />
          <ComplaintsChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ShareHoldingChart />
            <ShareDistributionChart />
          </div>
          <ProsAndCons />
          <RatingsCards />
          <FinancialsChart />
        </div>
      </SectionContainer>
    </PageContainer>
  );
}