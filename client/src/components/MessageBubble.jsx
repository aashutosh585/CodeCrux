import React from 'react';
import { Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ message, isDarkMode }) => {
  const isUser = message.role === 'user';
  const text = message.parts?.[0]?.text ?? '';
  const ts = message._ts ? new Date(message._ts).toLocaleTimeString() : '';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3`}>
      {/* Left avatar for model, right for user */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <Bot className={`w-6 h-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
        </div>
      )}

      <div className="max-w-[70%]">
        <div
          className={`p-3 rounded-lg break-words whitespace-pre-wrap ${
            isUser
              ? 'bg-blue-500 text-white self-end'
              : isDarkMode
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
          role="article"
          aria-label={isUser ? 'Your message' : 'AI message'}
        >
          {isUser ? (
            <div className="text-sm leading-relaxed">{text}</div>
          ) : (
            <ReactMarkdown
              children={text}
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  if (inline) {
                    return <code className="px-1 py-0.5 rounded bg-gray-200 text-sm font-mono" {...props}>{children}</code>;
                  }
                  return (
                    <pre
                      className={`overflow-auto rounded-md p-3 text-sm font-mono ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-900/5'
                      }`}
                      {...props}
                    >
                      <code>{children}</code>
                    </pre>
                  );
                },
                a({ href, children, ...props }) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
                      {children}
                    </a>
                  );
                },
                table({ children }) {
                  return <table className="w-full text-sm border-collapse">{children}</table>;
                },
                th({ children }) {
                  return <th className="border px-2 py-1 text-left">{children}</th>;
                },
                td({ children }) {
                  return <td className="border px-2 py-1">{children}</td>;
                }
              }}
            />
          )}
        </div>

        <div className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2`}>
          <span>{isUser ? 'You' : 'AI Mentor'}</span>
          {ts && <span>• {ts}</span>}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 rounded-full bg-blue-600/80" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
