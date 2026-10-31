import { Language } from '../types';

export interface ExtractedVoiceIntent {
  rawQuery: string;
  detectedCommodity?: string;
  detectedQuantityQtl?: number;
  detectedMandi?: string;
  intent: 'BEST_MANDI' | 'PRICE_QUERY' | 'DISEASE_HELP' | 'WEATHER' | 'GENERAL';
}

// Check speech recognition support
export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

// Start browser Speech-to-Text
export function startVoiceRecognition(
  language: Language,
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. Please use text input.');
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  const SpeechRecognitionConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;

  if (!SpeechRecognitionConstructor) {
    onError('Speech recognition constructor not found.');
    return null;
  }

  const recognition = new SpeechRecognitionConstructor();
  recognition.continuous = false;
  recognition.interimResults = false;

  // Language codes for India
  const langMap: Record<Language, string> = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN'
  };
  recognition.lang = langMap[language] || 'en-IN';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    onResult(transcript);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    onError(event.error || 'Speech recognition error');
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
    return {
      stop: () => recognition.stop()
    };
  } catch (err) {
    onError(String(err));
    return null;
  }
}

// Regional-Language Speech Synthesis (TTS)
export function speakText(text: string, language: Language): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop prior speech

    // Clean markdown asterisks or special characters for smooth voice
    const cleanText = text.replace(/[*#_`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langCodeMap: Record<Language, string> = {
      en: 'en-IN',
      kn: 'kn-IN',
      hi: 'hi-IN'
    };
    utterance.lang = langCodeMap[language] || 'en-IN';
    utterance.rate = 0.95; // slightly slower for rural legibility

    // Select suitable voice if available in system
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCodeMap[language].substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve(); // Non-blocking

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Natural voice parameter extractor
export function parseVoiceAgriculturalQuery(transcript: string): ExtractedVoiceIntent {
  const lower = transcript.toLowerCase();

  // Extract commodity
  let commodity: string | undefined;
  if (lower.includes('tomato') || lower.includes('ಟೊಮ್ಯಾಟೊ') || lower.includes('टमाटर')) commodity = 'Tomato';
  else if (lower.includes('onion') || lower.includes('ಈರುಳ್ಳಿ') || lower.includes('प्याज')) commodity = 'Onion';
  else if (lower.includes('potato') || lower.includes('ಆಲೂಗಡ್ಡೆ') || lower.includes('आलू')) commodity = 'Potato';
  else if (lower.includes('paddy') || lower.includes('rice') || lower.includes('ಭತ್ತ') || lower.includes('चावल')) commodity = 'Paddy';
  else if (lower.includes('ragi') || lower.includes('ರಾಗಿ') || lower.includes('रागी')) commodity = 'Ragi';
  else if (lower.includes('chilli') || lower.includes('ಮೆಣಸಿನಕಾಯಿ') || lower.includes('मिर्च')) commodity = 'Green Chilli';

  // Extract quantity (e.g., "20 quintals", "30 qtl", "50 ಕ್ವಿಂಟಾಲ್", "40 क्विंटल")
  let quantity: number | undefined;
  const qtyMatch = lower.match(/(\d+)\s*(quintal|quintals|qtl|ಕ್ವಿಂಟಾಲ್|ಕ್ವಿಂಟಲ್|क्विंटल|टन|tonne|ton)/i) || lower.match(/(\d+)/);
  if (qtyMatch) {
    quantity = parseInt(qtyMatch[1], 10);
  }

  // Extract mandi
  let mandi: string | undefined;
  if (lower.includes('yeshwantpur') || lower.includes('ಯಶವಂತಪುರ') || lower.includes('यशवंतपुर')) mandi = 'Bengaluru Yeshwantpur';
  else if (lower.includes('kolar') || lower.includes('ಕೋಲಾರ') || lower.includes('कोलार')) mandi = 'Kolar';
  else if (lower.includes('mandya') || lower.includes('ಮಂಡ್ಯ') || lower.includes('मंड्या')) mandi = 'Mandya';
  else if (lower.includes('mysuru') || lower.includes('ಮೈಸೂರು') || lower.includes('मैसूर')) mandi = 'Mysuru Bandipalya';

  // Determine intent
  let intent: ExtractedVoiceIntent['intent'] = 'GENERAL';
  if (lower.includes('best mandi') || lower.includes('highest profit') || lower.includes('ಹೆಚ್ಚು ಲಾಭ') || lower.includes('मुनाफा') || lower.includes('where to sell')) {
    intent = 'BEST_MANDI';
  } else if (lower.includes('price') || lower.includes('ಬೆಲೆ') || lower.includes('ದರ') || lower.includes('भाव')) {
    intent = 'PRICE_QUERY';
  } else if (lower.includes('disease') || lower.includes('ರೋಗ') || lower.includes('spray') || lower.includes('औषधि') || lower.includes('leaf')) {
    intent = 'DISEASE_HELP';
  } else if (lower.includes('weather') || lower.includes('rain') || lower.includes('ಮಳೆ') || lower.includes('ಹವಾಮಾನ') || lower.includes('मौसम')) {
    intent = 'WEATHER';
  }

  return {
    rawQuery: transcript,
    detectedCommodity: commodity,
    detectedQuantityQtl: quantity,
    detectedMandi: mandi,
    intent
  };
}
