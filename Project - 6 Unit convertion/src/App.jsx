import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CATEGORIES } from './data/categories';
import { convertValue, convertToAllUnits } from './utils/convertEngine';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCurrencyRates } from './hooks/useCurrencyRates';
import { createSpeechRecognizer, isSpeechSupported } from './utils/speech';

import { Header } from './components/Header';
import { SmartSearchInput } from './components/SmartSearchInput';
import { CategorySelector } from './components/CategorySelector';
import { MainConverter } from './components/MainConverter';
import { MultiUnitView } from './components/MultiUnitView';
import { HistoryPanel } from './components/HistoryPanel';
import { FavoritesPanel } from './components/FavoritesPanel';

import { CookingConverter } from './components/CookingConverter';
import { ConstructionConverter } from './components/ConstructionConverter';
import { DeveloperConverter } from './components/DeveloperConverter';
import { TimeZoneConverter } from './components/TimeZoneConverter';
import { CityDistanceCalculator } from './components/CityDistanceCalculator';
import { ShoppingPriceConverter } from './components/ShoppingPriceConverter';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { GamifiedQuizPanel } from './components/GamifiedQuizPanel';

import { CustomUnitModal } from './components/CustomUnitModal';
import { ImageConverterModal } from './components/ImageConverterModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ShareModal } from './components/ShareModal';
import { SearchUnitModal } from './components/SearchUnitModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { Toast } from './components/Toast';

import {
  Calculator,
  ChefHat,
  HardHat,
  Code,
  Globe,
  Navigation,
  ShoppingBag,
  BarChart3,
  Trophy
} from 'lucide-react';

