import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Introduction from '@/components/Introduction';
import ChapterList from '@/components/ChapterList';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import About from '@/components/About';
import ChapterView from '@/components/ChapterView';
import BookmarkPanel from '@/components/BookmarkPanel';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { BookmarkProvider } from '@/contexts/BookmarkContext';

type View = 'home' | 'chapter';

const Index = () => {
  const [view, setView] = useState<View>('home');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [bookmarkPanelOpen, setBookmarkPanelOpen] = useState(false);

  const handleChapterSelect = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setView('chapter');
  };

  const handleBack = () => {
    setView('home');
    setSelectedChapter(null);
  };

  const handleBookmarkNavigate = (chapterId: number, verseId: number) => {
    setSelectedChapter(chapterId);
    setView('chapter');
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BookmarkProvider>
          <div className="min-h-screen bg-background">
            <Header onBookmarksClick={() => setBookmarkPanelOpen(true)} />
            
            {view === 'home' ? (
              <>
                <HeroSection />
                <Introduction />
                <ChapterList onChapterSelect={handleChapterSelect} />
                <About />
                <PrivacyPolicy />
              </>
            ) : (
              selectedChapter && (
                <ChapterView chapterId={selectedChapter} onBack={handleBack} />
              )
            )}

            <BookmarkPanel
              isOpen={bookmarkPanelOpen}
              onClose={() => setBookmarkPanelOpen(false)}
              onNavigate={handleBookmarkNavigate}
            />
          </div>
        </BookmarkProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
