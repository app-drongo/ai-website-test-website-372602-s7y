'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Zap, Shield, GitBranch } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Built for Technical Teams',
  sectionDescription:
    'Developer-focused tools and infrastructure designed for modern engineering workflows',
  features: [
    {
      id: '1',
      icon: 'Code2',
      title: 'Type-Safe Development',
      description:
        'Full TypeScript support with strict mode validation and intelligent code completion',
      badge: 'Core',
    },
    {
      id: '2',
      icon: 'Zap',
      title: 'Lightning Fast Builds',
      description:
        'Optimized build pipeline with hot reload and incremental compilation for rapid iteration',
      badge: 'Performance',
    },
    {
      id: '3',
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Built-in security scanning, dependency auditing, and compliance reporting',
      badge: 'Security',
    },
    {
      id: '4',
      icon: 'GitBranch',
      title: 'Git-First Workflow',
      description: 'Seamless integration with version control and automated deployment pipelines',
      badge: 'DevOps',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const icons = {
      Code2: Code2,
      Zap: Zap,
      Shield: Shield,
      GitBranch: GitBranch,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Code2;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionDescription">{config.sectionDescription}</span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-muted/50 text-muted-foreground rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="text-2xl font-bold text-foreground mb-2">99.9%</div>
                <div className="text-sm">Uptime SLA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-2">&lt;100ms</div>
                <div className="text-sm">API Response</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-sm">Developer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
