import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/context';
import {
  startVoiceRecognition,
  speakText,
  stopSpeaking,
  parseVoiceAgriculturalQuery,
  ExtractedVoiceIntent
} from '../services/speech';
import { chatWithMandiAI } from '../services/gemini';
import { Mic, MicOff, Volume2, ArrowRight, X, Sparkles } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string, prefillData?: unknown) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab
}) => {
  const { language, t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [extractedIntent, setExtractedIntent] = useState<ExtractedVoiceIntent | null>(null);
  const [recognitionHandler, setRecognitionHandler] = useState<{ stop: () => void } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const samplePrompts = {
    en: [
      "Which mandi gives me highest profit for 35 quintals of tomato?",
      "Will onion prices in Yeshwantpur increase next week?",
      "How to control leaf spots on tomato organically?"
    ],
    kn: [
      "ನನಗೆ 30 ಕ್ವಿಂಟಾಲ್ ಟೊಮ್ಯಾಟೊಗೆ ಯಾವ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭ ಸಿಗುತ್ತದೆ?",
      "ಯಶವಂತಪುರದಲ್ಲಿ ಈರುಳ್ಳಿ ಬೆಲೆ ಮುಂದಿನ ವಾರ ಹೆಚ್ಚಾಗುತ್ತಾ?",
      "ಟೊಮ್ಯಾಟೊ ಎಲೆ ಕಪ್ಪಾಗುತ್ತಿದೆ, ಯಾವ ಸಾವಯವ ಔಷಧಿ ಸಿಂಪಡಿಸಬೇಕು?"
    ],
    hi: [
      "मुझे 30 क्विंटल टमाटर के लिए किस मंडी में सबसे ज्यादा मुनाफा मिलेगा?",
      "क्या यशवंतपुर में अगले हफ्ते प्याज का भाव बढ़ेगा?",
      "टमाटर के पत्तों पर धब्बे हैं, कौन सा जैविक उपचार करें?"
    ]
  };

  const handleStartListening = () => {
    setErrorMsg('');
    setTranscript('');
    setResponse('');
    setExtractedIntent(null);
    stopSpeaking();

    const handler = startVoiceRecognition(
      language,
      async (spokenText) => {
        setTranscript(spokenText);
        setIsListening(false);
        await processSpokenQuery(spokenText);
      },
      (err) => {
        console.warn('Speech error:', err);
        setErrorMsg('Microphone error or permission denied. You can click an example query below.');
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (handler) {
      setRecognitionHandler(handler);
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognitionHandler) {
      recognitionHandler.stop();
    }
    setIsListening(false);
  };

  const processSpokenQuery = async (queryText: string) => {
    // 1. Extract agricultural entities
    const intent = parseVoiceAgriculturalQuery(queryText);
    setExtractedIntent(intent);

    // 2. Fetch AI response
    try {
      const aiReply = await chatWithMandiAI(queryText, language, []);
      setResponse(aiReply);

      // 3. Regional TTS Speak
      setIsSpeaking(true);
      await speakText(aiReply, language);
      setIsSpeaking(false);
    } catch (err) {
      console.error(err);
      setResponse('Unable to process voice query at this moment. Please check connectivity.');
    }
  };

  const handleUsePrompt = async (prompt: string) => {
    setTranscript(prompt);
    await processSpokenQuery(prompt);
  };

  useEffect(() => {
    if (!isOpen) {
      handleStopListening();
      stopSpeaking();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{t.voice.modalTitle}</h3>
              <p className="text-xs text-slate-500">
                {language === 'kn' ? 'ಕನ್ನಡ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ' : language === 'hi' ? 'हिंदी आवाज पहचान' : 'Multilingual Speech-to-Text & TTS'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* Voice Microphone Interaction Area */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                isListening
                  ? 'bg-rose-600 text-white ring-8 ring-rose-100 animate-pulse'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
            <span className="mt-4 text-sm font-semibold text-slate-800">
              {isListening ? t.voice.listening : t.voice.speakNow}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {isListening ? 'Click to stop recording' : 'Tap microphone and speak naturally'}
            </span>

            {errorMsg && (
              <p className="mt-3 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Transcribed Speech */}
          {transcript && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                Recognized Voice Query:
              </div>
              <p className="text-slate-900 font-medium text-base">"{transcript}"</p>

              {/* Entity extraction chips */}
              {extractedIntent && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Extracted Parameters:</span>
                  {extractedIntent.detectedCommodity && (
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                      Crop: {extractedIntent.detectedCommodity}
                    </span>
                  )}
                  {extractedIntent.detectedQuantityQtl && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
                      Qty: {extractedIntent.detectedQuantityQtl} Qtl
                    </span>
                  )}
                  {extractedIntent.detectedMandi && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                      Mandi: {extractedIntent.detectedMandi}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AI Response Output */}
          {response && (
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mandi AI Recommendation
                </span>
                <button
                  onClick={() => speakText(response, language)}
                  className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isSpeaking ? 'Speaking...' : 'Listen Again'}
                </button>
              </div>
              <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {response}
              </div>

              {extractedIntent?.intent === 'BEST_MANDI' && onNavigateToTab && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTab('optimizer');
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View Net Realization Math in Allocator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Example prompt pills */}
          {!transcript && !response && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.voice.trySaying}
              </div>
              <div className="space-y-1.5">
                {(samplePrompts[language] || samplePrompts.en).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleUsePrompt(prompt)}
                    className="w-full text-left text-xs text-slate-700 hover:text-emerald-900 bg-slate-50 hover:bg-emerald-50 p-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {t.common.cancel}
          </button>
        </div>

      </div>
    </div>
  );
};
