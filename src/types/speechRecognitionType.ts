declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition;
      webkitSpeechRecognition: typeof webkitSpeechRecognition;
    }
  
    let SpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  
    let webkitSpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  
    interface SpeechRecognition {
      continuous: boolean; // Add continuous property
      interimResults: boolean; // Add interimResults property
      lang: string; // Add lang property
  
      start(): void;
      stop(): void;
      onstart?: () => void;
      onend?: () => void;
      onresult?: (event: SpeechRecognitionEvent) => void;
      onerror?: (event: SpeechRecognitionErrorEvent) => void;
      abort(): void;
    }
  
    interface SpeechRecognitionEvent extends Event {
      readonly resultIndex: number;
      readonly results: SpeechRecognitionResultList;
    }
  
    interface SpeechRecognitionResultList {
      readonly length: number;
      item(index: number): SpeechRecognitionResult;
      [index: number]: SpeechRecognitionResult;
    }
  
    interface SpeechRecognitionResult {
      readonly length: number;
      item(index: number): SpeechRecognitionAlternative;
      [index: number]: SpeechRecognitionAlternative;
      readonly isFinal: boolean;
    }
  
    interface SpeechRecognitionAlternative {
      readonly transcript: string;
      readonly confidence: number;
    }
  
    interface SpeechRecognitionErrorEvent extends Event {
      readonly error: string;
      readonly message: string;
    }
  }
  
  export {};
  