import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CreditCard, AlertCircle, CheckCircle2, Package, History, Settings2 } from 'lucide-react';

const SubscriptionManagement = () => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Same mock data as before
  const currentSubscription = {
    plan: 'Pro Plan',
    status: 'active',
    price: 79,
    billingCycle: 'monthly',
    nextBilling: '2024-11-25',
    features: ['Unlimited Access', 'Premium Support', 'API Access', 'Team Collaboration']
  };

  const subscriptionHistory = [
    {
      id: 1,
      date: '2024-09-25',
      amount: 29.99,
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2024-08-25',
      amount: 29.99,
      status: 'paid',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      date: '2024-07-25',
      amount: 19.99,
      status: 'paid',
      invoice: 'INV-2024-003',
      note: 'Plan upgraded'
    }
  ];

  const availablePlans = [
    {
      name: 'Basic',
      price: 0.0,
      features: ['Upto 5 projects', 'Basic analytics', '24/7 support']
    },
    {
      name: 'Pro Plan',
      price: 79,
      features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations']
    },
    {
      name: 'Brand Marketing',
      price: "Contact",
      features: ['Custom solutions', 'Dedicated support team', 'SLA guaranteed', 'API access']
    }
  ];

  const glassStyles = "backdrop-blur-md bg-opacity-20 border border-opacity-20 shadow-lg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-black p-8 text-gray-100">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-100">Manage Subscription</h1>
          <p className="text-gray-400">View and manage your subscription details and billing history</p>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className={`grid w-full max-w-md grid-cols-3 bg-black/20 ${glassStyles}`}>
            <TabsTrigger value="current" className="data-[state=active]:bg-purple-900/50">Current Plan</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-900/50">History</TabsTrigger>
            <TabsTrigger value="upgrade" className="data-[state=active]:bg-purple-900/50">Upgrade</TabsTrigger>
          </TabsList>

          {/* Current Subscription Tab */}
          <TabsContent value="current" className="space-y-6">
            <Card className={`bg-black/30 ${glassStyles} border-purple-900/50`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-100">Current Subscription</CardTitle>
                    <CardDescription className="text-gray-400">Your active subscription details</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-green-400 bg-green-900/30 backdrop-blur-sm">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Plan</div>
                    <div className="font-medium text-gray-100">{currentSubscription.plan}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Price</div>
                    <div className="font-medium text-gray-100">${currentSubscription.price}/month</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Billing Cycle</div>
                    <div className="font-medium text-gray-100 capitalize">{currentSubscription.billingCycle}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Next Billing Date</div>
                    <div className="font-medium text-gray-100">{currentSubscription.nextBilling}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Features</div>
                  <div className="grid gap-2">
                    {currentSubscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-100">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowCancelDialog(true)} 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30 backdrop-blur-sm">
                  Cancel Subscription
                </Button>
                <Button className="bg-purple-800/80 hover:bg-purple-700/80 backdrop-blur-sm">
                  Update Payment Method
                </Button>
              </CardFooter>
            </Card>

            <Alert className={`bg-black/30 ${glassStyles} border-blue-900/50`}>
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-gray-300">
                Your next billing date is {currentSubscription.nextBilling}. You can cancel anytime before this date.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className={`bg-black/30 ${glassStyles} border-purple-900/50`}>
              <CardHeader>
                <CardTitle className="text-gray-100">Billing History</CardTitle>
                <CardDescription className="text-gray-400">View your past transactions and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionHistory.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${glassStyles} bg-black/20 hover:bg-purple-900/20`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-100">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>{transaction.date}</span>
                        </div>
                        <div className="text-sm text-gray-400">{transaction.invoice}</div>
                        {transaction.note && (
                          <div className="text-sm text-purple-400">{transaction.note}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-100">${transaction.amount}</span>
                        <Badge variant="secondary" className={`capitalize bg-black/30 ${glassStyles} text-purple-300`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upgrade Tab */}
          <TabsContent value="upgrade">
            <div className="grid gap-6 md:grid-cols-3">
              {availablePlans.map((plan) => (
                <Card key={plan.name} className={`relative ${glassStyles} bg-black/30 border-purple-900/50 ${
                  plan.name === currentSubscription.plan ? 'border-2 border-purple-500/50' : ''
                }`}>
                  {plan.name === currentSubscription.plan && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-800/80 backdrop-blur-sm">Current Plan</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-gray-100">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">${plan.price}/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-100">
                          <CheckCircle2 className="w-4 h-4 text-purple-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full backdrop-blur-sm ${plan.name === currentSubscription.plan ? 
                        'border-purple-500/50 text-purple-300 hover:bg-purple-900/30' : 
                        'bg-purple-800/80 hover:bg-purple-700/80'}`}
                      variant={plan.name === currentSubscription.plan ? 'outline' : 'default'}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {plan.name === currentSubscription.plan ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Cancel Subscription Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className={`${glassStyles} bg-black/50 border-purple-900/50`}>
            <DialogHeader>
              <DialogTitle className="text-gray-100">Cancel Subscription</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your current billing period.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Alert variant="destructive" className={`bg-red-950/30 ${glassStyles} border-red-900/50`}>
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  Your subscription will remain active until {currentSubscription.nextBilling}
                </AlertDescription>
              </Alert>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowCancelDialog(false)} 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30 backdrop-blur-sm">
                  Keep Subscription
                </Button>
                <Button variant="destructive" className="bg-red-800/80 hover:bg-red-700/80 backdrop-blur-sm">
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upgrade Confirmation Dialog */}
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent className={`${glassStyles} bg-black/50 border-purple-900/50`}>
            <DialogHeader>
              <DialogTitle className="text-gray-100">Upgrade to {selectedPlan?.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                You're about to upgrade to the {selectedPlan?.name} plan at ${selectedPlan?.price}/month.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Alert className={`bg-black/30 ${glassStyles} border-blue-900/50`}>
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-gray-300">
                  Your new billing cycle will start immediately upon upgrade.
                </AlertDescription>
              </Alert>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setSelectedPlan(null)} 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30 backdrop-blur-sm">
                  Cancel
                </Button>
                <Button className="bg-purple-800/80 hover:bg-purple-700/80 backdrop-blur-sm">
                  Confirm Upgrade
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubscriptionManagement;