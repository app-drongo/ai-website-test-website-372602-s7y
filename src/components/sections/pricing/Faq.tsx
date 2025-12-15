'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our unified deployment platform',
  ctaText: 'Still have questions?',
  ctaHref: '/contact',
  faqs: [
    {
      question: 'What is unified deployment?',
      answer:
        'Unified deployment is a streamlined approach that consolidates your entire deployment pipeline into a single, cohesive platform. It eliminates the complexity of managing multiple tools and provides end-to-end visibility across your infrastructure.',
    },
    {
      question: 'How does it integrate with existing infrastructure?',
      answer:
        'Our platform seamlessly integrates with your current CI/CD tools, cloud providers, and monitoring systems through robust APIs and pre-built connectors. No need to rebuild your entire workflow - we enhance what you already have.',
    },
    {
      question: 'What are the pricing tiers?',
      answer:
        'We offer flexible pricing based on your deployment volume and team size. Our Starter plan begins at $29/month for small teams, with Enterprise solutions available for larger organizations requiring advanced features and dedicated support.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {config.faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg font-semibold text-card-foreground pr-4">
                      <span data-editable={`faqs[${index}].question`}>{faq.question}</span>
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 pt-0"
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                    >
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          <span data-editable={`faqs[${index}].answer`}>{faq.answer}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            <span data-editable="ctaText">{config.ctaText}</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you get the most out of unified deployment.
          </p>
          <Button
            onClick={handleCTAClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
