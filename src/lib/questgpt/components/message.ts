export interface Message {
  message: string;
  timestamp: string;
  isBot: boolean;
  metadata?: MessageMetadata;
  isLoader?: boolean;
}

interface MessageMetadata {
  sources?: string[];
}