'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_PRICING = {
  title: 'Simple, transparent pricing',
  subtitle: 'Choose the plan that works for your team',
  billingToggle: true,
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      features: [
        'Up to 5 deployments per month',
        'Basic monitoring & analytics',
        'Community support',
      ],
      ctaText: 'Start free trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      name: 'Pro',
      description: 'For growing teams that need more power',
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        'Unlimited deployments',
        'Advanced monitoring & alerts',
        'Priority support',
        'Custom domains',
      ],
      ctaText: 'Start free trial',
      ctaHref: '/signup?plan=pro',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      popular: false,
      features: [
        'Everything in Pro',
        'SSO & advanced security',
        'Dedicated support',
        'Custom integrations',
      ],
      ctaText: 'Contact sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
  faqTitle: 'Frequently asked questions',
  faqs: [
    {
      question: 'Can I change plans anytime?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'All plans come with a 14-day free trial. No credit card required to get started.',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(true);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[checked]:bg-primary"
                data-checked={isYearly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /month {isYearly && '(billed yearly)'}
                  </span>
                </div>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  variant={plan.popular ? 'default' : 'outline'}
                  className="w-full"
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span data-editable={`plans[${idx}].features[${featureIdx}]`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span data-editable="faqTitle">{config.faqTitle}</span>
          </h2>

          <div className="space-y-6">
            {config.faqs.map((faq, idx) => (
              <Card key={idx} className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
