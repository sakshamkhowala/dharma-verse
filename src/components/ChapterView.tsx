import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBookmarks } from '@/contexts/BookmarkContext';
import chaptersData from '@/data/chapters.json';

interface ChapterViewProps {
  chapterId: number;
  onBack: () => void;
}

interface Verse {
  id: number;
  number: number;
  textEnglish: string;
  textHindi: string;
}

const ChapterView = ({ chapterId, onBack }: ChapterViewProps) => {
  const { language } = useLanguage();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const chapter = chaptersData.find(c => c.id === chapterId);

  useEffect(() => {
    const loadVerses = async () => {
      setLoading(true);
      try {
        const data = await import(`@/data/verses/chapter${chapterId}.json`);
        setVerses(data.default.verses || data.default);
        
        // Load last read position
        const lastRead = localStorage.getItem(`gita-chapter-${chapterId}-verse`);
        if (lastRead) {
          setCurrentVerseIndex(parseInt(lastRead));
        } else {
          setCurrentVerseIndex(0);
        }
      } catch (error) {
        console.error('Error loading verses:', error);
        setVerses([]);
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, [chapterId]);

  useEffect(() => {
    if (verses.length > 0) {
      localStorage.setItem(`gita-chapter-${chapterId}-verse`, currentVerseIndex.toString());
    }
  }, [currentVerseIndex, chapterId, verses.length]);

  const currentVerse = verses[currentVerseIndex];
  const canGoPrev = currentVerseIndex > 0;
  const canGoNext = currentVerseIndex < verses.length - 1;

  const handlePrevious = () => {
    if (canGoPrev) {
      setCurrentVerseIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentVerseIndex(prev => prev + 1);
    }
  };

  const handleToggleBookmark = () => {
    if (currentVerse) {
      toggleBookmark(chapterId, currentVerse.id, currentVerse.number);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🕉️</div>
          <p className="text-muted-foreground">Loading verses...</p>
        </div>
      </div>
    );
  }

  if (!chapter || !currentVerse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Chapter not found</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const bookmarked = isBookmarked(chapterId, currentVerse.id);

  return (
    <div className="min-h-screen pb-20 fade-in">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'english' ? 'Back to Chapters' : 'अध्यायों पर वापस जाएं'}
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Chapter Header */}
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">
                {language === 'english' ? 'Chapter' : 'अध्याय'} {chapter.number}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {language === 'english' ? chapter.nameEnglish : chapter.nameHindi}
            </h2>
            <p className="text-muted-foreground">
              {language === 'english' ? chapter.translationEnglish : chapter.translationHindi}
            </p>
            <div className="sacred-divider my-6"></div>
          </div>

          {/* Verse Card */}
          <div className="verse-card mb-8 relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                  {currentVerse.number}
                </div>
                <span className="text-sm text-muted-foreground">
                  {language === 'english' ? 'Verse' : 'श्लोक'} {currentVerse.number}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleBookmark}
                className={`hover:bg-primary/10 ${bookmarked ? 'bookmark-pulse' : ''}`}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Bookmark
                  className={`h-5 w-5 ${bookmarked ? 'fill-primary text-primary' : ''}`}
                />
              </Button>
            </div>

            <div className={`verse-text ${language === 'hindi' ? 'font-hindi' : ''}`}>
              {language === 'english' ? currentVerse.textEnglish : currentVerse.textHindi}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={!canGoPrev}
              className="hover:bg-primary/10"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {language === 'english' ? 'Previous' : 'पिछला'}
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentVerseIndex + 1} / {verses.length}
            </span>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={!canGoNext}
              className="hover:bg-primary/10"
            >
              {language === 'english' ? 'Next' : 'अगला'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterView;
