import { useLanguage } from '@/contexts/LanguageContext';
import privacyData from '@/data/privacy-policy.json';
import { Shield, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const text = language === 'english' 
    ? privacyData.textEnglish 
    : privacyData.textHindi;

  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-card rounded-xl shadow-lg p-8 md:p-12 border border-border">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {language === 'english' ? 'Privacy Policy' : 'गोपनीयता नीति'}
                </h2>
              </div>
              <ChevronDown 
                className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="prose prose-lg max-w-none">
              {text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </section>
  );
};

export default PrivacyPolicy;
