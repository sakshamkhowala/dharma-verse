import { useLanguage } from '@/contexts/LanguageContext';
import introductionData from '@/data/introduction.json';
import { Book } from 'lucide-react';

const Introduction = () => {
  const { language } = useLanguage();
  
  const text = language === 'english' 
    ? introductionData.textEnglish 
    : introductionData.textHindi;

  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-card rounded-xl shadow-lg p-8 md:p-12 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Book className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            {language === 'english' ? 'Introduction' : 'परिचय'}
          </h2>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {text.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