export default function App() {
  // Theme state: light (Red & White) vs dark (Black & Red)
  const [theme, setTheme] = useLocalStorage('omni_converter_theme', 'light');
  
  // Navigation & Active View state
  const [activeTab, setActiveTab] = useState('main'); // 'main', 'cooking', 'construction', 'developer', 'timezone', 'distance', 'shopping', 'analytics', 'quiz'

  // Category & Units state
  const [activeCategory, setActiveCategory] = useState('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  
  // Settings, Custom Units & Storage
  const [precision, setPrecision] = useLocalStorage('omni_converter_precision', 4);
  const [history, setHistory] = useLocalStorage('omni_converter_history', []);
  const [favorites, setFavorites] = useLocalStorage('omni_converter_favorites', []);
  const [customUnits, setCustomUnits] = useLocalStorage('omni_custom_units', []);
  const [unlockedBadges, setUnlockedBadges] = useLocalStorage('omni_unlocked_badges', ['first_conv']);

  // Modals & Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isCustomUnitOpen, setIsCustomUnitOpen] = useState(false);
  const [isOCROpen, setIsOCROpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // UI Toast & Speech
  const [toastMessage, setToastMessage] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Live Exchange Rates
  const { rates: currencyRates, isLive, lastUpdated } = useCurrencyRates();

  // Apply Theme Attribute to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // When active category changes, set default units
  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setActiveTab('main');
    const catMeta = CATEGORIES[catId];
    if (catMeta) {
      const keys = Object.keys(catMeta.units);
      setFromUnit(keys[0]);
      setToUnit(keys[1] || keys[0]);
    }
  };

  // Perform Live Main Calculation
  const conversionResult = useMemo(() => {
    return convertValue({
      value: inputValue,
      categoryId: activeCategory,
      fromUnitKey: fromUnit,
      toUnitKey: toUnit,
      currencyRates,
      customUnits,
      precision
    });
  }, [inputValue, activeCategory, fromUnit, toUnit, currencyRates, customUnits, precision]);

  // Perform Multi-Unit Breakdown Calculation
  const multiUnitList = useMemo(() => {
    return convertToAllUnits({
      value: inputValue,
      categoryId: activeCategory,
      fromUnitKey: fromUnit,
      currencyRates,
      customUnits,
      precision
    });
  }, [inputValue, activeCategory, fromUnit, currencyRates, customUnits, precision]);

  // Toast Helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Unlock Badge Helper
  const handleUnlockBadge = useCallback((badgeId) => {
    setUnlockedBadges((prev) => {
      if (prev.includes(badgeId)) return prev;
      return [...prev, badgeId];
    });
  }, [setUnlockedBadges]);

  // Copy Main Result to Clipboard
  const handleCopyResult = () => {
    if (!conversionResult.result) return;
    const cat = CATEGORIES[activeCategory];
    const toSymbol = cat?.units[toUnit]?.symbol || toUnit;
    const textToCopy = `${conversionResult.result} ${toSymbol}`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    showToast(`Copied: ${textToCopy}`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Swap Units
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Save to History
  const saveToHistory = useCallback(() => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return;

    const cat = CATEGORIES[activeCategory];
    const newItem = {
      id: Date.now().toString(),
      category: activeCategory,
      categoryName: cat ? cat.name : activeCategory,
      value: inputValue,
      fromUnit,
      fromSymbol: cat?.units[fromUnit]?.symbol || fromUnit,
      toUnit,
      toSymbol: cat?.units[toUnit]?.symbol || toUnit,
      result: conversionResult.result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 19)]);
    showToast('Saved conversion to History!');
  }, [inputValue, activeCategory, fromUnit, toUnit, conversionResult, setHistory, showToast]);

  // Restore item from History
  const handleRestoreHistory = (item) => {
    setActiveTab('main');
    setActiveCategory(item.category);
    setInputValue(item.value);
    setFromUnit(item.fromUnit);
    setToUnit(item.toUnit);
    showToast(`Restored ${item.value} ${item.fromSymbol} → ${item.toSymbol}`);
  };

  // Favorites Management
  const isCurrentFavorite = useMemo(() => {
    return favorites.some(
      (f) => f.category === activeCategory && f.fromUnit === fromUnit && f.toUnit === toUnit
    );
  }, [favorites, activeCategory, fromUnit, toUnit]);

  const handleToggleFavorite = () => {
    const cat = CATEGORIES[activeCategory];
    if (isCurrentFavorite) {
      setFavorites((prev) =>
        prev.filter(
          (f) => !(f.category === activeCategory && f.fromUnit === fromUnit && f.toUnit === toUnit)
        )
      );
      showToast('Removed from Favorites');
    } else {
      const newFav = {
        id: `${activeCategory}-${fromUnit}-${toUnit}`,
        category: activeCategory,
        categoryName: cat ? cat.name : activeCategory,
        fromUnit,
        fromUnitName: cat?.units[fromUnit]?.name || fromUnit,
        fromSymbol: cat?.units[fromUnit]?.symbol || fromUnit,
        toUnit,
        toUnitName: cat?.units[toUnit]?.name || toUnit,
        toSymbol: cat?.units[toUnit]?.symbol || toUnit
      };
      setFavorites((prev) => [newFav, ...prev]);
      showToast('Pinned to Favorites!');
    }
  };

  const handleLoadFavorite = (fav) => {
    setActiveTab('main');
    setActiveCategory(fav.category);
    setFromUnit(fav.fromUnit);
    setToUnit(fav.toUnit);
    showToast(`Loaded ${fav.fromUnitName} → ${fav.toUnitName}`);
  };

  // Smart Search NLP Parsing Handler
  const handleSmartParsedConversion = (parsed) => {
    setActiveTab('main');
    if (parsed.value) setInputValue(parsed.value);
    if (parsed.category) {
      setActiveCategory(parsed.category);
      if (parsed.fromUnit) setFromUnit(parsed.fromUnit);
      if (parsed.toUnit) setToUnit(parsed.toUnit);
    }
  };

  // Voice Control Toggle
  const handleToggleVoice = () => {
    if (!isSpeechSupported()) {
      showToast('Voice input is not supported in your browser');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer({
      onResult: ({ transcript, value, category, fromUnit: fUnit, toUnit: tUnit }) => {
        setIsListening(false);
        showToast(`Heard: "${transcript}"`);
        setActiveTab('main');
        if (value) setInputValue(value);
        if (category) {
          setActiveCategory(category);
          if (fUnit) setFromUnit(fUnit);
          if (tUnit) setToUnit(tUnit);
        }
      },
      onError: (err) => {
        setIsListening(false);
        showToast(`Voice error: ${err}`);
      },
      onEnd: () => setIsListening(false)
    });

    if (recognizer) {
      try {
        recognizer.start();
        setIsListening(true);
        showToast('Listening... Speak your command!');
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // Search Result Selection (Tools or Units)
  const handleSelectSearchResult = (item) => {
    setActiveTab('main');
    setActiveCategory(item.categoryId);
    setFromUnit(item.unitKey);
    showToast(`Switched to ${item.categoryName} (${item.unitName})`);
  };

  const handleOpenTool = (toolId) => {
    setActiveTab(toolId);
    showToast(`Opened ${toolId} tool`);
    if (toolId === 'cooking') handleUnlockBadge('master_baker');
    if (toolId === 'construction') handleUnlockBadge('builder');
    if (toolId === 'developer') handleUnlockBadge('dev_guru');
    if (toolId === 'distance') handleUnlockBadge('globe_trotter');
  };

  // Custom Unit Handlers
  const handleAddCustomUnit = (unit) => {
    setCustomUnits((prev) => [...prev, unit]);
    handleUnlockBadge('custom_creator');
  };

  const handleRemoveCustomUnit = (key) => {
    setCustomUnits((prev) => prev.filter((u) => u.key !== key));
    showToast('Removed custom unit');
  };

  // Image OCR Handler
  const handleLoadExtractedOCR = (item) => {
    setActiveTab('main');
    if (item.category && CATEGORIES[item.category]) {
      setActiveCategory(item.category);
    }
    setInputValue(item.value);
    if (item.unit) setFromUnit(item.unit);
    showToast(`Loaded OCR values: ${item.value} ${item.unit}`);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      const isInputActive = ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName);

      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        else if (isShortcutsOpen) setIsShortcutsOpen(false);
        else if (isCustomUnitOpen) setIsCustomUnitOpen(false);
        else if (isOCROpen) setIsOCROpen(false);
        else if (isAIOpen) setIsAIOpen(false);
        else if (isShareOpen) setIsShareOpen(false);
        else setInputValue('');
      } else if (e.key === 'Enter' && !isSearchOpen && !isShortcutsOpen) {
        saveToHistory();
      } else if (e.key.toLowerCase() === 's' && !isInputActive && !isSearchOpen) {
        e.preventDefault();
        handleSwap();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isShortcutsOpen, isCustomUnitOpen, isOCROpen, isAIOpen, isShareOpen, saveToHistory]);

  return (
    <div className="app-container">
      {/* HEADER BAR */}
      <Header
        theme={theme}
        setTheme={setTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        isListening={isListening}
        onToggleVoice={handleToggleVoice}
        currencyStatus={{ isLive, lastUpdated }}
        onOpenOCR={() => setIsOCROpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenCustomUnit={() => setIsCustomUnitOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* SPECIALIZED TOOLS NAVIGATION RIBBON */}
      <nav className="tools-nav-bar glass-panel">
        <button
          className={`tool-tab-btn ${activeTab === 'main' ? 'active' : ''}`}
          onClick={() => setActiveTab('main')}
        >
          <Calculator size={16} /> Main Converter
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'cooking' ? 'active' : ''}`}
          onClick={() => handleOpenTool('cooking')}
        >
          <ChefHat size={16} /> Cooking
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'construction' ? 'active' : ''}`}
          onClick={() => handleOpenTool('construction')}
        >
          <HardHat size={16} /> Construction
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'developer' ? 'active' : ''}`}
          onClick={() => handleOpenTool('developer')}
        >
          <Code size={16} /> Developer
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'timezone' ? 'active' : ''}`}
          onClick={() => handleOpenTool('timezone')}
        >
          <Globe size={16} /> Time Zones
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'distance' ? 'active' : ''}`}
          onClick={() => handleOpenTool('distance')}
        >
          <Navigation size={16} /> Distance
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'shopping' ? 'active' : ''}`}
          onClick={() => handleOpenTool('shopping')}
        >
          <ShoppingBag size={16} /> Shopping
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => handleOpenTool('analytics')}
        >
          <BarChart3 size={16} /> Analytics
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => handleOpenTool('quiz')}
        >
          <Trophy size={16} /> Quiz & Badges
        </button>
      </nav>

      {/* VIEW CONDITIONAL RENDERING */}
      {activeTab === 'main' && (
        <>
          {/* SMART SEARCH NATURAL LANGUAGE INPUT */}
          <SmartSearchInput
            onParsedConversion={handleSmartParsedConversion}
            onShowToast={showToast}
          />

          {/* CATEGORY RIBBON */}
          <CategorySelector
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* MAIN CONVERTER CARD */}
          <MainConverter
            inputValue={inputValue}
            setInputValue={setInputValue}
            activeCategory={activeCategory}
            fromUnit={fromUnit}
            setFromUnit={setFromUnit}
            toUnit={toUnit}
            setToUnit={setToUnit}
            precision={precision}
            setPrecision={setPrecision}
            conversionResult={conversionResult}
            onSwap={handleSwap}
            onCopy={handleCopyResult}
            isCopied={isCopied}
            isFavorite={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
            onSaveToHistory={saveToHistory}
            customUnits={customUnits}
          />

          {/* MULTI-UNIT VIEW GRID */}
          <MultiUnitView
            multiUnitList={multiUnitList}
            inputValue={inputValue}
            fromUnit={CATEGORIES[activeCategory]?.units[fromUnit]?.symbol || fromUnit}
            categoryName={CATEGORIES[activeCategory]?.name}
            onCopyText={(text) => showToast(`Copied: ${text}`)}
            onSelectTargetUnit={(unitKey) => setToUnit(unitKey)}
          />

          {/* RECENT HISTORY & PINNED FAVORITES PANELS */}
          <div className="side-panels-layout">
            <HistoryPanel
              history={history}
              onRestoreHistory={handleRestoreHistory}
              onClearHistory={() => {
                setHistory([]);
                showToast('History cleared');
              }}
              onRemoveHistoryItem={(id) =>
                setHistory((prev) => prev.filter((item) => item.id !== id))
              }
            />

            <FavoritesPanel
              favorites={favorites}
              onLoadFavorite={handleLoadFavorite}
              onRemoveFavorite={(id) => {
                setFavorites((prev) => prev.filter((f) => f.id !== id));
                showToast('Favorite removed');
              }}
            />
          </div>
        </>
      )}

      {/* SPECIALIZED TOOL VIEWS */}
      {activeTab === 'cooking' && <CookingConverter onShowToast={showToast} />}
      {activeTab === 'construction' && <ConstructionConverter onShowToast={showToast} />}
      {activeTab === 'developer' && <DeveloperConverter onShowToast={showToast} />}
      {activeTab === 'timezone' && <TimeZoneConverter />}
      {activeTab === 'distance' && <CityDistanceCalculator />}
      {activeTab === 'shopping' && <ShoppingPriceConverter />}
      {activeTab === 'analytics' && <AnalyticsPanel history={history} />}
      {activeTab === 'quiz' && (
        <GamifiedQuizPanel
          unlockedBadges={unlockedBadges}
          onUnlockBadge={handleUnlockBadge}
          onShowToast={showToast}
        />
      )}

      {/* MODALS & DRAWERS */}
      <CustomUnitModal
        isOpen={isCustomUnitOpen}
        onClose={() => setIsCustomUnitOpen(false)}
        customUnits={customUnits}
        onAddCustomUnit={handleAddCustomUnit}
        onRemoveCustomUnit={handleRemoveCustomUnit}
        onShowToast={showToast}
      />

      <ImageConverterModal
        isOpen={isOCROpen}
        onClose={() => setIsOCROpen(false)}
        onLoadExtractedConversion={handleLoadExtractedOCR}
      />

      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        currentConversion={{
          value: inputValue,
          fromSymbol: CATEGORIES[activeCategory]?.units[fromUnit]?.symbol || fromUnit,
          toSymbol: CATEGORIES[activeCategory]?.units[toUnit]?.symbol || toUnit,
          result: conversionResult.result,
          formula: conversionResult.formula
        }}
        onShowToast={showToast}
      />

      <SearchUnitModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSearchResult={handleSelectSearchResult}
        onOpenTool={handleOpenTool}
        customUnits={customUnits}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* TOAST NOTIFICATION */}
      <Toast message={toastMessage} />
    </div>
  );
}
