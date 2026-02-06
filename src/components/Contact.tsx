import { useLanguage } from '@/contexts/LanguageContext';
import contactData from '@/data/contact.json';
import { Mail, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const Contact = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const text = language === 'english' 
    ? contactData.textEnglish 
    : contactData.textHindi;

  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-card rounded-xl shadow-lg p-8 md:p-12 border border-border">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {language === 'english' ? 'Contact' : 'संपर्क'}
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
                  {paragraph.includes('sakshamkhowala@gmail.com') ? (
                    <>
                      {paragraph.split('sakshamkhowala@gmail.com')[0]}
                      <a href="mailto:sakshamkhowala@gmail.com" className="text-primary hover:underline">
                        sakshamkhowala@gmail.com
                      </a>
                      {paragraph.split('sakshamkhowala@gmail.com')[1]}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </section>
  );
};

export default Contact;
